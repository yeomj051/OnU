// QuestionPage4.tsx
import React, { useEffect, useState } from 'react';

const QuestionPage4: React.FC<QuestionProps> = ({
  question,
  onPreviousPage,
  onNextPage,
  onAnswer,
  answers,
}) => {
  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    if (answers) {
      setKeyword(answers[4]);
    }
  }, []);

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setKeyword(event.target.value);
    onAnswer(value);
  };

  return (
    <div>
      <div className="flex flex-col items-center m-10 ">
        <span className="text-2xl font-black">
          현재 복용 중인 영양제를 알려주세요!
        </span>
        <span className="text-sm text-blue-600/50 mb-3 font-bold">
          {question.surveyQuestion}
        </span>
        <input
          type="text"
          value={keyword}
          onChange={handleAnswerChange}
          className="input input-bordered w-full max-w-xs"
        />
        <div className="flex space-x-4 my-3">
          <div>
            <button
              onClick={onPreviousPage}
              className="btn btn-primary btn-sm"
            >
              이전
            </button>
          </div>
          <div>
            <button
              onClick={onNextPage}
              className="btn btn-primary btn-sm"
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage4;
