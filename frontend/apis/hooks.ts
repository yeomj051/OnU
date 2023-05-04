//react-query를 사용한 hook
import { QueryOptions, useQuery } from '@tanstack/react-query';
import api from './config';

export const useSearch = (
  keyword: string,
  options?: QueryOptions,
) => {
  const queryKey = process.env.REACT_APP_API_URL;
  const queryFn = async () => {
    const res = await api.searchPill(keyword);
    return res;
  };

  return useQuery([queryKey, keyword], queryFn, { ...options });
};
