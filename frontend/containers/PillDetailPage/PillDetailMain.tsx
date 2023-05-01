import React from 'react';
import Image from 'next/image';
import OnULogo from '../../public/OnULogo.png';

type Props = {};

function PillDetailMain({}: Props): React.ReactElement {
  const logoString = OnULogo.toString();
  const logoStringPlusSlash = '/' + logoString;
  return (
    <div className="h-[100vh]">
      <div className="mx-4">
        <Image
          src={logoStringPlusSlash}
          alt="pill_picture"
          width={100}
          height={50}
        />

        <div>
          <div className="bg-green-200 grid grid-cols-10">
            <div className="bg-gray-200 col-span-7">종근당</div>
            <div className="bg-red-200 col-span-2 grid justify-items-end row-span-3 content-center">
              <button className="badge badge-outline text-gray-500 w-24">
                비교하기
              </button>
            </div>
            <div className="bg-red-400  col-span-1 grid justify-items-end content-center">
              <div>dd</div>
            </div>
          </div>

          <div className="bg-yellow-200">
            비타민B 군 비타민비 고농축 고함량 활성 수용성
          </div>
          <div className="bg-yellow-100">영양제 설명설명설명</div>
        </div>
      </div>
      {/*여기는 파란부분 */}
      <div className="bg-[#F2F9FF] mt-10 h-full">
        <div className="tabs grid grid-cols-2 justify-items-center bg-red-200">
          <div className="col-span-1">
            <div className="w-full border-b-2 border-blue-400">
              제품상세정보
            </div>
          </div>
          <div className="col-span-1 border-b-2 border-blue-500">
            <div className="col-span-1 ">리뷰</div>
          </div>
        </div>

        <div className="mx-4">
          <div className="bg-white min-h-[60px] px-5 py-30 grid grid-cols-6 rounded-lg mt-3">
            <div className="col-span-1 grid content-center">
              인증정보
            </div>
            <div className="col-span-5 bg-red-50 grid content-center">
              <div className="badge badge-outline bg-[#90B5EA] ">
                GMP
              </div>
            </div>
          </div>
          <div className="bg-white min-h-[60px] px-5 py-30 grid grid-cols-6 rounded-lg mt-3">
            <div className="col-span-1 grid content-center">
              기능성
            </div>
            <div className="col-span-5 bg-red-50 grid content-center">
              <div className="badge badge-outline ">GMP</div>
            </div>
          </div>
          <div className="bg-white min-h-[60px] px-5 py-30 grid grid-cols-6 rounded-lg mt-3">
            <div className="col-span-1 grid content-center">
              제 형
            </div>
            <div className="col-span-5 bg-red-50 grid content-center">
              <div className="badge badge-outline ">GMP</div>
            </div>
          </div>
          <div className="bg-white min-h-[60px] px-5 py-30 grid grid-cols-6 rounded-lg mt-3">
            <div className="col-span-1 grid content-center">
              영양성분
            </div>
            <div className="col-span-5 bg-red-50 grid content-center mt-5 mb-3">
              <div className="grid grid-cols-12">
                <div className="col-span-2">비타민 A</div>
                <progress
                  className="progress progress-error col-span-10 w-full my-3"
                  value="0"
                  max="100"
                ></progress>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-2">비타민 A</div>
                <progress
                  className="progress progress-error col-span-10 w-full my-3"
                  value="10"
                  max="100"
                ></progress>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-2">비타민 A</div>
                <progress
                  className="progress progress-error col-span-10 w-full my-3"
                  value="40"
                  max="100"
                ></progress>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-2">비타민 A</div>
                <progress
                  className="progress progress-error col-span-10 w-full my-3"
                  value="70"
                  max="100"
                ></progress>
              </div>
            </div>
          </div>
          <div className="bg-white min-h-[60px] px-5 py-30 grid grid-cols-6 rounded-lg mt-3">
            <div className="col-span-1 grid content-center">
              섭취시
              <br />
              주의사항
            </div>
            <div className="col-span-5 bg-red-50 grid content-center">
              <div className="">카페인과 함께 섭취하지 않는다.</div>
            </div>
          </div>
          <div className="bg-white min-h-[60px] px-5 py-30 grid grid-cols-6 rounded-lg mt-3">
            <div className="col-span-1 grid content-center">원료</div>
            <div className="col-span-5 bg-red-50 grid content-center">
              <div className="badge badge-outline ">GMP</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PillDetailMain;
