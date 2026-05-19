package com.hsbc.housing.market.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record PropertyFeatures(
        @NotNull @Positive Integer squareFootage,
        @NotNull @Min(0) Integer bedrooms,
        @NotNull @DecimalMin("0.0") Double bathrooms,
        @NotNull @Min(1800) Integer yearBuilt,
        @NotNull @Positive Integer lotSize,
        @NotNull @DecimalMin("0.0") Double distanceToCityCenter,
        @NotNull @DecimalMin("0.0") @DecimalMax("10.0") Double schoolRating
) {
}
