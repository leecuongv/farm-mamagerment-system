package com.farmmanagement.system.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "batches")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Batch {
    @Id
    private String id;
    private String farmId;
    private String batchCode;
    private BatchType type;
    private String description;
    private String source;
    private LocalDate entryDate;
    private List<String> relatedItemIds;

    public enum BatchType {
        ANIMAL, CROP, INVENTORY
    }
    
    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Batch id(String id) {
        setId(id);
        return this;
    }

    public String getFarmId() {
        return this.farmId;
    }

    public void setFarmId(String farmId) {
        this.farmId = farmId;
    }

    public Batch farmId(String farmId) {
        setFarmId(farmId);
        return this;
    }

    public String getBatchCode() {
        return this.batchCode;
    }

    public void setBatchCode(String batchCode) {
        this.batchCode = batchCode;
    }

    public Batch batchCode(String batchCode) {
        setBatchCode(batchCode);
        return this;
    }

    public BatchType getType() {
        return this.type;
    }

    public void setType(BatchType type) {
        this.type = type;
    }

    public Batch type(BatchType type) {
        setType(type);
        return this;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Batch description(String description) {
        setDescription(description);
        return this;
    }

    public String getSource() {
        return this.source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public Batch source(String source) {
        setSource(source);
        return this;
    }

    public LocalDate getEntryDate() {
        return this.entryDate;
    }

    public void setEntryDate(LocalDate entryDate) {
        this.entryDate = entryDate;
    }

    public Batch entryDate(LocalDate entryDate) {
        setEntryDate(entryDate);
        return this;
    }

    public List<String> getRelatedItemIds() {
        return this.relatedItemIds;
    }

    public void setRelatedItemIds(List<String> relatedItemIds) {
        this.relatedItemIds = relatedItemIds;
    }

    public Batch relatedItemIds(List<String> relatedItemIds) {
        setRelatedItemIds(relatedItemIds);
        return this;
    }
}