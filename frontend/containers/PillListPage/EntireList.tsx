//전체 영양제 리스트
//'use client'

import React, { useState } from 'react';
import { SearchBar } from '@/components/common/SearchBar';
import IngredientList from '@/containers/PillListPage/IngredientCategoryList';
import WorryList from '@/containers/PillListPage/WorryCategoryList';
import ItemList from '@/containers/PillListPage/ItemList';

const EntireList = () => {
  //false : 성분별 클릭, true : 고민별 클릭
  const [tabState, setTabState] = useState<boolean>(false);

  return (
    <div className="grid grid-rows h-[100vh] bg-white pt-20 mx-4 space-y-8">
      <SearchBar />
      <div id="list">
        <label className="ml-2 text-xl font-extrabold text-[#1E266E]">
          영양제 한눈에 보기
        </label>
        <hr className="mt-2 mb-4" />
        <div id="list-header" className="flex justify-center w-full">
          <a
            className={
              tabState
                ? 'w-1/2 tab tab-bordered'
                : 'w-1/2 tab tab-bordered tab-active'
            }
            onClick={(): void => setTabState(false)}
          >
            성분별
          </a>
          <a
            className={
              tabState
                ? 'w-1/2 tab tab-bordered tab-active'
                : 'w-1/2 tab tab-bordered'
            }
            onClick={(): void => setTabState(true)}
          >
            고민별
          </a>
        </div>
        {tabState ? <WorryList /> : <IngredientList />}

        <div id="list-body">
          <ItemList />
          <div id="ingredient-list"></div>
          <div id="worry-list"></div>
        </div>
      </div>
      <div id="drawer">
        <div id="compare-box"></div>
      </div>
    </div>
  );
};

export default EntireList;
