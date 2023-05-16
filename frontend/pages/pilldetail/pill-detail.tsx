import React from 'react';

import PillDetailMain from '@/containers/PillDetailPage/PillDetailMain';
import { NextPageWithLayout } from '../_app';
import HeaderLayout from '@/components/layout/HeaderLayout';
import AppLayout from '@/components/layout/AppLayout';
import { useSearchParams } from 'next/navigation';

const PillDetail: NextPageWithLayout = () => {
  const searchParams = useSearchParams();
  const id: string | null = searchParams.get('id');

  return <PillDetailMain itemId={id} />;
};

PillDetail.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};
export default PillDetail;
