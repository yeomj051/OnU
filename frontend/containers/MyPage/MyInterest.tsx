//나의 관심 영양제 리스트

import { itemDataList } from '@/apis/data';
import ItemList from '../PillListPage/GridList';

const Interest = () => {
  return (
    <div>
      <p className="ml-2 text-xl font-extrabold text-[#1E266E] mb-2">
        관심 영양제
      </p>
      <ItemList itemList={itemDataList} />
    </div>
  );
};

export default Interest;
