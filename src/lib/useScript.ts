import { useEffect, useState } from "react";
import { isScript, type Script } from "./transliterate";

const KEY = "transliteration_target";

/** The learner's chosen transliteration script (LanguageSelector writes it). */
export function readScript(): Script {
  try {
    const v = localStorage.getItem(KEY);
    return isScript(v) ? v : "iast";
  } catch {
    return "iast";
  }
}

/**
 * React hook: the current transliteration script, updated live when the
 * learner changes it in the language menu (same tab or another tab).
 */
export function useScript(): Script {
  const [script, setScript] = useState<Script>("iast");
  useEffect(() => {
    const sync = () => setScript(readScript());
    sync();
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) sync();
    };
    window.addEventListener("transliterationChange", sync);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("transliterationChange", sync);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  return script;
}
