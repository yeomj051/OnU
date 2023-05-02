import React from 'react';
import PillDetailBadge from './PillDetailBadge';
import PillDetailImg from './PillDetailImg';
import PillDetailContents from './PillDetailContents';

type Props = {};

function PillDetailInfo({}: Props) {
  return (
    <div>
      <PillDetailBadge subject="인증정보" />
      <PillDetailBadge subject="기능성" />
      <PillDetailImg subject="제형" />

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

      <PillDetailContents subject="섭취 시 주의사항" />
      <PillDetailBadge subject="원료" />
    </div>
  );
}

export default PillDetailInfo;
