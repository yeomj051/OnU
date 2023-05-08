package com.ssafy.onu.dto.response;

import com.ssafy.onu.entity.NutrientIngredient;
import lombok.Getter;

@Getter
public class ResponseNutrientIngredientInfoDto {
    private String ingredientName;
    private String ingredientAmount;

    public ResponseNutrientIngredientInfoDto(NutrientIngredient nutrientIngredient) {
        this.ingredientName = nutrientIngredient.getIngredientId().getIngredientName();
        this.ingredientAmount = nutrientIngredient.getIngredientAmount();
    }

    public ResponseNutrientIngredientInfoDto(String ingredientName, String ingredientAmount) {
        this.ingredientName = ingredientName;
        this.ingredientAmount = ingredientAmount;
    }
}
