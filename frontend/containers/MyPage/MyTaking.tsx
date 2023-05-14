import { itemDataList } from '@/apis/data';
import ItemList from '../../components/list/BaseItemList';
import { useEffect, useState } from 'react';
import api from '@/apis/config';

//나의 복용중인 영양제 리스트
const Taking = (): React.ReactElement => {
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
    return await api.getTakingPillList(userId).then((res) => {
      setItemData(res.data.takingNutrientList);
      console.log(res.data);
    });
  };

  return (
    <div>
      <p className="ml-2 text-xl font-extrabold text-[#1E266E] mb-2">
        복용 중인 영양제
      </p>
      <div className="flex flex-col items-center w-[400px] bg-white shadow-lg text-xs font-base text-[#909090] rounded-md p-4">
        <ItemList itemList={itemData} />
      </div>
    </div>
  );
};

export default Taking;
