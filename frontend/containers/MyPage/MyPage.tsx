import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import ButtonGroup from './ButtonGroup';
import Profile from './Profile';

const MyPage = () => {
  const [isClient, setIsClient] = useState(false);

  const today = new Date();

  React.useEffect(() => {
    setIsClient(true);
  }, []);

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
            // formatDay={(locale, date) => today.formatDate('DD')} // 날'일' 제외하고 숫자만 보이도록 설정
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
