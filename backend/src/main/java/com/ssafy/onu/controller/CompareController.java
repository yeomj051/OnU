package com.ssafy.onu.controller;

import com.ssafy.onu.dto.response.ResponseNutrientDetailDto;
import com.ssafy.onu.service.NutrientService;
import com.ssafy.onu.util.TokenUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/compare")
public class CompareController {
    private static final String MESSAGE = "message";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final NutrientService nutrientService;

    //두 영양제 비교
    @GetMapping("/{nutrientId01}/{nutrientId02}")
    public ResponseEntity<Map<String, Object>> compareNutrient(@PathVariable int nutrientId01, @PathVariable int nutrientId02,
                                                               @RequestParam int userId, Principal principal) {
        Map<String, Object> resultMap = new HashMap<>();

        // PathVariable로 받은 userId와 토큰에 있는 userId 비교
        if(userId > 0 && TokenUtils.compareUserIdAndToken(userId, principal, resultMap)) {
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }

        ResponseNutrientDetailDto nutrientDetail01 = nutrientService.getNutrientDetail(nutrientId01, userId);
        ResponseNutrientDetailDto nutrientDetail02 = nutrientService.getNutrientDetail(nutrientId02, userId);

        if(nutrientDetail01 != null && nutrientDetail02 != null) {
            resultMap.put("nutrientDetail01", nutrientDetail01);
            resultMap.put("nutrientDetail02", nutrientDetail02);
            resultMap.put(MESSAGE, SUCCESS);
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } else {
            resultMap.put(MESSAGE, FAIL);
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

}
