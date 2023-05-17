// QuestionPage2.tsx
import React, { useEffect, useState } from 'react';

const QuestionPage2: React.FC<QuestionProps> = ({
  question,
  onPreviousPage,
  onNextPage,
  onAnswer,
  answers,
}) => {
  const [gender, setGender] = useState<string>('');

  useEffect(() => {
    if (answers && answers[2]) {
      setGender(answers[2]);
    }
  }, [answers]);

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedGender = event.target.value;
    setGender(selectedGender);
    onAnswer(selectedGender);
  };

  return (
    <div className="grid content-center">
      <div className="flex flex-col items-center m-10">
        <span className="text-2xl font-black">
          성별은 어떻게 되시나요?
        </span>
        <span className="text-sm text-blue-600/50 mb-3 font-bold">
          {question.surveyQuestion}
        </span>
        <div className="flex flex-row my-2">
          <input
            value="male"
            onChange={handleAnswerChange}
            type="radio"
            name="radio-6"
            className="radio radio-warning"
            checked={gender === 'male'}
          />
          <span>남성</span>
        </div>
        <div className="flex flex-row my-2">
          <input
            value="female"
            onChange={handleAnswerChange}
            type="radio"
            name="radio-6"
            className="radio radio-warning"
            checked={gender === 'female'}
          />
          <span>여성</span>
        </div>
        <div className="flex space-x-4 my-2">
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
export default QuestionPage2;
