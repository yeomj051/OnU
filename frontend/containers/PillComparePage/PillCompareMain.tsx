import React from 'react';
import { useState } from 'react';
import PillImg from '../../public/jong_pill.svg';
import { Heart, HeartFill } from '@emotion-icons/bootstrap';
import PillCompareBadge from './PillCompareBadge';
import PillCompareImg from './PillCompareImg';
import PillCompareContent from './PillCompareContent';

type Props = {};

function PillCompareMain({}: Props) {
  const [fisrtLike, setFirstLike] = useState<boolean>(true);
  const [secondLike, setSecondLike] = useState<boolean>(true);
  const [firstList, setFirstList] = useState<string[]>([
    'Haccp',
    'GMP',
  ]);
  const [secondList, setSecondList] = useState<string[]>(['Haccp']);

  //좋아요 on/off
  const fisrtLikeOrNot = () => {
    setFirstLike(!fisrtLike);
  };

  const secondLikeOrNot = () => {
    setSecondLike(!secondLike);
  };

  return (
    <div className="h-[100%] mt-20">
      <div className="mx-4 grid grid-cols-2">
        <div className="col-span-1 pr-2">
          <PillImg className="mx-auto my-6 w-1/2" />

          <div>
            <div className="grid grid-cols-4">
              <div className="col-span-3 text-sm font-light text-gray-500 grid row-span-3 content-center ml-1">
                종근당
              </div>

              <div className="col-span-1 grid justify-items-end content-center">
                <button onClick={fisrtLikeOrNot}>
                  {fisrtLike ? (
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
          </div>
        </div>
        <div className="col-span-1 pl-2">
          <PillImg className="mx-auto my-6 w-1/2" />

          <div>
            <div className="grid grid-cols-4">
              <div className="col-span-3 text-sm font-light text-gray-500 grid row-span-3 content-center ml-1">
                종근당
              </div>

              <div className="col-span-1 grid justify-items-end content-center">
                <button onClick={secondLikeOrNot}>
                  {secondLike ? (
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
          </div>
        </div>
      </div>
      {/*여기는 파란부분 */}
      <div className="bg-[#F2F9FF] mt-8 h-full pt-6">
        {/* <hr className="mx-4" />
        <div className="tabs grid justify-items-center py-4 bg-white mx-4">
          <div className="">인증 정보</div>
        </div>
        <hr className="mx-4" />
        <div className="mx-4">
          <div className="grid grid-cols-2 py-2">
            <div className="bg-white col-span-1 border rounded-lg h-20 mr-2"></div>
            <div className="bg-white col-span-1 border  rounded-lg h-20 ml-2"></div>
          </div>
        </div> */}
        <PillCompareBadge
          subject="인증정보"
          first={firstList}
          second={secondList}
        />
        <PillCompareBadge
          subject="기능성"
          first={firstList}
          second={secondList}
        />
        <PillCompareImg
          subject="제형"
          first={firstList}
          second={secondList}
        />
        <hr className="mx-4" />
        <div className="tabs grid justify-items-center py-4 bg-white mx-4">
          <div className="">영양 성분</div>
        </div>
        <hr className="mx-4" />
        <div className="mx-4 mb-6">
          <div className="grid grid-cols-7 py-2 bg-white">
            <div className="col-span-3">뭐야?</div>
            <div className="col-span-1">비타민A</div>
            <div className="col-span-3">뭐야?</div>
          </div>
        </div>
        <PillCompareContent subject="섭취 시 주의사항" />
        <PillCompareBadge
          subject="원료"
          first={firstList}
          second={secondList}
        />
      </div>
    </div>
  );
}

export default PillCompareMain;
