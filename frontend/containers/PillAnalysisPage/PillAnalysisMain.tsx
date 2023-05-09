import React from 'react';

// import { PlusCircle } from '@emotion-icons/bootstrap';
import PillAnalysisComb from './PillAnalysisComb';
import PillAnalysisHave from './PillAnalysisHave';
import PillAnalysisLike from './PillAnalysisLike';
import { useState, useEffect } from 'react';

type combination = {
  combinationId: number;
  nutrientInfoList: Array<InfoList>;
};

type InfoList = {
  nutrientId: number;
  nutrientName: string;
  nutrientImageUrl: string;
  nutrientBrand: string;
};

function PillAnalysisMain() {
  /////////////////////////////////////////////////////////////////영양제 조합 목록 조회//////
  const data = {
    combinationList: [
      {
        combinationId: 19,
        nutrientInfoList: [
          {
            nutrientId: 4002000847,
            nutrientName: '오션스피루리나',
            nutrientImageUrl:
              'https://shopping-phinf.pstatic.net/main_2506835/25068354527.20201202163623.jpg',
            nutrientBrand: '엔트리',
          },
          {
            nutrientId: 4002000889,
            nutrientName: '라피더스 프로바이오틱스',
            nutrientImageUrl:
              'https://shopping-phinf.pstatic.net/main_2515135/25151351529.20221207150551.jpg',
            nutrientBrand: '온누리',
          },
          {
            nutrientId: 6002000844,
            nutrientName: '알티드림(rT-Dream)',
            nutrientImageUrl:
              'https://shopping-phinf.pstatic.net/main_3113569/31135694618.20230210094858.jpg',
            nutrientBrand: '내츄럴플러스',
          },
          {
            nutrientId: 6002000845,
            nutrientName: '에스론 우먼 골드',
            nutrientImageUrl:
              'https://shopping-phinf.pstatic.net/main_1266476/12664762425.8.jpg',
            nutrientBrand: '하이리빙',
          },
        ],
      },
      {
        combinationId: 20,
        nutrientInfoList: [
          {
            nutrientId: 4002000847,
            nutrientName: '오션스피루리나',
            nutrientImageUrl:
              'https://shopping-phinf.pstatic.net/main_2506835/25068354527.20201202163623.jpg',
            nutrientBrand: '엔트리',
          },
          {
            nutrientId: 4002000889,
            nutrientName: '라피더스 프로바이오틱스',
            nutrientImageUrl:
              'https://shopping-phinf.pstatic.net/main_2515135/25151351529.20221207150551.jpg',
            nutrientBrand: '온누리',
          },
          {
            nutrientId: 6002000844,
            nutrientName: '알티드림(rT-Dream)',
            nutrientImageUrl:
              'https://shopping-phinf.pstatic.net/main_3113569/31135694618.20230210094858.jpg',
            nutrientBrand: '내츄럴플러스',
          },
          {
            nutrientId: 6002000845,
            nutrientName: '에스론 우먼 골드',
            nutrientImageUrl:
              'https://shopping-phinf.pstatic.net/main_1266476/12664762425.8.jpg',
            nutrientBrand: '하이리빙',
          },
          {
            nutrientId: 6002000852,
            nutrientName: '프렌즈아이 루테인',
            nutrientImageUrl:
              'https://shopping-phinf.pstatic.net/main_1253049/12530492093.jpg',
            nutrientBrand: 'JW 중외제약',
          },
        ],
      },
    ],
    message: 'success',
  };

  const [combinationList, setCombinationList] = useState<
    Array<combination>
  >([]);

  useEffect(() => {
    setCombinationList(data.combinationList);
  }, []);

  //조합(선택한 영양제id 리스트로 저장)
  // const [choiceList, setChoiceList] = useState<Array<number>>([]);
  //조합 저장하는 함수
  const saveCombination = () => {};

  // 관심 영양제 추가하는 함수
  const addLikeList = () => {};

  return (
    <div className="h-[100vh] mt-20">
      <div className="mx-4">
        <div className="py-5">
          <div className="text-xl">복용중인 영양제</div>
          <div className="flex justify-between">
            <PillAnalysisHave />
            <PillAnalysisHave />
            <PillAnalysisHave />
          </div>
        </div>
        <div className="py-5">
          <div className="grid grid-cols-2">
            <div className="grid content-center col-span-1 text-xl ">
              관심 영양제
            </div>
            <div className="flex justify-end col-span-1 mb-1">
              <button onClick={addLikeList}>
                {/* <PlusCircleComponent className="w-5 h-5" /> */}
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <PillAnalysisLike />
            <PillAnalysisLike />
            <PillAnalysisLike />
          </div>
        </div>
      </div>

      <div className="bg-[#D8EDFF]  py-5 px-4 h-[100%]">
        <div className="grid grid-cols-2">
          <div className="grid content-center col-span-1 text-xl">
            성분 조합 한 눈에 보기
          </div>
          <div className="flex justify-end col-span-1">
            <button
              className="btn btn-active btn-sm bg-[#1E266E] h-3"
              onClick={saveCombination}
            >
              이 조합 저장하기
            </button>
          </div>
        </div>
        <div className="w-full bg-white rounded-lg">
          {/* <PillAnalysisGraph /> */}
        </div>
        <div className="">
          <div className="col-span-1 text-xl">나의 영양제 조합</div>
          {combinationList.map((combination, idx) => (
            <PillAnalysisComb combination={combination} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PillAnalysisMain;
