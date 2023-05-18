import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type InfoList = {
  nutrientId: number;
  nutrientName: string;
  nutrientImageUrl: string;
  nutrientBrand: string;
};
type Props = {
  nutrient: InfoList;
};

function MyCombMem(props: Props) {
  const router = useRouter();
  const moveToDetail = () => {
    router.push(
      `/pilldetail/pill-detail?id=${props.nutrient.nutrientId}`,
    );
  };

  return (
    <div
      className="w-1/3 mt-6 transition ease-in-out delay-100 hover:scale-[102%] duration-200 cursor-pointer"
      onClick={moveToDetail}
    >
      <div className="mx-auto bg-white rounded-lg sm:w-28 sm:h-28 w-20">
        <div className="relative w-16 h-16 mx-auto">
          <Image
            src={props.nutrient.nutrientImageUrl}
            width={100}
            height={100}
            alt="사진깨짐"
          />
        </div>
        <div className="text-xs leading-3 text-center text-gray-400">
          {props.nutrient.nutrientBrand}
        </div>
        {/* 디자인상 이유로 영양제 이름 2줄에서 자름 ( 수정 가능 일단 2줄로 설정 ) */}
        <div className="leading-4 text-center line-clamp-2">
          {props.nutrient.nutrientName}
        </div>
      </div>
    </div>
  );
}

export default MyCombMem;
