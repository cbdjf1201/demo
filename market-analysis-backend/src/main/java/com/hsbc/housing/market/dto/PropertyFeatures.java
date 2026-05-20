package com.hsbc.housing.market.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

/** 送入模型 API 的房产特征；约束与 FastAPI/Pydantic 校验对齐。 */
public record PropertyFeatures(
        /** 房屋建筑面积，单位为平方英尺。 */
        @NotNull @Positive Integer squareFootage,
        /** 卧室数量。 */
        @NotNull @Min(0) Integer bedrooms,
        /** 卫生间数量。 */
        @NotNull @DecimalMin("0.0") Double bathrooms,
        /** 房屋建造年份。 */
        @NotNull @Min(1800) @Max(2100) Integer yearBuilt,
        /** 地块面积，单位为平方英尺。 */
        @NotNull @Positive Integer lotSize,
        /** 距离城市中心的距离。 */
        @NotNull @DecimalMin("0.0") Double distanceToCityCenter,
        /** 学区评分，范围为 0 到 10。 */
        @NotNull @DecimalMin("0.0") @DecimalMax("10.0") Double schoolRating
) {
}
