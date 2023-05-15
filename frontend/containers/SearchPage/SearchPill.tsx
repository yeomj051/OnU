//나의 관심 영양제 리스트
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { SearchBar } from '@/components/common/SearchBar';

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
      <SearchBar />
    </div>
  );
};

export default SearchPill;
