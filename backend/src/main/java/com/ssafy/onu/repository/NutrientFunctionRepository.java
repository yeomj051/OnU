package com.ssafy.onu.repository;

import com.ssafy.onu.entity.NutrientFunction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NutrientFunctionRepository extends JpaRepository<NutrientFunction, Integer> {
    List<NutrientFunction> findByFunctionalityId(int functionId);
}
