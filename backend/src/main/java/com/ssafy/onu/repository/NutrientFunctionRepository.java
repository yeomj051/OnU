package com.ssafy.onu.repository;

import com.ssafy.onu.entity.InterestNutrient;
import com.ssafy.onu.entity.NutrientFunction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NutrientFunctionRepository extends JpaRepository<NutrientFunction, Integer> {
    List<NutrientFunction> findNutrientFuntionByFunctionId_FunctionId(int functionId);
}
