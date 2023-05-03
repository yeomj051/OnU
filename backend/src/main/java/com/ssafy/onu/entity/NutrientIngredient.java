package com.ssafy.onu.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "nutrientIngredient")
public class NutrientIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int nutrientIngredientId;
    private Long nutrientId;
    private int ingredientId;
    private String ingredientAmount;

    @Builder
    public NutrientIngredient(Long nutrientId, String ingredientAmount) {
        this.nutrientId = nutrientId;
        this.ingredientAmount = ingredientAmount;
    }

    public NutrientIngredient(Long nutrientId, int ingredientId) {
        this.nutrientId = nutrientId;
        this.ingredientId = ingredientId;
    }

    public NutrientIngredient(Long nutrientId, int ingredientId, String ingredientAmount) {
        this.nutrientId = nutrientId;
        this.ingredientId = ingredientId;
        this.ingredientAmount = ingredientAmount;
    }

    public void updateIngredientId(int ingredientId){
        this.ingredientId = ingredientId;
    }
}
