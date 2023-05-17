// QuestionPage2.tsx
import React, { useEffect, useState } from 'react';

interface QuestionPage2Props {
  question: Question;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onAnswer: (answer: string) => void;
}

const QuestionPage2: React.FC<QuestionPage2Props> = ({
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
    <div>
      <p>{question.surveyQuestion}</p>
      <div className="flex justify-between mb-4">
        <span className="pl-1 font-bold">성별</span>
        <div className="flex space-x-2">
          <div className="flex flex-row space-x-1">
            <input
              value="male"
              onChange={handleAnswerChange}
              type="radio"
              name="radio-2"
              className="radio radio-info"
              checked={gender === 'male'}
            />
            <span>남성</span>
          </div>
          <div className="flex flex-row space-x-1">
            <input
              value="female"
              onChange={handleAnswerChange}
              type="radio"
              name="radio-2"
              className="radio radio-info"
              checked={gender === 'female'}
            />
            <span>여성</span>
          </div>
        </div>
      </div>
      <button onClick={onPreviousPage}>Previous</button>
      <button onClick={onNextPage}>Next</button>
    </div>
  );
};

export default QuestionPage2;
