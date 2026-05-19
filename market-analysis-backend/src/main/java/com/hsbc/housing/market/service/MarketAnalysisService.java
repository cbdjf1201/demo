package com.hsbc.housing.market.service;

import com.hsbc.housing.market.dto.HousingRecord;
import com.hsbc.housing.market.dto.MarketSummary;
import com.hsbc.housing.market.dto.SegmentFilter;
import java.util.Comparator;
import java.util.List;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class MarketAnalysisService {
    private final DatasetService datasetService;

    public MarketAnalysisService(DatasetService datasetService) {
        this.datasetService = datasetService;
    }

    @Cacheable("marketSummary")
    public MarketSummary summary() {
        return summarize(datasetService.records());
    }

    @Cacheable("marketSegments")
    public List<HousingRecord> segments(SegmentFilter filter) {
        return datasetService.records().stream()
                .filter(record -> filter.minSquareFootage() == null || record.squareFootage() >= filter.minSquareFootage())
                .filter(record -> filter.maxSquareFootage() == null || record.squareFootage() <= filter.maxSquareFootage())
                .filter(record -> filter.minBedrooms() == null || record.bedrooms() >= filter.minBedrooms())
                .filter(record -> filter.maxBedrooms() == null || record.bedrooms() <= filter.maxBedrooms())
                .filter(record -> filter.minBathrooms() == null || record.bathrooms() >= filter.minBathrooms())
                .filter(record -> filter.maxBathrooms() == null || record.bathrooms() <= filter.maxBathrooms())
                .filter(record -> filter.minYearBuilt() == null || record.yearBuilt() >= filter.minYearBuilt())
                .filter(record -> filter.maxYearBuilt() == null || record.yearBuilt() <= filter.maxYearBuilt())
                .filter(record -> filter.minLotSize() == null || record.lotSize() >= filter.minLotSize())
                .filter(record -> filter.maxLotSize() == null || record.lotSize() <= filter.maxLotSize())
                .filter(record -> filter.minSchoolRating() == null || record.schoolRating() >= filter.minSchoolRating())
                .filter(record -> filter.maxSchoolRating() == null || record.schoolRating() <= filter.maxSchoolRating())
                .filter(record -> filter.minDistanceToCityCenter() == null || record.distanceToCityCenter() >= filter.minDistanceToCityCenter())
                .filter(record -> filter.maxDistanceToCityCenter() == null || record.distanceToCityCenter() <= filter.maxDistanceToCityCenter())
                .filter(record -> filter.minPrice() == null || record.price() >= filter.minPrice())
                .filter(record -> filter.maxPrice() == null || record.price() <= filter.maxPrice())
                .toList();
    }

    private MarketSummary summarize(List<HousingRecord> records) {
        List<Double> prices = records.stream().map(HousingRecord::price).sorted().toList();
        double median = prices.size() % 2 == 0
                ? (prices.get(prices.size() / 2 - 1) + prices.get(prices.size() / 2)) / 2
                : prices.get(prices.size() / 2);

        return new MarketSummary(
                records.size(),
                round(records.stream().mapToDouble(HousingRecord::price).average().orElse(0)),
                round(median),
                round(records.stream().mapToDouble(HousingRecord::squareFootage).average().orElse(0)),
                round(records.stream().mapToDouble(HousingRecord::schoolRating).average().orElse(0)),
                round(records.stream().min(Comparator.comparing(HousingRecord::price)).map(HousingRecord::price).orElse(0.0)),
                round(records.stream().max(Comparator.comparing(HousingRecord::price)).map(HousingRecord::price).orElse(0.0))
        );
    }

    private double round(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}
