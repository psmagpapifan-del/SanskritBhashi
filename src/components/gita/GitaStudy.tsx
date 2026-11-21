import React, { useEffect, useMemo, useState } from "react";
import { BookOpen, Brain, Eye, Lightbulb, MessageCircleQuestion, RotateCcw } from "lucide-react";
import TopicQuiz from "../TopicQuiz";
import { GITA_LEVELS, shlokasFor, toQuizTopics, type GitaLang, type GitaLevel, type LocalAdhyaya, type LocalShloka } from "../../lib/gita/index";
import { gitaPageText, type GitaText } from "../../lib/gitaPageText";
import { renderSanskrit, sanskritLang } from "../../lib/transliterate";
import { useScript } from "../../lib/useScript";

const LEVEL_KEY = "sb_gita_level";

function isLevel(v: unknown): v is GitaLevel {
  return v === 1 || v === 2 || v === 3;
}

/** Level from ?level=, then the saved choice, else Classes 6–8. */
function initialLevel(): GitaLevel {
  if (typeof window === "undefined") return 1;
  const fromUrl = Number(new URLSearchParams(window.location.search).get("level"));
  if (isLevel(fromUrl)) return fromUrl;
  try {
    const saved = Number(localStorage.getItem(LEVEL_KEY));
    if (isLevel(saved)) return saved;
  } catch {
    /* storage unavailable */
  }
  return 1;
}

/**
 * Study view for one adhyaya: level tabs, shloka cards (text, transliteration, word
 * meanings, meaning, a situation from school life, a reflection question, memorise mode)
 * and a quiz on the chosen level's shlokas. The page passes the chapter already in one
 * language (see localizeAdhyaya), so each page ships one chapter in one language.
 */
