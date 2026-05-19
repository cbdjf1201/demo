package com.hsbc.housing.market.service;

import com.hsbc.housing.market.config.MarketProperties;
import com.hsbc.housing.market.dto.HousingRecord;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * 启动时从 CSV 加载房源数据并常驻内存；列顺序须与 {@link #parse} 一致。
 */
@Service
public class DatasetService {
    private final List<HousingRecord> records;

    public DatasetService(MarketProperties properties) throws IOException {
        Path datasetPath = Path.of(properties.datasetPath()).normalize();
        // 跳过表头行，空行忽略
        this.records = Files.readAllLines(datasetPath).stream()
                .skip(1)
                .filter(line -> !line.isBlank())
                .map(this::parse)
                .toList();
    }

    public List<HousingRecord> records() {
        return records;
    }

    /**
     * CSV 列序：id, square_footage, bedrooms, bathrooms, year_built,
     * lot_size, distance_to_city_center, school_rating, price
     */
    private HousingRecord parse(String line) {
        String[] columns = line.split(",");
        return new HousingRecord(
                Long.parseLong(columns[0]),
                Double.parseDouble(columns[1]),
                Integer.parseInt(columns[2]),
                Double.parseDouble(columns[3]),
                Integer.parseInt(columns[4]),
                Double.parseDouble(columns[5]),
                Double.parseDouble(columns[6]),
                Double.parseDouble(columns[7]),
                Double.parseDouble(columns[8])
        );
    }
}
