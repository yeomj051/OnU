package com.ssafy.onu.repository;

import com.ssafy.onu.entity.Nutrient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NutrientRepository extends JpaRepository<Nutrient, Integer> {
    Nutrient findByNutrientId(Long nutrientId);
}
