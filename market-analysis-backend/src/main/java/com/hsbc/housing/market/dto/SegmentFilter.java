package com.hsbc.housing.market.dto;

/**
 * 分段筛选条件；各字段为 {@code null} 时表示该维度不限制。
 */
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
