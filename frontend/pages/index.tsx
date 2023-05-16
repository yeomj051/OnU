import { NextPageWithLayout } from './_app';
import AppLayout from '@/components/layout/AppLayout';
import HeaderLayout from '@/components/layout/HeaderLayout';
import EntireList from '@/containers/PillListPage/EntireList';

const Home: NextPageWithLayout = (): React.ReactElement => {
  return (
    <div>
      <div className="relative">
        <img src="https://images.unsplash.com/photo-1628771065518-0d82f1938462?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
        {/* <span className="absolute whitespace-nowrap -translate-x-1/2 top-1/2 left-1/2 text-[#FFFFFF] text-2xl font-bold">
          나에게 맞는 영양제를 먹고 있는걸까?
        </span>
        <span className="absolute whitespace-nowrap translate-y-full top-1/2 left-1/2 text-[#FFFFFF] text-lg font-bold">
          설문하러 가기
        </span> */}
      </div>
      <EntireList />
    </div>
  );
};

//레이아웃 적용이 필요하면 getLayout을 호출해주고,
//AppLayout안에 원하는 레이아웃을 중첩시킬 수도 있습니다
//추가로 중첩 안시키면 기본 AppLayout이 적용됨
Home.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default Home;
