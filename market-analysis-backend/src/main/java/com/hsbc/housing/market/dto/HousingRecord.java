package com.hsbc.housing.market.dto;

/** 单条房源记录，与 CSV 数据集及 API 响应字段一一对应。 */
public record HousingRecord(
        long id,
        double squareFootage,
        int bedrooms,
        double bathrooms,
        int yearBuilt,
        double lotSize,
        double distanceToCityCenter,
        double schoolRating,
        double price
) {
}
