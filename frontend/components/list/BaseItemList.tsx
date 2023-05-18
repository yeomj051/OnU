import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const ItemList = (props: { itemList: Array<Item> }) => {
  // const itemDataList = props.data;
  const router = useRouter();

  return (
    <div id="item-list">
      {props.itemList?.map((item: Item, index: number) => {
        return (
          <div
            id="item"
            className="flex justify-start w-full my-4"
            key={index}
          >
            <div id="item-img" className="mask mask-square">
              <Image
                src={item.nutrientImageUrl}
                alt="item-img"
                width={140}
                height={100}
                onClick={() =>
                  router.push(
                    `/pilldetail/pill-detail?id=${item.nutrientId}`,
                  )
                }
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
                  {item.nutrientBrand}
                </span>
                <span
                  id="name"
                  className="text-sm font-extrabold text-[#3A3A3A]"
                >
                  {item.nutrientName}
                </span>
              </div>
              <button
                id="add-btn"
                className="btn btn-sm border-[#90B5EA] text-[#90B5EA] btn-outline"
                // onClick={() => handleInterest(item.nutrientId)}
              >
                관심목록 추가
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
