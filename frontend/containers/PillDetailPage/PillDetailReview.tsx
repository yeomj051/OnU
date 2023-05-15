import React from 'react';
import { useState, useEffect } from 'react';

import PillReviewForm from './PillReviewForm';
import PillDetailReviewBox from './PillDetailReviewBox';
import PillDetailRate from './PillDetailRate';
import StarRating from '@/components/common/StarRating';
import { usePillReviewList } from '@/apis/hooks';
import api from '@/apis/config';
import axios from 'axios';

type reviewContents = {
  userNickname: string;
  nutrientName: string;
  reviewContent: string;
  userAge: number;
  userGender: string;
  reviewScore: number;
  reviewCreateTime: string;
  reviewUpdateTime: string;
};

type Props = {
  nutrientId: number;
};

function PillDetailReview(props: Props) {
  const [wantReview, setWantReview] = useState<boolean>(false);
  // const [starRate, setStarRate] = useState<number>(80);
  const [reviewList, setReviewList] = useState<Array<reviewContents>>(
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

  // const { isLoading, data, isError, isSuccess, error } =
  //   usePillReviewList(4002000847);

  // useEffect(() => {
  //   if (isError) {
  //     console.log(error);
  //   }

  //   if (isSuccess) {
  //     setReviewList(data.data.reviewListByNutrient);
  //   }
  // }, []);

  useEffect(() => {
    getReviewData();
  }, []);

  const getReviewData = async () => {
    api
      .getPillReviewList(4002000847)
      .then((res) => setReviewList(res.data.reviewListByNutrient));
  };

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
      const key = idx;
      scoreArray[review.reviewScore - 1]++;
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
  };

  return (
    <div>
      <div className="bg-[#FFFCED] h-[250px] px-5 rounded-lg mt-3">
        <div className="pt-6">
          <div className="grid grid-cols-2">
            <div className="grid justify-center col-span-1">
              총 평점
            </div>
            <div className="grid justify-center col-span-1">
              평점 비율
            </div>
          </div>
        </div>

        <div className="bg-white pb-2 mt-3 grid grid-cols-2 rounded-lg">
          <div className="col-span-1  grid justify-center">
            <div className="grid justify-center mt-3 mb-1">
              <StarRating rating={average} size="detail" />
            </div>

            <div className="text-center h-2 mb-3">{average} / 5</div>
            <label
              htmlFor="my-modal-6"
              className="w-40 text-white btn btn-primary rounded-xl"
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
      {wantReview && <PillReviewForm nutrientId={props.nutrientId} />}
      {reviewList.map((review, idx) => (
        <PillDetailReviewBox key={idx} review={review} />
      ))}
    </div>
  );
}

export default PillDetailReview;
