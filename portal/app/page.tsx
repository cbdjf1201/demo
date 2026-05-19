import Link from "next/link";

import { fetchMarketSummary } from "@/lib/api";
import { resolveLanguage, ui } from "@/lib/i18n";

type SearchParams = { lang?: string | string[] };

export default async function HomePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const summary = await fetchMarketSummary();
  const lang = resolveLanguage((await searchParams).lang);
  const strings = ui[lang];
  const withLang = (path: string) => {
    const [base, query = ""] = path.split("?");
    const params = new URLSearchParams(query);
    params.set("lang", lang);
    return `${base}?${params.toString()}`;
  };

  return (
    <>
      <section className="page-title home-hero">
        <div>
          <span className="eyebrow">Housing Intelligence Portal</span>
          <h1>{strings.home.title}</h1>
          <p>{strings.home.intro}</p>
        </div>
        <div className="hero-metric">
          <span>{strings.home.datasetLabel}</span>
          <strong>{summary?.recordCount ?? strings.home.datasetOffline}</strong>
        </div>
      </section>
      <section className="grid home-grid">
        <Link className="panel home-card span-6" href={withLang("/estimator")}>
          <span className="card-index">01</span>
          <h2>{strings.home.estimatorCardTitle}</h2>
          <p className="muted">{strings.home.estimatorCardBody}</p>
          <span className="card-arrow">Open estimator</span>
        </Link>
        <Link className="panel home-card span-6" href={withLang("/market-analysis")}>
          <span className="card-index">02</span>
          <h2>{strings.home.marketCardTitle}</h2>
          <p className="muted">{strings.home.marketCardBody}</p>
          <span className="card-arrow">Open market analysis</span>
        </Link>
        <div className="panel span-4 metric-card">
          <span>Model API</span>
          <strong>FastAPI</strong>
          <p className="muted">Prediction service</p>
        </div>
        <div className="panel span-4 metric-card">
          <span>Estimator</span>
          <strong>Python</strong>
          <p className="muted">History and comparison</p>
        </div>
        <div className="panel span-4 metric-card">
          <span>Market</span>
          <strong>Java</strong>
          <p className="muted">Filters, what-if, export</p>
        </div>
      </section>
    </>
  );
}
