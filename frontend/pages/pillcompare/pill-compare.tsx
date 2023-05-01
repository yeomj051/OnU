import React from 'react';
import { NextPageWithLayout } from '../_app';
import AppLayout from '@/components/layout/AppLayout';
import HeaderLayout from '@/components/layout/HeaderLayout';
import PillCompareMain from '@/containers/PillComparePage/PillCompareMain';

type Props = {};

const PillCompare: NextPageWithLayout = () => {
  return <PillCompareMain />;
};

PillCompare.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default PillCompare;
