//react-query를 사용한 hook
import {
  QueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import api from './config';
import axios, { AxiosResponse } from 'axios';

export const queryKey = process.env.REACT_APP_API_URL;

//검색어를 통해 검색결과를 조회하는 api
export const useSearch = (
  keyword: string,
  options?: QueryOptions,
): UseQueryResult => {
  const queryKey = process.env.REACT_APP_API_URL;
  const queryFn = async () => {
    const res: AxiosResponse = await axios.get(
      `https://k8a703.p.ssafy.io/api/search/${keyword}`,
    );
    return res;
  };

  return useQuery([queryKey, keyword], queryFn, { ...options });
};

//상세페이지

//영양제 상세 정보 조회하는 api
export const usePillDetail = (
  nutrientId: number,
  options?: QueryOptions,
) => {
  const queryFn = async () => {
    const res = await api.getPillDetail(nutrientId);
    return res;
  };
  return useQuery([queryKey, nutrientId], queryFn, { ...options });
};

//관심 영양제 등록하는 api
export const useAddInterest = (
  userId: number,
  nutrientId: number,
  options?: QueryOptions,
) => {
  const mutateFn = async () => {
    const res = await api.addInterestPill(userId, nutrientId);
    return res;
  };
  return useMutation(mutateFn, { ...options });
};

//선택한 영양제 리뷰목록 조회하는 api
export const usePillReviewList = (
  nutrientId: number,
  // options: QueryOptions,
) => {
  const queryFn = async () => {
    const res = await api.getPillReviewList(nutrientId);
    return res;
  };
  return useQuery([queryKey, nutrientId], queryFn);
};

//비교페이지
//영양제 두개 영양성분 비교하는 api
export const useComparePill = (
  nutrientId: number,
  compareId: number,
  options?: QueryOptions,
) => {
  const queryFn = async () => {
    const res = await api.comparePill(nutrientId, compareId);
    return res;
  };
  return useQuery([queryKey, nutrientId, compareId], queryFn, {
    ...options,
  });
};

// //영양제 조합 목록 조회
// export const useCombList = () => {
//   const queryFn = async () => {
//     const res = await api.getCombList();
//     return res;
//   };
//   return useQuery([queryKey], queryFn);
// };

// //영양제 조합 저장
// export const useSaveComb = () => {
//   const mutateFn = async () => {
//     const res = await api.getCombList();
//     return res;
//   };
//   return useMutation([queryKey], mutateFn);
// };
