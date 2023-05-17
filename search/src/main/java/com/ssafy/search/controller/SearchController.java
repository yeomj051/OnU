package com.ssafy.search.controller;

import com.ssafy.search.dto.response.ResponseSearchedNutrientDto;
import com.ssafy.search.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {
    private static final String MESSAGE = "message";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final SearchService searchService;

    @GetMapping("/{keyword}")
    public ResponseEntity<Map<String, Object>> searchNutrient(@PathVariable String keyword) {
        Map<String, Object> resultMap = new HashMap<>();
        List<ResponseSearchedNutrientDto> searchedList = searchService.searchNutrient(keyword);

        resultMap.put("searchedList", searchedList);
        resultMap.put(MESSAGE, SUCCESS);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

}
