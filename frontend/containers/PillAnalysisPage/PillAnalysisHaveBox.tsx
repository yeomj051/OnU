import React from 'react';
import { useState, useEffect } from 'react';
import PillAnalysisHave from './PillAnalysisHave';
import { haveStore } from '../../store/haveStore';
import { makeCombinationStore } from '@/store/makeCombinationStore';
import { useTakingPillIngredient } from '@/apis/hooks';

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
    const { isLoading, data, isError, isSuccess } =
      useTakingPillIngredient(props.userId);
    if (isError) {
      // console.log(error);
    }
    if (isSuccess) {
      setAllHaves(data.data.havingNutrientList); //전역변수 저장
      setHaveList(data.data.havingNutrientList); //state 저장
    }
  }, []);

  return (
    <div className="flex justify-between">
      {havingList &&
        havingList.map((nutrient, idx) => (
          <PillAnalysisHave key={idx} nutrient={nutrient} />
        ))}
    </div>
  );
}

export default PillAnalysisHaveBox;
