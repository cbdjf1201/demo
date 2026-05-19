"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { resolveLanguage, ui, type Language } from "@/lib/i18n";

export function useLanguage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = resolveLanguage(searchParams.get("lang") ?? undefined);
  const strings = ui[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function withLang(path: string, nextLang: Language = lang) {
    const [base, query = ""] = path.split("?");
    const params = new URLSearchParams(query);
    params.set("lang", nextLang);
    const suffix = params.toString();
    return suffix ? `${base}?${suffix}` : base;
  }

  function toggleLang() {
    return withLang(pathname, lang === "en" ? "zh" : "en");
  }

  function withView(path: string, nextLang: Language = lang, view?: string) {
    const base = withLang(path, nextLang);
    if (!view) {
      return base;
    }
    return `${base}&view=${view}`;
  }

  return { lang, strings, withLang, toggleLang, withView };
}
