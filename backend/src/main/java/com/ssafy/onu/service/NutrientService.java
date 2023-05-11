package com.ssafy.onu.service;

import com.ssafy.onu.dto.response.ResponseNutrientListDto;
import com.ssafy.onu.entity.InterestNutrient;
import com.ssafy.onu.entity.Nutrient;
import com.ssafy.onu.entity.NutrientFunction;
import com.ssafy.onu.entity.NutrientIngredient;
import com.ssafy.onu.repository.InterestNutrientRepository;
import com.ssafy.onu.repository.NutrientFunctionRepository;
import com.ssafy.onu.repository.NutrientIngredientRepository;
import com.ssafy.onu.repository.NutrientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NutrientService {
    private final NutrientRepository nutrientRepository;
    private final NutrientIngredientRepository nutrientIngredientRepository;
    private final InterestNutrientRepository interestNutrientRepository;
    private final NutrientFunctionRepository nutrientFunctionRepository;

    public List<ResponseNutrientListDto> getNutrientByIngredient(int ingredientId, int userId) {
        List<NutrientIngredient> nutrientIngredientList = nutrientIngredientRepository.findNutrientIngredientByIngredient_IngredientId(ingredientId);
        List<ResponseNutrientListDto> nutrientByIngreidientList = new ArrayList<>();

        List<InterestNutrient> interestNutrientList = new ArrayList<>();
        if(userId > 0) interestNutrientList = interestNutrientRepository.findByUser_UserId(userId);

        for (NutrientIngredient nutrientIngredient : nutrientIngredientList) {
            Optional<Nutrient> nutrientOptional = nutrientRepository.findByNutrientId(nutrientIngredient.getNutrient().getNutrientId());

            if(nutrientOptional.isPresent()){
                Nutrient nutrient = nutrientOptional.get();
                ResponseNutrientListDto nutrientByIngreidientDto = new ResponseNutrientListDto(nutrient.getNutrientId(),nutrient.getNutrientName(),nutrient.getNutrientImageUrl(),nutrient.getNutrientBrand());

                boolean isInterested = false;
                for (InterestNutrient interestNutrient : interestNutrientList) {
                    if(interestNutrient.getNutrient().getNutrientId() == nutrient.getNutrientId()) isInterested = true;
                }
                nutrientByIngreidientDto.setInterested(isInterested);

                nutrientByIngreidientList.add(nutrientByIngreidientDto);
            }

        }
        return nutrientByIngreidientList;
    }

    public List<ResponseNutrientListDto> getNutrientByFunction(int functionId, int userId) {
        List<NutrientFunction> nutrientFuntionList = nutrientFunctionRepository.findNutrientFuntionByFunction_FunctionId(functionId);
        List<ResponseNutrientListDto> nutrientByIngreidientList = new ArrayList<>();

        List<InterestNutrient> interestNutrientList = new ArrayList<>();
        if(userId > 0) interestNutrientList = interestNutrientRepository.findByUser_UserId(userId);

        for (NutrientFunction nutrientFunction : nutrientFuntionList) {

                Nutrient nutrient = nutrientFunction.getNutrient();
                ResponseNutrientListDto nutrientByIngreidientDto = new ResponseNutrientListDto(nutrient.getNutrientId(),nutrient.getNutrientName(),nutrient.getNutrientImageUrl(),nutrient.getNutrientBrand());

                boolean isInterested = false;
                for (InterestNutrient interestNutrient : interestNutrientList) {
                    if(interestNutrient.getNutrient().getNutrientId() == nutrient.getNutrientId()) isInterested = true;
                }
                nutrientByIngreidientDto.setInterested(isInterested);

                nutrientByIngreidientList.add(nutrientByIngreidientDto);


        }
        return nutrientByIngreidientList;
    }
}
