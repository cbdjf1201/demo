package com.hsbc.housing.market.dto;

/** What-If 结果：两次预测价、差额及货币单位。 */
public record WhatIfResponse(
        /** 基准房源预测价格。 */
        double baselinePrediction,
        /** 假设情景房源预测价格。 */
        double scenarioPrediction,
        /** 情景预测价相对基准预测价的差额。 */
        double delta,
        /** 预测价格使用的货币单位。 */
        String currency
) {
}
