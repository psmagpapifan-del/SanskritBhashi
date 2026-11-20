import type { APIRoute } from "astro";
import { NCERT_CLASSES, classSlug } from "../lib/ncertClasses";

export const prerender = true;

/**
 * Build-time sitemap. Every localized page under src/pages/[lang]/ is picked up
 * automatically, so new articles are listed without editing this file.
 * Dynamic routes ([param].astro) are not globbed and must be added below.
 * Pages that are English-only (privacy, terms) are emitted for /en only,
 * because their other-language copies are marked noindex.
 */
const SITE = "https://sanskritbhashi.com";
const LOCALES = ["en", "hi", "ja", "es"] as const;
const ENGLISH_ONLY = new Set(["/privacy", "/terms"]);

const pageFiles = Object.keys(import.meta.glob("./\\[lang\\]/**/*.astro"));

const routes = pageFiles
  .map((file) =>
    file
      .replace(/^\.\/\[lang\]/, "")
      .replace(/\.astro$/, "")
      .replace(/\/index$/, "")
  )
  .filter((r) => !r.includes("["))
  // Dynamic routes are listed explicitly.
  .concat(NCERT_CLASSES.map((n) => `/modules/school-prep/${classSlug(n)}`))
  .sort();

const priorityFor = (route: string) => {
  if (route === "") return "1.0";
  if (route === "/learn") return "0.9";
  if (route.startsWith("/learn/")) return "0.8";
  if (route.startsWith("/modules/")) return "0.7";
  if (route === "/about" || route === "/faqs") return "0.6";
  return "0.3";
};

export const GET: APIRoute = () => {
  const urls: string[] = [];
  for (const route of routes) {
    const englishOnly = ENGLISH_ONLY.has(route);
    const locales = englishOnly ? (["en"] as const) : LOCALES;
    const alternates = englishOnly
      ? ""
      : LOCALES.map(
          (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}/${l}${route}"/>`
        ).join("\n") +
        `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/en${route}"/>`;
    for (const l of locales) {
      urls.push(
        `  <url>\n    <loc>${SITE}/${l}${route}</loc>\n${alternates ? alternates + "\n" : ""}    <priority>${priorityFor(route)}</priority>\n  </url>`
      );
    }
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
