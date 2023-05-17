// QuestionPage3.tsx
import React, { useEffect, useState } from 'react';

const QuestionPage3: React.FC<QuestionProps> = ({
  question,
  onPreviousPage,
  onNextPage,
  onAnswer,
  answers,
}) => {
  const [pregnant, setPregnant] = useState<string>('');

  useEffect(() => {
    if (answers && answers[3]) {
      setPregnant(answers[3]);
    }
  }, []);

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedPregnant = event.target.value;
    setPregnant(selectedPregnant);
    onAnswer(selectedPregnant);
  };

  return (
    <div>
      <p>{question.surveyQuestion}</p>
      <div className="flex justify-between mb-4">
        <span className="pl-1 font-bold">임신 여부</span>
        <div className="flex space-x-2">
          <div className="flex flex-row space-x-1">
            <input
              value="Yes"
              onChange={handleAnswerChange}
              type="radio"
              name="radio-2"
              className="radio radio-info"
              checked={pregnant === 'Yes'}
            />
            <span>예</span>
          </div>
          <div className="flex flex-row space-x-1">
            <input
              value="No"
              onChange={handleAnswerChange}
              type="radio"
              name="radio-2"
              className="radio radio-info"
              checked={pregnant === 'No'}
            />
            <span>아니오</span>
          </div>
        </div>
      </div>
      <button
        onClick={onPreviousPage}
        className="btn btn-primary btn-sm"
      >
        이전
      </button>
      <button onClick={onNextPage} className="btn btn-primary btn-sm">
        다음
      </button>
    </div>
  );
};

export default QuestionPage3;
