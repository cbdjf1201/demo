package com.hsbc.housing.market.dto;

/** 单条房源记录，与 CSV 数据集及 API 响应字段一一对应。 */
public record HousingRecord(
        /** 数据集中的房源唯一标识。 */
        long id,
        /** 房屋建筑面积，单位为平方英尺。 */
        double squareFootage,
        /** 卧室数量。 */
        int bedrooms,
        /** 卫生间数量。 */
        double bathrooms,
        /** 房屋建造年份。 */
        int yearBuilt,
        /** 地块面积，单位为平方英尺。 */
        double lotSize,
        /** 距离城市中心的距离。 */
        double distanceToCityCenter,
        /** 学区评分。 */
        double schoolRating,
        /** 数据集中的实际房价。 */
        double price
) {
}
