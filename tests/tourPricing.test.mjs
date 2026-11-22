// Run with: npm test   (Node's built-in test runner; Node 22.18+ loads the .ts module directly)
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  PRICED_TOURS, formatUsd, isValidTravellers, parseUsdInput, quote, toGroupPrices, validateTable, vehicleFor,
} from "../src/lib/tourPricingCore.ts";

// The price list supplied by the business (USD, whole group)
const EXPECTED = {
  "05-days-down-south": [420, 450, 480, 530, 560, 590, 610, 620, 630, 640],
  "05-days-east-coast": [430, 460, 490, 540, 570, 600, 620, 630, 640, 650],
  "08-days-down-south": [630, 660, 690, 800, 820, 840, 870, 880, 890, 900],
  "08-days-east-coast": [640, 670, 700, 820, 840, 860, 890, 900, 910, 920],
  "10-days-down-south": [770, 800, 830, 1000, 1020, 1040, 1060, 1070, 1080, 1090],
  "10-days-east-coast": [780, 810, 840, 1040, 1060, 1080, 1120, 1130, 1140, 1150],
  "12-days-down-south": [900, 920, 940, 1170, 1190, 1210, 1250, 1260, 1270, 1280],
  "12-days-east-coast": [910, 940, 970, 1180, 1200, 1220, 1290, 1300, 1310, 1320],
  "14-days-down-south": [1000, 1030, 1060, 1260, 1280, 1300, 1370, 1380, 1390, 1400],
  "14-days-east-coast": [1040, 1070, 1100, 1350, 1370, 1390, 1440, 1450, 1460, 1470],
};
const TABLE = Object.fromEntries(Object.entries(EXPECTED).map(([id, row]) => [id, row.map((d) => d * 100)]));

/** Seed source: the bundled tour files the server reads on first use. */
function fileTable(locale) {
  const src = fs.readFileSync(new URL(`../src/data/tours/${locale}.ts`, import.meta.url), "utf8");
  const tours = JSON.parse(src.slice(src.indexOf("["), src.lastIndexOf("]") + 1));
  return Object.fromEntries(PRICED_TOURS.map(({ tourId }) => {
    const t = tours.find((x) => x.id === tourId);
    return [tourId, [...t.groupPrices].sort((a, b) => a.persons - b.persons).map((r) => Math.round(r.price * 100))];
  }));
}

test("the 10 packages are exactly the supplied ones", () => {
  assert.deepEqual(PRICED_TOURS.map((t) => t.tourId).sort(), Object.keys(EXPECTED).sort());
});

test("all 100 supplied prices: bundled files (seed) match in every language", () => {
  for (const locale of ["en", "si", "ta", "de", "fr", "it", "es", "pt", "ru", "ar", "hi", "ja", "zh", "ko"]) {
    assert.deepEqual(fileTable(locale), TABLE, `prices differ in ${locale}`);
  }
});

test("all 100 supplied prices: quote returns the exact group total", () => {
  let n = 0;
  for (const [tourId, row] of Object.entries(EXPECTED)) {
    row.forEach((usd, i) => {
      const q = quote(TABLE, tourId, i + 1);
      assert.equal(q.totalCents, usd * 100, `${tourId} ${i + 1}`);
      assert.equal(q.currency, "USD");
      n++;
    });
  }
  assert.equal(n, 100);
});

test("vehicle follows the group size", () => {
  for (const [n, v] of [[1, "Sedan Car"], [3, "Sedan Car"], [4, "KDH Flatroof"], [6, "KDH Flatroof"], [7, "KDH Highroof"], [10, "KDH Highroof"]]) {
    assert.equal(vehicleFor(n), v);
    assert.equal(quote(TABLE, "05-days-down-south", n).vehicle, v);
  }
});

test("group total is never multiplied; per-person is total / travellers rounded to the cent", () => {
  const two = quote(TABLE, "05-days-down-south", 2);
  assert.equal(two.totalCents, 45000);
  assert.equal(formatUsd(two.totalCents), "$450.00");
  assert.equal(formatUsd(two.perPersonCents), "$225.00");
  const four = quote(TABLE, "05-days-down-south", 4);
  assert.equal(formatUsd(four.totalCents), "$530.00");
  assert.equal(formatUsd(four.perPersonCents), "$132.50");
  const seven = quote(TABLE, "05-days-down-south", 7);
  assert.equal(seven.totalCents, 61000); // exact, not 7 × 87.14
  assert.equal(formatUsd(seven.perPersonCents), "$87.14");
  assert.equal(formatUsd(102000), "$1,020.00");
});

test("invalid traveller counts are rejected", () => {
  for (const n of [0, -1, 11, 2.5, NaN, Infinity, "2", null, undefined]) {
    assert.equal(isValidTravellers(n), false, String(n));
    assert.throws(() => quote(TABLE, "05-days-down-south", n), RangeError);
  }
});

test("unknown package, hotel variant and missing price are rejected", () => {
  assert.throws(() => quote(TABLE, "nope", 2), RangeError);
  assert.throws(() => quote(TABLE, "05-days-down-south-hotels", 2), RangeError);
  const broken = { ...TABLE, "05-days-down-south": TABLE["05-days-down-south"].slice(0, 5) };
  assert.throws(() => quote(broken, "05-days-down-south", 8), /missing/);
});

test("table validation catches missing, negative, fractional-cent and extra entries", () => {
  assert.deepEqual(validateTable(TABLE), []);
  assert.ok(validateTable({ ...TABLE, "05-days-down-south": TABLE["05-days-down-south"].slice(0, 9) }).length);
  assert.ok(validateTable({ ...TABLE, "05-days-down-south": [-100, ...TABLE["05-days-down-south"].slice(1)] }).length);
  assert.ok(validateTable({ ...TABLE, "05-days-down-south": [450.5, ...TABLE["05-days-down-south"].slice(1)] }).length);
  assert.ok(validateTable({ ...TABLE, "05-days-down-south": [0, ...TABLE["05-days-down-south"].slice(1)] }).length);
  assert.ok(validateTable({ ...TABLE, "galle-one-day-tour": TABLE["05-days-down-south"] }).length);
  const { ["14-days-east-coast"]: _, ...missing } = TABLE;
  assert.ok(validateTable(missing).length);
  assert.ok(validateTable(null).length);
  assert.ok(validateTable([]).length);
});

test("admin input parsing accepts dollar amounts and rejects malformed ones", () => {
  assert.equal(parseUsdInput("450"), 45000);
  assert.equal(parseUsdInput("$1,020.50"), 102050);
  assert.equal(parseUsdInput(" 87.1 "), 8710);
  for (const bad of ["", "-450", "abc", "4.505", "0", "0.00", "1e3", "12.3.4", "$", "1000000"]) {
    assert.equal(parseUsdInput(bad), null, bad);
  }
});

test("group rows keep the existing page shape (dollars + vehicle)", () => {
  const rows = toGroupPrices(TABLE["05-days-down-south"]);
  assert.equal(rows.length, 10);
  assert.deepEqual(rows[3], { persons: 4, price: 530, vehicle: "KDH Flatroof" });
});
