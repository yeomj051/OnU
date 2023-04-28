//'use client'

import React from 'react';
import Head from 'next/head';
import { NextPageWithLayout } from '../_app';
import AppLayout from '@/components/layout/AppLayout';
import HeaderLayout from '@/components/layout/HeaderLayout';
import TextInput from '@/components/common/TextInput';
import Main from '/public/main.svg';
import api from '@/apis/config';

const LoginMain: NextPageWithLayout = () => {
  const [nicknameLabel, setNicknameLabel] = React.useState('');

  const checkNickname = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    e.preventDefault();
    const nickname: string = e.target.value;
    //추후 서버에서 닉네임 중복확인 api를 받아와서 사용
    // api.checkNickname(nickname).then((res) => {
    //   if (res.code === 200) {
    //     setNicknameLabel('사용 가능한 닉네임입니다.');
    //   } else {
    //     setNicknameLabel('사용 불가능한 닉네임입니다');
    //   }
    // });
    if (nickname.length >= 4 && nickname.length < 10)
      setNicknameLabel('사용 가능한 닉네임입니다.');
    else if (nickname.length >= 10)
      setNicknameLabel('사용 불가능한 닉네임입니다');
    else setNicknameLabel('');
  };

  return (
    <div className="grid grid-rows-2 bg-white">
      {/* 로고화면 */}
      <div className="w-full h-72 bg-[#D8EDFF] flex justify-center items-center pl-10">
        <Main />
      </div>
      {/* 폼화면 */}
      <div className="grid grid-cols-4">
        <div className="col-start-2 col-end-4 my-2">
          <span className="ml-1 text-xl font-extrabold">
            추가정보 입력
          </span>
          <TextInput
            labelTopL="닉네임"
            onChange={checkNickname}
            labelBotR={nicknameLabel}
          />
          <TextInput labelTopL="생년월일" />
          <div className="flex justify-between mb-4">
            <span className="pl-1 font-bold">성별</span>
            <div className="flex space-x-2">
              <div className="flex flex-row space-x-1">
                <input
                  type="radio"
                  name="radio-2"
                  className="radio radio-info"
                  checked
                />
                <span>남성</span>
              </div>
              <div className="flex flex-row space-x-1">
                <input
                  type="radio"
                  name="radio-2"
                  className="radio radio-info"
                />
                <span>여성</span>
              </div>
            </div>
          </div>
          <button className="bg-[#90B5EA] text-lg border-none btn btn-wide ">
            회원가입 완료
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
