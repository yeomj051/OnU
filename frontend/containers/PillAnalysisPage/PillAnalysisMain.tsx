import React from 'react';

type Props = {};

function PillAnalysisMain({}: Props) {
  return (
    <div className="h-[100vh] mt-20">
      <div className="mx-4">
        <div className="bg-red-200 py-5">
          <div className="text-xl">복용중인 영양제</div>
          <div className="flex justify-between">
            <div className="">
              <div className="bg-green-200 w-32 h-32 rounded-lg mx-auto grid content-center">
                <div className="bg-white w-28 h-28 mx-auto rounded-lg"></div>
              </div>
            </div>
            <div className="">
              <div className="bg-green-200 w-32 h-32 rounded-lg mx-auto grid content-center">
                <div className="bg-white w-28 h-28 mx-auto rounded-lg"></div>
              </div>
            </div>
            <div className="">
              <div className="bg-green-200 w-32 h-32 rounded-lg mx-auto grid content-center">
                <div className="bg-white w-28 h-28 mx-auto rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-yellow-200  py-5">
          <div className="text-xl">관심 영양제</div>
          <div className="flex justify-between">
            <div className="">
              <div className="bg-green-200 w-32 h-32 rounded-lg mx-auto grid content-center">
                <div className="bg-white w-28 h-28 mx-auto rounded-lg"></div>
              </div>
            </div>
            <div className="">
              <div className="bg-green-200 w-32 h-32 rounded-lg mx-auto grid content-center">
                <div className="bg-white w-28 h-28 mx-auto rounded-lg"></div>
              </div>
            </div>
            <div className="">
              <div className="bg-green-200 w-32 h-32 rounded-lg mx-auto grid content-center">
                <div className="bg-white w-28 h-28 mx-auto rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F2F9FF]  py-5 px-4 h-[100%]">
        <div className="grid grid-cols-2">
          <div className="col-span-1 text-xl grid content-center">
            성분 조합 한 눈에 보기
          </div>
          <div className="col-span-1 flex justify-end">
            <button className="btn btn-active btn-sm bg-[#1E266E] h-3">
              이 조합 저장하기
            </button>
          </div>
        </div>
        <div className="bg-white w-full rounded-lg">그래프</div>
        <div>
          <div className="col-span-1 text-xl bg-red-200">
            나의 영양제 조합
          </div>
          <div className="bg-blue-200 rounded-xl">
            <div className="bg-white rounded-xl mx-2">영양제</div>
          </div>
          <div className="bg-white rounded-xl">
            <div className="bg-white rounded-xl mx-2">영양제</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PillAnalysisMain;
