import MyPage from '@/containers/MyPage/MyPage';
import { NextPageWithLayout } from '../_app';
import AppLayout from '@/components/layout/AppLayout';

const MyPageMain: NextPageWithLayout = (): React.ReactElement => {
  return <MyPage />;
};

MyPageMain.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default MyPageMain;
