import React from 'react';
import Image from 'next/image';
import ButtonGroup from './ButtonGroup';
import profileImg1 from '@/public/liquid.png';
import profileImg2 from '@/public/capsule.png';
import profileImg3 from '@/public/jelly.png';
import profileImg4 from '@/public/powder.png';

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

  //캘린더 조회 api 호출

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
          <h1 className="flex items-center justify-center w-16 h-16 mb-2 text-5xl font-bold bg-white mask mask-circle">
            <Image
              src={iconImgSet[iconRandom]}
              width={48}
              height={48}
              alt=""
            />
          </h1>
          <p>닉네임</p>
          <p className="mb-5">나이 성별</p>
          <ButtonGroup />
        </div>
      </div>
    </div>
  );
};

export default Profile;
