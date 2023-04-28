package com.ssafy.onu.entity;

import com.ssafy.onu.dto.NutrientDataDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.json.simple.JSONObject;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "nutrientData")
public class NutrientData {
    @Id
    private int prdlstReportNo;
    // 인허가번호  LCNS_NO
    private String lcnsNo;
    //업소명   BSSH_NM
    private String bsshNM;

    //품목명   PRDLST_NM
    private String prolstNm;

    // 유툥/소비기한  POG_DAYCNT
    private String pogDayCnt;

    //성상    DISPOS
    @Column(columnDefinition = "VARCHAR(2000)")
    private String dispos;

    //섭취 방법    NTK_MTHD
    @Column(columnDefinition = "VARCHAR(2000)")
    private String ntkMthd;

    //주된 기능성    PRIMARY_FNCLTY
    @Column(columnDefinition = "VARCHAR(2000)")
    private String primaryFncty;

    //섭취시주의사항    IFTKN_ATNT_MATR_CN
    @Column(columnDefinition = "VARCHAR(2000)")
    private String iftknAtntMathCn;

    //보관 방법    CSTDY_MTHD
    @Column(columnDefinition = "VARCHAR(2000)")
    private String cstdyMthd;

    //형태    SHAP
    private String shap;

    //기준규격  STDR_STND
    @Column(columnDefinition = "VARCHAR(2000)")
    private String stdrStnd;

    //원재료    RAWMTRL_NM
    @Column(columnDefinition = "VARCHAR(2000)")
    private String rawmtrlNm;

    // 제품 형태    PRDT_SHAP_CD_NM
    private String prdtShapCdNm;

    @Builder
    public NutrientData(NutrientDataDto nutrientDataDto) {
        this.prdlstReportNo = nutrientDataDto.getPrdlstReportNo();
        this.lcnsNo=nutrientDataDto.getLcnsNo();
        this.bsshNM =  nutrientDataDto.getBsshNM();
        this.prolstNm = nutrientDataDto.getProlstNm();
        this.pogDayCnt = nutrientDataDto.getPogDayCnt();
        this.dispos = nutrientDataDto.getDispos();
        this.ntkMthd = nutrientDataDto.getNtkMthd();
        this.primaryFncty = nutrientDataDto.getPrimaryFncty();
        this.iftknAtntMathCn = nutrientDataDto.getIftknAtntMathCn();
        this.cstdyMthd = nutrientDataDto.getCstdyMthd();
        this.shap =  nutrientDataDto.getShap();
        this.stdrStnd = nutrientDataDto.getStdrStnd();
        this.rawmtrlNm = nutrientDataDto.getRawmtrlNm();
        this.prdtShapCdNm = nutrientDataDto.getPrdtShapCdNm();
    }

}
