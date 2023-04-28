package com.ssafy.onu.service;

import com.ssafy.onu.dto.NutrientDataDto;
import com.ssafy.onu.entity.NutrientData;
import com.ssafy.onu.repository.NutrientDataRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Slf4j
@Service
@RequiredArgsConstructor
public class NutrientDataService {
    private final NutrientDataRepository nutrientDataRepository;

    public void saveData(ArrayList<NutrientDataDto> nutrientDataDtoList) {
        for (NutrientDataDto nutrientDataDto : nutrientDataDtoList) {
            NutrientData nutrientData = new NutrientData(nutrientDataDto);
            nutrientDataRepository.save(nutrientData);
        }
    }
}
