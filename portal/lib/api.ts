import type { EstimateResponse, HousingRecord, MarketSummary, PropertyFeatures } from "@/types/housing";

/** 估值后端（默认 8001）与市场分析后端（默认 8082）的 API 根路径。 */

export const estimatorApiBaseUrl =
  process.env.NEXT_PUBLIC_ESTIMATOR_API_BASE_URL ?? "http://localhost:8001/api/estimator/v1";

export const marketApiBaseUrl =
  process.env.NEXT_PUBLIC_MARKET_API_BASE_URL ?? "http://localhost:8082/api/market/v1";

/** SSR 时可指向容器内网地址，浏览器端仍用 NEXT_PUBLIC_*。 */
const serverMarketApiBaseUrl =
  process.env.MARKET_API_BASE_URL ?? marketApiBaseUrl;

export async function createEstimate(payload: PropertyFeatures): Promise<EstimateResponse> {
  const response = await fetch(`${estimatorApiBaseUrl}/estimates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Estimator request failed");
  return response.json();
}

export async function fetchHistory(): Promise<EstimateResponse[]> {
  const response = await fetch(`${estimatorApiBaseUrl}/estimates/history`, { cache: "no-store" });
  if (!response.ok) throw new Error("History request failed");
  const data = await response.json();
  return data.items;
}

export async function compareEstimates(items: PropertyFeatures[]): Promise<EstimateResponse[]> {
  const response = await fetch(`${estimatorApiBaseUrl}/estimates/compare`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  if (!response.ok) throw new Error("Comparison request failed");
  const data = await response.json();
  return data.items;
}

/** 市场汇总；后端不可用时返回 null，页面以占位符展示。 */
export async function fetchMarketSummary(): Promise<MarketSummary | null> {
  try {
    const baseUrl = typeof window === "undefined" ? serverMarketApiBaseUrl : marketApiBaseUrl;
    const response = await fetch(`${baseUrl}/summary`, { cache: "no-store" });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

export async function fetchSegments(query = ""): Promise<HousingRecord[]> {
  const response = await fetch(`${marketApiBaseUrl}/segments${query}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Market segment request failed");
  return response.json();
}
