package com.ssafy.onu.controller;

import com.ssafy.onu.dto.request.ReqReviewCreateFormDto;
import com.ssafy.onu.dto.response.ResponseReviewDto;
import com.ssafy.onu.entity.Review;
import com.ssafy.onu.service.ReviewService;
import com.ssafy.onu.util.TokenUtils;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/nutrient")
@RequiredArgsConstructor
public class NutrientController {

    private static final String MESSAGE = "message";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final ReviewService reviewService;

    @ApiOperation(value = "제품 리뷰 등록", notes = "해당 영양제 제품에 대한 리뷰를 등록한다.", response = Map.class)
    @PostMapping("/{nutrientId}/{userId}")
//    @PostMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> createReview(@PathVariable @ApiParam(value = "회원 아이디", required = true, example = "0") int userId, Principal principal,
                                                            @PathVariable @ApiParam(value = "영양제 아이디", required = true, example = "0") Long nutrientId,
                                                            @RequestBody ReqReviewCreateFormDto reqReviewCreateFormDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        // PathVariable로 받은 userId와 토큰에 있는 userId 비교
        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        ResponseReviewDto responseReviewDto = reviewService.createReview(reqReviewCreateFormDto, userId, nutrientId);

        if (responseReviewDto != null) {
            resultMap.put(MESSAGE, SUCCESS);
            resultMap.put("createReview", responseReviewDto);
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } else {
            resultMap.put(MESSAGE, FAIL);
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }
}
