import Image from 'next/image';
import React from 'react';
import StarRating from '@/components/common/StarRating';

type Item = {
  id: number; //itemId
  name: string; //제품명
  rating: number;
  manufacturer?: string; //제조사
  imgUrl: string; //썸네일 이미지
  itemUrl: string; //상세정보 링크
};

const ItemList = (props: { itemList: Array<Item> }) => {
  return (
    <div id="item-list">
      {props.itemList.map((item, index) => (
        <div
          id="item"
          className="flex justify-start w-full my-4 min-h-28"
          key={index}
        >
          <div className="flex flex-col w-48">
            <div id="item-img" className="mask mask-square">
              <Image
                src={item.imgUrl}
                alt="item-img"
                width={100}
                height={100}
              />
            </div>
            <div
              id="item-info"
              className="flex flex-col items-center"
            >
              <span
                id="manufacturer"
                className="text-xs font-bold text-[#909090]"
              >
                {item.manufacturer}
              </span>
              <span
                id="name"
                className="text-sm font-extrabold text-[#3A3A3A]"
              >
                {item.name}
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
              <StarRating rating={item.rating} />
            </div>
            <div id="buttons" className="flex justify-end space-x-2">
              <button
                id="update-btn"
                className="btn btn-sm border-none text-[#909090] btn-outline"
              >
                수정
              </button>
              <button
                id="delete-btn"
                className="btn btn-sm border-none text-[#909090] btn-outline"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
