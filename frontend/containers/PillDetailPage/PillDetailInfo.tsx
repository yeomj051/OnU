import React from 'react';

type Props = {};

function PillDetailInfo({}: Props) {
  return (
    <div>
      <div className="bg-white min-h-[60px] px-5 py-30 grid grid-cols-6 rounded-lg mt-3">
        <div className="col-span-1 grid content-center">인증정보</div>
        <div className="col-span-5 bg-red-50 grid content-center">
          <div className="badge badge-outline bg-[#90B5EA] ">GMP</div>
        </div>
      </div>
      <div className="bg-white min-h-[60px] px-5 py-30 grid grid-cols-6 rounded-lg mt-3">
        <div className="col-span-1 grid content-center">기능성</div>
        <div className="col-span-5 bg-red-50 grid content-center">
          <div className="badge badge-outline ">GMP</div>
        </div>
      </div>
      <div className="bg-white min-h-[60px] px-5 py-30 grid grid-cols-6 rounded-lg mt-3">
        <div className="col-span-1 grid content-center">제 형</div>
        <div className="col-span-5 bg-red-50 grid content-center">
          <div className="badge badge-outline ">GMP</div>
        </div>
      </div>
      <div className="bg-white min-h-[60px] px-5 py-30 grid grid-cols-6 rounded-lg mt-3">
        <div className="col-span-1 grid content-center">영양성분</div>
        <div className="col-span-5 bg-red-50 grid content-center mt-5 mb-3">
          <div className="grid grid-cols-12">
            <div className="col-span-2">비타민 A</div>
            <progress
              className="progress progress-error col-span-10 w-full my-3"
              value="0"
              max="100"
            ></progress>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-2">비타민 A</div>
            <progress
              className="progress progress-error col-span-10 w-full my-3"
              value="10"
              max="100"
            ></progress>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-2">비타민 A</div>
            <progress
              className="progress progress-error col-span-10 w-full my-3"
              value="40"
              max="100"
            ></progress>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-2">비타민 A</div>
            <progress
              className="progress progress-error col-span-10 w-full my-3"
              value="70"
              max="100"
            ></progress>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[60px] px-5 py-30 grid grid-cols-6 rounded-lg mt-3">
        <div className="col-span-1 grid content-center">
          섭취시
          <br />
          주의사항
        </div>
        <div className="col-span-5 bg-red-50 grid content-center">
          <div className="">카페인과 함께 섭취하지 않는다.</div>
        </div>
      </div>
      <div className="bg-white min-h-[60px] px-5 py-30 grid grid-cols-6 rounded-lg mt-3">
        <div className="col-span-1 grid content-center">원료</div>
        <div className="col-span-5 bg-red-50 grid content-center">
          <div className="badge badge-outline ">GMP</div>
        </div>
      </div>
    </div>
  );
}

export default PillDetailInfo;
