package com.ssafy.onu.service;

import com.ssafy.onu.dto.request.ReqRecommendNutrientDto;
import com.ssafy.onu.dto.response.ResponseCombinationInfoDto;
import com.ssafy.onu.dto.response.ResponseCombinationNutrientInfoDto;
import com.ssafy.onu.dto.response.ResponseRecommendNutrientDto;
import com.ssafy.onu.entity.Nutrient;
import com.ssafy.onu.repository.NutrientFunctionRepository;
import com.ssafy.onu.repository.NutrientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendService {

    private final NutrientRepository nutrientRepository;
    private final NutrientFunctionRepository nutrientFunctionRepository;

    public List<ResponseRecommendNutrientDto> nutrientFiltering(ReqRecommendNutrientDto reqRecommendNutrientDto){
        boolean age = reqRecommendNutrientDto.getAge() > 12 ? true : false;
        List<Nutrient> temp = nutrientRepository.findByNutrientTypeId_NutrientTypeIdInAndNutrientChildAndNutrientPregnant(reqRecommendNutrientDto.getTypeList()
                , age, reqRecommendNutrientDto.getPregnant());
        List<ResponseRecommendNutrientDto> result = new LinkedList<>();
        temp.stream().map(nutrient -> new ResponseRecommendNutrientDto(nutrient)).collect(Collectors.toList());
        return result;
    }
//    public ResponseRecommendNutrientDto() {
//
//    }
}
