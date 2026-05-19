package com.hsbc.housing.market;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

/**
 * 房产市场分析服务入口。提供全量汇总、分段筛选、What-If 对比及 CSV/PDF 导出。
 * 默认端口 8082，依赖本地 CSV 数据集与 FastAPI 模型服务。
 */
@EnableCaching
@SpringBootApplication
public class MarketAnalysisApplication {
    public static void main(String[] args) {
        SpringApplication.run(MarketAnalysisApplication.class, args);
    }
}
