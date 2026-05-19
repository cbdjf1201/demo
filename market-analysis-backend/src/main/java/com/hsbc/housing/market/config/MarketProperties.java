package com.hsbc.housing.market.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "housing")
public record MarketProperties(
        String datasetPath,
        String modelApiBaseUrl
) {
}
