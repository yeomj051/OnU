//API 호출에 사용할 함수들을 정리해놓은 파일입니다
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

//작성예시
export const POST_GET_NFT = async (id: number): Promise<any> => {
  const response = await axios({
    method: 'POST',
    url: BASE_URL + '/nft',
    params: id,
  });

  return response;
};
