import React from 'react';
import { useState, useEffect } from 'react';
import PillAnalysisCombMem from './PillAnalysisCombMem';
// import Image from 'next/image';
// import eundan from '@/public/eundan.png';

type InfoList = {
  nutrientId: number;
  nutrientName: string;
  nutrientImageUrl: string;
  nutrientBrand: string;
};

type combination = {
  combinationId: number;
  nutrientInfoList: Array<InfoList>;
};

type Props = {
  combination: combination;
};

function PillAnalysisComb(props: Props) {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const selectThis = (event: React.MouseEvent) => {
    setIsSelected(!isSelected);
  };

  //영양제 조합 삭제API 연결해서 조합 삭제
  const deleteCombination = (event: React.MouseEvent) => {
    //이미 선택되어있는 상태였다면 x를 눌러 삭제했을 때 seledtedList에서 제거해줘야 함
    if (isSelected) {
    }

    event.stopPropagation();
  };

  return (
    <div onClick={selectThis}>
      <div
        className={`${
          isSelected ? 'bg-[#90B5EA]' : 'bg-white'
        } rounded-xl p-2 mb-4`}
      >
        <div className="pb-5 bg-white rounded-xl">
          <div className="grid justify-items-end">
            <button
              className="absolute w-5 h-5 mt-3 mr-3 text-gray-500"
              onClick={deleteCombination}
            >
              ✕
            </button>
          </div>
          <div className="flex flex-wrap">
            {props.combination.nutrientInfoList.map((item, idx) => (
              <PillAnalysisCombMem nutrient={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PillAnalysisComb;
