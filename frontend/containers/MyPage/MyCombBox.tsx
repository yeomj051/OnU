import React from 'react';
import { useState, useEffect } from 'react';
import api from '@/apis/config';
import useUserStore from '@/store/userStore';
import { AxiosResponse } from 'axios';
import MyCombMem from './MyCombMem';

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
  renew: () => void;
};

function MyCombBox(props: Props) {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  //영양제 조합 삭제API 연결해서 조합 삭제
  const deleteCombination = async (
    event: React.MouseEvent,
  ): Promise<void> => {
    //삭제 api 연결
    const id: number = useUserStore.getState().user?.id as number;
    await api
      .deleteComb(id, props.combination.combinationId)
      .then((res: AxiosResponse) => console.log(res));

    props.renew();
  };

  return (
    <div className="sm:w-[80%] w-[90%] mx-auto">
      <div
        className={`${
          isSelected ? 'bg-[#90B5EA]' : 'bg-white'
        } rounded-xl p-1 mb-4`}
      >
        <div className="pb-5 bg-white rounded-xl">
          <div className="grid justify-items-end">
            <button
              className="absolute w-5 h-5 mt-3 mr-3 text-gray-500 z-50"
              onClick={deleteCombination}
            >
              ✕
            </button>
          </div>
          <div className="flex flex-wrap">
            {props.combination.nutrientInfoList.map(
              (item: InfoList, idx: number): React.ReactElement => (
                <MyCombMem key={idx} nutrient={item} />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCombBox;
