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
      <div className=" place-itmes-center">
        <div className="flex flex-col items-center">
          {/* <p>{question?.surveyQuestion}</p> */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">
                {question?.surveyQuestion}
              </span>
            </label>
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
          </div>
          {/* <input
            type="text"
            value={keyword}
            onChange={handleAnswerChange}
            placeholder="입력하세요"
            autoFocus
            required
            className="border-solid border-2 border-indigo-600 px-3 py-2 rounded-full"
          />
          {!isValidInput && (
            <p style={{ color: 'red' }}>숫자만 입력해주세요.</p>
          )}
          {!isWithinRange && (
            <p style={{ color: 'red' }}>
              0에서 120내로 입력해주세요.
            </p> */}
          {/* )} */}

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
  );
};

export default QuestionPage1;
