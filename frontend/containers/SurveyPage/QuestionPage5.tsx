// QuestionPage5.tsx
import React, { useEffect, useState } from 'react';
import PillTypeList from './PillTypeList';

const QuestionPage5: React.FC<QuestionProps> = ({
  question,
  onPreviousPage,
  onNextPage,
  onAnswer,
  answers,
}) => {
  const [keyword, setKeyword] = useState<string>('');
  const [typeName, setTypeName] = useState<any>([]);

  useEffect(() => {
    console.log(answers);
    if (answers[5]) {
      setKeyword(answers[5]);
    }
  }, []);

  const handleAnswerChange = (typeName: any) => {
    setTypeName(typeName);
    onAnswer(typeName);
  };

  return (
    <div>
      <div className="flex flex-col items-center m-10 ">
        <span className="text-2xl font-black">
          어떤 제형을 선호하시나요?
        </span>
        <span className="text-sm text-blue-600/50 mb-3 font-bold">
          {question.surveyQuestion}
        </span>
        <PillTypeList
          onTypeClick={handleAnswerChange}
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

export default QuestionPage5;
