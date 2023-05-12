import api from '@/apis/config';
import { useStorage } from '@/apis/hooks';
import { AxiosResponse } from 'axios';
import { create } from 'zustand';

export const useUserStore = create<UserStore>((set) => ({
  id: Number.parseInt(useStorage('userId') as string),

  initialize: () => {
    const id: number = Number.parseInt(
      useStorage('userId') as string,
    );

    api
      .getUserInfo(id)
      .then((res: AxiosResponse): void => {
        if (res.status / 100 !== 2) {
          throw new Error();
        }
        const user: IUser = {
          id,
          nickname: res.data.userNickname,
          gender: res.data.gender,
          age: res.data.age,
        };
        set((x) => ({ ...x, user }));
      })
      .catch(() => {
        localStorage.removeItem('userId');
        localStorage.removeItem('accessToken');
        set((x) => ({ ...x, user: undefined }));
      });
  },

  setUser: (user: IUser) => set((x) => ({ ...x, user })),
  resetUser: () => {
    set((x) => ({ ...x, user: undefined }));
  },
}));

export default useUserStore;
