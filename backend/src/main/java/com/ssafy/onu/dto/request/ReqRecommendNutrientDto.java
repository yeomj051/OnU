package com.ssafy.onu.dto.request;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
public class ReqRecommendNutrientDto {

    private int age;

    @NotBlank
    private String gender;

    @NotBlank
    private Boolean pregnant;

    private List<Integer> takingNutrientList;

    @NotBlank
    private List<Integer> functionList;

    @NotBlank
    private List<Integer> typeList;

}
