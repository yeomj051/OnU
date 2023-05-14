import { useEffect, useState } from 'react';
import api from '@/apis/config';
import ItemList from '@/components/list/ReviewList';

//내가 쓴 리뷰 리스트
const Review = (): React.ReactElement => {
  const [userId, setUserId] = useState<number>(0);
  const [itemData, setItemData] = useState<Review[]>([]);

  useEffect(() => {
    setUserId(
      Number.parseInt(localStorage.getItem('userId') as string),
    );
  }, []);

  useEffect(() => {
    getItemData();
  }, [userId]);

  const getItemData = async () => {
    return await api.getReviewList(userId).then((res) => {
      setItemData(res.data.reviewListByNutrient);
      console.log(res.data);
    });
  };

  return (
    <div>
      <p className="ml-2 text-xl font-extrabold text-[#1E266E] mb-2">
        내가 쓴 리뷰
      </p>
      <div className="flex flex-col items-center w-[400px] bg-white shadow-lg text-xs font-base text-[#909090] rounded-md p-4">
        <ItemList itemList={itemData} />
      </div>
    </div>
  );
};

export default Review;
