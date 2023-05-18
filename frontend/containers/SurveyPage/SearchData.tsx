import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const ItemList = (props: {
  itemList: Array<Item>;
  onAnswer: (nutrientId: any) => void;
  answers: any;
}) => {
  const [clickNutrientIds, setClickNutrientIds] = useState<number[]>(
    [],
  );

  useEffect(() => {
    setClickNutrientIds(props.answers[4]);
  }, [props.answers[4]]);

  const handleButtonClick = (item: any) => {
    const updatedNutrientIds = clickNutrientIds
      ? [...clickNutrientIds]
      : [];
    console.log('???????', item.nutrientId);
    if (updatedNutrientIds.includes(item.nutrientId)) {
      // 이미 선택된 기능일 경우 제거
      const updatedId = updatedNutrientIds.indexOf(item.nutrientId);
      updatedNutrientIds.splice(updatedId, 1);
      console.log('이거 맞나', updatedId);
      alert('선택이 해제되었습니다.');
    } else {
      // 선택되지 않은 기능일 경우 추가
      updatedNutrientIds.push(item.nutrientId);
      alert('선택되었습니다.');
    }
    setClickNutrientIds(updatedNutrientIds); // 업데이트된 배열을 설정합니다
    props.onAnswer(updatedNutrientIds); // 최신 배열을 상위 컴포넌트로 전달합니다
    console.log('선택한 것들', updatedNutrientIds);
  };

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
                className={`btn btn-sm btn-outline hover:bg-[#90B5EA] hover:text-white hover:border-none active:bg-[#90B5EA] active:text-white ${
                  clickNutrientIds !== undefined &&
                  clickNutrientIds.includes(item.nutrientId)
                    ? 'bg-[#90B5EA] text-white border-none '
                    : 'border-[#90B5EA] text-[#90B5EA]'
                } text-xs w-[8rem]`}
                onClick={() => handleButtonClick(item)}
              >
                {clickNutrientIds !== undefined &&
                clickNutrientIds.includes(item.nutrientId)
                  ? '해제하기'
                  : '선택하기'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
