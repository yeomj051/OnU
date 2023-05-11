import axios from 'axios';
import React from 'react';
import { useState } from 'react';

type Props = {};

function PillReviewForm({}: Props) {
  const [rating, setRating] = useState<number>(5);
  const [reviewContent, setReviewContent] = useState<string>('');

  const handleStarClick = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    const target = e.target as HTMLInputElement;
    setRating(Number(target.value));
  };

  const setReviewValue = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReviewContent(e.target.value);
  };

  const submitReview = () => {
    //별점이랑 리뷰 axios
    axios
      .post(
        'https://k8a703.p.ssafy.io/api/nutrient/${nutrientId}/${userId}',
        {
          reviewContent: { reviewContent },
          reviewScore: { rating },
        },
      )
      .then((res) => console.log(res));
  };

  return (
    <div>
      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id="my-modal-6"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">
            리뷰 작성하기
          </h3>
          <label
            htmlFor="my-modal-6"
            className="btn btn-sm btn-circle bg-black absolute right-6 top-6"
          >
            ✕
          </label>
          <div className="px-10 mt-10 bg-gray-100">
            <div className="grid grid-cols-2">
              <div className="py-2 mt-5 pt-5 cols-span-1">
                별점을 등록해주세요
              </div>
              <div className="rating cols-span-1 mt-5 pt-5">
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400 w-10"
                  value="1"
                  onClick={handleStarClick}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400 w-10"
                  value="2"
                  onClick={handleStarClick}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400 w-10"
                  value="3"
                  onClick={handleStarClick}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400 w-10"
                  value="4"
                  onClick={handleStarClick}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400 w-10"
                  value="5"
                  onClick={handleStarClick}
                />
              </div>
            </div>
            <div className="pb-5">
              <p className="mt-10 pb-2">리뷰 작성</p>
              <textarea
                className="textarea textarea-primary w-full"
                placeholder="리뷰를 작성해주세요"
                onChange={setReviewValue}
              ></textarea>
            </div>
          </div>

          <div className="modal-action">
            <label
              htmlFor="my-modal-6"
              className="btn"
              onClick={submitReview}
            >
              등록
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PillReviewForm;
