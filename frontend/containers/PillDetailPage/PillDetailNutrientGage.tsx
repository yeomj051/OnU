import { cp } from 'fs';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

type Props = {
  ingredientName: string;
  ingredientAmount: string;
  recommendedIntakeStart: string;
  recommendedIntakeEnd: string;
};

function PillDetailNutrientGage(props: Props) {
  const [amount, setAmout] = useState<number>(0);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(0);
  const [unit, setUnit] = useState<string>('');
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    const regex = /[^0-9.]/g;
    setAmout(parseInt(props.ingredientAmount.replace(regex, '')));
    setStart(
      parseInt(props.recommendedIntakeStart.replace(regex, '')),
    );
    setEnd(parseInt(props.recommendedIntakeEnd.replace(regex, '')));
  }, [props]);

  useEffect(() => {
    console.log('양 ' + amount);
    console.log('시작 ' + start);
    console.log('끝 ' + end);
    //수치에 따라 부족/적정/과다
    //부족
    if (amount < start) {
      setColor('#FFD465');
    } else if (amount >= start && amount <= end) {
      //적정
      setColor('#79D096');
    } else {
      //과다
      setColor('#FF793F');
    }
  }, [amount]);

  return (
    <div className="mt-1">
      <div className="flex justify-between">
        <div className="col-span-2 grid content-center mr-2 text-sm">
          {props.ingredientName}
        </div>
        <div className="text-sm text-gray-400">
          {props.ingredientAmount}
        </div>
      </div>
      <ProgressNutrient
        className="progress col-span-10 w-full mb-3 bg-red-200 rounded-xl"
        value={amount}
        max={end}
        color={color}
      ></ProgressNutrient>
    </div>
  );
}

export default PillDetailNutrientGage;

const ProgressNutrient = styled.progress`
  appearance: none;
  background-color: #D9D9D9;
  :&::-webkit-progress-bar {
  }

  &::-webkit-progress-value {
    border-radius: 40px;
    background: ${(props) => props.color};
  }
`;
