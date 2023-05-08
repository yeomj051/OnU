package com.ssafy.onu.repository;

import com.ssafy.onu.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    Review findByReviewId(int reviewId);
}
