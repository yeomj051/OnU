import React, { useEffect, useState } from 'react';
import PillAnalysisComb from './PillAnalysisComb';
import { useCombList } from '@/apis/hooks';

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

function PillAnalysisCombBox(props: Props) {
  //조합 목록 저장
  const [combinationList, setCombinationList] = useState<
    Array<combination>
  >([]);

  //어떤 조합이 선택되어있는지 id 저장
  const [selectedComb, setSelectedComb] = useState<number>(0);
  //삭제된 조합 id 저장할 state => 근데 꼭 필요한가?? 자동 리렌더링 되면 api도 다시 받아올거니까 필요없을듯 일단 주석
  // const [deletedComb, setDeletedComb] = useState<number>(0);
  const { isLoading, data, isError, isSuccess, error } = useCombList(
    props.userId,
  );

  if (isError) {
    console.log(error);
  }
  if (isSuccess) {
    setCombinationList(data.data.combinationList);
  }

  //선택된 조합의 id저장 (하나만 고를 수 있도록)
  const selectCombination = (id: number) => {
    setSelectedComb(id);
  };

  return (
    <div>
      {combinationList.map((combination, idx) => (
        <PillAnalysisComb
          combination={combination}
          selectCombination={selectCombination}
          selectedComb={selectedComb}
          // deleteCombination={deleteCombination}
        />
      ))}
    </div>
  );
}

export default PillAnalysisCombBox;
