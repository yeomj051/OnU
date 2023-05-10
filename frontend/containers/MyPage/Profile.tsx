import React from 'react';
import Image from 'next/image';
import ButtonGroup from './ButtonGroup';
import profileImg1 from '@/public/liquid.png';
import profileImg2 from '@/public/capsule.png';
import profileImg3 from '@/public/jelly.png';
import profileImg4 from '@/public/powder.png';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useRouter } from 'next/navigation';

const bgImgSet: string[] = [
  'https://images.unsplash.com/photo-1612540943977-98ce54bea8a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1596572934980-5a6a24b04f33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1584174594005-60a49c828bbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1136&q=80',
];

const iconImgSet = [
  profileImg1,
  profileImg2,
  profileImg3,
  profileImg4,
];

const Profile = (): React.ReactElement => {
  // const bgRandom = Math.floor(
  //   Math.random() * (bgImgSet.length - 0.5),
  // );
  // const iconRandom = Math.floor(
  //   Math.random() * (iconImgSet.length - 0.5),
  // );
  const bgRandom = 0;
  const iconRandom = 0;
  const router = useRouter();

  //캘린더 조회 api 호출

  const handleAlarm = () => {
    if (window.confirm('복용 알림을 설정하시겠습니까?'))
      router.push('/user/phoneauth');
  };

  return (
    <div
      className="w-full m-0 hero"
      style={{
        backgroundImage: `url(${bgImgSet[bgRandom]})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="text-center hero-content text-neutral-content">
        <div className="flex flex-col items-center max-w-md">
          <div className="flex w-[400px] items-center space-x-2">
            <div className="flex items-center justify-center w-20 h-20 mb-2 text-5xl font-bold bg-white mask mask-circle">
              <Image
                src={iconImgSet[iconRandom]}
                width={48}
                height={48}
                alt=""
              />
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col mt-4">
                <p>닉네임</p>
                <p className="mb-5">나이 성별</p>
              </div>
              <div id="buttons" className="flex items-center">
                <button
                  className="btn btn-ghost btn-circle"
                  onClick={handleAlarm}
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    <span className="badge badge-xs badge-primary indicator-item"></span>
                  </div>
                </button>
                <button
                  className="btn btn-ghost btn-circle"
                  onClick={() => router.push('/user/signup')}
                >
                  <SettingsOutlinedIcon />
                </button>
              </div>
            </div>
          </div>

          <ButtonGroup />
        </div>
      </div>
    </div>
  );
};

export default Profile;
