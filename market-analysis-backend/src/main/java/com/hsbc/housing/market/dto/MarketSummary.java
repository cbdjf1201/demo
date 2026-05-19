package com.hsbc.housing.market.dto;

public record MarketSummary(
        int recordCount,
        double averagePrice,
        double medianPrice,
        double averageSquareFootage,
        double averageSchoolRating,
        double minPrice,
        double maxPrice
) {
}
