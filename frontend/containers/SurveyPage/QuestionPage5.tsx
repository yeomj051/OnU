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
      <p>{question.surveyQuestion}</p>
      <input
        type="text"
        value={keyword}
        onChange={handleAnswerChange}
      />
      <PillTypeList
        onTypeClick={handleAnswerChange}
        answers={answers}
      />
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

export default QuestionPage5;
