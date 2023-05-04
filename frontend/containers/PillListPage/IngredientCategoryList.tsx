import React from 'react';

const ingredientDataList: string[] = [
  '비타민A',
  '비타민B',
  '비타민C',
  '비타민D',
  '오메가3',
  '비오틴',
  '칼슘',
  '칼륨',
  '식이섬유',
  '루테인',
  '지아잔틴',
  '밀크씨슬',
];

const IngredientCategoryList = () => {
  return (
    <div id="list" className="flex flex-wrap justify-start mt-4 ml-4">
      {ingredientDataList.map((item, index) => (
        <button className="btn btn-sm m-1 bg-[#D8EDFF] rounded-xl border-none text-[#424B5A] active:bg-[#90B5EA] active:text-[#FFFFFF] hover:bg-[#90B5EA] hover:text-[#FFFFFF]">
          {item}
        </button>
      ))}
    </div>
  );
};

export default IngredientCategoryList;
