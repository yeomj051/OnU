package com.ssafy.onu.controller;

import com.ssafy.onu.dto.NutrientDataDto;
import com.ssafy.onu.service.NutrientDataService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DataController {
    private final NutrientDataService nutrientDataService;

    @ApiOperation(value = "공공 데이터 로드", notes = "공공 데이터 로드", response = Page.class)
    @GetMapping("/data")
    public ResponseEntity<Map<String, Object>> loadData() {
        Map<String, Object> map = new HashMap<>();
        String result = "";
        String[] brand = {"나우푸드","솔가","라이프익스텐션","닥터스베스트","네이쳐스웨이","재로우포뮬러스","종근당건강","내츄럴플러스","GNC","캘리포니아골드뉴트리션","UNKNOWN","소스내추럴스","솔라레이","하이웰","네추럴팩터스","노르딕내추럴스","가든오브라이프","종근당","스완슨","네추럴라이즈","뉴트리코스트","GNM자연의품격","21세기센트리","블루보넷","스포츠리서치","일양약품","닥터머콜라","피터앤존","뉴트리원","네이쳐스탑","네이처스플러스","락토핏","세노비스","파라다이스허브","뉴트리디데이","컨츄리라이프","고헬씨","헬시오리진스","블랙모어스","네이처메이드","굿헬스","엔젯오리진","마더네스트","퓨리탄프라이드","헬스윈","NOW","닥터린","퓨어인캡슐레이션","네이처스바운티","나트롤","JW중외제약","통라이프","오리진","뉴트리코어","비타민마을","덴프스","뉴트라라이프","닥터브라이언","네이쳐스앤서","프롬바이오","칼라일","건국유업","엔조라이프","한미양행","안국건강","유한양행","대웅생명과학","리뉴라이프","헬씨케어","컬처렐","레이델","MRM","퍼니트","휴럼","도펠헤르츠","뉴트로웨이","에스더포뮬러","네이처드림","씨스팡","광동","로니웰","헬스팜","모에버","베스트내츄럴스","어바틀오브네이처","커클랜드","에버그린","데일리원","21센추리","콤비타","SWISSE","참굿즈","헬씨허그","동국제약","순수식품","바이오가이아","고려은단","더리얼","비에날씬","비타코스트"};

        try {
            for (String brandName : brand) {
                URL url = new URL("https://openapi.foodsafetykorea.go.kr/api/9044b7870bf342489a80/C003/json/1/200/BSSH_NM="+brandName);
                HttpURLConnection urlConnection = (HttpURLConnection)url.openConnection();
                urlConnection.setRequestMethod("GET");
                urlConnection.setRequestProperty("Content-type", "application/json");

                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(url.openStream(),"UTF-8"));
                result = bufferedReader.readLine();

                JSONParser jsonParser = new JSONParser();
                JSONObject jsonpObject = (JSONObject)jsonParser.parse(result);
                JSONObject jsonpRowObject = (JSONObject)jsonpObject.get("C003");
                JSONArray jsonArray = (JSONArray) jsonpRowObject.get("row");
                ArrayList<NutrientDataDto> nutrientDataDtoList = new ArrayList<>();

                if(nutrientDataDtoList.size() == 0) continue;

                for(int i=0; i<jsonArray.size();i++){
                    JSONObject object = (JSONObject) jsonArray.get(i);

                    NutrientDataDto nutrientDataDto = new NutrientDataDto(object);
                    nutrientDataDtoList.add(nutrientDataDto);
                }

                nutrientDataService.saveData(nutrientDataDtoList);
            }

            return new ResponseEntity<>(map, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }

}
