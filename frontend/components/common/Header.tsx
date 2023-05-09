import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from 'public/logo.svg';

const Header = (): React.ReactElement => {
  const [isClicked, setIsClicked] = useState(false);

  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const router = useRouter();

  //입력결과 state로 저장
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    e.preventDefault();

    setSearchKeyword(e.target.value);
  };

  const handleSearch = (): void => {
    //검색결과 페이지로 이동

    //검색어가 없거나 공백일 경우 검색하지 않음
    if (searchKeyword.trim() === '') {
      setSearchKeyword('');
      setIsClicked(!isClicked);
      return;
    } else {
      setIsClicked(!isClicked);
      router.push(`/search?query=${searchKeyword}`);
      setSearchKeyword('');
    }

    //next/router(Next.js 13이전 버전)에서 사용하던 방식
    // router.push({
    //   pathname: '/search',
    //   query: { keyword: searchKeyword },
    // });
  };

  const handleKeypress = (e: React.KeyboardEvent) => {
    // e.preventDefault(); //이거 있으면 다른 키가 안먹음

    const key: string = e.code;
    switch (key) {
      case 'Enter':
        if (searchKeyword.trim() === '') {
          setSearchKeyword('');
          setIsClicked(!isClicked);
          return;
        } else {
          setIsClicked(!isClicked);
          router.push(`/search?query=${searchKeyword}`);
          setSearchKeyword('');
        }
        break;
    }
  };

  const handleAlarm = () => {
    if (window.confirm('복용 알림을 설정하시겠습니까?'))
      router.push('/user/phoneauth');
  };

  return (
    <div className="fixed top-0 navbar bg-base-100 w-[512px] z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
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
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/">홈으로</Link>
            </li>
            <li>
              <Link href="/mypage">프로필</Link>
            </li>
          </ul>
        </div>
      </div>

      {isClicked ? (
        <div className="absolute navbar-center left-1/3">
          <Link
            href="/"
            className="text-xl text-blue-900 normal-case btn btn-ghost"
          >
            <Logo />
          </Link>
        </div>
      ) : (
        <div className="navbar-center-hidden">
          <Link
            href="/"
            className="text-xl text-blue-900 normal-case btn btn-ghost"
          >
            <Logo />
          </Link>
        </div>
      )}

      {!isClicked ? (
        <div className="navbar-end">
          <div
            id="searchbar"
            className="flex items-center justify-center pr-1"
          >
            <input
              id="searchbar-input"
              type="text"
              placeholder="검색어를 입력하세요"
              className="w-full max-w-xs input input-bordered input-sm"
              onChange={handleInput}
              onKeyDown={handleKeypress}
            />

            <button
              className="px-2 btn btn-ghost btn-sm"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#C2D1D9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          <button
            id="btn-search-hidden"
            className="btn btn-ghost btn-circle"
            onClick={() => setIsClicked(!isClicked)}
          >
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div className="navbar-end">
          <div
            id="searchbar-hidden"
            className="flex items-center justify-center"
          >
            <input
              id="searchbar-input-hidden"
              type="text"
              placeholder="검색어를 입력하세요"
              className="w-full max-w-xs input input-bordered input-sm"
              onChange={handleInput}
              onKeyDown={handleKeypress}
            />

            <button
              className="px-2 btn btn-ghost btn-sm"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#C2D1D9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          <button
            id="btn-search"
            className="btn btn-ghost btn-circle"
            onClick={() => setIsClicked(!isClicked)}
          >
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      )}

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
    </div>
  );
};

export default Header;
