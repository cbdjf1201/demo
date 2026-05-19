import { MarketDashboard } from "@/components/MarketDashboard";
import { fetchMarketSummary, fetchSegments } from "@/lib/api";
import { resolveLanguage, ui } from "@/lib/i18n";

type SearchParams = {
  lang?: string | string[];
  minSquareFootage?: string | string[];
  maxSquareFootage?: string | string[];
  minBedrooms?: string | string[];
  maxBedrooms?: string | string[];
  minBathrooms?: string | string[];
  maxBathrooms?: string | string[];
  minYearBuilt?: string | string[];
  maxYearBuilt?: string | string[];
  minLotSize?: string | string[];
  maxLotSize?: string | string[];
  minSchoolRating?: string | string[];
  maxSchoolRating?: string | string[];
  minDistance?: string | string[];
  maxDistance?: string | string[];
  minDistanceToCityCenter?: string | string[];
  maxDistanceToCityCenter?: string | string[];
  minPrice?: string | string[];
  maxPrice?: string | string[];
};

export default async function MarketAnalysisPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const lang = resolveLanguage(params.lang);
  const strings = ui[lang];
  const [summary, segments] = await Promise.all([fetchMarketSummary(), fetchSegments()]);
  const filters = parseFilters(params);
  const filteredSegments = segments.filter((record) => matchesFilters(record, filters));

  return (
    <>
      <section className="page-title">
        <h1>{strings.market.title}</h1>
        <p>{strings.market.intro}</p>
      </section>
      <MarketDashboard
        summary={summary}
        initialSegments={filteredSegments}
        totalSegments={segments}
        filters={filters}
      />
    </>
  );
}

function parseFilters(searchParams: SearchParams) {
  return {
    minSquareFootage: firstText(searchParams.minSquareFootage),
    maxSquareFootage: firstText(searchParams.maxSquareFootage),
    minBedrooms: firstText(searchParams.minBedrooms),
    maxBedrooms: firstText(searchParams.maxBedrooms),
    minBathrooms: firstText(searchParams.minBathrooms),
    maxBathrooms: firstText(searchParams.maxBathrooms),
    minYearBuilt: firstText(searchParams.minYearBuilt),
    maxYearBuilt: firstText(searchParams.maxYearBuilt),
    minLotSize: firstText(searchParams.minLotSize),
    maxLotSize: firstText(searchParams.maxLotSize),
    minSchoolRating: firstText(searchParams.minSchoolRating),
    maxSchoolRating: firstText(searchParams.maxSchoolRating),
    minDistance: firstText(searchParams.minDistance) || firstText(searchParams.minDistanceToCityCenter),
    maxDistance: firstText(searchParams.maxDistance) || firstText(searchParams.maxDistanceToCityCenter),
    minPrice: firstText(searchParams.minPrice),
    maxPrice: firstText(searchParams.maxPrice),
  };
}

function matchesFilters(record: {
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  lotSize: number;
  distanceToCityCenter: number;
  schoolRating: number;
  price: number;
}, filters: ReturnType<typeof parseFilters>) {
  if (between(record.squareFootage, filters.minSquareFootage, filters.maxSquareFootage)) return false;
  if (between(record.bedrooms, filters.minBedrooms, filters.maxBedrooms)) return false;
  if (between(record.bathrooms, filters.minBathrooms, filters.maxBathrooms)) return false;
  if (between(record.yearBuilt, filters.minYearBuilt, filters.maxYearBuilt)) return false;
  if (between(record.lotSize, filters.minLotSize, filters.maxLotSize)) return false;
  if (between(record.schoolRating, filters.minSchoolRating, filters.maxSchoolRating)) return false;
  if (between(record.distanceToCityCenter, filters.minDistance, filters.maxDistance)) return false;
  if (between(record.price, filters.minPrice, filters.maxPrice)) return false;
  return true;
}

function between(value: number, min?: string, max?: string) {
  const minValue = toNumber(min);
  const maxValue = toNumber(max);
  if (minValue !== null && value < minValue) return true;
  if (maxValue !== null && value > maxValue) return true;
  return false;
}

function firstText(value?: string | string[]) {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw ?? "";
}

function toNumber(value?: string) {
  if (!value || value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}
