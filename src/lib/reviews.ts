/**
 * Pages the site's founder has personally read and checked. Each entry shows a
 * "Reviewed by Prashant Solanki on <date>" line at the bottom of that page.
 *
 * Only add a page after the owner has actually reviewed it, with the real date.
 * Never add entries on the owner's behalf: an invented review is the kind of
 * claim the site removed in PR #38.
 *
 * Key: the page path as served, with the language, e.g. "/hi/modules/gita/shloka/2-47".
 */
export interface Review {
  /** YYYY-MM-DD, the day the owner reviewed the page. */
  date: string;
  /** Optional short note in the page's language, e.g. what was corrected or added. */
  note?: string;
}

export const REVIEWS: Record<string, Review> = {};

export const REVIEWER = { en: "Prashant Solanki", hi: "प्रशांत सोलंकी", ja: "Prashant Solanki", es: "Prashant Solanki" } as const;

export const reviewLabel = (lang: string, date: string): string => {
  const who = REVIEWER[(lang in REVIEWER ? lang : "en") as keyof typeof REVIEWER];
  const d = new Date(`${date}T00:00:00Z`).toLocaleDateString(lang === "en" ? "en-GB" : lang, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  if (lang === "hi") return `${who} द्वारा ${d} को समीक्षा की गई`;
  if (lang === "ja") return `${d}に${who}が内容を確認しました`;
  if (lang === "es") return `Revisado por ${who} el ${d}`;
  return `Reviewed by ${who} on ${d}`;
};
