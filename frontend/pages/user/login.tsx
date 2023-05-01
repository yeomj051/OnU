//'use client'

import React, { useEffect } from 'react';
import Head from 'next/head';
import { NextPageWithLayout } from '../_app';
import AppLayout from '@/components/layout/AppLayout';
import HeaderLayout from '@/components/layout/HeaderLayout';
import TextInput from '@/components/common/TextInput';
import Main from '/public/main.svg';
import api from '@/apis/config';

const LoginMain: NextPageWithLayout = () => {
  const [nicknameLabel, setNicknameLabel] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [randomNumber, setRandomNumber] = React.useState(
    Math.floor(Math.random() * 100),
  );

  useEffect((): void => {
    //추후 서버에서 닉네임 중복확인 api를 받아와서 사용
    // api.checkNickname(nickname).then((res) => {
    //   if (res.code === 200) {
    //     setNicknameLabel('사용 가능한 닉네임입니다.');
    //   } else {
    //     setNicknameLabel('사용 불가능한 닉네임입니다');
    //   }
    // });
    if (nickname.length >= 2 && nickname.length <= 15) {
      setNicknameLabel('사용 가능한 닉네임입니다');
    } else if (nickname.length > 15) {
      setNicknameLabel('사용 불가능한 닉네임입니다');
    } else {
      setNicknameLabel('');
    }
    // setNicknameLabel('사용 불가능한 닉네임입니다');
  }, [nickname]);

  const checkNickname = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    e.preventDefault();
    setNickname(e.target.value);
  };

  return (
    <div className="grid grid-rows h-[100vh] bg-white pt-20">
      {/* 로고화면 
        로고가 너무 커서 임시로 주석처리함
      */}
      {/* <div className="w-full h-96 bg-[#D8EDFF] flex justify-center items-center pt-10 pl-10">
        <Main />
      </div> */}
      {/* 폼화면 */}
      <div className="grid grid-cols-4 my-auto">
        <div className="col-start-2 col-end-4">
          <span className="ml-1 text-xl font-extrabold">
            추가정보 입력
          </span>
          <TextInput
            labelTopL="닉네임"
            onChange={checkNickname}
            labelBotR={nicknameLabel}
            value={nickname}
          />
          {nicknameLabel === '사용 불가능한 닉네임입니다' &&
          nickname.length >= 2 &&
          nickname.length <= 15 ? (
            <div className="rounded bg-[#F7F8FA] flex flex-row items-center text-sm space-x-4 m-0 p-2">
              <div>
                <span className="text-[#54C6F2] font-bold">
                  '{nickname + randomNumber}'{' '}
                </span>
                <br />
                <span>이 별명은 어떠신가요? </span>
              </div>
              <button
                className="bg-[#90B5EA] border-none btn btn-sm"
                onClick={() => setNickname(nickname + randomNumber)}
              >
                사용하기
              </button>
            </div>
          ) : null}
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
