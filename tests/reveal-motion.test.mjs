import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(readFileSync(new URL("../src/components/home/reveal.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

function fixture({ additive = true, direction = "left", stagger = 0 } = {}) {
  const animations = [];
  const observers = [];
  const listeners = new Map();
  const classes = new Set();
  const registration = [];
  const properties = new Map();
  const preference = { matches: false, addEventListener: (_, fn) => listeners.set("preference", fn), removeEventListener() {} };
  const el = {
    dataset: { reveal: direction },
    style: { transform: "translateY(-6px) scale(1.015)", setProperty: (k, v) => properties.set(k, v), getPropertyValue: (k) => properties.get(k) ?? "" },
    classList: {
      contains: (name) => classes.has(name),
      add: (name) => { registration.push(name); classes.add(name); }, remove: (name) => classes.delete(name),
      toggle: (name, enabled) => enabled ? classes.add(name) : classes.delete(name),
    },
    closest: () => null,
    animate(keyframes, options) {
      const animation = {
        keyframes, options, progress: 0, playState: "running",
        finish() { this.progress = 1; this.playState = "finished"; },
        cancel() { this.playState = "idle"; },
      };
      animation.effect = { getComputedTiming: () => ({ progress: animation.progress }) };
      animations.push(animation);
      return animation;
    },
  };
  const siblings = [...Array(stagger).fill({}), el];
  el.parentElement = { matches: () => stagger > 0, children: siblings };
  const section = { matches: () => false, querySelectorAll: (selector) => selector === ".reveal" && !classes.has("reveal") ? [] : [el] };
  const exports = {};
  const window = { innerWidth: 375, innerHeight: 800, matchMedia: () => preference, addEventListener: (name, fn) => listeners.set(name, fn), removeEventListener() {} };
  vm.runInNewContext(source, {
    exports, window, CSS: { supports: () => additive },
    IntersectionObserver: class {
      constructor(callback) { this.callback = callback; observers.push(this); }
      observe() {} unobserve() {} disconnect() {}
    },
  });
  const unregister = exports.registerRevealSection(section);
  const stop = exports.startReveal();
  return {
    el, animations, listeners, preference, window, classes, registration,
    enter(shown, top = 900) { observers.at(-1).callback([{ target: el, isIntersecting: shown, boundingClientRect: { top } }]); },
    cleanup() { stop(); unregister(); },
  };
}

test("registration selects static WAAPI mode before adding reveal, without allocating animations", () => {
  const f = fixture();
  assert.ok(f.registration.indexOf("reveal-waapi-ready") < f.registration.indexOf("reveal"));
  assert.ok(f.classes.has("reveal-waapi-ready"));
  assert.ok(!f.classes.has("reveal-composited"));
  assert.equal(f.animations.length, 0);
  f.enter(false);
  assert.equal(f.animations.length, 0, "offscreen observer delivery must remain static");
  f.enter(false, -100);
  assert.equal(f.animations.length, 0, "jumping past an element must not allocate an offscreen animation");
  f.cleanup();
});

test("reveal translation adds to scroll motion without replacing hover transforms", () => {
  const f = fixture();
  assert.equal(f.animations.length, 0, "offscreen registration must not allocate animations");
  f.enter(true);
  const a = f.animations.at(-1);
  assert.equal(a.keyframes[0].translate, "-32px 0px");
  assert.equal(a.keyframes[1].translate, "0px 0px");
  assert.equal(a.options.composite, "add");
  assert.equal(a.options.duration, 900);
  assert.equal(a.options.easing, "cubic-bezier(0.2, 0.7, 0.2, 1)");
  assert.equal(f.el.style.transform, "translateY(-6px) scale(1.015)");
  f.cleanup();
});

test("rapid reversal continues from the current offset with CSS shortening", () => {
  const f = fixture();
  f.enter(true);
  f.animations.at(-1).progress = 0.5;
  f.enter(false);
  const a = f.animations.at(-1);
  assert.equal(a.keyframes[0].translate, "-16px 0px");
  assert.equal(a.keyframes[1].translate, "-32px 0px");
  assert.equal(a.options.duration, 450);
  assert.equal(a.options.delay, 0);
  f.cleanup();
});

test("entry keeps grid stagger and upward distance", () => {
  const f = fixture({ direction: "up", stagger: 2 });
  f.enter(true);
  assert.equal(f.animations.at(-1).keyframes[0].translate, "0px 56px");
  assert.equal(f.animations.at(-1).options.delay, 240);
  f.cleanup();
});

test("breakpoint changes retarget hidden offsets; reduced motion cancels effects", () => {
  const f = fixture({ direction: "right" });
  f.enter(true);
  f.animations.at(-1).finish();
  f.enter(false);
  f.window.innerWidth = 1024;
  f.listeners.get("resize")();
  assert.equal(f.animations.at(-1).keyframes[1].translate, "64px 0px");
  f.preference.matches = true;
  f.listeners.get("preference")();
  assert.ok(f.animations.every((a) => a.playState === "idle"));
  assert.ok(f.classes.has("is-in"));
  assert.ok(!f.classes.has("reveal-composited"));
  f.cleanup();
});

test("unsupported additive animation retains CSS reveal fallback", () => {
  const f = fixture({ additive: false });
  assert.ok(!f.classes.has("reveal-waapi-ready"));
  f.enter(true);
  assert.equal(f.animations.length, 0);
  assert.ok(f.classes.has("is-in"));
  f.enter(false);
  assert.ok(!f.classes.has("is-in"));
  f.cleanup();
});
