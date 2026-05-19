package com.hsbc.housing.market.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record WhatIfRequest(
        @Valid @NotNull PropertyFeatures baseline,
        @Valid @NotNull PropertyFeatures scenario
) {
}
