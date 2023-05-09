import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import eundan from '@/public/eundan.png';

type Props = {};

function PillAnalysisComb({}: Props) {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const selectThis = (event: React.MouseEvent) => {
    setIsSelected(!isSelected);
  };

  //영양제 조합 삭제API 연결해서 조합 삭제
  const deleteCombination = (event: React.MouseEvent) => {
    //이미 선택되어있는 상태였다면 x를 눌러 삭제했을 때 seledtedList에서 제거해줘야 함
    if (isSelected) {
    }

    event.stopPropagation();
  };

  return (
    <div onClick={selectThis}>
      <div
        className={`${
          isSelected ? 'bg-[#90B5EA]' : 'bg-white'
        } rounded-xl p-2 mb-4`}
      >
        <div className="pb-5 bg-white rounded-xl">
          <div className="grid  justify-items-end">
            <button
              className="absolute w-5 h-5 mt-3 mr-3 text-gray-500"
              onClick={deleteCombination}
            >
              ✕
            </button>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="w-1/3 mt-6">
              <div className="mx-auto bg-white rounded-lg w-28 h-28">
                <div className="relative w-16 h-16 mx-auto">
                  <Image
                    className="w-full h-full"
                    src={eundan}
                    alt="사진깨짐"
                  />
                </div>
                <div className="text-xs leading-3 text-center text-gray-400">
                  고려은단
                </div>
                {/* 디자인상 이유로 영양제 이름 2줄에서 자름 ( 수정 가능 일단 2줄로 설정 ) */}
                <div className="leading-4 text-center line-clamp-2">
                  고려은단비타민C300
                </div>
              </div>
            </div>
            <div className="w-1/3 mt-6">
              <div className="mx-auto bg-white rounded-lg w-28 h-28">
                <div className="relative w-16 h-16 mx-auto">
                  <Image
                    className="w-full h-full"
                    src={eundan}
                    alt="사진깨짐"
                  />
                </div>
                <div className="text-xs leading-3 text-center text-gray-400">
                  고려은단
                </div>
                {/* 디자인상 이유로 영양제 이름 2줄에서 자름 ( 수정 가능 일단 2줄로 설정 ) */}
                <div className="leading-4 text-center line-clamp-2">
                  고려은단비타민C300
                </div>
              </div>
            </div>
            <div className="w-1/3 mt-6">
              <div className="mx-auto bg-white rounded-lg w-28 h-28">
                <div className="relative w-16 h-16 mx-auto">
                  <Image
                    className="w-full h-full"
                    src={eundan}
                    alt="사진깨짐"
                  />
                </div>
                <div className="text-xs leading-3 text-center text-gray-400">
                  고려은단
                </div>
                {/* 디자인상 이유로 영양제 이름 2줄에서 자름 ( 수정 가능 일단 2줄로 설정 ) */}
                <div className="leading-4 text-center line-clamp-2">
                  고려은단비타민C300
                </div>
              </div>
            </div>
            <div className="w-1/3 mt-6">
              <div className="mx-auto bg-white rounded-lg w-28 h-28 ">
                <div className="relative w-16 h-16 mx-auto">
                  <Image
                    className="w-full h-full"
                    src={eundan}
                    alt="사진깨짐"
                  />
                </div>
                <div className="text-xs leading-3 text-center text-gray-400">
                  고려은단
                </div>
                {/* 디자인상 이유로 영양제 이름 2줄에서 자름 ( 수정 가능 일단 2줄로 설정 ) */}
                <div className="leading-4 text-center line-clamp-2">
                  고려은단비타민C300
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PillAnalysisComb;
