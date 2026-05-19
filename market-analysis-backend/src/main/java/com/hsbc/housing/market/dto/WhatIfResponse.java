package com.hsbc.housing.market.dto;

/** What-If 结果：两次预测价、差额及货币单位。 */
public record WhatIfResponse(
        double baselinePrediction,
        double scenarioPrediction,
        double delta,
        String currency
) {
}
