import React from 'react';
import Timer from '@/components/common/Timer';
import { useRouter } from 'next/router';

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = React.useState<string>(''); //전화번호
  const [authCode, setAuthCode] = React.useState<string>(''); //인증번호
  const [userId, setUserId] = React.useState<number>(0);
  const [isMessageSent, setIsMessageSent] =
    React.useState<boolean>(false); //인증 메시지 전송 여부
  const [time, setTime] = React.useState<number>(180);
  const [isAuth, setIsAuth] = React.useState<number>(0);

  const router = useRouter();

  React.useEffect(() => {
    const authNum: string | null = localStorage.getItem(
      'isPhoneAuthenticated',
    );

    if (authNum) {
      setIsAuth(Number.parseInt(authNum));
      if (Number.parseInt(authNum) <= 2) setIsMessageSent(true);
      else if (Number.parseInt(authNum) > 2) {
        alert('인증횟수를 초과했습니다. 다시 시도해주세요');
        localStorage.removeItem('isPhoneAuthenticated');
        router.reload();
      }
    }
  }, []);

  //인증시간 만료 로직처리
  const handleTimeOut = () => {
    if (confirm('인증시간이 초과되었습니다. 다시 시도해주세요')) {
      localStorage.removeItem('isAuth');
      router.reload();
    }
  };

  // userId 가져오기
  //숫자만 입력받도록 정규식 제한
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*)\./g, '$1');
  };

  const verifyPhoneNumber = (): void => {
    // api
    //   .verifyPhoneNumber(userId, phoneNumber)
    //   .then((res: any): void => {
    //     if (res.data.message === 'true') {
    //       alert('인증번호가 전송되었습니다.');
    //       setIsMessageSent(true);
    //     } else {
    //       throw new Error();
    //     }
    //   })
    //   .catch((err: Error): void => {
    //     alert('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
    //   });
    alert('인증번호가 전송되었습니다.');
    setPhoneNumber('');
    setAuthCode('');
    setIsMessageSent(true);
  };

  const verifyAuthNumber = (): void => {
    // api
    //   .verifyPhoneNumber()
    //   .then((res: any): void => {
    //     if (res.data.message === 'true') {
    //       alert('인증이 완료되었습니다.');
    //       setIsMessageSent(false);
    //     } else {
    //       throw new Error();
    //     }
    //   })
    //   .catch((err: Error): void => {
    //     alert('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
    //   });
    alert('인증이 완료되었습니다.');
    localStorage.removeItem('isPhoneAuthenticated');
    setPhoneNumber('');
    setAuthCode('');
    setIsMessageSent(false);

    //다음 페이지로 이동
  };

  const reVerify = (): void => {
    localStorage.setItem('isPhoneAuthenticated', String(isAuth + 1));
    router.reload();
  };

  return (
    <div className="grid grid-rows h-[100vh] bg-white pt-20">
      <div className="grid grid-cols-4">
        {isMessageSent ? (
          <div className="col-start-2 col-end-4 space-y-2">
            <span className="text-xl font-extrabold">
              전화번호 인증
            </span>
            <br />
            <span className="text-sm text-gray-400 whitespace-nowrap">
              전송된 인증번호를 입력해주세요
            </span>
            <div className="pt-4">
              <label className="text-base font-bold label-text">
                인증번호
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  className="w-full h-8 max-w-xs py-1 transition duration-300 ease-in bg-transparent border-none underline-input focus:outline-none"
                  onInput={handleInput}
                  value={authCode}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>,
                  ): void => setAuthCode(e.target.value)}
                />
                <Timer seconds={time} onTimeOut={handleTimeOut} />
                <button
                  className="btn btn-xs bg-[#90B5EA] border-none"
                  onClick={reVerify}
                >
                  재전송
                </button>
              </div>
              <hr />
            </div>
            <button
              className="bg-[#90B5EA] text-base border-none btn btn-sm btn-wide"
              onClick={verifyAuthNumber}
            >
              인증 완료
            </button>
          </div>
        ) : (
          <div className="col-start-2 col-end-4 space-y-2">
            <span className="text-xl font-extrabold">
              전화번호 인증
            </span>
            <br />
            <span className="text-sm text-gray-400 whitespace-nowrap">
              본인확인을 위해 전화번호를 입력해주세요
            </span>
            <div className="pt-4">
              <label className="text-base font-bold label-text">
                휴대전화 번호
              </label>
              <input
                type="text"
                className="w-full h-8 max-w-xs py-1 transition duration-300 ease-in bg-transparent border-none underline-input focus:outline-none"
                value={phoneNumber}
                onInput={handleInput}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement>,
                ): void => setPhoneNumber(e.target.value)}
              ></input>
              <hr />
            </div>

            <button
              className="bg-[#90B5EA] text-base border-none btn btn-sm btn-wide"
              onClick={verifyPhoneNumber}
            >
              인증번호 받기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneAuth;
