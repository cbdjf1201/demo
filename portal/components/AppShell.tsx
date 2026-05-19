"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { resolveLanguage, ui } from "@/lib/i18n";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = resolveLanguage(searchParams.get("lang") ?? undefined);
  const strings = ui[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function withLang(path: string, nextLang = lang) {
    const [base, query = ""] = path.split("?");
    const params = new URLSearchParams(query);
    params.set("lang", nextLang);
    return `${base}?${params.toString()}`;
  }

  function switchLanguageHref() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", lang === "en" ? "zh" : "en");
    return `${pathname}?${params.toString()}`;
  }

  return (
    <div className="shell">
      <header className="topbar">
        <Link href={withLang("/")} className="brand">
          <strong>{strings.brand.title}</strong>
          <span>{strings.brand.subtitle}</span>
        </Link>
        <nav className="nav" aria-label="Main navigation">
          <Link href={withLang("/estimator")}>{strings.nav.estimator}</Link>
          <Link href={withLang("/market-analysis")}>{strings.nav.market}</Link>
          <Link href={switchLanguageHref()}>{strings.nav.switchTo}</Link>
        </nav>
      </header>
      <main className="main">{children}</main>
    </div>
  );
}
