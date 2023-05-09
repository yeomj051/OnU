import React from 'react';
// import { PlusCircle } from '@emotion-icons/bootstrap';
import PillAnalysisComb from './PillAnalysisComb';
import PillAnalysisHave from './PillAnalysisHave';
import PillAnalysisLike from './PillAnalysisLike';
// import { useState } from 'react';

function PillAnalysisMain() {
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
          <PillAnalysisComb />
          <PillAnalysisComb />
          {/* 여기까지가 조합 한블럭 */}
        </div>
      </div>
    </div>
  );
}

export default PillAnalysisMain;
