// QuestionPage4.tsx
import { useSearch } from '@/apis/hooks';
import SearchData from './SearchData';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';

const QuestionPage4: React.FC<QuestionProps> = ({
  question,
  onPreviousPage,
  onNextPage,
  onAnswer,
  answers,
}) => {
  const [keyword, setKeyword] = useState<string>();

  const searchKeyword = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setKeyword(event.target.value);
  };

  const handleAnswerChange = (itemId: any) => {
    onAnswer(itemId);
  };

  const [itemDataList, setItemDataList] = useState<Item[]>([]);
  const { isLoading, isError, data, error } = useSearch(
    keyword as string,
  );

  useEffect(() => {
    const res: AxiosResponse = data as AxiosResponse;
    if (keyword !== '' && keyword !== undefined)
      setItemDataList(res?.data.searchedList);
  }, [data, keyword]);

  return (
    <div className="grid grid-cols-1 place-items-center h-[75vh] ">
      <div className="flex flex-col items-center w-2/3 justify-center mb-20 content-center mt-5">
        <span className="text-center text-xl font-black">
          {question?.surveyQuestion}
        </span>
        <span className="text-center text-sm text-blue-600/50 my-2 font-bold">
          복용 중인 것을 고려하여 추천해드려요
        </span>
        <input
          type="text"
          value={keyword}
          onChange={searchKeyword}
          className="input input-bordered w-full max-w-xs"
        />
        {keyword !== undefined ? (
          <div className="h-60 flex flex-wrap overflow-y-scroll my-8">
            <SearchData
              itemList={itemDataList}
              onAnswer={handleAnswerChange}
              answers={answers}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="grid justify-center fixed bottom-8 space-y-2">
        <div>
          <button
            onClick={onPreviousPage}
            className="btn btn-primary btn-radius btn-wide btn-circle antialiased hover:subpixel-antialiased "
          >
            이전
          </button>
        </div>
        <div>
          <button
            onClick={onNextPage}
            className="btn btn-primary btn-radius btn-wide btn-circle antialiased hover:subpixel-antialiased "
            disabled={
              answers[4] === undefined || answers[4].length === 0
            }
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage4;
