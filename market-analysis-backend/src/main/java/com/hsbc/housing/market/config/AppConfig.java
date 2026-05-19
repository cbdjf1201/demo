package com.hsbc.housing.market.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
@EnableConfigurationProperties(MarketProperties.class)
public class AppConfig {
    /** 预配置 RestClient，供后续扩展使用；当前预测走 {@link com.hsbc.housing.market.client.ModelClient}。 */
    @Bean
    RestClient modelRestClient(MarketProperties properties) {
        return RestClient.builder()
                .baseUrl(properties.modelApiBaseUrl())
                .build();
    }
}
