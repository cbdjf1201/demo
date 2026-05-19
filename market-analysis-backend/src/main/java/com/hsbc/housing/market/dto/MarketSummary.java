package com.hsbc.housing.market.dto;

/** 全量或筛选后数据集的价格与规模汇总指标。 */
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
