import React from 'react';
import { NextPageWithLayout } from '../_app';
import AppLayout from '@/components/layout/AppLayout';
import HeaderLayout from '@/components/layout/HeaderLayout';

const PhoneAuth: NextPageWithLayout = () => {
  return (
    <div className="grid grid-rows h-[100vh] bg-white pt-20">
      <div className="grid grid-cols-4">
        <div className="col-start-2 col-end-4 space-y-2">
          <span className="text-xl font-extrabold">
            전화번호 인증
          </span>
          <br />
          <span className="text-sm text-gray-400 whitespace-nowrap">
            본인확인을 위해 전화번호를 입력해주세요
          </span>
          <div className="pt-4">
            <label className="text-base font-bold label-text">
              휴대전화 번호
            </label>
            <input
              type="text"
              className="w-full h-8 max-w-xs py-1 transition duration-300 ease-in bg-transparent border-b-2 border-b-gray-300 underline-input focus:outline-none"
            ></input>
          </div>

          <button className="bg-[#90B5EA] text-base border-none btn btn-sm btn-wide">
            인증번호 받기
          </button>
        </div>
      </div>
    </div>
  );
};

//레이아웃 적용이 필요하면 getLayout을 호출해주고,
//AppLayout안에 원하는 레이아웃을 중첩시킬 수도 있습니다
//추가로 중첩 안시키면 기본 AppLayout이 적용됨
PhoneAuth.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default PhoneAuth;
