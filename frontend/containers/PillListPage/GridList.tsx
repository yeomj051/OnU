import Image from 'next/image';
import React from 'react';

type Item = {
  id: number; //itemId
  name: string; //제품명
  manufacturer?: string; //제조사
  imgUrl: string; //썸네일 이미지
  itemUrl: string; //상세정보 링크
};

const ItemList = (props: { itemList: Array<Item> }) => {
  // const itemDataList = props.data;

  return (
    <div className="grid grid-cols-2 gap-4 w-[400px] bg-white shadow-lg text-xs font-base text-[#909090] rounded-md items-baseline p-4">
      {props.itemList?.map((item, index) => (
        <div
          id="item"
          className="flex flex-col items-center w-[180px] my-4 min-h-28"
          key={index}
        >
          <div id="item-img" className="mask mask-square">
            <Image
              src={item.imgUrl}
              alt="item-img"
              width={140}
              height={100}
            />
          </div>
          <div id="item-info" className="flex flex-col items-center">
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
      ))}
    </div>
  );
};

export default ItemList;
