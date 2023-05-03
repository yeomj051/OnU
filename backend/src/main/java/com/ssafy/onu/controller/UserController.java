package com.ssafy.onu.controller;

import com.ssafy.onu.dto.PhoneAuthDto;
import com.ssafy.onu.service.SmsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private static final String MESSAGE = "message";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private SmsService smsService;

    public UserController(SmsService smsService) {
        this.smsService = smsService;
    }

    @PostMapping("/sms")
    public ResponseEntity<Map<String, Object>> sendSms(@RequestBody PhoneAuthDto phoneAuthDto) {
        Map<String, Object> resultMap = new HashMap<>();

        if(smsService.sendMessage(phoneAuthDto) != null) {
            resultMap.put(MESSAGE, SUCCESS);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        } else {
            resultMap.put(MESSAGE, FAIL);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

}
