package com.ssafy.onu.repository;

import com.ssafy.onu.entity.NutrientIngredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NutrientIngredientRepository extends JpaRepository<NutrientIngredient, Integer> {
    List<NutrientIngredient> findNutrientIngredientsByNutrientId(Long nutrientId);
}
