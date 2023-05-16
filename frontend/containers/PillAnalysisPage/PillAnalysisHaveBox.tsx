import React from 'react';
import { useState, useEffect } from 'react';
import PillAnalysisHave from './PillAnalysisHave';
import { haveStore } from '../../store/haveStore';
import { makeCombinationStore } from '@/store/makeCombinationStore';
import { useTakingPill, useTakingPillIngredient } from '@/apis/hooks';
import api from '@/apis/config';

type Props = {
  userId: number;
};

type Ingredient = {
  ingredientId: number;
  ingredientName: string;
  ingredientAmount: string;
};

type have = {
  havingNutrientList: number;
  nutrientId: number;
  nutrientName: string;
  nutrientImageUrl: string;
  nutrientBrand: string;
  nutrientIngredientList: Array<Ingredient>;
};

function PillAnalysisHaveBox(props: Props) {
  const { haveList, setAllHaves } = haveStore();
  //복용중 목록 저장
  const [havingList, setHaveList] = useState<Array<have>>();

  useEffect(() => {
    console.log(props.userId);
    if (props.userId != null) {
      getTakingPillData().then((res) => {
        setHaveList(res.data.takingNutrientList);
        setAllHaves(res.data.takingNutrientList); //전역변수 저장
      });
    }
  }, [props.userId]);

  const getTakingPillData = async () => {
    return await api.getTakingPillList(props.userId);
  };

  return (
    <div className="flex flex-wrap">
      {havingList &&
        havingList.map((nutrient, idx) => (
          <PillAnalysisHave key={idx} nutrient={nutrient} />
        ))}
    </div>
  );
}

export default PillAnalysisHaveBox;
