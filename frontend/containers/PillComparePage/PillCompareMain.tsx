import React from 'react';
import { useState, useEffect } from 'react';
// import PillImg from '../../public/jong_pill.svg';
import PillCompareBadge from './PillCompareBadge';
import PillCompareImg from './PillCompareImg';
import PillCompareContent from './PillCompareContent';
import PillCompareGage from './PillCompareGage';
import { itemStore } from '@/store/itemStore';
import fillHeart from '../../public/fillHeart.png';
import emptyHeart from '../../public/emptyHeart.png';
import yellowCircle from '../../public/yellowCircle.png';
import greenCircle from '../../public/greenCircle.png';
import redCircle from '../../public/redCircle.png';

import Image from 'next/image';

type compareAmount = {
  name: string | undefined;
  amountA: number;
  amountB: number;
};

type nutrient = {
  name: string;
  amount: number;
};

function PillCompareMain() {
  const { items } = itemStore();
  //items.id로 영양제 정보 api 요청해올것
  useEffect(() => {}, []);

  const [firstLike, setFirstLike] = useState<boolean>(true);
  const [secondLike, setSecondLike] = useState<boolean>(true);

  //api 사용해서 받아올 내용 useState
  const [nutrientListA, setNutrientListA] = useState<Array<nutrient>>(
    [],
  );
  const [certificationA, setCertificationA] = useState<Array<string>>(
    [],
  );
  const [functionalityA, setFunctionalityA] = useState<Array<string>>(
    [],
  );
  const [pillTypeA, setPillTypeA] = useState<number>(0);
  const [cautionA, setCautionA] = useState<string>('');
  const [howA, setHowA] = useState<string>('');
  const [materialA, setMaterialA] = useState<Array<string>>([]);
  /////////////////////////////
  //api 사용해서 받아올 내용 useState
  const [nutrientListB, setNutrientListB] = useState<Array<nutrient>>(
    [],
  );
  const [certificationB, setCertificationB] = useState<Array<string>>(
    [],
  );
  const [functionalityB, setFunctionalityB] = useState<Array<string>>(
    [],
  );
  const [pillTypeB, setPillTypeB] = useState<number>(0);
  const [cautionB, setCautionB] = useState<string>('');
  const [howB, setHowB] = useState<string>('');
  const [materialB, setMaterialB] = useState<Array<string>>([]);
  /////////////////////////////

  const ItemsA = {
    data: [
      {
        certification: ['haccp', 'GMP'],
        functionality: ['눈건강', '관절건강'],
        pillType: 2,
        nutrients: [
          { name: '비타민A', amount: 5 },
          { name: '비타민B', amount: 20 },
          { name: '비타민C', amount: 900 },
          { name: '비타민D', amount: 10 },
        ],
        caution:
          '너무 맛있으니까 조심해야됩니다 카페인이랑 같이먹으면 안됨 ㄴㄴ절대',
        how: '1일 1회 충분한 물과 함께 복용',
        material: ['국산', '독일산'],
      },
    ],
  };
  const ItemsB = {
    data: [
      {
        certification: ['haccp', 'GMP', 'sogood'],
        functionality: ['눈건강', '관절건강', '혈관건강'],
        pillType: 1,
        nutrients: [
          { name: '비타민A', amount: 40 },
          { name: '비타민C', amount: 50 },
          { name: '비타민B', amount: 60 },
          { name: '비타민E', amount: 10 },
        ],
        caution: '습한곳에 보관하면 쉽게 변질됩니다 조심하세요',
        how: '1일 110회 충분한 물과 함께 복용',
        material: ['국산', '독일산', '중국산'],
      },
    ],
  };

  useEffect(() => {
    setNutrientListA(ItemsA.data[0].nutrients);
    setCertificationA(ItemsA.data[0].certification);
    setFunctionalityA(ItemsA.data[0].functionality);
    setPillTypeA(ItemsA.data[0].pillType);
    setCautionA(ItemsA.data[0].caution);
    setHowA(ItemsA.data[0].how);
    setMaterialA(ItemsA.data[0].material);
    //
    setNutrientListB(ItemsB.data[0].nutrients);
    setCertificationB(ItemsB.data[0].certification);
    setFunctionalityB(ItemsB.data[0].functionality);
    setPillTypeB(ItemsB.data[0].pillType);
    setCautionB(ItemsB.data[0].caution);
    setHowB(ItemsB.data[0].how);
    setMaterialB(ItemsB.data[0].material);
  }, []);

  //위 두 영양성분 받아서
  let nutritionA = nutrientListA.map((item) => item.name);
  let nutritionB = nutrientListB.map((item) => item.name);

  let nutritionProps: Array<compareAmount> = [];

  while (!(nutritionA.length === 0 && nutritionB.length === 0)) {
    let tmp: string | undefined;
    console.log('nutritionA ' + nutritionA);
    // console.log('nutritionB ' + nutritionB);

    if (nutritionA.length != 0) {
      //배열의 첫번째 값 뽑아냄
      tmp = nutritionA.shift();
      if (tmp && nutritionB.includes(tmp)) {
        //b배열에 값 있으면 b배열에서 삭제
        //b배열에서 indexOf로 위치 인덱스 찾아서 spilce로 (위치, 변경할 개수)로 삭제
        nutritionB.splice(nutritionB.indexOf(tmp), 1);

        //영양성분 이름, 양A, 양B 객체로 묶어서 nutritionProps에 저장
        let nuA = nutrientListA.find(function (data) {
          return data.name === tmp;
        });
        let nuB = nutrientListB.find(function (data) {
          return data.name === tmp;
        });

        if (nuA && nuB) {
          nutritionProps.push({
            name: tmp,
            amountA: nuA.amount,
            amountB: nuB.amount,
          });
        }
      } else {
        //값 없으면 이미 a배열에서는 삭제된 상태
        let nuA = nutrientListA.find(function (data) {
          return data.name === tmp;
        });
        if (nuA) {
          nutritionProps.push({
            name: tmp,
            amountA: nuA.amount,
            amountB: 0,
          });
        }
      }
    }
    if (nutritionB.length != 0) {
      tmp = nutritionB.shift();
      if (tmp && nutritionA.includes(tmp)) {
        nutritionA.splice(nutritionA.indexOf(tmp), 1);

        let nuA = nutrientListA.find(function (data) {
          return data.name === tmp;
        });
        let nuB = nutrientListB.find(function (data) {
          return data.name === tmp;
        });

        if (nuA && nuB) {
          nutritionProps.push({
            name: tmp,
            amountA: nuA.amount,
            amountB: nuB.amount,
          });
        }
      } else {
        console.log(tmp);
        //값 없으면 이미 a배열에서는 삭제된 상태
        let nuB = nutrientListB.find(function (data) {
          return data.name === tmp;
        });
        if (nuB) {
          nutritionProps.push({
            name: tmp,
            amountA: 0,
            amountB: nuB.amount,
          });
        }
      }
    }
  }

  // console.log(nutritionProps);

  //좋아요 on/off
  const fisrtLikeOrNot = () => {
    setFirstLike(!firstLike);
  };

  const secondLikeOrNot = () => {
    setSecondLike(!secondLike);
  };

  return (
    <div className="h-[100%] mt-20">
      <div className="grid grid-cols-2 mx-4">
        <div className="col-span-1 pr-2">
          {/* <PillImg className="w-4/5 mx-auto my-6" /> */}

          <div>
            <div className="grid grid-cols-4">
              <div className="grid content-center col-span-3 row-span-3 ml-1 text-sm font-light text-gray-500">
                종근당
              </div>

              <div className="grid content-center col-span-1 justify-items-end">
                <button onClick={fisrtLikeOrNot}>
                  {firstLike ? (
                    <Image
                      className="w-6 h-6"
                      src={emptyHeart}
                      alt="사진깨짐"
                    />
                  ) : (
                    <Image
                      className="w-6 h-6"
                      src={fillHeart}
                      alt="사진깨짐"
                    />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-2 text-xl font-medium bg-yellow-200">
              비타민B 군 비타민비 고농축 고함량 활성 수용성
            </div>
          </div>
        </div>
        <div className="col-span-1 pl-2">
          {/* <PillImg className="w-4/5 mx-auto my-6" /> */}

          <div>
            <div className="grid grid-cols-4">
              <div className="grid content-center col-span-3 row-span-3 ml-1 text-sm font-light text-gray-500">
                종근당
              </div>

              <div className="grid content-center col-span-1 justify-items-end">
                <button onClick={secondLikeOrNot}>
                  {secondLike ? (
                    <Image
                      className="w-6 h-6"
                      src={emptyHeart}
                      alt="사진깨짐"
                    />
                  ) : (
                    <Image
                      className="w-6 h-6"
                      src={fillHeart}
                      alt="사진깨짐"
                    />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-2 text-xl font-medium bg-yellow-200">
              비타민B 군 비타민비 고농축 고함량 활성 수용성
            </div>
          </div>
        </div>
      </div>
      {/*여기는 파란부분 */}
      <div className="bg-[#F2F9FF] mt-8 h-full pt-6">
        <PillCompareBadge
          subject="인증정보"
          first={certificationA}
          second={certificationB}
        />
        <PillCompareBadge
          subject="기능성"
          first={functionalityA}
          second={functionalityB}
        />
        <PillCompareImg
          subject="제형"
          first={pillTypeA}
          second={pillTypeB}
        />
        <hr className="mx-4" />
        <div className="grid py-4 mx-4 bg-white tabs justify-items-center">
          <div className="">영양 성분</div>
        </div>
        <hr className="mx-4" />
        <div className="col-span-1 py-4 mx-4 mt-2 mb-6 bg-white border rounded-lg">
          <div className="flex flex-row-reverse pr-2">
            <div className="flex mx-1 items-center">
              <Image
                src={redCircle}
                alt="빨강"
                className="w-3 h-3 mr-1"
              />
              <div>과다</div>
            </div>
            <div className="flex mx-1 items-center">
              <Image
                src={greenCircle}
                alt="초록"
                className="w-3 h-3 mr-1"
              />
              <div>적정</div>
            </div>
            <div className="flex mx-1 items-center">
              <Image
                src={yellowCircle}
                alt="노랑"
                className="w-3 h-3 mr-1"
              />
              <div>부족</div>
            </div>
          </div>
          <div className="grid content-center px-2 mb-3">
            {nutritionProps.map((nutrient, idx) => (
              <PillCompareGage
                key={idx}
                nutrient={nutrient.name}
                amountA={nutrient.amountA}
                amountB={nutrient.amountB}
              />
            ))}
          </div>
        </div>

        <PillCompareContent
          subject="섭취 시 주의사항"
          first={cautionA}
          second={cautionB}
        />
        <PillCompareBadge
          subject="원료"
          first={materialA}
          second={materialB}
        />
      </div>
    </div>
  );
}

export default PillCompareMain;
