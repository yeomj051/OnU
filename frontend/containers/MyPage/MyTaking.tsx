import { useEffect, useState } from 'react';
import api from '@/apis/config';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

//나의 복용중인 영양제 리스트
const Taking = (): React.ReactElement => {
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
    return await api.getTakingPillList(userId).then((res) => {
      setItemData(res.data.takingNutrientList);
      console.log(res.data);
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="ml-2 text-xl font-extrabold text-[#1E266E] mb-2">
          복용 중인 영양제
        </p>
        <button
          className="btn bg-[#1E266E] btn-xs"
          onClick={() => router.push('/search')}
        >
          추가하기
        </button>
      </div>

      <div className="flex flex-col items-center w-[400px] bg-white shadow-lg text-xs font-base text-[#909090] rounded-md p-4">
        <div id="item-list">
          {itemData ? (
            itemData.map((item, index) => {
              return (
                <div
                  id="item"
                  className="flex justify-start w-full my-4 min-h-28"
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
                          `/pilldetail/pill-detail/${item.nutrientId}`,
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
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col">
              <span>복용 중인 영양제가 없습니다.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Taking;
