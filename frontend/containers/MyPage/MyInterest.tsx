//나의 관심 영양제 리스트
import ItemList from '../../components/list/GridList';
import { useEffect, useState } from 'react';
import api from '@/apis/config';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { itemDataList } from '@/apis/data';

import MyInterestItem from './MyInterestItem';

const Interest = (): React.ReactElement => {
  const [userId, setUserId] = useState<number>(0);
  const [userNickname, setUserNickname] = useState<string>('');
  const [itemData, setItemData] = useState<Item[]>([]);

  useEffect(() => {
    setUserId(
      Number.parseInt(localStorage.getItem('userId') as string),
    );
    setUserNickname(localStorage.getItem('userNickname') as string);
  }, []);

  useEffect(() => {
    // getItemData();
    setItemData(itemDataList);
  }, []);

  // const getItemData = async () => {
  //   return await api.getInterestPillList(userId).then((res) => {
  //     setItemData(res.data.interestNutrientList);
  //     console.log(res.data);
  //   });
  // };

  return (
    <div>
      <p className="ml-2 text-xl font-extrabold text-[#1E266E]">
        관심 영양제
      </p>
      <p className="ml-2 text-xs font-light text-[#1E266E] mb-2">
        {userNickname}님이 관심있어 하는 제품들을 모아봤어요.
      </p>
      <div className="grid grid-cols-2 space-y-2 gap-4 w-[400px] bg-white shadow-lg text-xs font-base text-[#909090] rounded-md items-baseline px-8">
        {itemData?.map((item, index) => (
          <MyInterestItem item={item} id={userId} />
        ))}
      </div>
    </div>
  );
};

export default Interest;
