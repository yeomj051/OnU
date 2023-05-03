//전체 영양제 리스트
//'use client'

import React, { useEffect } from 'react';
import { NextPageWithLayout } from '../_app';
import AppLayout from '@/components/layout/AppLayout';
import HeaderLayout from '@/components/layout/HeaderLayout';

import { SearchBar } from '@/components/common/SearchBar';

const EntireList: NextPageWithLayout = () => {
  return (
    <div className="grid grid-rows h-[100vh] bg-white pt-20">
      <SearchBar />
      <div id="list">
        <div id="list-header" />
        {/* 성분별, 고민별 탭, 그에 따른 카테고리들 들어갈곳 */}
        <div id="list-body">
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

//레이아웃 적용이 필요하면 getLayout을 호출해주고,
//AppLayout안에 원하는 레이아웃을 중첩시킬 수도 있습니다
//추가로 중첩 안시키면 기본 AppLayout이 적용됨
EntireList.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default EntireList;
