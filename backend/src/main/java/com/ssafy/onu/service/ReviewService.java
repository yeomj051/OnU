package com.ssafy.onu.service;


import com.ssafy.onu.dto.request.ReqReviewCreateFormDto;
import com.ssafy.onu.dto.response.ResponseReviewDto;
import com.ssafy.onu.entity.Nutrient;
import com.ssafy.onu.entity.User;
import com.ssafy.onu.repository.NutrientRepository;
import com.ssafy.onu.repository.ReviewRepository;
import com.ssafy.onu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final NutrientRepository nutrientRepository;

    public ResponseReviewDto createReview(ReqReviewCreateFormDto reqReviewCreateFormDto, int userId, Long nutrientId) {
        Optional<User> user = userRepository.findByUserId(userId);
        if (!user.isPresent()) {
            return null;
        }
        Nutrient nutrient = nutrientRepository.findByNutrientId(nutrientId);
        if (nutrient == null) {
            return null;
        }
        return new ResponseReviewDto(reviewRepository.save(reqReviewCreateFormDto.toEntity(user.get(), nutrient)));
    }
}
