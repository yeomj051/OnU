import CardSlider from '@/components/common/CardSlider';
import { NextPageWithLayout } from './_app';
import AppLayout from '@/components/layout/AppLayout';
import HeaderLayout from '@/components/layout/HeaderLayout';
import EntireList from '@/containers/PillListPage/EntireList';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useUserStore from '@/store/userStore';

const Home: NextPageWithLayout = (): React.ReactElement => {
  const router = useRouter();
  const [userId, setUserId] = useState<number>();
  useEffect(() => {
    setUserId(useUserStore.getState().user?.id);
  }, []);

  const goSurvey = () => {
    if (Number.isNaN(userId) || userId === undefined) {
      router.push('/user/login');
      alert('로그인이 필요한 서비스입니다.');
    } else {
      router.push('/survey');
    }
  };

  return (
    <div>
      <CardSlider />
      <div className="flex justify-center pt-6">
        <div
          className="hero w-[300px] h-[200px] sm:w-[450px] sm:h-[180px] opacity-100 rounded-lg shadow-xl"
          style={{
            backgroundImage: `url(
            'https://images.unsplash.com/photo-1628088061698-e4f4cd2969bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
          )`,
          }}
          onClick={goSurvey}
        >
          {/* <div className="flex flex-col items-baseline pt-4 pl-40 sm:pl-56 sm:pt-12 hero-overlay rounded-lg text-white w-[300px] h-[180px] sm:w-[400px] sm:h-[240px] whitespace-pre-line cursor-pointer"> */}
          <div className="flex flex-col items-baseline pb-12 pl-40 text-white cursor-default">
            <p className="text-sm font-semibold">지금 나에게</p>
            <p className="text-sm font-semibold ">필요한 영양제가</p>
            <p className="text-sm font-semibold sm:text-md">
              무엇인지 궁금하다면?
            </p>
          </div>

          <span className="pl-64 font-extrabold text-md sm:text-lg flex flex-col items-baseline pt-32 text-white hover:text-[#1E266E]">
            설문하러 가기 {'>'}
          </span>
          {/* </div> */}
        </div>
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
