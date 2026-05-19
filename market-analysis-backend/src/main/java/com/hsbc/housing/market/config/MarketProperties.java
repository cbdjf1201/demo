package com.hsbc.housing.market.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/** 绑定 application.yml 中 {@code housing.*}：数据集路径与模型 API 地址。 */
@ConfigurationProperties(prefix = "housing")
public record MarketProperties(
        String datasetPath,
        String modelApiBaseUrl
) {
}
