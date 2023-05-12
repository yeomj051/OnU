import api from '@/apis/config';
import { useStorage } from '@/apis/hooks';
import { AxiosResponse } from 'axios';
import { create } from 'zustand';

export const useUserStore = create<UserStore>((set) => ({
  id: Number.parseInt(useStorage('userId') as string),

  initialize: () => {
    const user: IUser = {
      id: Number.parseInt(useStorage('userId') as string),
      nickname: useStorage('userId') as string,
      gender: useStorage('userId') as string,
      age: Number.parseInt(useStorage('userId') as string),
    };
    set((x) => ({ ...x, user }));
    console.log(useUserStore.getState().user?.id);
  },

  setUser: (user: IUser) => set((x) => ({ ...x, user })),
  resetUser: () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userNickname');
    localStorage.removeItem('userAge');
    localStorage.removeItem('userGender');
    set((x) => ({ ...x, user: undefined }));
  },
}));

export default useUserStore;
