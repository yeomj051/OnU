//'use client'

import React, { useEffect } from 'react';
import { NextPageWithLayout } from '../_app';
import AppLayout from '@/components/layout/AppLayout';
import HeaderLayout from '@/components/layout/HeaderLayout';
import Main from '/public/main.svg';
import Image from 'next/image';
import kakao from '/public/kakao_login_large_wide.png';
import Link from 'next/link';

const LoginMain: NextPageWithLayout = () => {
  useEffect((): void => {}, []);

  return (
    <div className="grid grid-rows h-[100vh] bg-white pt-20">
      {/* 로고화면
       */}
      <div className="w-full h-80 bg-[#D8EDFF] flex justify-center items-center pl-10">
        <Main />
      </div>
      {/* 폼화면 */}
      <div className="grid grid-cols-4">
        <div className="col-start-2 col-end-4">
          <button>
            <Link href="">
              <Image
                src={kakao}
                alt="kakaoLogin"
                width="auto"
                height="auto"
                priority={true}
              />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

//레이아웃 적용이 필요하면 getLayout을 호출해주고,
//AppLayout안에 원하는 레이아웃을 중첩시킬 수도 있습니다
//추가로 중첩 안시키면 기본 AppLayout이 적용됨
LoginMain.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default LoginMain;
