import api from '@/apis/config';
import Image from 'next/image';
import React from 'react';

import { useRouter } from 'next/navigation';
import StarRating from '@/components/common/StarRating';

const MyReviewItem = (props: { item: Item; id: number }) => {
  const router = useRouter();

  // const updateReview = () => {
  //   if (window.confirm('리뷰를 수정하시겠습니까?')) {
  //     try {
  //       api.updateReview(
  //         userId,
  //         reviewId,
  //         reviewContent,
  //         reviewScore,
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       router.refresh();
  //     }
  //   }
  // };
  // const deleteReview = () => {
  //   if (window.confirm('리뷰를 제거하시겠습니까?')) {
  //     try {
  //       api.deleteReview(userId, reviewId);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       router.refresh();
  //     }
  //   }
  // };

  return (
    <div className="indicator">
      <div
        id="item"
        className="flex justify-start w-full my-4 min-h-28"
      >
        <div className="flex flex-col w-48">
          <div id="item-img" className="mask mask-square">
            <Image
              src={props.item.nutrientImageUrl}
              alt="item-img"
              width={100}
              height={100}
              onClick={() =>
                router.push(
                  `/pilldetail/pill-detail?id=${props.item.nutrientId}`,
                )
              }
            />
          </div>
          <div id="item-info" className="flex flex-col items-center">
            <span
              id="manufacturer"
              className="text-xs font-bold text-[#909090]"
            >
              {props.item.nutrientBrand}
            </span>
            <span
              id="name"
              className="text-sm font-extrabold text-[#3A3A3A]"
            >
              {props.item.nutrientName}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-around w-full m-2">
          <div id="review" className="flex flex-col">
            <span
              id="review-content"
              className="text-base font-base text-[#3A3A3A]"
            >
              {'리뷰 내용은 1000자 이상으로 남겨주세요'}
            </span>
            <StarRating
              rating={
                props.item.rating !== undefined
                  ? props.item.rating
                  : 0
              }
            />
          </div>
          <div id="buttons" className="flex justify-end space-x-2">
            <button
              id="update-btn"
              className="btn btn-sm border-none text-[#909090] btn-outline"
              // onClick={() => updateReview()}
            >
              수정
            </button>
            <button
              id="delete-btn"
              className="btn btn-sm border-none text-[#909090] btn-outline"
              // onClick={() => deleteReview()}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReviewItem;
