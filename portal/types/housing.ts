export type PropertyFeatures = {
  square_footage: number;
  bedrooms: number;
  bathrooms: number;
  year_built: number;
  lot_size: number;
  distance_to_city_center: number;
  school_rating: number;
};

export type EstimateResponse = {
  id: string;
  created_at?: string;
  input: PropertyFeatures;
  predicted_price: number;
  currency: string;
  chart?: { label: string; value: number }[];
};

export type MarketSummary = {
  recordCount: number;
  averagePrice: number;
  medianPrice: number;
  averageSquareFootage: number;
  averageSchoolRating: number;
  minPrice: number;
  maxPrice: number;
};

export type HousingRecord = {
  id: number;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  lotSize: number;
  distanceToCityCenter: number;
  schoolRating: number;
  price: number;
};
