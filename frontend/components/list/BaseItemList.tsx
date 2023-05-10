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
    <div id="item-list">
      {props.itemList?.map((item, index) => {
        return (
          <div
            id="item"
            className="flex justify-start w-full my-4 min-h-28"
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
            <div className="flex flex-col justify-between w-full pl-2 m-2">
              <div
                id="item-info"
                className="flex flex-col items-start"
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
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
