//나의 관심 영양제 리스트
import ItemList from '../../components/list/GridList';
import { useEffect, useState } from 'react';
import api from '@/apis/config';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/navigation';

const Interest = (): React.ReactElement => {
  const [userId, setUserId] = useState<number>(0);
  const [itemData, setItemData] = useState<Item[]>([]);
  const router = useRouter();

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
        <div className="grid grid-cols-2 gap-4 w-[400px] bg-white shadow-lg text-xs font-base text-[#909090] rounded-md items-baseline px-8">
          {itemData
            ? itemData.map((item, index) => (
                <div
                  id="item"
                  className="flex flex-col items-center w-[160px] my-4 min-h-28"
                  key={index}
                  // onClick={() => router.push(`${item.itemUrl}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div id="item-img" className="mask mask-square">
                    <Image
                      src={item.nutrientImageUrl}
                      alt="item-img"
                      width={100}
                      height={100}
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
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Interest;
