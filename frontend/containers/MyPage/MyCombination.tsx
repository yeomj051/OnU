import React, { useEffect, useState } from 'react';
import { useCombList } from '@/apis/hooks';
import api from '@/apis/config';
import { combinationStore } from '@/store/combinationStore';
import MyCombBox from './MyCombBox';

type Props = {
  userId: number;
};

type combination = {
  combinationId: number;
  nutrientInfoList: Array<InfoList>;
};

type InfoList = {
  nutrientId: number;
  nutrientName: string;
  nutrientImageUrl: string;
  nutrientBrand: string;
};

function MyCombination(props: Props) {
  //조합 목록 저장
  const [combinationList, setCombinationList] = useState<
    Array<combination>
  >([]);
  const [wannaRerender, setWannaRerender] = useState(true);

  useEffect(() => {
    if (props.userId !== undefined) getCombination();
  }, [props, wannaRerender]);

  const getCombination = async () => {
    await api
      .getCombList(props.userId)
      .then((res) => {
        console.log('조합 저장하기');
        console.log(res);
        setCombinationList(res.data.combinationList);
      })
      .catch((err) => console.log(err));
  };

  const renew = () => {
    console.log();
    setWannaRerender(!wannaRerender);
  };

  return (
    <div className="mt-12">
      {combinationList.length != 0 ? (
        <div>
          <div className="sm:w-[75%] w-[85%] mx-auto pb-2 pt-10 text-left text-xl font-extrabold text-[#1E266E]">
            나의 영양제 조합
          </div>
          <div>
            {combinationList.map((combination, idx) => (
              <MyCombBox
                key={idx}
                combination={combination}
                renew={renew}
              />
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default MyCombination;
