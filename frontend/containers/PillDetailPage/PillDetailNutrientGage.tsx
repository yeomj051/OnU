import React from 'react';

type Props = {
  nuName: string;
  amount: number;
};

function PillDetailNutrientGage(props: Props) {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 mr-2">{props.nuName}</div>
      <progress
        className="progress progress-error col-span-10 w-full my-3"
        value={props.amount}
        max="100"
      ></progress>
    </div>
  );
}

export default PillDetailNutrientGage;
