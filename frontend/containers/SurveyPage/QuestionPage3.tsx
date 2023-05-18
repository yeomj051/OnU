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
    <div className="grid grid-cols-1 place-items-center h-[75vh] overflow-hidden ">
      <div className="grid justify-center mb-20 content-center mb-20">
        <span className="text-2xl text-center font-black">
          임산부이신가요?
        </span>
        <span className="text-sm text-center text-blue-600/50 my-2 font-bold">
          {question?.surveyQuestion}
        </span>
        <div className="space-y-3 mt-2">
          <div className="flex flex-row space-x-20">
            <div>
              <input
                value="Yes"
                onChange={handleAnswerChange}
                type="radio"
                name="radio-6"
                className="radio radio-warning"
                checked={pregnant === 'Yes'}
              />
            </div>
            <span>예</span>
          </div>

          <div className="flex flex-row space-x-20">
            <input
              value="No"
              onChange={handleAnswerChange}
              type="radio"
              name="radio-6"
              className="radio radio-warning"
              checked={pregnant === 'No'}
            />
            <span>아니오</span>
          </div>
        </div>
      </div>
      <div className="grid justify-center fixed bottom-14 space-y-2">
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
            disabled={answers[3] === undefined || answers[3] === ''}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage3;
