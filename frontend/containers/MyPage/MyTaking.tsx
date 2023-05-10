import { itemDataList } from '@/apis/data';
import ItemList from '../../components/list/BaseItemList';

//나의 복용중인 영양제 리스트
const Taking = (): React.ReactElement => {
  return (
    <div>
      <p className="ml-2 text-xl font-extrabold text-[#1E266E] mb-2">
        복용 중인 영양제
      </p>
      <div className="flex flex-col items-center w-[400px] bg-white shadow-lg text-xs font-base text-[#909090] rounded-md p-4">
        <ItemList itemList={itemDataList} />
      </div>
    </div>
  );
};

export default Taking;
