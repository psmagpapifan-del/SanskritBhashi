#!/usr/bin/env node
/**
 * Tell Bing, Yandex, Seznam, Naver (and through Bing: DuckDuckGo, ChatGPT search, Copilot) that pages changed,
 * using IndexNow (https://www.indexnow.org). Run after a deploy has gone live:
 *
 *   npm run seo:indexnow                 # submit every URL in the live sitemap
 *   npm run seo:indexnow -- /en/learn    # submit only these paths
 *
 * The key file public/059565eb2422905bc1f9e03a736fd18c.txt proves ownership; it is meant to be public.
 * Google does not use IndexNow: use Search Console → Sitemaps / URL inspection for Google.
 */
const SITE = "https://sanskritbhashi.com";
const KEY = "059565eb2422905bc1f9e03a736fd18c";

const paths = process.argv.slice(2);
let urls;
if (paths.length) {
  urls = paths.map((p) => SITE + (p.startsWith("/") ? p : "/" + p));
} else {
  const xml = await (await fetch(SITE + "/sitemap.xml")).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
if (!urls.length) { console.error("No URLs found."); process.exit(1); }

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls.slice(0, 10000) }),
});
console.log(`IndexNow: submitted ${urls.length} URLs → HTTP ${res.status} ${res.statusText}`);
if (res.status >= 300) { console.log(await res.text()); process.exit(1); }
