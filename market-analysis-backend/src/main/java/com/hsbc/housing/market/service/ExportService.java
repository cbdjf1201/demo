package com.hsbc.housing.market.service;

import com.hsbc.housing.market.dto.HousingRecord;
import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import java.io.ByteArrayOutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.List;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.stereotype.Service;

@Service
public class ExportService {
    public byte[] csv(List<HousingRecord> records) {
        try {
            ByteArrayOutputStream output = new ByteArrayOutputStream();
            try (CSVPrinter printer = new CSVPrinter(
                    new OutputStreamWriter(output, StandardCharsets.UTF_8),
                    CSVFormat.DEFAULT.builder()
                            .setHeader("id", "square_footage", "bedrooms", "bathrooms", "year_built", "lot_size", "distance_to_city_center", "school_rating", "price")
                            .build()
            )) {
                for (HousingRecord record : records) {
                    printer.printRecord(
                            record.id(),
                            record.squareFootage(),
                            record.bedrooms(),
                            record.bathrooms(),
                            record.yearBuilt(),
                            record.lotSize(),
                            record.distanceToCityCenter(),
                            record.schoolRating(),
                            record.price()
                    );
                }
            }
            return output.toByteArray();
        } catch (Exception exception) {
            throw new IllegalStateException("Failed to generate CSV export", exception);
        }
    }

    public byte[] pdf(List<HousingRecord> records) {
        try {
            ByteArrayOutputStream output = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, output);
            document.open();
            document.add(new Paragraph("Property Market Analysis Export"));

            PdfPTable table = new PdfPTable(5);
            table.addCell("ID");
            table.addCell("Sq Ft");
            table.addCell("Beds");
            table.addCell("School");
            table.addCell("Price");

            for (HousingRecord record : records) {
                table.addCell(String.valueOf(record.id()));
                table.addCell(String.valueOf(record.squareFootage()));
                table.addCell(String.valueOf(record.bedrooms()));
                table.addCell(String.valueOf(record.schoolRating()));
                table.addCell(String.valueOf(record.price()));
            }
            document.add(table);
            document.close();
            return output.toByteArray();
        } catch (Exception exception) {
            throw new IllegalStateException("Failed to generate PDF export", exception);
        }
    }
}
