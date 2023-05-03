import React from 'react';
import { useState, useEffect } from 'react';

import { StarFill } from '@emotion-icons/bootstrap';
import PillReviewForm from './PillReviewForm';
import tw from 'twin.macro';
import styled from 'styled-components';
import PillDetailReviewBox from './PillDetailReviewBox';

type Props = {};

type PersonalReview = {
  nickname: string;
  age: number;
  gender: string;
  date: string;
  rate: number;
  review: string;
};

// const StarRating = styled.div`
//   color: #aaa9a9;
//   position: relative;
//   unicode-bidi: bidi-override;
//   width: max-content;
//   -webkit-text-fill-color: transparent;
//   -webkit-text-stroke-width: 1.3px;
//   -webkit-text-stroke-color: #2b2a29;
// `;

// const RatingBase = styled.div`
//   ${tw`pt-5 space-x-1 text-red-100 w-7`}

//   star-ratings-base {
//     z-index: 0;
//     padding: 0;
//   }
// `;

// const RatingFill = styled.div`
//   ${tw`pt-5 space-x-1 text-red-400 w-7`}

//   star-ratings-fill {
//     position: absolute;
//     z-index: 1;
//     display: flex;
//     top: 0;
//     left: 0;
//     overflow: hidden;
//     -webkit-text-fill-color: gold;
//   }
// `;

function PillDetailReview({}: Props) {
  const [wantReview, setWantReview] = useState<boolean>(false);
  const [starRate, setStarRate] = useState<number>(80);
  const [reviewList, setReviewList] = useState<Array<PersonalReview>>(
    [],
  );

  const openReviewForm = () => {
    setWantReview(true);
  };

  //별점 구현
  //별점
  // const [rate, setRate] = useState<number>(80);
  // const starInde = ['first', 'second', 'third', 'fourth', 'fifth'];
  // const [ratesStatus, setRateStatus] = useState<number[]>([
  //   0, 0, 0, 0, 0,
  // ]);

  // const calcStarRate = () => {
  //   let tempStarRates = [0, 0, 0, 0, 0];
  //   let starVerScore = (rate * 140) / 100;
  //   let idx = 0;

  //   while (starVerScore > 28) {
  //     tempStarRates[idx] = 28;
  //     idx += 1;
  //     starVerScore -= 28;
  //   }
  //   tempStarRates[idx] = starVerScore;
  //   return tempStarRates;
  // };

  // useEffect(() => {
  //   setRateStatus(calcStarRate);
  // }, []);

  const Items = {
    data: [
      {
        nickname: '약먹자',
        age: 25,
        gender: 'm',
        date: '23.05.01.(월)',
        rate: 4,
        review:
          '체력이 너무 떨어져서 사먹었는데 몸이 좋아졌어요 강추^^가족들이랑 같이 먹어요 색도 노란색이라 귀여움 봄에 먹기 딱입니다.. 봄이지만 외부활동 별로 안하시고 기운없고 피곤한 사람이라면 그냥 사서 먹으세요 얼ㄹㄹㄹ른....',
      },
      {
        nickname: '약싫어싫어',
        age: 42,
        gender: 'f',
        date: '23.05.01.(월)',
        rate: 3,
        review:
          '체력이 너무 떨어져서 사먹었는데 몸이 안 좋아졌어요 비추^^ 너무 비싸고 색도 노란색이라 귀엽기만 함.  봄에 먹기 딱이긴 합니다.. 봄이니까 그냥 운동이나 해서 체력을 키워보세요 구매 ㄴㄴ',
      },
    ],
  };

  useEffect(() => {
    setReviewList(Items.data);
  }, []);

  return (
    <div>
      <div className="bg-[#FFFCED] h-[250px] px-5 py-30 rounded-lg mt-3">
        <div className="pt-6">
          <div className="grid grid-cols-2">
            <div className="col-span-1 grid justify-center">
              총 평점
            </div>
            <div className="col-span-1 grid justify-center">
              평점 비율
            </div>
          </div>
        </div>

        <div className="bg-white h-[160px] mt-5 grid grid-cols-2 rounded-lg">
          <div className="col-span-1  grid justify-center">
            <div className=" z-40 my-6 border border-blue-950 overflow-hidden">
              {/* starbox */}
              <div
                className="text-[#FFE70D] flex z-10 relative h-8 w-[100px]"
                // className={` text-[#FFE70D] flex z-10 w-[${starRate}%] absolute`}
                style={{ width: starRate }}
              >
                {/* pointOfStar */}

                <StarFill />
                <StarFill />
                <StarFill />
                <StarFill />
                <StarFill />
              </div>

              {/* backgroundStar */}
              <div className="text-gray-200 flex absolute h-8 w-[100px]">
                {/* <StarFill className="w-[35px]" />
                <StarFill className="w-[35px]" />
                <StarFill className="w-[35px]" />
                <StarFill className="w-[35px]" />
                
                <StarFill className="w-[35px]" /> */}
                <StarFill />
                <StarFill />
                <StarFill />
                <StarFill />
                <StarFill />
              </div>
            </div>

            <div className="text-center h-5">4.5 / 5</div>
            <label
              htmlFor="my-modal-6"
              className="btn btn-primary w-40 h-10 rounded-xl text-white"
              style={{
                backgroundColor: '#90B5EA',
                width: '170px',
                height: '30px',
                border: 'none',
              }}
              onClick={openReviewForm}
            >
              리뷰 작성하기
            </label>
          </div>
          <div className="col-span-1 bg-green-200">
            <div></div>
          </div>
        </div>
      </div>
      {wantReview && <PillReviewForm />}
      {reviewList.map((review, idx) => (
        <PillDetailReviewBox key={idx} review={review} />
      ))}
    </div>
  );
}

export default PillDetailReview;
