import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Eye } from '@emotion-icons/entypo/Eye';
import ItemList from '@/components/list/ItemList';
import axios from 'axios';
import { BASE_URL } from '@/apis/axios';

const EyeIcon = styled(Eye)`
  color: #424b5a;
`;

// const worryDataList = [
//   '뼈/관절':
//     'https://pilly.kr/images/store/concern/icon-joints_bone_off.png',
//   '눈 건강':
//     'https://pilly.kr/images/store/concern/icon-ophthalmologic_off.png',
//   '간 건강':
//     'https://pilly.kr/images/store/concern/icon-liver_health_off.png',
//   '장 건강':
//     'https://pilly.kr/images/store/concern/icon-intestinal_health_off.png',
//   '면역력 개선':
//     'https://pilly.kr/images/store/concern/icon-immune_function_off.png',
//   '혈행 개선': 'https://pilly.kr/images/store/concern/icon-skin_health_off.png',
//   '혈당 조절': 'https://pilly.kr/images/store/concern/icon-stomache_off.png',
//   콜레스테롤: 'https://pilly.kr/images/store/concern/icon-constipation_off.png',
//   '체지방 감소': 'https://pilly.kr/images/store/concern/icon-diet_off.png',
//   항산화: 'https://pilly.kr/images/store/concern/icon-anti_oxidation_off.png',
//   '피로 개선': 'https://pilly.kr/images/store/concern/icon-vitality_off.png',
//   '갱년기 여성':
//     'https://pilly.kr/images/store/concern/icon-gyniatrics_off.png',
//   '갱년기 남성':
//     'https://pilly.kr/images/store/concern/icon-androgenic_health_on.png',
//   '질 건강':
//     'https://pilly.kr/images/store/concern/icon-pregnancy_off.png',
//   '정자 운동성': 'https://pilly.kr/images/store/concern/icon-hair_scalp_off.png',
// ]
const worryDataList = [
  [
    '뼈/관절',
    'https://pilly.kr/images/store/concern/icon-joints_bone_off.png',
  ],
  [
    '눈 건강',
    'https://pilly.kr/images/store/concern/icon-ophthalmologic_off.png',
  ],
  [
    '간 건강',
    'https://pilly.kr/images/store/concern/icon-liver_health_off.png',
  ],
  [
    '장 건강',
    'https://pilly.kr/images/store/concern/icon-intestinal_health_off.png',
  ],
  [
    '면역력 개선',
    'https://pilly.kr/images/store/concern/icon-immune_function_off.png',
  ],
  [
    '혈행 개선',
    'https://pilly.kr/images/store/concern/icon-skin_health_off.png',
  ],
  [
    '혈당 조절',
    'https://pilly.kr/images/store/concern/icon-stomache_off.png',
  ],
  [
    '콜레스테롤',
    'https://pilly.kr/images/store/concern/icon-constipation_off.png',
  ],
  [
    '체지방 감소',
    'https://pilly.kr/images/store/concern/icon-diet_off.png',
  ],
  [
    '항산화',
    'https://pilly.kr/images/store/concern/icon-anti_oxidation_off.png',
  ],
  [
    '피로 개선',
    'https://pilly.kr/images/store/concern/icon-vitality_off.png',
  ],
  [
    '갱년기 여성',
    'https://pilly.kr/images/store/concern/icon-gyniatrics_off.png',
  ],
  [
    '갱년기 남성',
    'https://pilly.kr/images/store/concern/icon-androgenic_health_off.png',
  ],
  [
    '질 건강',
    'https://pilly.kr/images/store/concern/icon-pregnancy_off.png',
  ],
  [
    '정자 운동성',
    'https://pilly.kr/images/store/concern/icon-hair_scalp_off.png',
  ],
];

const WorryCategoryList = () => {
  const [itemData, setItemData] = useState<Item[]>([]);
  const [functionId, setFunctionId] = useState<number>(
    Math.ceil(Math.random() * 15),
  );
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    if (localStorage.getItem('userData')) {
      const userData: string | null =
        localStorage.getItem('userData');
      if (userData !== null)
        setUserId(Number.parseInt(JSON.parse(userData).id));
    }

    axios
      .get(
        `${BASE_URL}/nutrient/function/${functionId}?userId=${userId}`,
      )
      .then((res) => {
        console.log(res.data);
        setItemData(res.data.reviewListByNutrient);
      });
  }, [userId, functionId]);

  return (
    <div>
      <div id="list" className="flex flex-wrap mt-4 ml-4">
        {worryDataList.map((item, index) => (
          <button
            key={index}
            className="btn btn-xl m-2 bg-[#D8EDFF] rounded-2xl border-none text-[#424B5A]  active:bg-[#90B5EA] active:text-[#FFFFFF] hover:bg-[#90B5EA] hover:text-[#FFFFFF] whitespace-pre text-xs w-20 h-16 sm:w-24 sm:h-20"
            onClick={() => setFunctionId(index + 1)}
          >
            <div className="flex flex-col items-center">
              <img
                src={item[1]}
                width={24}
                height={24}
                alt={item[0]}
              />
              {item[0]}
            </div>
          </button>
        ))}
      </div>
      <ItemList itemList={itemData} />
    </div>
  );
};

export default WorryCategoryList;
