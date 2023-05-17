import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import api from '@/apis/config';
import useUserStore from '@/store/userStore';
import { AxiosResponse } from 'axios';
import TimePicker from '@/components/common/TimePicker';

export const MyCalendar = (): React.ReactElement => {
  const [value, setValue] = useState<Date>(new Date());
  const [dateData, setDateData] = useState<string>(
    `${value.getFullYear()}-${
      value.getMonth() + 1 < 10
        ? `0${value.getMonth() + 1}`
        : value.getMonth() + 1
    }`,
  );

  const [isClient, setIsClient] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(-1);
  const [mark, setMark] = useState<string[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  useEffect((): void => {
    const id = useUserStore.getState().user?.id;
    if (id) setUserId(id);
    else
      setUserId(
        Number.parseInt(localStorage.getItem('userId') as string),
      );

    setIsClient(true);
  }, []);

  useEffect(() => {
    if (dateData && userId !== -1) getCal();
  }, [userId, dateData]);

  const getCal = async () => {
    await api.getCalendar(userId, dateData).then((res): void => {
      // setMark(res.data.checkedDate.takingDateDate);
      setMark(['2023-05-11', '2023-05-10', '2023-04-10']);
    });

    await api.checkPill(userId).then((res: AxiosResponse) => {
      setStreak(res.data.continuousCount);
    });
  };
  const formatDate = (date: Date): string => {
    return date.toString().split(' ')[2];
  };

  const formatDate2 = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const result = `${year}-${
      month < 10 ? `0${month}` : month
    }-${day}`;
    // console.log(result);
    return result;
  };

  return (
    <div id="calendar">
      <p className="ml-2 text-xl font-extrabold text-[#1E266E] mb-1 text-left">
        나의 복용일수 체크하기
      </p>
      <p className="ml-2 text-sm font-base text-[black] mb-2 text-left">
        현재 {streak}일 연속 복용중!
      </p>
      <TimePicker />
      {isClient && (
        <Calendar
          onChange={() => {
            setValue(value);
          }} // useState로 포커스 변경 시 현재 날짜 받아오기
          onClickDay={(date) => {
            console.log(formatDate2(date));
          }}
          formatDay={(locale, date: Date): string => formatDate(date)}
          onActiveStartDateChange={({ activeStartDate }): void => {
            const year: number | undefined =
              activeStartDate?.getFullYear();
            const month: number | undefined =
              activeStartDate?.getMonth();

            if (year !== undefined && month !== undefined) {
              setDateData(
                `${year}-${
                  month + 1 < 10 ? `0${month + 1}` : month + 1
                }`,
              );
            }
          }}
          value={value}
          minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
          className="w-full mx-auto text-sm text-center border-b"
          tileContent={({ date }) => {
            // 날짜 타일에 컨텐츠 추가하기 (html 태그)
            // 추가할 html 태그를 변수 초기화
            const html = [];
            // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
            if (mark.find((x) => x === formatDate2(date))) {
              html.push(
                <div
                  className="absolute w-6 h-6 bg-red-400 opacity-50 mb-7 rounded-xl"
                  key={date.toString()}
                />,
              );
            }
            // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
            return (
              <>
                <div className="flex items-center justify-center absoluteDiv">
                  {html}
                </div>
              </>
            );
          }}
        />
      )}
    </div>
  );
};
