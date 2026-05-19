import { EstimatorWorkbench } from "@/components/EstimatorWorkbench";
import { resolveLanguage, ui } from "@/lib/i18n";

type SearchParams = { lang?: string | string[] };

export default async function EstimatorPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const lang = resolveLanguage(params.lang);
  const strings = ui[lang];

  return (
    <>
      <section className="page-title">
        <h1>{strings.estimator.title}</h1>
        <p>{strings.estimator.intro}</p>
      </section>

      <EstimatorWorkbench />
    </>
  );
}
