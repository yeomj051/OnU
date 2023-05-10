package com.ssafy.onu.repository;

import com.ssafy.onu.entity.InterestNutrient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InterestNutrientRepository extends JpaRepository<InterestNutrient, Integer> {
    Optional<InterestNutrient> findByNutrient_NutrientIdAndUser_UserId(Long nutrientId, int userId);
}
