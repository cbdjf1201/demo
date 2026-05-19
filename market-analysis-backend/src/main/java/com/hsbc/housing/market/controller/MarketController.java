package com.hsbc.housing.market.controller;

import com.hsbc.housing.market.dto.HousingRecord;
import com.hsbc.housing.market.dto.MarketSummary;
import com.hsbc.housing.market.dto.SegmentFilter;
import com.hsbc.housing.market.dto.WhatIfRequest;
import com.hsbc.housing.market.dto.WhatIfResponse;
import com.hsbc.housing.market.service.ExportService;
import com.hsbc.housing.market.service.MarketAnalysisService;
import com.hsbc.housing.market.service.WhatIfService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 市场分析 REST API：汇总统计、分段查询、What-If 及带筛选条件的导出。
 */
@RestController
@RequestMapping("/api/market/v1")
public class MarketController {
    private final MarketAnalysisService marketAnalysisService;
    private final WhatIfService whatIfService;
    private final ExportService exportService;

    public MarketController(
            MarketAnalysisService marketAnalysisService,
            WhatIfService whatIfService,
            ExportService exportService
    ) {
        this.marketAnalysisService = marketAnalysisService;
        this.whatIfService = whatIfService;
        this.exportService = exportService;
    }

    /** 全量数据集的聚合指标（条数、均价、中位价等）。 */
    @GetMapping("/summary")
    public MarketSummary summary() {
        return marketAnalysisService.summary();
    }

    /** 按查询参数区间筛选房源；未传的参数表示该维度不设上下界。 */
    @GetMapping("/segments")
    public List<HousingRecord> segments(
            @RequestParam(required = false) Integer minSquareFootage,
            @RequestParam(required = false) Integer maxSquareFootage,
            @RequestParam(required = false) Integer minBedrooms,
            @RequestParam(required = false) Integer maxBedrooms,
            @RequestParam(required = false) Double minBathrooms,
            @RequestParam(required = false) Double maxBathrooms,
            @RequestParam(required = false) Integer minYearBuilt,
            @RequestParam(required = false) Integer maxYearBuilt,
            @RequestParam(required = false) Integer minLotSize,
            @RequestParam(required = false) Integer maxLotSize,
            @RequestParam(required = false) Double minSchoolRating,
            @RequestParam(required = false) Double maxSchoolRating,
            @RequestParam(required = false) Double minDistanceToCityCenter,
            @RequestParam(required = false) Double maxDistanceToCityCenter,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice
    ) {
        return marketAnalysisService.segments(toFilter(
                minSquareFootage,
                maxSquareFootage,
                minBedrooms,
                maxBedrooms,
                minBathrooms,
                maxBathrooms,
                minYearBuilt,
                maxYearBuilt,
                minLotSize,
                maxLotSize,
                minSchoolRating,
                maxSchoolRating,
                minDistanceToCityCenter,
                maxDistanceToCityCenter,
                minPrice,
                maxPrice
        ));
    }

    /** 对 baseline 与 scenario 两套特征分别调用模型 API，返回预测价及差额。 */
    @PostMapping("/what-if")
    public WhatIfResponse whatIf(@Valid @RequestBody WhatIfRequest request) {
        return whatIfService.analyze(request);
    }

    @GetMapping("/exports/market.csv")
    public ResponseEntity<byte[]> csv(
            @RequestParam(required = false) Integer minSquareFootage,
            @RequestParam(required = false) Integer maxSquareFootage,
            @RequestParam(required = false) Integer minBedrooms,
            @RequestParam(required = false) Integer maxBedrooms,
            @RequestParam(required = false) Double minBathrooms,
            @RequestParam(required = false) Double maxBathrooms,
            @RequestParam(required = false) Integer minYearBuilt,
            @RequestParam(required = false) Integer maxYearBuilt,
            @RequestParam(required = false) Integer minLotSize,
            @RequestParam(required = false) Integer maxLotSize,
            @RequestParam(required = false) Double minSchoolRating,
            @RequestParam(required = false) Double maxSchoolRating,
            @RequestParam(required = false) Double minDistanceToCityCenter,
            @RequestParam(required = false) Double maxDistanceToCityCenter,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice
    ) {
        SegmentFilter filter = toFilter(
                minSquareFootage,
                maxSquareFootage,
                minBedrooms,
                maxBedrooms,
                minBathrooms,
                maxBathrooms,
                minYearBuilt,
                maxYearBuilt,
                minLotSize,
                maxLotSize,
                minSchoolRating,
                maxSchoolRating,
                minDistanceToCityCenter,
                maxDistanceToCityCenter,
                minPrice,
                maxPrice
        );
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("text/csv"))
                .header(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment()
                        .filename("market-analysis.csv")
                        .build()
                        .toString())
                .body(exportService.csv(marketAnalysisService.segments(filter)));
    }

    @GetMapping("/exports/market.pdf")
    public ResponseEntity<byte[]> pdf(
            @RequestParam(required = false) Integer minSquareFootage,
            @RequestParam(required = false) Integer maxSquareFootage,
            @RequestParam(required = false) Integer minBedrooms,
            @RequestParam(required = false) Integer maxBedrooms,
            @RequestParam(required = false) Double minBathrooms,
            @RequestParam(required = false) Double maxBathrooms,
            @RequestParam(required = false) Integer minYearBuilt,
            @RequestParam(required = false) Integer maxYearBuilt,
            @RequestParam(required = false) Integer minLotSize,
            @RequestParam(required = false) Integer maxLotSize,
            @RequestParam(required = false) Double minSchoolRating,
            @RequestParam(required = false) Double maxSchoolRating,
            @RequestParam(required = false) Double minDistanceToCityCenter,
            @RequestParam(required = false) Double maxDistanceToCityCenter,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice
    ) {
        SegmentFilter filter = toFilter(
                minSquareFootage,
                maxSquareFootage,
                minBedrooms,
                maxBedrooms,
                minBathrooms,
                maxBathrooms,
                minYearBuilt,
                maxYearBuilt,
                minLotSize,
                maxLotSize,
                minSchoolRating,
                maxSchoolRating,
                minDistanceToCityCenter,
                maxDistanceToCityCenter,
                minPrice,
                maxPrice
        );
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment()
                        .filename("market-analysis.pdf")
                        .build()
                        .toString())
                .body(exportService.pdf(marketAnalysisService.segments(filter)));
    }

    /** 将 HTTP 查询参数组装为 {@link SegmentFilter}，供筛选与导出共用。 */
    private SegmentFilter toFilter(
            Integer minSquareFootage,
            Integer maxSquareFootage,
            Integer minBedrooms,
            Integer maxBedrooms,
            Double minBathrooms,
            Double maxBathrooms,
            Integer minYearBuilt,
            Integer maxYearBuilt,
            Integer minLotSize,
            Integer maxLotSize,
            Double minSchoolRating,
            Double maxSchoolRating,
            Double minDistanceToCityCenter,
            Double maxDistanceToCityCenter,
            Double minPrice,
            Double maxPrice
    ) {
        return new SegmentFilter(
                minSquareFootage,
                maxSquareFootage,
                minBedrooms,
                maxBedrooms,
                minBathrooms,
                maxBathrooms,
                minYearBuilt,
                maxYearBuilt,
                minLotSize,
                maxLotSize,
                minSchoolRating,
                maxSchoolRating,
                minDistanceToCityCenter,
                maxDistanceToCityCenter,
                minPrice,
                maxPrice
        );
    }
}
