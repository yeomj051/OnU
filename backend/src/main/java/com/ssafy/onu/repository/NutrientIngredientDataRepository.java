package com.ssafy.onu.repository;

import com.ssafy.onu.entity.NutrientIngredientData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NutrientIngredientDataRepository extends JpaRepository<NutrientIngredientData,Integer> {
    NutrientIngredientData findAllByPrdlstReportNo(long l);
}
