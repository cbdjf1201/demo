package com.hsbc.housing.market.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

/** What-If 请求体：基准房源与假设情景各一套特征。 */
public record WhatIfRequest(
        /** 用作对照的基准房源特征。 */
        @Valid @NotNull PropertyFeatures baseline,
        /** 调整后的假设情景房源特征。 */
        @Valid @NotNull PropertyFeatures scenario
) {
}
