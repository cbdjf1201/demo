package com.hsbc.housing.market.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

/** What-If 请求体：基准房源与假设情景各一套特征。 */
public record WhatIfRequest(
        @Valid @NotNull PropertyFeatures baseline,
        @Valid @NotNull PropertyFeatures scenario
) {
}
