package com.hsbc.housing.market.service;

import com.hsbc.housing.market.config.MarketProperties;
import com.hsbc.housing.market.dto.HousingRecord;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class DatasetService {
    private final List<HousingRecord> records;

    public DatasetService(MarketProperties properties) throws IOException {
        Path datasetPath = Path.of(properties.datasetPath()).normalize();
        this.records = Files.readAllLines(datasetPath).stream()
                .skip(1)
                .filter(line -> !line.isBlank())
                .map(this::parse)
                .toList();
    }

    public List<HousingRecord> records() {
        return records;
    }

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
