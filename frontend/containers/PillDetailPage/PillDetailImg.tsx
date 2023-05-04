import React from 'react';
import Image from 'next/image';
import powder from '../../public/powder.png';
import liquid from '../../public/liquid.png';
import jelly from '../../public/jelly.png';
import capsule from '../../public/capsule.png';
import sphere from '../../public/sphere.png';
import tablet from '../../public/tablet.png';

type Props = {
  subject: string;
  pillType: number;
};

function PillDetailImg(props: Props) {
  const pillTypeList = [
    '약',
    '가루',
    '액상',
    '젤리',
    '캡슐',
    '환',
    '정',
  ];

  const pillTypeImage = [
    powder,
    powder,
    liquid,
    jelly,
    capsule,
    sphere,
    tablet,
  ];
  return (
    <div>
      <div className="bg-white min-h-[60px] px-5 py-30 grid grid-cols-6 rounded-lg mt-3">
        <div className="col-span-1 grid content-center">
          {props.subject}
        </div>
        <div className="col-span-5 ml-[140px] my-7">
          <Image
            className="w-10 h-10"
            src={pillTypeImage[props.pillType]}
            alt="사진깨짐"
          />
          <div>{pillTypeList[props.pillType]}</div>
        </div>
      </div>
    </div>
  );
}

export default PillDetailImg;
