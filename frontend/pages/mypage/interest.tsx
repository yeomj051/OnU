// 'use client';
import React from 'react';
import Profile from '@/containers/MyPage/Profile';
import AppLayout from '@/components/layout/AppLayout';
import { NextPageWithLayout } from '../_app';
import Interest from '@/containers/MyPage/MyInterest';

const MyInterestPage: NextPageWithLayout = (): React.ReactElement => {
  return (
    <div className="flex flex-col items-center space-y-4 min-h-[100vh]">
      <Profile />
      <Interest />
    </div>
  );
};

MyInterestPage.getLayout = function getLayout(
  page: React.ReactElement,
) {
  return <AppLayout>{page}</AppLayout>;
};

export default MyInterestPage;
