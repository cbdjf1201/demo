package com.hsbc.housing.market.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

/**
 * 分段筛选条件；各字段为 {@code null} 时表示该维度不限制。
 */
public record SegmentFilter(
        /** 最小房屋建筑面积。 */
        @Positive Integer minSquareFootage,
        /** 最大房屋建筑面积。 */
        @Positive Integer maxSquareFootage,
        /** 最小卧室数量。 */
        @PositiveOrZero Integer minBedrooms,
        /** 最大卧室数量。 */
        @PositiveOrZero Integer maxBedrooms,
        /** 最小卫生间数量。 */
        @PositiveOrZero Double minBathrooms,
        /** 最大卫生间数量。 */
        @PositiveOrZero Double maxBathrooms,
        /** 最早建造年份。 */
        @Min(1800) @Max(2100) Integer minYearBuilt,
        /** 最晚建造年份。 */
        @Min(1800) @Max(2100) Integer maxYearBuilt,
        /** 最小地块面积。 */
        @Positive Integer minLotSize,
        /** 最大地块面积。 */
        @Positive Integer maxLotSize,
        /** 最低学区评分。 */
        @DecimalMin("0.0") @DecimalMax("10.0") Double minSchoolRating,
        /** 最高学区评分。 */
        @DecimalMin("0.0") @DecimalMax("10.0") Double maxSchoolRating,
        /** 距离城市中心的最小距离。 */
        @PositiveOrZero Double minDistanceToCityCenter,
        /** 距离城市中心的最大距离。 */
        @PositiveOrZero Double maxDistanceToCityCenter,
        /** 最低房价。 */
        @PositiveOrZero Double minPrice,
        /** 最高房价。 */
        @PositiveOrZero Double maxPrice
) {
}
