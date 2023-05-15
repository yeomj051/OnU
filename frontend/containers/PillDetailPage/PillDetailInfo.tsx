import React from 'react';
import { useState, useEffect } from 'react';
import PillDetailBadge from './PillDetailBadge';
import PillDetailImg from './PillDetailImg';
import PillDetailContents from './PillDetailContents';
import PillDetailNutrientGage from './PillDetailNutrientGage';
import yellowCircle from '../../public/yellowCircle.png';
import greenCircle from '../../public/greenCircle.png';
import redCircle from '../../public/redCircle.png';
import Image from 'next/image';

type Props = {
  nutrientList: nutrientDetail;
};

function PillDetailInfo(props: Props) {
  const realItems = {
    message: 'success or fail',
    nutrientDetail: {
      nutrientId: 11,
      nutrientName: '스피루리나루리나',
      nutrientImageUrl:
        'https://shopping-phinf.pstatic.net/main_2506835/25068354527.20201202163623.jpg',
      nutrientBrand: '종근당',
      nutrientIntake:
        '1일 3회, 1회 4정 (1정당 250mg)을 물과 함께 섭취하십시오.', //섭취 방법
      nutrientCaution:
        '특정질환, 특이체질이거나 알러지 체질의 경우에는 간혹 개인에 따라 과민반응을 나타낼 수 있으므로 원료를 확인하신 후 섭취하십시오.', //섭취 시 주의사항
      nutrientExpiration: '제조일로부터 2년', //유효기간
      nutrientType: '젤리', //제형
      nutrientMaterial:
        '스피루리나(고시형),구연산,프로필렌글리콜,글리세린지방산에스테르,글리세린지방산에스테르혼합제제용액,덱스트린,효소처리탱자추출물,효소처리탱자추출물,히드록시프로필메틸셀룰로스,스테아린산마그네슘,삼백초추출물분말,인동추출분말,당잔대뿌리,민들레,결명자추출물분말,당근,검정콩,명일엽,호박,케일잎,덱스트린,클로렐라(고시형),결정셀룰로스,칼슘(고시형)...', //원재료
      isInterested: true,
      ingredientList: [
        {
          ingredientName: '비타민A',
          ingredientAmount: '11mg α-TE',
          recommendedIntakeStart: '50mg α-TE',
          recommendedIntakeEnd: '80mg α-TE',
        },
      ],
      functionList: [
        '뼈 및 관절 건강과 근력 개선',
        '눈 건강(시력 및 피로감 케어)',
        '간 건강',
      ],
    },
  };

  const [nutrientList, setNutrientList] = useState<nutrientDetail>(
    realItems.nutrientDetail,
  );

  useEffect(() => {
    setNutrientList(props.nutrientList);
  }, []);

  return (
    <div>
      <PillDetailBadge
        subject="기능성"
        badges={nutrientList.functionList}
      />
      <PillDetailImg
        subject="제형"
        pillType={nutrientList.nutrientType}
      />

      <div className="bg-white min-h-[60px] px-5 py-30 grid grid-cols-6 rounded-lg mt-3 min-h-[110px]">
        <div className="grid content-center col-span-1">영양성분</div>
        <div className="col-span-5 mt-5">
          <div className="flex flex-row-reverse ">
            <div className="flex items-center mx-1">
              <Image
                src={redCircle}
                alt="빨강"
                className="w-3 h-3 mr-1"
              />
              <div className="text-sm">과다</div>
            </div>
            <div className="flex items-center mx-1">
              <Image
                src={greenCircle}
                alt="초록"
                className="w-3 h-3 mr-1"
              />
              <div className="text-sm">적정</div>
            </div>
            <div className="flex items-center mx-1">
              <Image
                src={yellowCircle}
                alt="노랑"
                className="w-3 h-3 mr-1"
              />
              <div className="text-sm">부족</div>
            </div>
          </div>
          <div className="grid content-center pl-2 mb-3">
            {nutrientList &&
              nutrientList.ingredientList.map((nutrient, idx) => (
                <PillDetailNutrientGage
                  key={idx}
                  ingredientName={nutrient.ingredientName}
                  ingredientAmount={nutrient.ingredientAmount}
                  recommendedIntakeStart={
                    nutrient.recommendedIntakeStart
                  }
                  recommendedIntakeEnd={nutrient.recommendedIntakeEnd}
                />
              ))}
          </div>
        </div>
      </div>

      <PillDetailContents
        subject="섭취 방법"
        content={nutrientList.nutrientIntake}
      />
      <PillDetailContents
        subject="섭취 시 주의사항"
        content={nutrientList.nutrientCaution}
      />
      <PillDetailContents
        subject="유효기간"
        content={nutrientList.nutrientExpiration}
      />
      <PillDetailContents
        subject="원재료"
        content={nutrientList.nutrientMaterial}
      />
    </div>
  );
}

export default PillDetailInfo;
