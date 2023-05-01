package com.ssafy.onu.controller;

import com.ssafy.onu.dto.request.ReqUserInfoDto;
import com.ssafy.onu.dto.response.ResponseUserInfoDto;
import com.ssafy.onu.service.TokenProviderService;
import com.ssafy.onu.service.UserService;
import com.ssafy.onu.util.TokenUtils;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private static final String MESSAGE = "message";
    private static final String RESULT = "result";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final RedisTemplate redisTemplate;
    private final UserService userService;
    private final TokenProviderService tokenProviderService;

    @ApiOperation(value = "닉네임 중복 검사", notes = "회원의 닉네임의 중복 여부를 검사합나다.", response = Map.class)
    @GetMapping("/{userNickname}")
    public ResponseEntity<Map<String,Object>> nicknameDpcn(@ApiParam(value = "닉네임", required = true, example = "홍길동")
                                                           @PathVariable String userNickname){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(userService.nicknameDpcn(userNickname)){
            resultMap.put(MESSAGE , SUCCESS);
            status = HttpStatus.OK;
        } else {
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "회원의 정보를 등록", notes = "회원의 정보를 등록한다(닉네임, 성별, 나이)", response = Map.class)
    @PostMapping("/{userId}")
    public ResponseEntity<Map<String,Object>> createUserInfo(@ApiParam(value = "등록할 회원정보(아이디)", required = true, example = "1") @PathVariable int userId,
                                                             @ApiParam(value = "등록할 회원정보(닉네임, 성별, 나이)", required = true, example  = "홍동길") @Valid @RequestBody ReqUserInfoDto reqUserInfoDto, Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        ResponseUserInfoDto userInfo = userService.createUserInfo(userId, reqUserInfoDto);

        if(userInfo == null){
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        } else {
            resultMap.put(MESSAGE, SUCCESS);
            resultMap.put("userInfo", userInfo);
            status = HttpStatus.OK;
        }
        return new ResponseEntity<>(resultMap, status);
    }

}
