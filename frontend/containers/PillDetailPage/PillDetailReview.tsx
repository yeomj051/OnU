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
  const [statistic, setStatistic] = useState<Array<number>>([
    0, 0, 0, 0, 0,
  ]);
  const [average, setAverage] = useState<number>(0);
  const [graphValue, setGraphValue] = useState<Array<number>>([
    0, 0, 0, 0, 0,
  ]);

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
      {
        nickname: '약최고',
        age: 13,
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

  useEffect(() => {
    makeStatistics();
  }, [reviewList]);

  useEffect(() => {
    averageScore();
    makeGraphRate();
  }, [statistic]);

  //별점마다 개수 세는 함수
  const makeStatistics = () => {
    let scoreArray = [0, 0, 0, 0, 0];

    reviewList.map((review, idx) => {
      scoreArray[review.rate - 1]++;
    });
    setStatistic(scoreArray);
  };

  //별점 평균내는 함수
  const averageScore = () => {
    let sum = 0;
    for (let i = 0; i < 5; i++) {
      sum += statistic[i] * (i + 1);
    }
    setAverage(Number((sum / reviewList.length).toFixed(1)));
  };

  //리뷰 그래프 비율계산하는 함수
  const makeGraphRate = () => {
    let scoreArrayForGraph = [0, 0, 0, 0, 0];

    for (let i = 0; i < 5; i++) {
      let tmp = (statistic[i] / reviewList.length) * 100;
      if (0 < tmp && tmp < 10) {
        scoreArrayForGraph[i] = 5;
      } else if (tmp == 0) {
        scoreArrayForGraph[i] = 0;
      } else if (tmp == 100) {
        scoreArrayForGraph[i] = 100;
      } else {
        scoreArrayForGraph[i] = Math.round(tmp / 10) * 10;
      }
    }
    console.log(scoreArrayForGraph);
    setGraphValue(scoreArrayForGraph);
  };

  return (
    <div>
      <div className="bg-[#FFFCED] h-[250px] px-5 rounded-lg mt-3">
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

        <div className="bg-white pb-2 mt-3 grid grid-cols-2 rounded-lg">
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

            <div className="text-center h-5">{average} / 5</div>
            <label
              htmlFor="my-modal-6"
              className="btn btn-primary w-40 rounded-xl text-white"
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
          <div className="col-span-1">
            <div className="w-5/6 h-36 mx-auto my-2">
              <div className="grid grid-cols-5 text-center pt-6">
                {graphValue.map((value, idx) => (
                  <div className="col-span-1 rounded-lg">
                    <div
                      className="tooltip tooltip-open"
                      data-tip={statistic[idx]}
                    ></div>
                    <div className="bg-gray-100 w-1/3 h-20 mx-auto flex items-stretch rounded-lg">
                      <div
                        className={`bg-blue-100 w-full h-[${value}%] self-end rounded-lg`}
                      ></div>
                    </div>
                    <div className="text-gray-600 tx-sm">
                      {5 - idx}점
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
