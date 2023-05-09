package com.ssafy.onu.repository;

import com.ssafy.onu.entity.Nutrient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NutrientRepository extends JpaRepository<Nutrient, Integer> {
    Optional<Nutrient> findByNutrientId(Long nutrientId);
    List<Nutrient> findNutrientsByNutrientIdIn(List<Long> nutrientIds);
    List<Nutrient> findByNutrientTypeId_NutrientTypeIdInAndNutrientChildAndNutrientPregnant(List<Integer> typeId, boolean nutrientChild, boolean pregnant);
}
