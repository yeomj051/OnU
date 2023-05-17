// QuestionPage1.tsx
import React, { useEffect, useState } from 'react';

const QuestionPage1: React.FC<QuestionProps> = ({
  question,
  onNextPage,
  onAnswer,
  answers,
}) => {
  const [keyword, setKeyword] = useState<string>('');

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    const numericValue = value.replace(/\D/g, ''); // 숫자만 추출
    setKeyword(numericValue);
    onAnswer(numericValue);
  };

  useEffect(() => {
    console.log(answers);
    if (answers) {
      setKeyword(answers[1]);
      onAnswer(answers[1]);
    }
  }, []);

  const isValidInput = keyword !== '' && /^\d+$/.test(keyword);
  const isWithinRange =
    parseInt(keyword) >= 0 && parseInt(keyword) <= 120;

  return (
    <div>
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center m-10">
            <span className="text-2xl font-black">
              나이가 어떻게 되시나요?
            </span>
            <span className="text-sm text-blue-600/50 mb-4 font-bold">
              {question?.surveyQuestion}
            </span>
            <input
              type="text"
              value={keyword}
              onChange={handleAnswerChange}
              placeholder="입력하세요"
              autoFocus
              required
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label">
              {!isValidInput && (
                <span className="label-text-alt">
                  숫자만 입력해주세요.
                </span>
              )}
              {!isWithinRange && (
                <span className="label-text-alt">
                  0에서 120내로 입력해주세요.
                </span>
              )}
            </label>
            <button
              onClick={onNextPage}
              disabled={!isValidInput || !isWithinRange}
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

export default QuestionPage1;
