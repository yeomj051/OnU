import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const router = useRouter();
  const inputRef = useRef(null);

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
      return;
    } else {
      setSearchKeyword('');
      router.push(`/search?query=${searchKeyword}`);
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
          return;
        } else {
          setSearchKeyword('');
          router.push(`/search/result?query=${searchKeyword}`);
        }
        break;
    }
  };

  return (
    <div id="searchbar" className="flex items-center justify-center">
      <input
        id="searchbar-input"
        type="text"
        placeholder="검색어를 입력하세요"
        className="w-full max-w-xs input input-bordered input-sm"
        onChange={handleInput}
        onKeyDown={handleKeypress}
        value={searchKeyword}
        ref={inputRef}
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
  );
};
