package com.hsbc.housing.market.dto;

/** 全量或筛选后数据集的价格与规模汇总指标。 */
public record MarketSummary(
        /** 参与统计的房源记录总数。 */
        int recordCount,
        /** 平均房价。 */
        double averagePrice,
        /** 房价中位数。 */
        double medianPrice,
        /** 平均房屋建筑面积。 */
        double averageSquareFootage,
        /** 平均学区评分。 */
        double averageSchoolRating,
        /** 最低房价。 */
        double minPrice,
        /** 最高房价。 */
        double maxPrice
) {
}
