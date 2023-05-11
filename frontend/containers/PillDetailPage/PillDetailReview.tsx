import React from 'react';
import { useState, useEffect } from 'react';

import PillReviewForm from './PillReviewForm';
import tw from 'twin.macro';
import PillDetailReviewBox from './PillDetailReviewBox';
import PillDetailRate from './PillDetailRate';
import StarRating from '@/components/common/StarRating';

type Props = {};

type PersonalReview = {
  nickname: string;
  age: number;
  gender: string;
  date: string;
  rate: number;
  review: string;
};

function PillDetailReview({}: Props) {
  const [wantReview, setWantReview] = useState<boolean>(false);
  // const [starRate, setStarRate] = useState<number>(80);
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
  }, [statistic]);

  useEffect(() => {
    makeGraphRate();
  }, [average]);

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
      // console.log(tmp);
    }
    // console.log(scoreArrayForGraph);
    setGraphValue(scoreArrayForGraph);
    console.log(graphValue);
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
            <div className=" bg-red-200 grid justify-center">
              <StarRating rating={average} size="detail" />
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
          {/* 평점 비율 */}
          <PillDetailRate
            graphValue={graphValue}
            statistic={statistic}
          />
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
