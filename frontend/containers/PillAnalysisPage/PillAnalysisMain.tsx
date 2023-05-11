import React from 'react';
// import { PlusCircle } from '@emotion-icons/bootstrap';
import PillAnalysisComb from './PillAnalysisComb';
import { useState, useEffect } from 'react';
import PillAnalysisGraph from './PillAnalysisGraph';
import { combinationStore } from '@/store/combinationStore';
import PillAnalysisHaveBox from './PillAnalysisHaveBox';
import PillAnalysisLikeBox from './PillAnalysisLikeBox';
import Image from 'next/image';
import more from '../../public/more.png';
import { useRouter } from 'next/navigation';

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
  const { combinations, setCombinations } = combinationStore();

  //API로 받아온 리스트 저장
  const [combinationList, setCombinationList] = useState<
    Array<combination>
  >([]);
  //어떤 조합이 선택되어있는지 id 저장
  const [selectedComb, setSelectedComb] = useState<number>(0);
  //삭제된 조합 id 저장할 state => 근데 꼭 필요한가?? 자동 리렌더링 되면 api도 다시 받아올거니까 필요없을듯 일단 주석
  // const [deletedComb, setDeletedComb] = useState<number>(0);

  const [showChart, setShowchart] = useState<number>(-1);
  const [dataId, setDataId] = useState<number>(-1);
  const router = useRouter();

  useEffect(() => {
    // setCombinations(data.combinationList);
    setCombinationList(data.combinationList);
  }, []);

  // useEffect(() => {
  //   //여기에서 deletecomb랑 아이디 같은 영양제 조합
  //   //combinationList에서 filter로 제거해줌
  // }, [deletedComb]);

  //조합(선택한 영양제id 리스트로 저장)
  // const [choiceList, setChoiceList] = useState<Array<number>>([]);
  //조합 저장하는 함수
  const saveCombination = () => {};

  // 관심 영양제 추가하는 함수
  const addLikeList = () => {
    router.push(`/search`);
  };

  const selectCombination = (id: number) => {
    setSelectedComb(id);
  };
  // const deleteCombination = (id: number) => {
  //   setSelectedComb(id);
  // };

  return (
    <div className="mt-20">
      <div className="mx-4">
        <div className="py-5">
          <div className="text-xl">복용중인 영양제</div>
          <PillAnalysisHaveBox />
        </div>
        <div className="py-5">
          <div className="grid grid-cols-2">
            <div className="grid content-center col-span-1 text-xl ">
              관심 영양제
            </div>
            <div className="flex justify-end col-span-1 mb-1">
              <button onClick={addLikeList}>
                <Image
                  src={more}
                  alt="추가하기"
                  className="w-5 h-5 mr-1"
                />
              </button>
            </div>
          </div>
          <PillAnalysisLikeBox />
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
        <div className="w-full bg-white rounded-lg h-auto">
          <PillAnalysisGraph
            analysisType={showChart}
            dataId={dataId}
          />
        </div>
        <div className="">
          <div className="col-span-1 text-xl">나의 영양제 조합</div>
          {combinationList.map((combination, idx) => (
            <PillAnalysisComb
              combination={combination}
              selectCombination={selectCombination}
              selectedComb={selectedComb}
              // deleteCombination={deleteCombination}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PillAnalysisMain;
