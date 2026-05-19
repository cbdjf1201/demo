package com.hsbc.housing.market.dto;

public record WhatIfResponse(
        double baselinePrediction,
        double scenarioPrediction,
        double delta,
        String currency
) {
}
