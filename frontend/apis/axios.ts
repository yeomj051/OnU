import axios from 'axios';
import { cookies } from 'next/headers';

const BASE_URL = process.env.REACT_APP_API_URL;
const cookieStore = cookies();

//베이스가 될 axios 인스턴스(인증이 필요하지 않은 요청)
export const baseAPI = (url: string, options: any) => {
  const instance = axios.create({
    baseURL: BASE_URL + url,
    ...options,
  });

  return instance;
};

//인증이 필요한 요청에 대한 인스턴스
export const authAPI = (url: string, options: any) => {
  const instance = axios.create({
    baseURL: BASE_URL + url,
    ...options,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config; //기존 요청 저장
      //토큰이 만료되었을 때(Unauthorized)
      if (error.response.status === 401) {
        const refreshToken = cookieStore.get('refreshToken');
        //리프레시 토큰으로 새로운 토큰 재발급 요청
        const response = await axios({
          method: 'POST',
          url: BASE_URL + '/auth/refresh',
          data: {
            refreshToken,
          },
        });
        //await 키워드가 붙은 코드가 완료될 때까지 다음 코드가 실행되지 않음
        localStorage.setItem(
          'accessToken',
          response.data.accessToken,
        );
        return axios(originalRequest);
      }
      //나머지 오류
      return Promise.reject(error);
    },
  );

  return instance;
};
