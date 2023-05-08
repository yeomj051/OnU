package com.ssafy.onu.service;


import com.ssafy.onu.dto.request.ReqReviewCreateFormDto;
import com.ssafy.onu.dto.response.ResponseReviewDto;
import com.ssafy.onu.entity.Nutrient;
import com.ssafy.onu.entity.Review;
import com.ssafy.onu.entity.User;
import com.ssafy.onu.repository.NutrientRepository;
import com.ssafy.onu.repository.ReviewRepository;
import com.ssafy.onu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final NutrientRepository nutrientRepository;

    public ResponseReviewDto createReview(ReqReviewCreateFormDto reqReviewCreateFormDto, int userId, Long nutrientId) {
        Optional<User> user = userRepository.findByUserId(userId);
        // 가입한 사람인지 확인
        if (!user.isPresent()) {
            return null;
        }
        Optional<Nutrient> nutrient = nutrientRepository.findByNutrientId(nutrientId);
        if (!nutrient.isPresent()) {
            return null;
        }
        // 이전에 리뷰를 작성했었는지 확인
        Optional<Review> review = reviewRepository.findByUserIdAndNutrientId(user.get(), nutrient.get());
        if (review.isPresent()) {
            return null;
        }
        return new ResponseReviewDto(reviewRepository.save(reqReviewCreateFormDto.toEntity(user.get(), nutrient.get())));
    }

    public List<ResponseReviewDto> getReviewListByNutrient(Long nutrientId) {
        List<ResponseReviewDto> ReviewByNutrient = reviewRepository.findByNutrientId_NutrientId(nutrientId).stream()
                .map(review -> new ResponseReviewDto(review)).collect(Collectors.toList());
        return ReviewByNutrient;
    }
}
