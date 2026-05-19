package com.hsbc.housing.market.service;

import com.hsbc.housing.market.client.ModelClient;
import com.hsbc.housing.market.dto.WhatIfRequest;
import com.hsbc.housing.market.dto.WhatIfResponse;
import org.springframework.stereotype.Service;

/**
 * What-If 分析：分别对基准与情景特征调用模型，计算预测价差。
 */
@Service
public class WhatIfService {
    private final ModelClient modelClient;

    public WhatIfService(ModelClient modelClient) {
        this.modelClient = modelClient;
    }

    public WhatIfResponse analyze(WhatIfRequest request) {
        double baseline = modelClient.predict(request.baseline());
        double scenario = modelClient.predict(request.scenario());
        return new WhatIfResponse(
                round(baseline),
                round(scenario),
                round(scenario - baseline),
                "USD"
        );
    }

    private double round(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}
