package com.ssafy.onu.dto.response;

import lombok.Getter;

@Getter
public class ResponseIngredientTotalDto {
    private String nutrientName;
    private Double nutrientAmount;

    public ResponseIngredientTotalDto(String nutrientName, Double nutrientAmount) {
        this.nutrientName = nutrientName;
        this.nutrientAmount = nutrientAmount;
    }
}
