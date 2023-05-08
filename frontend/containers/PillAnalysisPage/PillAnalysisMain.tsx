import React from 'react';
import Image from 'next/image';
import eundan from '../../public/eundan.png';
import { PlusCircle } from '@emotion-icons/bootstrap';
import PillAnalysisComb from './PillAnalysisComb';
import PillAnalysisHave from './PillAnalysisHave';
import PillAnalysisLike from './PillAnalysisLike';
import { useState, useEffect } from 'react';
import PillAnalysisGraph from './PillAnalysisGraph';

type Props = {};

function PillAnalysisMain({}: Props) {
  //조합(선택한 영양제id 리스트로 저장)
  const [choiceList, setChoiceList] = useState<Array<number>>([]);
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
            <div className="text-xl col-span-1 grid content-center ">
              관심 영양제
            </div>
            <div className="col-span-1 flex justify-end mb-1">
              <button onClick={addLikeList}>
                <PlusCircle className="w-5 h-5" />
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
          <div className="col-span-1 text-xl grid content-center">
            성분 조합 한 눈에 보기
          </div>
          <div className="col-span-1 flex justify-end">
            <button
              className="btn btn-active btn-sm bg-[#1E266E] h-3"
              onClick={saveCombination}
            >
              이 조합 저장하기
            </button>
          </div>
        </div>
        <div className="bg-white w-full rounded-lg">
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
