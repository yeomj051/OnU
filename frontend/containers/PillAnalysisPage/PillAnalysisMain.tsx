import React from 'react';
// import { PlusCircle } from '@emotion-icons/bootstrap';
import PillAnalysisComb from './PillAnalysisComb';
import { useState, useEffect } from 'react';
import PillAnalysisGraph from './PillAnalysisGraph';
import { makeCombinationStore } from '../../store/makeCombinationStore';
import PillAnalysisHaveBox from './PillAnalysisHaveBox';
import PillAnalysisLikeBox from './PillAnalysisLikeBox';
import Image from 'next/image';
import more from '../../public/more.png';
import { useRouter } from 'next/navigation';
import {
  useCombList,
  useInterestPill,
  useSaveComb,
  useTakingPill,
  useTakingPillIngredient,
} from '@/apis/hooks';
import { likeStore } from '@/store/likeStore';
import { haveStore } from '@/store/haveStore';
import PillAnalysisCombBox from './PillAnalysisCombBox';
import api from '@/apis/config';
import useUserStore from '@/store/userStore';

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

  const [showChart, setShowchart] = useState<number>(-1);
  const [dataId, setDataId] = useState<number>(-1);
  const router = useRouter();
  const [userId, setUserId] = useState<number>(0);

  // props로 deleteAnything 값 바꾸는 함수 자식들에게 내려주고, x 눌렀을 때, 변동이 생긴 값이 올라오면 재렌더링
  const [deleteAnything, setDeleteAnything] =
    useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = JSON.parse(
        localStorage.getItem('userId') || '{}',
      );
      setUserId(userData);

      // saveCombinationPill();

      // setCombinations(data.combinationList);
      // setCombinationList(data.combinationList);
    }
  }, []);

  // useEffect(() => {
  //   //여기에서 deletecomb랑 아이디 같은 영양제 조합
  //   //combinationList에서 filter로 제거해줌
  // }, [deletedComb]);

  const reRendering = () => {
    setDeleteAnything(!deleteAnything);
  };

  //조합(선택한 영양제id 리스트로 저장)
  const [choiceList, setChoiceList] = useState<Array<number>>([]);

  //조합 저장하는 함수 => zustand에 저장되어 있는 리스트를 서버에 보내준다.
  const saveCombination = async () => {
    const id: number = useUserStore.getState().user?.id as number;
    await api
      .saveComb(id, choiceList)
      .then((res) => console.log(res));
  };

  // 관심 영양제 추가하는 함수
  const addLikeList = () => {
    //검색페이지로 이동
    router.push(`/search`);
  };

  return (
    <div className="mt-20">
      <div className="mx-4">
        <div className="py-5">
          <div className="text-xl ml-5">복용중인 영양제</div>
          <PillAnalysisHaveBox userId={userId} />
        </div>
        <div className="py-5">
          <div className="grid grid-cols-2">
            <div className="grid content-center col-span-1 text-xl ml-5">
              관심 영양제
            </div>
            <div className="flex justify-end col-span-1 mb-1 pt-1 pr-4">
              <button onClick={addLikeList}>
                <Image
                  src={more}
                  alt="추가하기"
                  className="w-5 h-5 mr-1"
                  width={100}
                  height={100}
                />
              </button>
            </div>
          </div>
          <PillAnalysisLikeBox
            userId={userId}
            reRendering={reRendering}
          />
        </div>
      </div>

      <div className="bg-[#D8EDFF]  py-5 px-4 h-[100%]">
        <div className="grid grid-cols-2 mt-2">
          <div className="grid content-center col-span-1 text-xl ml-5">
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
        <div className="w-full bg-white rounded-lg mt-2">
          <PillAnalysisGraph
            analysisType={showChart}
            dataId={dataId}
          />
        </div>
        <div className="mt-8">
          <div className="col-span-1 text-xl ml-5 mb-2">
            나의 영양제 조합
          </div>
          <PillAnalysisCombBox
            userId={userId}
            reRendering={reRendering}
          />
        </div>
      </div>
    </div>
  );
}

export default PillAnalysisMain;
