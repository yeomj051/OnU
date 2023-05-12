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
        console.log(user);
      })
      .catch((error) => {
        console.log(
          `(´･_･) 이게뭐지

        (´っ_c) 내가 잘못봤나?

        (´◎ω◎) 띠용?!

        ＿人人 人人＿
        ＞ (´◎ω◎)  ＜ ${error.code} ${error.message} 잖아?!
        ￣Y^Y^Y^Y￣`,
        );
      });
  },

  setUser: (user: IUser) => set((x) => ({ ...x, user })),
  resetUser: () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('accessToken');
    set((x) => ({ ...x, user: undefined }));
  },
}));

export default useUserStore;
