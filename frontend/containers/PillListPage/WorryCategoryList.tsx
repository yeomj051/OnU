import React from 'react';
import styled from '@emotion/styled';
import { Eye } from '@emotion-icons/entypo/Eye';
import ItemList from '@/components/list/ItemList';
import { itemDataList } from '@/apis/data';

const EyeIcon = styled(Eye)`
  color: #424b5a;
`;

const worryDataList: string[] = [
  '전체',
  '눈 건강',
  '관절 건강',
  '척추 건강',
  '피부 건강',
  '뼈 건강',
  '혈행 개선',
  '면역력 강화',
  '기억력 강화',
  '스트레스 해소',
];

const WorryCategoryList = () => {
  return (
    <div>
      <div id="list" className="flex flex-wrap mt-4 ml-4">
        {worryDataList.map((item, index) => (
          <button className="btn btn-xl m-2 bg-[#D8EDFF] rounded-2xl border-none text-[#424B5A]  active:bg-[#90B5EA] active:text-[#FFFFFF] hover:bg-[#90B5EA] hover:text-[#FFFFFF] text-xs w-24 h-20">
            <div className="flex flex-col items-center">
              <EyeIcon className="w-6 h-6" />
              {item}
            </div>
          </button>
        ))}
      </div>
      <ItemList itemList={itemDataList} />
    </div>
  );
};

export default WorryCategoryList;
