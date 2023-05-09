import React from 'react';
import { useState } from 'react';
import PillImg from '../../public/jong_pill.svg';
// import { Heart, HeartFill } from '@emotion-icons/bootstrap';
import PillDetailInfo from './PillDetailInfo';
import PillDetailReview from './PillDetailReview';
import tw from 'twin.macro';
import styled from '@emotion/styled';

function PillDetailMain(): React.ReactElement {
  const [infoSwitch, setInfoSwitch] = useState<boolean>(true);
  const [like, setLike] = useState<boolean>(true);

  //제품상세정보<->리뷰
  const switchInfo = () => {
    setInfoSwitch(true);
  };

  const switchReview = () => {
    setInfoSwitch(false);
  };

  //좋아요 on/off
  const likeOrNot = () => {
    setLike(!like);
  };

  return (
    <div className="h-[100vh] mt-20">
      <div className="mx-4">
        <PillImg className="w-1/2 mx-auto my-6" />

        <div>
          <div className="grid grid-cols-12">
            <div className="grid content-center col-span-8 row-span-3 ml-1 text-sm font-light text-gray-500">
              종근당
            </div>
            <div className="grid content-center col-span-3 row-span-3 justify-items-end">
              <button className="w-24 h-6 text-gray-500 badge badge-outline">
                비교하기
              </button>
            </div>
            <div className="grid content-center col-span-1 justify-items-end">
              <button onClick={likeOrNot}>
                {/* {like ? (
                  <HeartFillComponent className="w-8 h-8 pr-4 text-red-500" />
                ) : (
                  <HeartComponent className="w-8 h-8 pr-4 text-red-500" />
                )} */}
              </button>
            </div>
          </div>

          <div className="mt-2 text-xl font-medium bg-yellow-200">
            비타민B 군 비타민비 고농축 고함량 활성 수용성
          </div>
          <div className="mt-5 shadow-md ">
            영양제 설명설명설명
            <br />
            건강에 좋고 어쩌구 저쩌구
            <br />
            몸도 튼튼 마음도 튼튼
          </div>
        </div>
      </div>
      {/*여기는 파란부분 */}
      <div className="bg-[#F2F9FF] mt-8 pt-6 pb-8">
        <hr className="mx-4" />
        <div className="grid grid-cols-2 py-4 mx-4 bg-white tabs justify-items-center">
          <div className="col-span-1">
            <button
              className={`w-full font-semibold ${
                infoSwitch ? 'text-blue-500' : 'text-black'
              }`}
              onClick={switchInfo}
            >
              제품상세정보
            </button>
          </div>
          <div className="col-span-1">
            <button
              className={`w-full font-semibold ${
                infoSwitch ? 'text-black' : 'text-blue-500'
              }`}
              onClick={switchReview}
            >
              리뷰
            </button>
          </div>
        </div>
        <hr className="mx-4" />
        <div className="mx-4">
          {infoSwitch ? <PillDetailInfo /> : <PillDetailReview />}
        </div>
      </div>
    </div>
  );
}

export default PillDetailMain;
