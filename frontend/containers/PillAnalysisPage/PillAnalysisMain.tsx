import React from 'react';
// import { PlusCircle } from '@emotion-icons/bootstrap';
import PillAnalysisComb from './PillAnalysisComb';
import { useState, useEffect } from 'react';
import PillAnalysisGraph from './PillAnalysisGraph';
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
import PillAnalysisCombBox from './PillAnalysisCombBox';
import api from '@/apis/config';
import useUserStore from '@/store/userStore';
import { makeCombinationStore } from '@/store/makeCombinationStore';
import { combinationStore } from '@/store/combinationStore';
import { likeStore } from '@/store/likeStore';

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
  const [showChart, setShowchart] = useState<number>(-1);
  const router = useRouter();
  const [userId, setUserId] = useState<number>();
  const { combList, resetCombList } = makeCombinationStore();
  const [cancle, setCancle] = useState<boolean>(false);
  //이상하게 아래 store 훅만 써주면 무한렌더링됨 ( 터지지는 않음 ) 그냥 둬야할까?
  // const { combinations, resetCombinations } = combinationStore();

  // props로 deleteAnything 값 바꾸는 함수 자식들에게 내려주고, x 눌렀을 때, 변동이 생긴 값이 올라오면 재렌더링
  const [deleteAnything, setDeleteAnything] =
    useState<boolean>(false);
  const [newSelectedComb, setNewSelectedComb] = useState<number>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = JSON.parse(
        localStorage.getItem('userId') || '{}',
      );
      if ((userData as number) !== undefined) setUserId(userData);
    }
  }, []);

  const reRendering = () => {
    setDeleteAnything(!deleteAnything);
  };

  //선택된 조합 id 저장하는 함수 ( 그래프용 )
  const isSelectedComb = (id: number) => {
    setShowchart(id);
    //조합 클릭하면 복용중/관심 css 없애줘야하기때문에 setCancle
    setCancle(true);
  };

  //조합 저장하는 함수 => zustand에 저장되어 있는 리스트를 서버에 보내준다.
  const saveCombination = async () => {
    const id: number = useUserStore.getState().user?.id as number;

    //존재하는 조합이면 추가하지 않도록 => 무한렌더링때문에 보류
    // isExist();

    await api.saveComb(id, combList).then((res) => console.log(res));
    setDeleteAnything(!deleteAnything);
    //저장하고 combListStore에 저장한 리스트 삭제
    resetCombList();
    //조합을 누르면 기존에 눌려있던 복용중인 영양제/ 관심 영양제들의 css 없애주기 위한 state cancle flase로 변경해서 props로 내려줌
    //각 컴포넌트에서 cancle이 true이면 css 변경해주고 true로 바꿔줌
    setCancle(true);

    if (typeof window !== 'undefined') {
      const newCombId = JSON.parse(
        localStorage.getItem('lastCombId') || '{}',
      );
      if ((newCombId as number) !== undefined) {
        setShowchart(newCombId + 1);
        console.log(newCombId + 1);
      }
      setNewSelectedComb(newCombId + 1);
    }
  };

  //cancle 다시 false로 갱신해주는 함수
  const renew = () => {
    setCancle(false);
  };

  // 관심 영양제 추가하는 함수
  const addLikeList = () => {
    //검색페이지로 이동
    router.push(`/search`);
  };

  //조합 중복 있는지 확인하는 함수
  const isExist = () => {
    // const combListAll = combinations;
    // console.log(combListAll);
    // if (combListAll.length == 0) {
    //   console.log('no');
    // }
    return true;
  };

  if (userId !== undefined)
    return (
      <div className="mt-20">
        <div className="mx-4">
          <div className="py-5">
            <div className="text-xl ml-5">복용중인 영양제</div>
            <PillAnalysisHaveBox
              userId={userId}
              cancle={cancle}
              renew={renew}
            />
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
              cancle={cancle}
              renew={renew}
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
              userId={userId}
              analysisType={showChart}
            />
          </div>
          <div className="mt-8">
            <div className="col-span-1 text-xl ml-5 mb-2">
              나의 영양제 조합
            </div>
            <PillAnalysisCombBox
              userId={userId}
              reRendering={reRendering}
              isSelectedComb={isSelectedComb}
              cancle={cancle}
              renew={renew}
              newSelectedComb={newSelectedComb}
            />
          </div>
        </div>
      </div>
    );
  return <div>로딩중</div>;
}

export default PillAnalysisMain;
