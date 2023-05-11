//API 호출에 사용할 함수들을 정리해놓은 파일입니다
import { baseAPI, authAPI } from './axios';

//사용은 api.함수명()으로 하면 됩니다
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

  //전화번호 인증 메시지 전송
  async sendVerificationCode(
    userId: number,
    userPhoneNumber: string,
  ) {
    return await authAPI(`/user/phone`, {
      method: 'POST', //GET?
      body: {
        userId: userId,
        phoneNumber: userPhoneNumber,
      },
    });
  },

  //전화번호 인증
  async verifyPhoneNumber() {
    return await authAPI(`/user/phone`, {
      method: 'POST',
    });
  },

  //회원정보 조회(마이페이지)
  async getUserInfo(userId: number) {
    return await authAPI(`/mypage/${userId}`, {
      method: 'GET',
    });
  },

  //회원정보 수정
  async updateUserInfo(
    userId: number,
    userNickname: string,
    gender: string,
    userPhoneNumber: string,
  ) {
    return await authAPI(`/mypage/${userId}`, {
      method: 'PATCH',
      body: {
        userNickname: userNickname,
        gender: gender,
        phoneNumber: userPhoneNumber,
      },
    });
  },

  //캘린더 조회
  async getCalendar(userId: number) {
    return await authAPI(`/mypage/${userId}/calendar`, {
      method: 'GET',
    });
  },

  //복용여부 체크
  async checkPill(userId: number) {
    return await authAPI(`/mypage/${userId}/calendar`, {
      method: 'POST',
    });
  },

  //복용중인 영양제 목록 조회
  async getTakingPillList(userId: number) {
    return await authAPI(`/mypage/${userId}/taking`, {
      method: 'GET',
    });
  },

  //복용중인 영양제 등록
  async addTakingPill(userId: number, takingPillId: number) {
    return await authAPI(`/mypage/${userId}/taking/${takingPillId}`, {
      method: 'POST',
    });
  },

  //복용중인 영양제 삭제
  async deleteTakingPill(userId: number, takingPillId: number) {
    return await authAPI(`/mypage/${userId}/taking/${takingPillId}`, {
      method: 'DELETE',
    });
  },

  //회원리뷰 조회
  async getReviewList(userId: number) {
    return await authAPI(`/mypage/${userId}/review`, {
      method: 'GET',
    });
  },

  //회원리뷰 수정
  async updateReview(userId: number, reviewId: number) {
    return await authAPI(`/mypage/${userId}/review/${reviewId}`, {
      method: 'PATCH',
    });
  },

  //회원리뷰 삭제
  async deleteReview(userId: number, reviewId: number) {
    return await authAPI(`/mypage/${userId}/review/${reviewId}`, {
      method: 'DELETE',
    });
  },

  //관심 영양제 목록 조회(성분 포함)
  async getInterestPillIngredientList(userId: number) {
    return await authAPI(`/mypage/${userId}/ingredient/interest`, {
      method: 'GET',
    });
  },

  //관심 영양제 목록 조회
  async getInterestPillList(userId: number) {
    return await authAPI(`/mypage/${userId}/interest`, {
      method: 'GET',
    });
  },

  //관심 영양제 취소
  async deleteInterestPill(userId: number, nutrientId: number) {
    return await authAPI(`/mypage/${userId}/interest/${nutrientId}`, {
      method: 'DELETE',
    });
  },

  //관심 영양제 등록
  async addInterestPill(userId: number, nutrientId: number) {
    return await authAPI(`/mypage/${userId}/interest/${nutrientId}`, {
      method: 'POST',
    });
  },

  //영양제 검색
  async searchPill(keyword: string) {
    return await baseAPI(`/search/${keyword}`, {
      method: 'GET',
    });
  },

  //영양제 조합 목록 조회
  async getCombList() {
    return await authAPI(`/mypage/combination`, {
      method: 'GET',
    });
  },

  //영양제 조합 저장
  async saveComb() {
    return await authAPI(`/mypage/combination`, {
      method: 'POST',
    });
  },

  //영양제 조합 삭제
  async deleteComb() {
    return await authAPI(`/mypage/combination`, {
      method: 'DELETE',
    });
  },

  //회원리뷰 등록
  async addReview(userId: number, nutrientId: number) {
    return await authAPI(`/nutrient/${nutrientId}/${userId}`, {
      method: 'POST',
    });
  },

  //성분별 영양제 목록 조회
  async getPillListByIngredient(
    userId: number,
    ingredientId: number,
  ) {
    return await authAPI(`/nutrient/${ingredientId}/${userId}`, {
      method: 'GET',
    });
  },

  //기능별 영양제 목록 조회
  async getPillListByFunction(userId: number, functionId: number) {
    return await authAPI(`/nutrient/${functionId}/${userId}`, {
      method: 'GET',
    });
  },

  //영양제 상세정보 조회
  async getPillDetail(nutrientId: number) {
    return await baseAPI(`/nutrient/${nutrientId}`, {
      method: 'GET',
    });
  },

  //선택한 영양제 리뷰목록 조회
  async getPillReviewList(nutrientId: number) {
    const response = await baseAPI(`/nutrient/${nutrientId}/review`, {
      method: 'GET',
    });
    return response;
  },

  //비교할 영양제 정보 조회
  async comparePill(nutrientId: number, compareId: number) {
    return await baseAPI(`/compare/${nutrientId}/${compareId}`, {
      method: 'GET',
    });
  },

  //설문용 질문리스트 호출
  async nextSurvey(userId: number) {
    return await authAPI(`/recommend/${userId}`, {
      method: 'GET',
    });
  },

  //설문결과 조회
  async getSurveyResult(userId: number) {
    return await authAPI(``, {
      method: 'POST',
      body: {
        userId: userId,
        survey: {},
      },
    });
  },

  //복용알림 시간 등록
  async addAlarm() {
    return await authAPI(`/notification`, {
      method: 'POST',
    });
  },

  //복용알림 취소
  async deleteAlarm() {
    return await authAPI(`/notification`, {
      method: 'DELETE',
    });
  },

  //건강정보 목록조회
  async getHealthInfoList() {
    return await authAPI(`/healthinfo`, {
      method: 'GET',
    });
  },

  //건강정보 상세조회
  async getHealthInfoDetail(healthInfoId: number) {
    return await authAPI(`/healthinfo/${healthInfoId}`, {
      method: 'GET',
    });
  },
};

export default api;
