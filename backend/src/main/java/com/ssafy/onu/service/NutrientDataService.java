package com.ssafy.onu.service;

import com.ssafy.onu.dto.NutrientDataDto;
import com.ssafy.onu.entity.*;
import com.ssafy.onu.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.StringTokenizer;

@Slf4j
@Service
@RequiredArgsConstructor
public class NutrientDataService {
//    private final NutrientDataRepository nutrientDataRepository;
    private final NobaDataRepository nobaDataRepository;
    private final IngredientRepository ingredientRepository;
    private final NutrientIngredientDataRepository nutrientIngredientDataRepository;
    private final NutrientIngredientRepository nutrientIngredientRepository;

    public void saveData(ArrayList<NutrientDataDto> nutrientDataDtoList) {
        for (NutrientDataDto nutrientDataDto : nutrientDataDtoList) {
            NutrientData nutrientData = new NutrientData(nutrientDataDto);
            NobaData nobaData = new NobaData(nutrientDataDto);
//            nutrientDataRepository.save(nutrientData);
            nobaDataRepository.save(nobaData);

        }
    }

    public int seperateIngredient() {
        int result =1;

        //영양제 성분 데이터 조회
        List<NutrientIngredientData> nutrientIngredientDataList = nutrientIngredientDataRepository.findAll();
        //        NutrientIngredientData nutrientIngredientData = nutrientIngredientDataRepository.findAllByPrdlstReportNo(400200082500L);

        for (NutrientIngredientData nutrientIngredientData : nutrientIngredientDataList) {
            //성뷴별로 분류
            StringTokenizer stringTokenizer = new StringTokenizer( nutrientIngredientData.getIngredient(),"$");
            //성분 종류 조회
            List<Ingredient> ingredientList = ingredientRepository.findAll();

            HashSet<Integer> addList = new HashSet<>();   //추가해야하는 분류번호 리스트

            //해당 영양제 성분 수 반복
            while(stringTokenizer.hasMoreElements()){
                String nowIngredient = stringTokenizer.nextToken();         //해당 영양제의 현재 성분 데이터
                // 성분과 함량 분류
                String[] nowIngredientData = nowIngredient.split(" : ");
                String ingredient = nowIngredientData[0];     // 현재 성분
                String amount = nowIngredientData[1];         // 현재 성분 함량

                //오메가3일 경우
                if(ingredient.equals("EPA와 DHA의 합")){
                    if(nutrientIngredientRepository.save(new NutrientIngredient(nutrientIngredientData.getPrdlstReportNo(),8,amount)) == null) result = 0;
                    continue;
                }

                NutrientIngredient nutrientIngredient = new NutrientIngredient(nutrientIngredientData.getPrdlstReportNo(),amount);  //등록한 영양제_성분 객체 생성

                //현재 등록된 성분 수만큼 반복
                for (Ingredient alreadyIngredient : ingredientList) {
                    //현재 성분이 이미 존재하는 성분일 경우
                    if(alreadyIngredient.getIngredientName().contains(ingredient)){
                        //영양제_성분 객체에 성분 아이디 추가
                        nutrientIngredient.updateIngredientId(alreadyIngredient.getIngredientId());

                        //분류번호 추가
                        if(alreadyIngredient.getIngredientId() == 81){
                            addList.add(9);
                        } else if (alreadyIngredient.getIngredientId() == 6 || alreadyIngredient.getIngredientId() == 82 ||
                                alreadyIngredient.getIngredientId() == 83 || alreadyIngredient.getIngredientId() == 84 ||
                                alreadyIngredient.getIngredientId() == 85 || alreadyIngredient.getIngredientId() == 88 ||
                                alreadyIngredient.getIngredientId() == 89) {
                            addList.add(10);
                        } else if (alreadyIngredient.getIngredientId() == 86 || alreadyIngredient.getIngredientId() == 87) {
                            addList.add(12);
                        } else if (alreadyIngredient.getIngredientId() == 22 || alreadyIngredient.getIngredientId() == 23) {
                            addList.add(15);
                        }

                    }
                }

                //현재 성분이 등록되지 않았을 경우
                if(nutrientIngredient.getIngredientId() == 0) {
                    Ingredient newIngredient = new Ingredient(ingredient);      //새로 등록할 성분 객체 생성
                    // 성분 등록(등록 시 성분 아이디 생성)
                    if(ingredientRepository.save(newIngredient) == null) return 0;
                    newIngredient = ingredientRepository.findByIngredientName(ingredient);      //새로 등록한 성분조회(아이디를 얻기 위해)

                    //등록된 성분 리스트에 추가
                    ingredientList.add(newIngredient);
                    //영양제_성분 객체에 성분 아이디 추가
                    nutrientIngredient.updateIngredientId(newIngredient.getIngredientId());

                }

                // 영양제_성분 등록
                if(nutrientIngredientRepository.save(nutrientIngredient) == null) result = 0;
            }

            // 영양제 분류 추가 등록
            for (int addIndex : addList) {
                if(nutrientIngredientRepository.save(new NutrientIngredient(nutrientIngredientData.getPrdlstReportNo(),addIndex)) == null) result = 0;
            }

        }

        return result;
    }

    public int updateIngredient(String[] ingredientList) {
        int result = 1;
        for (String ingredientName : ingredientList){
            Ingredient ingredient = new Ingredient(ingredientName);
//            if(ingredientRepository.save(ingredient)==null) result=0;
        }
        return result;
    }
}
