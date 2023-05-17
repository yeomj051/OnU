// QuestionPage6.tsx
import React, { useEffect, useState } from 'react';
import FunctionList from './FuctionList';

const QuestionPage6: React.FC<QuestionProps> = ({
  question,
  onPreviousPage,
  onSubmit,
  onAnswer,
  answers,
}) => {
  const [functionName, setFunctionName] = useState<any>([]);

  useEffect(() => {
    if (answers.length > 0) {
      setFunctionName(answers);
    }
  }, [answers]);

  const handleAnswerChange = (functionName: any) => {
    setFunctionName(functionName);
    onAnswer(functionName);
  };

  return (
    <div>
      <div className="flex flex-col items-center m-10 ">
        <span className="text-2xl font-black">
          영양제를 먹는 이유가 무엇인가요?
        </span>
        <span className="text-sm text-blue-600/50 mb-3 font-bold">
          {question.surveyQuestion}
        </span>
        <FunctionList
          gender={answers[2]}
          onFunctionClick={handleAnswerChange}
          answers={answers}
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
              onClick={onSubmit}
              className="btn btn-primary btn-sm"
            >
              추천 받기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuestionPage6;
