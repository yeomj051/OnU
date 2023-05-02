import React from 'react';

type Props = {
  subject: string;
};

function PillDetailImg(props: Props) {
  return (
    <div>
      <div className="bg-white min-h-[60px] px-5 py-30 grid grid-cols-6 rounded-lg mt-3">
        <div className="col-span-1 grid content-center">
          {props.subject}
        </div>
        <div className="col-span-5 bg-red-50 grid content-center">
          <div>이미지 들어가야하는 부분</div>
        </div>
      </div>
    </div>
  );
}

export default PillDetailImg;