export default function GitaStudy({ adhyaya, activeLang = "en" }: { adhyaya: LocalAdhyaya; activeLang?: string }) {
  const lang = adhyaya.lang;
  const t = gitaPageText(lang);
  const [level, setLevel] = useState<GitaLevel>(1);

  useEffect(() => setLevel(initialLevel()), []);

  const choose = (l: GitaLevel) => {
    setLevel(l);
    try {
      localStorage.setItem(LEVEL_KEY, String(l));
    } catch {
      /* ignore */
    }
    const url = new URL(window.location.href);
    url.searchParams.set("level", String(l));
    url.searchParams.delete("topic");
    window.history.replaceState({}, "", url.toString());
  };

  const shlokas = shlokasFor(adhyaya, level);
  const topics = useMemo(() => toQuizTopics(adhyaya, level), [adhyaya, level]);

  return (
    <div className="space-y-6">
      <div role="group" aria-label={t.chooseLevel} className="flex flex-wrap gap-2" data-testid="gita-levels">
        {GITA_LEVELS.map((l) => (
          <button
            key={l}
            type="button"
            data-level={l}
            aria-pressed={l === level}
            onClick={() => choose(l)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold font-latin border-2 transition-colors cursor-pointer text-left ${
              l === level
                ? "bg-brand-500 text-on-brand border-brand-500"
                : "bg-white dark:bg-zinc-900 text-charcoal border-brand-100 dark:border-zinc-700 hover:border-brand-500"
            }`}
          >
            {t.levelNames[l]}
          </button>
        ))}
      </div>
      <p className="text-sm text-charcoal/80 font-latin" data-testid="gita-level-hint">{t.levelHint[level]}</p>

      <section aria-label={t.shlokas} className="space-y-6">
        {shlokas.map((s) => (
          <ShlokaCard key={`${s.ref}-${level}`} s={s} lang={lang} t={t} pageLang={activeLang} />
        ))}
      </section>

      <section aria-labelledby="gita-quiz-heading" className="space-y-3">
        <h2 id="gita-quiz-heading" className="text-xl font-bold text-charcoal font-latin">{t.quizTitle}</h2>
        <TopicQuiz
          key={level}
          topics={topics}
          storeKey="sb_gita_v1"
          cardId="gita-quiz-card"
          listTitle={t.quizList}
          activeLang={activeLang}
          transliterateText={lang !== "hi"}
        />
      </section>
    </div>
  );
}

function ShlokaCard({ s, lang, t, pageLang }: { s: LocalShloka; lang: GitaLang; t: GitaText; pageLang: string }) {
  const script = useScript();
  const lines = s.text.split("\n");
  const [memorising, setMemorising] = useState(false);
  const [shown, setShown] = useState(lines.length);
  const visible = memorising ? shown : lines.length;
  const id = `shloka-${s.ref.replace(".", "-")}`;

  const startMemorise = () => {
    setMemorising(true);
    setShown(0);
  };

  return (
    <article id={id} data-shloka={s.ref} aria-labelledby={`${id}-ref`} className="bg-white dark:bg-zinc-900 border border-brand-100 dark:border-zinc-800 rounded-3xl p-5 md:p-7 space-y-5 shadow-xs">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 id={`${id}-ref`} className="text-xs font-black uppercase tracking-widest text-brand-600 font-latin">
          {/* Shloka pages exist on the website only (not in the app bundle). */}
          {String(import.meta.env.CAPACITOR_BUILD) === "true" ? <>{t.shloka} {s.ref}</> : <a href={`/${pageLang}/modules/gita/shloka/${s.ref.replace(".", "-")}`} className="hover:underline">{t.shloka} {s.ref}</a>}
          {s.altRef && <span className="ml-2 normal-case tracking-normal font-semibold text-charcoal/70">({t.otherEdition(s.altRef)})</span>}
        </h3>
        <span lang="sa" className="text-sm font-sanskrit text-charcoal/70">{s.speaker}</span>
      </header>

      <blockquote className="bg-brand-50/60 dark:bg-zinc-800 border-l-4 border-brand-500 rounded-r-2xl px-4 py-4 text-center space-y-1" data-testid="shloka-text">
        {lines.map((line, i) => (
          <div key={i} data-line={i} data-hidden={i >= visible ? "true" : undefined}>
            {i < visible ? (
              <>
                <p lang="sa" className="font-sanskrit text-lg md:text-xl font-bold text-charcoal leading-relaxed">{line}</p>
                {script !== "devanagari" && (
                  <p lang={sanskritLang(script)} className="text-sm italic font-semibold text-charcoal/75 font-latin">{renderSanskrit(line, script)}</p>
                )}
              </>
            ) : (
              <p className="py-2 text-charcoal/70 font-latin tracking-[0.4em]" aria-label={t.memoriseHint}>• • • • • •</p>
            )}
          </div>
        ))}
      </blockquote>

      <div className="flex flex-wrap items-center gap-2">
        {!memorising ? (
          <button type="button" onClick={startMemorise} data-testid="memorise" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 border-brand-500 text-brand-600 text-xs font-bold font-latin cursor-pointer hover:bg-brand-50 dark:hover:bg-zinc-800">
            <Brain className="w-4 h-4" aria-hidden="true" /> {t.memorise}
          </button>
        ) : (
          <>
            {shown < lines.length ? (
              <button type="button" onClick={() => setShown((n) => n + 1)} data-testid="reveal-next" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-500 text-on-brand text-xs font-bold font-latin cursor-pointer hover:brightness-110">
                <Eye className="w-4 h-4" aria-hidden="true" /> {t.revealNext}
              </button>
            ) : (
              <button type="button" onClick={() => setShown(0)} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 border-brand-500 text-brand-600 text-xs font-bold font-latin cursor-pointer">
                <RotateCcw className="w-4 h-4" aria-hidden="true" /> {t.startAgain}
              </button>
            )}
            <button type="button" onClick={() => setMemorising(false)} className="px-3.5 py-2 rounded-xl text-xs font-bold text-charcoal/80 font-latin cursor-pointer hover:bg-charcoal/5">
              {t.readMode}
            </button>
            <span className="text-xs text-charcoal/70 font-latin" aria-live="polite">{t.memoriseHint}</span>
          </>
        )}
      </div>

      <details className="group rounded-2xl border border-brand-100 dark:border-zinc-700 px-4 py-3">
        <summary className="cursor-pointer text-sm font-bold text-charcoal font-latin flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-brand-600" aria-hidden="true" /> {t.wordMeanings}
        </summary>
        <dl className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {s.words.map((w) => (
            <div key={w.sa} className="flex flex-wrap gap-x-2">
              <dt lang="sa" className="font-sanskrit font-semibold text-charcoal">
                {w.sa}
                {script !== "devanagari" && <span lang={sanskritLang(script)} className="ml-1 italic font-latin text-xs text-charcoal/70">({renderSanskrit(w.sa, script)})</span>}
              </dt>
              <dd lang={lang} className="text-charcoal/80 font-latin">— {w.gloss}</dd>
            </div>
          ))}
        </dl>
      </details>

      <div>
        <h4 className="text-sm font-black uppercase tracking-widest text-charcoal/70 font-latin">{t.meaning}</h4>
        <p lang={lang} className="mt-1 text-sm md:text-base text-charcoal leading-relaxed font-latin">{s.meaning}</p>
      </div>

      <div className="rounded-2xl bg-accent-50 dark:bg-zinc-800 border border-accent-500/30 p-4 space-y-2" data-testid="situation">
        <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-charcoal/80 font-latin">
          <Lightbulb className="w-4 h-4 text-brand-600" aria-hidden="true" /> {t.inYourLife}: <span className="normal-case tracking-normal">{s.situation.title}</span>
        </h4>
        <p lang={lang} className="text-sm md:text-base text-charcoal leading-relaxed font-latin">{s.situation.story}</p>
      </div>

      <p lang={lang} className="flex gap-2 text-sm text-charcoal/80 font-latin italic">
        <MessageCircleQuestion className="w-4 h-4 mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
        <span><strong className="not-italic">{t.thinkAbout}:</strong> {s.reflect}</span>
      </p>
    </article>
  );
}
