import type { APIRoute } from "astro";
import { NCERT_CLASSES, classSlug } from "../lib/ncertClasses";
import { GITA_AVAILABLE, adhyayaSlug } from "../lib/gita/index";
import { gitaLocales } from "../lib/gita/content";
import { learnArticles } from "../lib/learnArticles";
import { PROBLEMS, PROBLEM_LOCALES } from "../lib/gita/problems";
import { ALL_SHLOKA_REFS, shlokaSlug } from "../lib/gita/shlokaPages";

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
/** Gita pages exist in ja/es only once translated (the other copies are noindex). */
const gitaRoute = (route: string): readonly string[] | undefined => {
  if (route === "/modules/gita") return gitaLocales();
  // "Gita for students' problems" pages are written in English and Hindi only.
  if (route.startsWith("/modules/gita/help")) return PROBLEM_LOCALES;
  // Shloka pages are indexed in English and Hindi only (see shloka/[ref].astro).
  if (/^\/modules\/gita\/shloka\//.test(route)) return ["en", "hi"];
  const m = route.match(/^\/modules\/gita\/adhyaya-(\d+)$/);
  return m ? gitaLocales(Number(m[1])) : undefined;
};
const localesFor = (route: string): readonly string[] =>
  ENGLISH_ONLY.has(route) ? ["en"] : gitaRoute(route) ?? LOCALES;

/**
 * <lastmod> dates. Bing in particular uses them to decide what to recrawl, and Google uses them when they
 * are accurate, so only bump a date when that page's content really changes.
 * SITE_UPDATED covers pages without a more specific date (it changes when the shared layout or menu does).
 */
const SITE_UPDATED = "2026-11-21";
const GITA_UPDATED = "2026-11-21"; // all 18 chapters translated into Japanese and Spanish
const ARTICLE_UPDATED = new Map(learnArticles.map((a) => [`/learn/${a.slug}`, a.updated]));
const lastmodFor = (route: string) =>
  route.startsWith("/modules/gita") ? GITA_UPDATED : ARTICLE_UPDATED.get(route) ?? SITE_UPDATED;

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
  .concat(GITA_AVAILABLE.map((n) => `/modules/gita/${adhyayaSlug(n)}`))
  .concat(PROBLEMS.map((p) => `/modules/gita/help/${p.slug}`))
  .concat(ALL_SHLOKA_REFS.map((ref) => `/modules/gita/shloka/${shlokaSlug(ref)}`))
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
    const locales = localesFor(route);
    const alternates = locales.length < 2
      ? ""
      : locales.map(
          (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}/${l}${route}"/>`
        ).join("\n") +
        `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/en${route}"/>`;
    for (const l of locales) {
      urls.push(
        `  <url>\n    <loc>${SITE}/${l}${route}</loc>\n${alternates ? alternates + "\n" : ""}    <lastmod>${lastmodFor(route)}</lastmod>\n    <priority>${priorityFor(route)}</priority>\n  </url>`
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
