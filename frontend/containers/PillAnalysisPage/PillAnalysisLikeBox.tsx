import React, { useEffect, useState } from 'react';
import PillAnalysisLike from './PillAnalysisLike';
import { useInterestPill } from '@/apis/hooks';
import { likeStore } from '@/store/likeStore';

type Props = {
  userId: number;
};

type interest = {
  interestNutrientId: number;
  nutrientId: number;
  nutrientName: string;
  nutrientImageUrl: string;
  nutrientBrand: string;
};

function PillAnalysisLikeBox(props: Props) {
  //관심 목록 저장
  const [interestList, setInterestList] = useState<Array<interest>>();
  const { likeList, setAllLikes } = likeStore();

  const { isLoading, data, isError, isSuccess, error } =
    useInterestPill(props.userId);
  if (isError) {
    console.log(error);
  }
  if (isSuccess) {
    setAllLikes(data.data.inter);
    setInterestList(data.data.interestNutrientList);
  }

  return (
    <div className="flex justify-between">
      {interestList &&
        interestList.map((nutrient, idx) => (
          <PillAnalysisLike key={idx} nutrient={nutrient} />
        ))}
    </div>
  );
}

export default PillAnalysisLikeBox;
