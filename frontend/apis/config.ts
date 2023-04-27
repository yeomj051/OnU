//API 호출에 사용할 함수들을 정리해놓은 파일입니다
import { baseAPI, authAPI } from './axios';

const api = {
  //토큰 재발급
  async reissueToken(userId: number, refreshToken: string) {
    return await authAPI(`/auth/reissue`, {
      method: 'POST',
      body: {
        userId: userId,
        refreshToken: refreshToken,
      },
    });
  },

  //로그아웃
  async logoutUser(userId: number) {
    return await authAPI(`/user/logout/${userId}`, {
      method: 'GET',
    });
  },

  //회원탈퇴
  async deleteUser(userId: number) {
    return await authAPI(`/user/${userId}`, {
      method: 'DELETE',
    });
  },

  //닉네임 중복검사
  async checkNickname(userNickname: string) {
    return await baseAPI(`/user/${userNickname}`, {
      method: 'GET',
    });
  },
};

export default api;
