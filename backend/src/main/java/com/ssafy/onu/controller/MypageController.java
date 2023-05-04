package com.ssafy.onu.controller;

import com.ssafy.onu.dto.*;
import com.ssafy.onu.dto.request.ReqUserInfoDto;
import com.ssafy.onu.dto.response.ResponseTakingDateDto;
import com.ssafy.onu.dto.response.ResponseUserInfoDto;
import com.ssafy.onu.entity.*;
import com.ssafy.onu.service.MypageService;
import com.ssafy.onu.util.TokenUtils;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/mypage")
@RequiredArgsConstructor
public class MypageController {

    private static final String MESSAGE = "message";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final MypageService mypageService;

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
    @GetMapping("/{userId}/calender")
    public ResponseEntity<Map<String, Object>> getCalenderDate(@PathVariable @ApiParam(value = "회원 아이디", required = true, example = "0") int userId, Principal principal,
                                                               @ApiParam(value = "연도 + 월 정보", required = true, example = "0") @RequestParam String date) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        // PathVariable로 받은 userId와 토큰에 있는 userId 비교
        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        List<String> responseTakingDateDto = mypageService.getCheckedDate(userId, date);

        if (responseTakingDateDto != null) {
            resultMap.put(MESSAGE, SUCCESS);
            resultMap.put("checkedDate", responseTakingDateDto);
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } else {
            resultMap.put(MESSAGE, FAIL);
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }
}
