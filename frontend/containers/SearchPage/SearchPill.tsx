//나의 관심 영양제 리스트
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { SearchBar } from '@/components/common/SearchBar';
import Interest from '../MyPage/MyInterest';

const SearchPill = (): React.ReactElement => {
  const [userId, setUserId] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    setUserId(
      Number.parseInt(localStorage.getItem('userId') as string),
    );
  }, []);

  return (
    <div className="flex flex-col pt-20 items-center space-y-4 min-h-[100vh]">
      <span className="">
        원하시는 영양제의 이름이나 성분을 검색해보세요!
      </span>
      <SearchBar />
      <Interest />
    </div>
  );
};

export default SearchPill;
