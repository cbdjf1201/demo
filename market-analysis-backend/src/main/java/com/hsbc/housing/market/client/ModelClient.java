package com.hsbc.housing.market.client;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hsbc.housing.market.config.MarketProperties;
import com.hsbc.housing.market.dto.PropertyFeatures;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;
import org.springframework.stereotype.Component;

/**
 * 调用 FastAPI 模型服务的 {@code POST /predict}，将 Java 驼峰字段转为 snake_case JSON。
 */
@Component
public class ModelClient {
    private static final TypeReference<Map<String, Object>> MODEL_RESPONSE = new TypeReference<>() {
    };

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;
    private final String modelApiBaseUrl;

    public ModelClient(MarketProperties properties, ObjectMapper objectMapper) {
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = objectMapper;
        this.modelApiBaseUrl = properties.modelApiBaseUrl();
    }

    public double predict(PropertyFeatures features) {
        String payload = toJson(toModelPayload(features));
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(modelApiBaseUrl + "/predict"))
                .version(HttpClient.Version.HTTP_1_1)
                .header("Content-Type", "application/json")
                .header("Accept", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(payload))
                .build();

        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 400) {
                throw new IllegalStateException("Model API request failed: " + response.statusCode()
                        + " payload=" + payload
                        + " response=" + response.body());
            }

            Map<String, Object> body = objectMapper.readValue(response.body(), MODEL_RESPONSE);
            Object prediction = body.get("predicted_price");
            if (!(prediction instanceof Number number)) {
                throw new IllegalStateException("Model API did not return predicted_price");
            }
            return number.doubleValue();
        } catch (IOException exception) {
            throw new IllegalStateException("Unable to call model API", exception);
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Model API call was interrupted", exception);
        }
    }

    /** 字段名须与 model-api 的 Pydantic 模型一致。 */
    private Map<String, Object> toModelPayload(PropertyFeatures features) {
        return Map.of(
                "square_footage", features.squareFootage(),
                "bedrooms", features.bedrooms(),
                "bathrooms", features.bathrooms(),
                "year_built", features.yearBuilt(),
                "lot_size", features.lotSize(),
                "distance_to_city_center", features.distanceToCityCenter(),
                "school_rating", features.schoolRating()
        );
    }

    private String toJson(Map<String, Object> payload) {
        try {
            return objectMapper.writeValueAsString(payload);
        } catch (JsonProcessingException exception) {
            throw new IllegalStateException("Unable to serialize model request", exception);
        }
    }
}
