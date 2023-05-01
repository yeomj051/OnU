import React from 'react';

type Props = {};

function PillReviewForm({}: Props) {
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
          <h3 className="font-bold text-lg">리뷰 작성하기</h3>
          <p className="py-4">별점을 등록해주세요</p>
          <div>별점 누를 수 있게</div>
          <p className="">리뷰 작성</p>

          <div className="modal-action">
            <label htmlFor="my-modal-6" className="btn">
              등록
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PillReviewForm;
