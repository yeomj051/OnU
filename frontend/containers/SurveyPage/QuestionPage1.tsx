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
      <p>{question?.surveyQuestion}</p>
      {/* <form className="form">
        <style>
          {`
          .form input:focus:invalid {
            outline-color: #ff8383;
            background-color: #fff3f3;
          }
          `}
        </style> */}

      <input
        type="text"
        value={keyword}
        onChange={handleAnswerChange}
        placeholder="입력하세요"
        autoFocus
        required
      />
      {!isValidInput && (
        <p style={{ color: 'red' }}>숫자만 입력해주세요.</p>
      )}
      {!isWithinRange && (
        <p style={{ color: 'red' }}>0에서 120내로 입력해주세요.</p>
      )}
      {/* </form> */}
      <button
        onClick={onNextPage}
        disabled={!isValidInput || !isWithinRange}
      >
        Next
      </button>
    </div>
  );
};

export default QuestionPage1;
