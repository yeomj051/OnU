import React from 'react';

import PillDetailMain from '@/containers/PillDetailPage/PillDetailMain';
import { NextPageWithLayout } from '../_app';
import HeaderLayout from '@/components/layout/HeaderLayout';
import AppLayout from '@/components/layout/AppLayout';

const PillDetail: NextPageWithLayout = () => {
  return <PillDetailMain />;
};

PillDetail.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};
export default PillDetail;
