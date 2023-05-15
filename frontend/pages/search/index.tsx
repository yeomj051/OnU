import { NextPageWithLayout } from '../_app';
import AppLayout from '@/components/layout/AppLayout';
import HeaderLayout from '@/components/layout/HeaderLayout';
import SearchPill from '@/containers/SearchPage/SearchPill';

//검색 결과
const SearchResultPage: NextPageWithLayout = () => {
  return (
    <div>
      <SearchPill />
    </div>
  );
};

SearchResultPage.getLayout = function getLayout(
  page: React.ReactElement,
) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default SearchResultPage;
