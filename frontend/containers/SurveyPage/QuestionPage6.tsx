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
      <p>{question?.surveyQuestion}</p>
      <FunctionList
        gender={answers[2]}
        onFunctionClick={handleAnswerChange}
        answers={answers}
      />
      <button
        onClick={onPreviousPage}
        className="btn btn-primary btn-sm"
      >
        이전
      </button>
      <button onClick={onSubmit} className="btn btn-accent btn-sm">
        추천 받기
      </button>
    </div>
  );
};

export default QuestionPage6;
