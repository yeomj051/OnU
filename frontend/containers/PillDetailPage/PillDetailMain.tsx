import React from 'react';
import { useState, useEffect } from 'react';
import PillDetailInfo from './PillDetailInfo';
import PillDetailReview from './PillDetailReview';
import fillHeart from '../../public/fillHeart.png';
import emptyHeart from '../../public/emptyHeart.png';
import Image from 'next/image';
import api from '@/apis/config';
import useUserStore from '@/store/userStore';
import { useRouter } from 'next/navigation';

function PillDetailMain(props: {
  itemId: number;
}): React.ReactElement {
  const [infoSwitch, setInfoSwitch] = useState<boolean>(true);
  const [like, setLike] = useState<boolean>(true);
  const [nutrientList, setNutrientList] = useState<nutrientDetail>();
  const [userID, setUserId] = useState<number>();
  const router = useRouter();

  useEffect(() => {
    setUserId(parseInt(localStorage.getItem('userId') as string));
    if (props.itemId !== null) {
      getDetailData().then((res) => {
        setNutrientList(res?.data?.nutrientDetail);
      });
    }
  }, [userID]);

  const getDetailData = async () => {
    return await api.getPillDetail(props.itemId);
  };

  useEffect(() => {
    // console.log(nutrientList.interested);
    if (nutrientList !== undefined) setLike(nutrientList.interested);
  }, [nutrientList]);

  //제품상세정보<->리뷰
  const switchInfo = () => {
    setInfoSwitch(true);
  };

  const switchReview = () => {
    if (userID) setInfoSwitch(false);
    else {
      if (
        window.confirm(
          '로그인이 필요한 서비스입니다. 로그인하시겠습니까?',
        )
      ) {
        router.push('/user/login');
      }
    }
  };

  //좋아요 on/off
  const likeOrNot = () => {
    // 좋아요 되어있는 영양제인지 확인하고 좋아요 되어있으면 => ZUStand에 관심영양제 저장한 리스트에서 있는지 확인해야할듯?
    if (userID) {
      if (like) {
        //좋아요 추가
        addInterest();
      } else {
        //좋아요 삭제
        removeInterest();
      }
      setLike(!like);
    } else {
      if (
        window.confirm(
          '로그인이 필요한 서비스입니다. 로그인하시겠습니까?',
        )
      ) {
        router.push('/user/login');
      }
    }
  };

  const addInterest = async () => {
    if (nutrientList !== undefined && userID) {
      await api
        .addInterestPill(userID, nutrientList.nutrientId)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const removeInterest = async () => {
    if (nutrientList !== undefined && userID) {
      await api
        .deleteInterestPill(userID, nutrientList.nutrientId)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  return nutrientList ? (
    <div className="h-[100vh] mt-20">
      <div className="mx-4">
        <Image
          src={nutrientList.nutrientImageUrl}
          alt="영양제 사진"
          width={200}
          height={200}
          className="mx-auto"
        />

        <div>
          <div className="grid grid-cols-12">
            <div className="grid content-center col-span-8 row-span-3 ml-1 text-sm font-light text-gray-500">
              {nutrientList.nutrientBrand}
            </div>
            <div className="grid content-center col-span-3 row-span-3 justify-items-end">
              <button className="w-24 h-6 text-gray-500 badge badge-outline">
                비교하기
              </button>
            </div>
            <div className="grid content-center col-span-1 justify-items-end">
              <button onClick={likeOrNot}>
                {like ? (
                  <Image
                    className="h-8 w-7"
                    src={fillHeart}
                    alt="사진깨짐"
                  />
                ) : (
                  <Image
                    className="h-8 w-7"
                    src={emptyHeart}
                    alt="사진깨짐"
                  />
                )}
              </button>
            </div>
          </div>

          <div className="mt-2 text-xl font-medium">
            {nutrientList.nutrientName}
          </div>
          {/* <div className="mt-5 shadow-md ">
            <div className="text-center">원재료</div>
            {nutrientList.nutrientMaterial}
          </div> */}
        </div>
      </div>
      {/*여기는 파란부분 */}
      <div className="bg-[#F2F9FF] mt-8 pt-6 pb-8 ">
        <hr className="mx-4" />
        <div className="grid grid-cols-2 py-4 mx-4 bg-white tabs justify-items-center">
          <div className="col-span-1">
            <button
              className={`w-full font-semibold ${
                infoSwitch ? 'text-blue-500' : 'text-black'
              }`}
              onClick={switchInfo}
            >
              제품상세정보
            </button>
          </div>
          <div className="col-span-1">
            <button
              className={`w-full font-semibold ${
                infoSwitch ? 'text-black' : 'text-blue-500'
              }`}
              onClick={switchReview}
            >
              리뷰
            </button>
          </div>
        </div>
        <hr className="mx-4" />
        <div className="mx-4">
          {infoSwitch ? (
            <PillDetailInfo nutrientList={nutrientList} />
          ) : (
            <PillDetailReview nutrientId={nutrientList.nutrientId} />
          )}
        </div>
      </div>
    </div>
  ) : (
    <div>로딩 중...</div>
  );
}

export default PillDetailMain;
