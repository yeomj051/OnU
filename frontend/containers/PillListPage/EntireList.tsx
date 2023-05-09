//'use client'

import React, { useState } from 'react';
import { SearchBar } from '@/components/common/SearchBar';
import ItemList from '@/containers/PillListPage/ItemList';
import WorryCategoryList from '@/containers/PillListPage/WorryCategoryList';
import IngredientCategoryList from '@/containers/PillListPage/IngredientCategoryList';
import CompareDrawer from '@/components/common/Drawer';

type Item = {
  id: number; //itemId
  name: string; //제품명
  manufacturer?: string; //제조사
  imgUrl: string; //썸네일 이미지
  itemUrl: string; //상세정보 링크
};

const itemDataList: Array<Item> = [
  {
    id: 1,
    name: '간에 좋은 유기농 밀크씨슬 실리마린',
    manufacturer: '락티브',
    imgUrl:
      'data:image/webp;base64,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 ',
    itemUrl: '',
  },
  {
    id: 2,
    name: '프리미엄 밀크씨슬 골드',
    manufacturer: '뉴트리디데이',
    imgUrl:
      'data:image/jpeg;base64,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',
    itemUrl: '',
  },
  {
    id: 3,
    name: '베이직 뉴트리언트 투퍼데이',
    manufacturer: '쏜리서치',
    imgUrl:
      'data:image/jpeg;base64,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',
    itemUrl: '',
  },
];

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
        {tabState ? (
          <WorryCategoryList />
        ) : (
          <IngredientCategoryList />
        )}

        <div id="list-body">
          {tabState ? (
            <div id="ingredient-list">
              <ItemList itemList={itemDataList} />
            </div>
          ) : (
            <div id="worry-list">
              <ItemList itemList={itemDataList} />
            </div>
          )}
        </div>
      </div>
      <CompareDrawer />
    </div>
  );
};

export default EntireList;
