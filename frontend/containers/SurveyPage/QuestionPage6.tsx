// QuestionPage6.tsx
import React, { useEffect, useState } from 'react';
import FunctionList from './FuctionList';

interface QuestionPage6Props {
  question: Question;
  onPreviousPage: () => void;
  onSubmit: () => void;
  onAnswer: (answer: string) => void;
}

const QuestionPage6: React.FC<QuestionPage6Props> = ({
  question,
  onPreviousPage,
  onSubmit,
  onAnswer,
  answers,
}) => {
  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    console.log(answers);
    if (answers) {
      setKeyword(answers[6]);
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
      <FunctionList gender={answers[2]} />
      <button onClick={onPreviousPage}>Previous</button>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default QuestionPage6;
