import React, { useEffect, useState } from 'react';
import PillAnalysisLike from './PillAnalysisLike';
import { useInterestPill } from '@/apis/hooks';
import { likeStore } from '@/store/likeStore';
import api from '@/apis/config';

type Props = {
  userId: number;
  reRendering: () => void;
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

  useEffect(() => {
    getInterestData();
  }, [props]);

  const getInterestData = async () => {
    await api
      .getInterestPillList(props.userId)
      .then((res) => {
        console.log(res);
        setInterestList(res.data.interestNutrientList);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex flex-wrap">
      {interestList &&
        interestList.map((nutrient, idx) => (
          <PillAnalysisLike
            key={idx}
            nutrient={nutrient}
            reRendering={props.reRendering}
          />
        ))}
    </div>
  );
}

export default PillAnalysisLikeBox;
