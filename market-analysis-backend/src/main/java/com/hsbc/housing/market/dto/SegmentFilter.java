package com.hsbc.housing.market.dto;

public record SegmentFilter(
        Integer minSquareFootage,
        Integer maxSquareFootage,
        Integer minBedrooms,
        Integer maxBedrooms,
        Double minBathrooms,
        Double maxBathrooms,
        Integer minYearBuilt,
        Integer maxYearBuilt,
        Integer minLotSize,
        Integer maxLotSize,
        Double minSchoolRating,
        Double maxSchoolRating,
        Double minDistanceToCityCenter,
        Double maxDistanceToCityCenter,
        Double minPrice,
        Double maxPrice
) {
}
