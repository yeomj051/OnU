// 'use client';

import React from 'react';
import Profile from '@/containers/MyPage/Profile';

import { NextPageWithLayout } from '../_app';
import AppLayout from '@/components/layout/AppLayout';
import { MyCalendar } from '@/containers/MyPage/Calendar';

const MyPage: NextPageWithLayout = (): React.ReactElement => {
  return (
    <div className="flex flex-col items-center text-center space-y-4 min-h-[100vh]">
      {/* <div id="header">헤더에요</div> */}
      <Profile />
      {/** 여기에 영양분석 배너 추가 */}
      <MyCalendar />
    </div>
  );
};

MyPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default MyPage;
