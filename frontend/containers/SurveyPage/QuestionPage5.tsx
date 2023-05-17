// QuestionPage5.tsx
import React, { useEffect, useState } from 'react';

interface QuestionPage5Props {
  question: Question;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onAnswer: (answer: string) => void;
}

const QuestionPage5: React.FC<QuestionPage5Props> = ({
  question,
  onPreviousPage,
  onNextPage,
  onAnswer,
  answers,
}) => {
  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    console.log(answers);
    if (answers) {
      setKeyword(answers[5]);
    }
  }, []);

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setKeyword(event.target.value);
    onAnswer(value);
  };

  return (
    <div>
      <p>{question.surveyQuestion}</p>
      <input
        type="text"
        value={keyword}
        onChange={handleAnswerChange}
      />
      <button onClick={onPreviousPage}>Previous</button>
      <button onClick={onNextPage}>Next</button>
    </div>
  );
};

export default QuestionPage5;
