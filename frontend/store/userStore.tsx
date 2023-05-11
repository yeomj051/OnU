import { create } from 'zustand';

type UserState = {
  id: number;
  nickname: string;
  age: number;
  gender: string;
  accessToken: string;
  setUser: (
    id: number,
    nickname: string,
    age: number,
    gender: string,
    accessToken: string,
  ) => void;
};

export const userStore = create<UserState>((set) => ({
  id: 0,
  nickname: '',
  age: 0,
  gender: '',
  accessToken: '',
  refreshToken: '',
  setUser: (
    id: number,
    nickname: string,
    age: number,
    gender: string,
    accessToken: string,
  ) =>
    set({
      id,
      nickname,
      age,
      gender,
      accessToken,
    }),
}));

export default userStore;
