package com.ssafy.onu.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.json.simple.JSONObject;

@Getter
@NoArgsConstructor
public class NutrientDataDto {
    // 인허가번호  LCNS_NO
    private String lcnsNo;
    //품복제조번호    PRDLST_REPORT_NO
    private Long prdlstReportNo;

    //업소명   BSSH_NM
    private String bsshNM;

    //품목명   PRDLST_NM
    private String prolstNm;

    // 유툥/소비기한  POG_DAYCNT
    private String pogDayCnt;

    //성상    DISPOS
    private String dispos;

    //섭취 방법    NTK_MTHD
    private String ntkMthd;

    //주된 기능성    PRIMARY_FNCLTY
    private String primaryFncty;

    //섭취시주의사항    IFTKN_ATNT_MATR_CN
    private String iftknAtntMathCn;

    //보관 방법    CSTDY_MTHD
    private String cstdyMthd;

    //형태    SHAP
    private String shap;

    //기준규격  STDR_STND
    private String stdrStnd;

    //원재료    RAWMTRL_NM
    private String rawmtrlNm;

    // 제품 형태    PRDT_SHAP_CD_NM
    private String prdtShapCdNm;

    public NutrientDataDto(JSONObject object) {
        this.lcnsNo = (String) object.get("LCNS_NO");
        String prdlstReportNoString = (String) object.get("PRDLST_REPORT_NO");
        this.prdlstReportNo = Long.parseLong(prdlstReportNoString.substring(2));
        this.bsshNM = (String) object.get("BSSH_NM");
        this.prolstNm = (String) object.get("PRDLST_NM");
        this.pogDayCnt = (String) object.get("POG_DAYCNT");
        this.dispos = (String) object.get("DISPOS");
        this.ntkMthd = (String) object.get("NTK_MTHD");
        this.primaryFncty = (String) object.get("PRIMARY_FNCLTY");
        this.iftknAtntMathCn = (String) object.get("IFTKN_ATNT_MATR_CN");
        this.cstdyMthd = (String) object.get("CSTDY_MTHD");
        this.shap = (String) object.get("SHAP");
        this.stdrStnd = (String) object.get("STDR_STND");
        this.rawmtrlNm = (String) object.get("RAWMTRL_NM");
        this.prdtShapCdNm = (String) object.get("PRDT_SHAP_CD_NM");
    }
}
