import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import ButtonGroup from './ButtonGroup';
import Profile from './Profile';
import { useCalendar } from '@/apis/hooks';
import userStore from '@/store/userStore';

const MyPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [userId, setUserId] = useState(0);
  const [mark, setMark] = useState();
  const { id } = userStore();

  React.useEffect(() => {
    setUserId(id);
    setIsClient(true);
  }, []);

  const { data, isLoading, isSuccess, error } = useCalendar(userId);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return <div>오류가 발생했습니다.</div>;
  }

  if (!data) {
    return <div>404 Not found</div>;
  }

  const formatDate = (date: Date): string => {
    console.log(date.toString().split(' ')[2]);
    return date.toString().split(' ')[2];
  };
  // setMark(data);

  console.log(data);
  return (
    <div className="flex flex-col items-center space-y-4 min-h-[100vh]">
      {/* <div id="header">헤더에요</div> */}
      <Profile />
      <div id="calendar">
        <p className="ml-2 text-xl font-extrabold text-[#1E266E] mb-2">
          나의 복용일수 체크하기
        </p>
        {isClient && (
          <Calendar
            // onChange={onChange} // useState로 포커스 변경 시 현재 날짜 받아오기
            // formatDay={(locale, date) => date.formatDate('DD')} // 날'일' 제외하고 숫자만 보이도록 설정
            formatDay={(locale, date) => formatDate(date)} // ��'일' �
            // value={value}
            minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
            maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
            showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
            className="w-full mx-auto text-sm text-center border-b"
            // tileContent={({ date, view }) => {
            //   // 날짜 타일에 컨텐츠 추가하기 (html 태그)
            //   // 추가할 html 태그를 변수 초기화
            //   let html = [];
            //   // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
            //   if (
            //     mark.find(
            //       (x) => x === moment(date).format('YYYY-MM-DD'),
            //     )
            //   ) {
            //     html.push(<div className="dot"></div>);
            //   }
            //   // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
            //   return (
            //     <>
            //       <div className="flex items-center justify-center absoluteDiv">
            //         {html}
            //       </div>
            //     </>
            //   );
            // }}
          />
        )}
      </div>
    </div>
  );
};

export default MyPage;
