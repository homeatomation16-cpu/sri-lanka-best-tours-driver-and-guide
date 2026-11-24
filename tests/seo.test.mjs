import { test } from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import fs from 'node:fs';

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('@/')) {
      return nextResolve(new URL(`../src/${specifier.slice(2)}.ts`, import.meta.url).href, context);
    }
    return nextResolve(specifier, context);
  },
});
const { routing } = await import('../src/i18n/routing.ts');
const { localizedUrl, pageAlternates, pageMetadata, metaDescription, serializeJsonLd, breadcrumbJsonLd, siteName, shortSiteName, siteUrl } = await import('../src/lib/seo.ts');

test('all supported locales have self-canonical and reciprocal equivalent-page alternates', () => {
  for (const locale of routing.locales) {
    for (const path of ['', '/tours', '/destinations/sigiriya', '/tours/a%20b']) {
      const { canonical, languages } = pageAlternates(locale, path);
      assert.equal(canonical, `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${path}`);
      assert.equal(languages[locale], canonical);
      assert.equal(languages['x-default'], localizedUrl('en', path));
      assert.deepEqual(Object.keys(languages).sort(), [...routing.locales, 'x-default'].sort());
      for (const language of routing.locales) assert.equal(languages[language], pageAlternates(language, path).canonical);
    }
  }
});

test('page-specific search, Open Graph and Twitter previews agree in every locale', () => {
  for (const locale of routing.locales) {
    const messages = JSON.parse(fs.readFileSync(new URL(`../src/messages/${locale}.json`, import.meta.url)));
    const m = pageMetadata(locale, '/contact', messages.contact.title, messages.contact.page.heroText, '/contact-cover.jpg');
    // absolute: the layout's "%s | brand" template must not add the brand twice.
    // Full brand when it fits in ~60 characters, else the short brand, else the bare title.
    const title = m.title.absolute;
    const expected = [`${messages.contact.title} | ${siteName}`, `${messages.contact.title} | ${shortSiteName}`].find((t) => t.length <= 60) ?? messages.contact.title;
    assert.equal(title, expected);
    assert.ok(title.length <= 60 || title === messages.contact.title);
    assert.equal(m.openGraph.title, title);
    assert.equal(m.twitter.title, title);
    assert.equal(m.twitter.description, m.description);
    assert.equal(m.openGraph.description, m.description);
    assert.equal(m.openGraph.url, m.alternates.canonical);
    assert.match(m.openGraph.locale, /^[a-z]{2}_[A-Z]{2}$/);
    assert.equal(m.openGraph.alternateLocale.length, routing.locales.length - 1);
    assert.equal(m.twitter.images[0], '/contact-cover.jpg');
    assert.ok(m.description.length <= 160);
    assert.equal(pageMetadata(locale, '', title, 'text').title.absolute, title); // already branded: not branded again
  }
});

test('metadata excerpts remove markup and stop at words without appending misleading ellipses', () => {
  assert.equal(metaDescription(' <p>A private tour</p>\n with a driver. '), 'A private tour with a driver.');
  assert.equal(metaDescription('A short description.'), 'A short description.');
  assert.equal(metaDescription('Private tours and sightseeing around Sri Lanka', 28), 'Private tours and…');
  assert.equal(metaDescription('旅'.repeat(200)).length, 160);
});

test('JSON-LD safely contains editable strings and preserves data', () => {
  const payload = { name: '</script><script>alert(1)</script>', description: 'A & B' };
  const serialized = serializeJsonLd(payload);
  assert.ok(!serialized.includes('<'));
  assert.deepEqual(JSON.parse(serialized), payload);
});

test('breadcrumbs use ordered, absolute, localized URLs', () => {
  const b = breadcrumbJsonLd('fr', [{ name: 'Accueil', path: '' }, { name: 'Destinations', path: '/destinations' }, { name: 'Ella', path: '/destinations/ella' }]);
  assert.equal(b['@type'], 'BreadcrumbList');
  assert.deepEqual(b.itemListElement.map(i => i.position), [1, 2, 3]);
  assert.equal(b.itemListElement[2].item, `${siteUrl}/fr/destinations/ella`);
});
