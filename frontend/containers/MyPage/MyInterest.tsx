//나의 관심 영양제 리스트
import ItemList from '../../components/list/GridList';
import { useEffect, useState } from 'react';
import api from '@/apis/config';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { itemDataList } from '@/apis/data';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

const Interest = (): React.ReactElement => {
  const [userId, setUserId] = useState<number>(0);
  const [userNickname, setUserNickname] = useState<string>('');
  const [itemData, setItemData] = useState<Item[]>([]);
  const router = useRouter();

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
          <div className="indicator">
            <div className="text-[#90B5EA] border-none bg-opacity-0 indicator-item badge top-2 right-2">
              <button>
                <AddCircleOutlineRoundedIcon />
              </button>
            </div>
            <div
              id="item"
              className="flex flex-col items-center w-[160px] my-4 min-h-28"
              key={index}
              style={{ cursor: 'pointer' }}
            >
              <div
                id="item-img"
                className="mask mask-square w-[100px] h-[120px]"
              >
                <Image
                  src={item.nutrientImageUrl}
                  alt="item-img"
                  width={100}
                  height={100}
                  style={{
                    objectFit: 'fill',
                  }}
                  onClick={() =>
                    router.push(
                      `/pilldetail/pill-detail/${item.nutrientId}`,
                    )
                  }
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
                  {item.nutrientBrand}
                </span>
                <span
                  id="name"
                  className="text-sm font-extrabold text-[#3A3A3A]"
                >
                  {item.nutrientName}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interest;
