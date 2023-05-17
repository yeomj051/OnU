// QuestionPage4.tsx
import React, { useEffect, useState } from 'react';

const QuestionPage4: React.FC<QuestionProps> = ({
  question,
  onPreviousPage,
  onNextPage,
  onAnswer,
  answers,
}) => {
  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    if (answers) {
      setKeyword(answers[4]);
    }
  }, []);

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setKeyword(event.target.value);
    onAnswer(parseInt(value));
  };

  return (
    <div>
      <p>{question.surveyQuestion}</p>

      <input
        type="text"
        value={keyword}
        onChange={handleAnswerChange}
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

export default QuestionPage4;
