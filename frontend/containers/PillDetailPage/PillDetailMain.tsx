import React from 'react';
import { useState } from 'react';
import PillImg from '../../public/jong_pill.svg';
import { Heart, HeartFill } from '@emotion-icons/bootstrap';
import PillDetailInfo from './PillDetailInfo';
import PillDetailReview from './PillDetailReview';
import tw from 'twin.macro';

type Props = {};

const ButtonToChange = tw.button`
w-full font-semibold

`;

function PillDetailMain({}: Props): React.ReactElement {
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
    <div className="h-[100vh]">
      <div className="mx-4">
        <PillImg className="mx-auto my-6 w-1/2" />

        <div>
          <div className="grid grid-cols-12">
            <div className="col-span-8 text-sm font-light text-gray-500 grid row-span-3 content-center ml-1">
              종근당
            </div>
            <div className="col-span-3 grid justify-items-end row-span-3 content-center">
              <button className="badge badge-outline text-gray-500 w-24 h-6">
                비교하기
              </button>
            </div>
            <div className="col-span-1 grid justify-items-end content-center">
              <button onClick={likeOrNot}>
                {like ? (
                  <HeartFill className="w-8 h-8 text-red-500 pr-4" />
                ) : (
                  <Heart className="w-8 h-8 text-red-500 pr-4" />
                )}
              </button>
            </div>
          </div>

          <div className="bg-yellow-200 text-xl font-medium mt-2">
            비타민B 군 비타민비 고농축 고함량 활성 수용성
          </div>
          <div className=" mt-5 shadow-md">
            영양제 설명설명설명
            <br />
            건강에 좋고 어쩌구 저쩌구
            <br />
            몸도 튼튼 마음도 튼튼
          </div>
        </div>
      </div>
      {/*여기는 파란부분 */}
      <div className="bg-[#F2F9FF] mt-8 h-full pt-6">
        <hr />
        <div className="tabs grid grid-cols-2 justify-items-center py-4 bg-white">
          <div className="col-span-1">
            <ButtonToChange onClick={switchInfo}>
              제품상세정보
            </ButtonToChange>
          </div>
          <div className="col-span-1">
            <ButtonToChange onClick={switchReview}>
              리뷰
            </ButtonToChange>
          </div>
        </div>
        <hr />
        <div className="mx-4">
          {infoSwitch ? <PillDetailInfo /> : <PillDetailReview />}
        </div>
      </div>
    </div>
  );
}

export default PillDetailMain;
