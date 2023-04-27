package com.ssafy.onu.controller;

import com.ssafy.onu.service.SmsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/phone")
    public ResponseEntity<Map<String, Object>> sendSms(@RequestParam String phone) {
        Map<String, Object> resultMap = new HashMap<>();

        if(smsService.sendMessage(phone) != null) {
            resultMap.put(MESSAGE, SUCCESS);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        } else {
            resultMap.put(MESSAGE, FAIL);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

}
