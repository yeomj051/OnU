//나의 관심 영양제 리스트
import { itemDataList } from '@/apis/data'; //더미 데이터
import ItemList from '../../components/list/GridList';
import { useEffect, useState } from 'react';
import api from '@/apis/config';
// import { useRouter } from 'next/navigation';

const Interest = (): React.ReactElement => {
  const [userId, setUserId] = useState<number>(0);
  // const [itemData, setItemData] = useState<Item[]>([]);
  // const router = useRouter();

  //관심 영양제 호출 api
  useEffect(() => {
    if (localStorage.getItem('userData')) {
      const userData: string | null =
        localStorage.getItem('userData');
      if (userData !== null)
        setUserId(Number.parseInt(JSON.parse(userData).id));
    }
    api.getInterestPillList(userId).then((res) => {
      console.log(res);
      // setItemData(res.data);
    });
  }, [userId]);

  return (
    <div>
      <p className="ml-2 text-xl font-extrabold text-[#1E266E] mb-2">
        관심 영양제
      </p>
      {/** api 연결되면 아래껄로
       *  관심목록 제거 버튼 추가해야함
       */}
      <ItemList itemList={itemDataList} />
      {/* <div className="grid grid-cols-2 gap-4 w-[400px] bg-white shadow-lg text-xs font-base text-[#909090] rounded-md items-baseline px-8">
        {itemData?.map((item, index) => (
          <div
            id="item"
            className="flex flex-col items-center w-[180px] my-4 min-h-28"
            key={index}
            onClick={() => router.push(`${item.nutrientId}`)}
            style={{ cursor: 'pointer' }}
          >
            <div id="item-img" className="mask mask-square">
              <Image
                src={item.nutrientImageUrl}
                alt="item-img"
                width={100}
                height={100}
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
            <button>관심목록 제거</button>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Interest;
