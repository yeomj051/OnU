package com.ssafy.onu.controller;

import com.ssafy.onu.dto.*;
import com.ssafy.onu.dto.request.ReqCombinationDto;
import com.ssafy.onu.dto.request.ReqReviewCreateFormDto;
import com.ssafy.onu.dto.request.ReqUserInfoDto;
import com.ssafy.onu.dto.response.*;
import com.ssafy.onu.entity.*;
import com.ssafy.onu.service.InterestNutrientService;
import com.ssafy.onu.service.MypageService;
import com.ssafy.onu.util.TokenUtils;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class MypageController {

    private static final String MESSAGE = "message";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final MypageService mypageService;
    private final InterestNutrientService interestNutrientService;

    @ApiOperation(value = "마이페이지 회원 정보 조회", notes = "현재 로그인한 사용자의 회원 정보를 조회한다.", response = Map.class)
    @GetMapping("/{userId}")
    public ResponseEntity<Map<String,Object>> getUserInfo(@PathVariable @ApiParam(value = "회원 아이디", required = true, example = "0") int userId, Principal principal) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        // PathVariable로 받은 userId와 토큰에 있는 userId 비교
        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        ResponseUserInfoDto userInfo = mypageService.getUser(userId);

        if(userInfo != null) {
            resultMap.put(MESSAGE, SUCCESS);
            resultMap.put("userInfo", userInfo);
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } else {
            resultMap.put(MESSAGE, FAIL);
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "마이페이지 회원 정보 수정", notes = "현재 로그인한 사용자의 회원 정보를 수정한다.", response = Map.class)
    @PatchMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> updateUserInfo(@PathVariable @ApiParam(value = "회원 아이디", required = true, example = "0") int userId, Principal principal,
                                                              @ApiParam(value = "수정한 회원 정보(닉네임, 성별)") @RequestBody ReqUserInfoDto reqUserInfoDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        // PathVariable로 받은 userId와 토큰에 있는 userId 비교
        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        ResponseUserInfoDto afterUpdateUserInfo = mypageService.updateUserInfo(userId, reqUserInfoDto);

        if(afterUpdateUserInfo != null) {
            resultMap.put(MESSAGE, SUCCESS);
            resultMap.put("afterUpdateUserInfo", afterUpdateUserInfo);
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } else {
            resultMap.put(MESSAGE, FAIL);
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "복용 날짜 조회", notes = "현재 로그인한 사용자의 영양제 복용 날짜를 조회한다.", response = Map.class)
    @GetMapping("/{userId}/calendar")
    public ResponseEntity<Map<String, Object>> getCalenderDate(@PathVariable @ApiParam(value = "회원 아이디", required = true, example = "0") int userId, Principal principal,
                                                               @ApiParam(value = "연도 + 월 정보", required = true, example = "0") @RequestParam String date) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        // PathVariable로 받은 userId와 토큰에 있는 userId 비교
        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        ResponseTakingDateDto responseTakingDateDto = mypageService.getCheckedDate(userId, date);

        if (responseTakingDateDto != null) {
            resultMap.put(MESSAGE, SUCCESS);
            resultMap.put("checkedDate", responseTakingDateDto);
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } else {
            resultMap.put(MESSAGE, FAIL);
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "복용 체크", notes = "캘린더에 복용했음을 체크한다.", response = Map.class)
    @PostMapping("/{userId}/calendar")
    public ResponseEntity<Map<String,Object>> checkDate(@ApiParam(value = "회원정보(아이디)", required = true, example = "1") @PathVariable int userId,
                                                        Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        int continuousCount = mypageService.checkDate(userId);

        if(continuousCount != -1){
            resultMap.put(MESSAGE, SUCCESS);
            resultMap.put("continuousCount", continuousCount);
            status = HttpStatus.OK;
        } else {
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "내 리뷰 수정", notes = "사용자는 자신이 작성한 리뷰를 수정한다.", response = Map.class)
    @PatchMapping("/{userId}/review/{reviewId}")
    public ResponseEntity<Map<String, Object>> editReview(@PathVariable @ApiParam(value = "회원 아이디", required = true, example = "0") int userId, Principal principal,
                                                          @PathVariable @ApiParam(value = "리뷰 아이디", required = true, example = "0") int reviewId,
                                                          @RequestBody ReqReviewCreateFormDto reqReviewCreateFormDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        // PathVariable로 받은 userId와 토큰에 있는 userId 비교
        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        ResponseReviewDto responseReviewDto = mypageService.editReview(reqReviewCreateFormDto, reviewId);

        if (responseReviewDto != null) {
            resultMap.put(MESSAGE, SUCCESS);
            resultMap.put("editReview", responseReviewDto);
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } else {
            resultMap.put(MESSAGE, FAIL);
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "제품 리뷰 삭제", notes = "사용자는 자신이 등록한 리뷰를 삭제한다.", response = Map.class)
    @DeleteMapping("/{userId}/review/{reviewId}")
    public ResponseEntity<Map<String, Object>> deleteReview(@PathVariable @ApiParam(value = "회원 아이디", required = true, example = "0") int userId, Principal principal,
                                                            @PathVariable @ApiParam(value = "리뷰 아이디", required = true, example = "0") int reviewId) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        // PathVariable로 받은 userId와 토큰에 있는 userId 비교
        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        if (mypageService.deleteReview(reviewId)) {
            resultMap.put(MESSAGE, SUCCESS);
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } else {
            resultMap.put(MESSAGE, FAIL);
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "영양제 조합 등록", notes = "영양제 조합을 등록한다.", response = Map.class)
    @PostMapping("/{userId}/combination")
    public ResponseEntity<Map<String,Object>> createCombination(@ApiParam(value = "회원정보(아이디)", required = true, example = "1") @PathVariable int userId,
                                                                @ApiParam(value = "등록할 영양제 리스트(영양제 리스트)", required = true, example  = "홍동길") @Valid @RequestBody ReqCombinationDto reqCombinationDto, Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }
        if(mypageService.createCombination(userId, reqCombinationDto)){
            resultMap.put(MESSAGE, SUCCESS);
            status = HttpStatus.OK;
        } else {
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "영양제 조합 삭제", notes = "영양제 조합을 삭제한다.", response = Map.class)
    @DeleteMapping("/{userId}/combination")
    public ResponseEntity<Map<String,Object>> deleteCombination(@ApiParam(value = "회원정보(아이디)", required = true, example = "1") @PathVariable int userId,
                                                                @ApiParam(value = "삭제할 영양제 조합", required = true, example  = "1") @Valid @RequestParam int combinationId, Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        if(mypageService.deleteCombination(userId, combinationId)){
            resultMap.put(MESSAGE, SUCCESS);
            status = HttpStatus.OK;
        } else {
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "영양제 조합 목록 조회", notes = "영양제 조합 목록을 조회한다.", response = Map.class)
    @GetMapping("/{userId}/combination")
    public ResponseEntity<Map<String,Object>> getCombination(@ApiParam(value = "회원정보(아이디)", required = true, example = "1") @PathVariable int userId,
                                                             Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }
        List<ResponseCombinationInfoDto> combinationList = mypageService.getCombination(userId);

        resultMap.put(MESSAGE, SUCCESS);
        resultMap.put("combinationList", combinationList);
        status = HttpStatus.OK;

        return new ResponseEntity<>(resultMap, status);
    }
    @ApiOperation(value = "영양제 조합에 따른 성분 목록 조회", notes = "영양제 조합에 따른 성분 목록을 조회한다.", response = Map.class)
    @GetMapping("/{userId}/combination/ingredient")
    public ResponseEntity<Map<String,Object>> getCombinationIngredient(@ApiParam(value = "회원정보(아이디)", required = true, example = "1") @PathVariable int userId,
                                                                       @RequestBody ReqCombinationDto reqCombinationDto, Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }
        List<ResponseNutrientIngredientDto> nutrientIngredientList = mypageService.getCombinationIngredient(reqCombinationDto);

        resultMap.put(MESSAGE, SUCCESS);
        resultMap.put("nutrientIngredientList", nutrientIngredientList);
        status = HttpStatus.OK;

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "관심 영양제 등록", notes = "사용자가 해당 영양제를 관심 영양제로 등록한다.", response = Map.class)
    @PostMapping("/{userId}/interest/{nutrientId}")
    public ResponseEntity<Map<String, Object>> createInterestNutrient(@ApiParam(value = "회원 아이디", required = true, example = "0") @PathVariable int userId,
                                                                      @ApiParam(value = "영양제 아이디", required = true, example = "0") @PathVariable Long nutrientId, Principal principal) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        // PathVariable로 받은 userId와 토큰에 있는 userId 비교
        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        // 관심 영양제 등록되면 true, 안되면 false
        if (interestNutrientService.creatInterestNutrient(userId, nutrientId)) {
            resultMap.put(MESSAGE, SUCCESS);
            status = HttpStatus.OK;
        } else {
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<>(resultMap, status);
    }
}
