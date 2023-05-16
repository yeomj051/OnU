import React from 'react';
import { useState, useEffect } from 'react';
import PillAnalysisCombMem from './PillAnalysisCombMem';
import api from '@/apis/config';
import useUserStore from '@/store/userStore';
import { AxiosResponse } from 'axios';
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
  selectCombination: (id: number) => void;
  selectedComb: number;
  reRendering: () => void;
  // deleteCombination: (id: number) => void;
};

function PillAnalysisComb(props: Props): React.ReactElement {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    if (props.selectedComb === props.combination.combinationId) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [props.selectedComb]);

  const selectThis = (): void => {
    props.selectCombination(props.combination.combinationId);
  };

  //영양제 조합 삭제API 연결해서 조합 삭제
  const deleteCombination = async (
    event: React.MouseEvent,
  ): Promise<void> => {
    //이미 선택되어있는 상태였다면 x를 눌러 삭제했을 때 seledtedList에서 제거해줘야 함 (main에서 다시 api 호출하고 데이터 리렌더링되면 상관없음)
    // if (isSelected) {
    // }

    //삭제 api 연결
    const id: number = useUserStore.getState().user?.id as number;
    await api
      .deleteComb(id, props.combination.combinationId)
      .then((res: AxiosResponse) => console.log(res));

    // //그리고 자기 아이디 부모에게 전달
    // props.deleteCombination(props.combination.combinationId);
    props.reRendering();
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
            {props.combination.nutrientInfoList.map(
              (item: InfoList, idx: number): React.ReactElement => (
                <PillAnalysisCombMem key={idx} nutrient={item} />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PillAnalysisComb;
