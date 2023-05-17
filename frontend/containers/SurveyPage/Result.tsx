import React, { useState, useEffect } from 'react';
import surveyStore from '@/store/surveyStore';
import ItemList from '@/components/list/ItemList';
import CompareDrawer from '@/components/common/Drawer';

type ingredientItem = {
  ingredientName: string;
  nutrientDtoLinkedList: nutrientList[];
};

type nutrientList = {
  interest: boolean;
  nutrientBrand: string;
  nutrientId: number;
  nutrientImageUrl: string;
  nutrientName: string;
};

const Result = () => {
  const [data, setData] = useState<ingredientItem[]>([]);
  const [ingredientId, setIngredientId] = useState<number>(0);

  useEffect(() => {
    const data = surveyStore.getState().result;
    setData(data.nutrientFiltering);
  }, [ingredientId]);

  console.log(data);

  return (
    <div className="flex flex-col items-center text-center pt-20 space-y-4 min-h-[100vh]">
      <div className="flex flex-col items-start">
        <p className="ml-2 text-xl font-extrabold text-[#1E266E]">
          추천 영양제
        </p>
        <p className="ml-2 text-xs font-light text-[#1E266E] mb-2">
          회원님의 복용중인 제품과 설문 결과를 바탕으로 추천 영양제를
          모아봤어요.
        </p>
      </div>
      <div>
        {data.length !== 0 &&
          data.map((item, index: number) => (
            <button
              key={index}
              className="btn btn-sm m-1 bg-[#D8EDFF] rounded-xl border-none text-[#424B5A] active:bg-[#90B5EA] active:text-[#FFFFFF] hover:bg-[#90B5EA] hover:text-[#FFFFFF]"
              onClick={() => setIngredientId(index)}
            >
              {item.ingredientName}
            </button>
          ))}
        <ItemList
          itemList={data[ingredientId]?.nutrientDtoLinkedList}
        />
        <CompareDrawer />
      </div>
    </div>
  );
};

export default Result;
