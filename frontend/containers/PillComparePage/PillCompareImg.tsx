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
  first: number;
  second: number;
};

function PillCompareImg(props: Props) {
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
    <div className="mb-6">
      <hr className="mx-4" />
      <div className="grid py-4 mx-4 bg-white tabs justify-items-center">
        <div className="">{props.subject}</div>
      </div>
      <hr className="mx-4" />
      <div className="mx-4">
        <div className="grid grid-cols-2 py-2">
          <div className="col-span-1 mr-2 bg-white border rounded-lg">
            <div className="grid justify-center my-5">
              <Image
                className="w-10 h-10"
                src={pillTypeImage[props.first]}
                alt="사진깨짐"
              />
              <div>{pillTypeList[props.first]}</div>
            </div>
          </div>
          <div className="col-span-1 ml-2 bg-white border rounded-lg">
            <div className="grid justify-center my-5">
              <Image
                className="w-10 h-10"
                src={pillTypeImage[props.second]}
                alt="사진깨짐"
              />
              <div>{pillTypeList[props.second]}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PillCompareImg;
