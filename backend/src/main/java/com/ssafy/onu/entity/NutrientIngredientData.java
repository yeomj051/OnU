package com.ssafy.onu.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "nutrientIngredientData")
public class NutrientIngredientData {
    @Id
    private Long prdlstReportNo;
    @Column(columnDefinition = "TEXT")
    private String prolstNm;
    @Column(columnDefinition = "TEXT")
    private String brand;
    @Column(columnDefinition = "TEXT")
    private String ingredient;
}
