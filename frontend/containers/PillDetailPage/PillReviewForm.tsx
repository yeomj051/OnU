import React from 'react';
import { useState } from 'react';

type Props = {};

function PillReviewForm({}: Props) {
  const [rating, setRating] = useState<number>(5);
  const [reviewContent, setReviewContent] = useState<string>('');

  const handleStarClick = (e) => {
    setRating(Number(e.target.value));
  };

  const setReviewValue = (e) => {
    setReviewContent(e.target.value);
    console.log(reviewContent);
  };

  const submitReview = () => {
    //별점이랑 리뷰 axios
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
          <div className="px-10 bg-gray-100">
            <div>
              <p className="py-2 mt-5">별점을 등록해주세요</p>
              <div className="rating">
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  value={1}
                  onClick={handleStarClick}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  value={2}
                  onClick={handleStarClick}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  value={3}
                  onClick={handleStarClick}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  value={4}
                  onClick={handleStarClick}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  value={5}
                  onClick={handleStarClick}
                />
              </div>
            </div>
            <div>
              <p className="mt-10">리뷰 작성</p>
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
