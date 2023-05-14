//나의 관심 영양제 리스트
import ItemList from '../../components/list/GridList';
import { useEffect, useState } from 'react';
import api from '@/apis/config';
// import { useRouter } from 'next/navigation';

const Interest = (): React.ReactElement => {
  const [userId, setUserId] = useState<number>(0);
  const [itemData, setItemData] = useState<Item[]>([]);

  useEffect(() => {
    setUserId(
      Number.parseInt(localStorage.getItem('userId') as string),
    );
  }, []);

  useEffect(() => {
    getItemData();
  }, [userId]);

  const getItemData = async () => {
    return await api.getInterestPillList(userId).then((res) => {
      setItemData(res.data.interestNutrientList);
      console.log(res.data);
    });
  };

  return (
    <div>
      <p className="ml-2 text-xl font-extrabold text-[#1E266E] mb-2">
        관심 영양제
      </p>
      <div className="flex flex-col items-center w-[400px] bg-white shadow-lg text-xs font-base text-[#909090] rounded-md p-4">
        <ItemList itemList={itemData} />
      </div>
    </div>
  );
};

export default Interest;
