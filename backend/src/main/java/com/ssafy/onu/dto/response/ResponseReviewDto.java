package com.ssafy.onu.dto.response;

import com.ssafy.onu.entity.Nutrient;
import com.ssafy.onu.entity.Review;
import com.ssafy.onu.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@NoArgsConstructor
public class ResponseReviewDto {

    private String userNickname;
    private String nutrientName;
    private String reviewContent;
    private int reviewScore;
    private LocalDateTime reviewCreateTime;
    private LocalDateTime reviewUpdateTime;

    public ResponseReviewDto(Review review) {
        System.out.println(review.getUserId() +""+ review.getNutrientId());
        this.userNickname = review.getUserId().getUserNickname();
        this.nutrientName = review.getNutrientId().getNutrientName();
        this.reviewContent = review.getReviewContent();
        this.reviewScore = review.getReviewScore();
        this.reviewCreateTime = review.getCreatedAt();
        this.reviewUpdateTime = review.getUpdatedAt();
    }

}
