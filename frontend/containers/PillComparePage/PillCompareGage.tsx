import React from 'react';

type Props = {
  nutrient: string | undefined;
  amountA: number;
  amountB: number;
};

function PillCompareGage(props: Props) {
  return (
    <div>
      <div className="grid grid-cols-7 py-2 bg-white">
        <div className="col-span-3">
          <progress
            className="progress progress-error my-3 "
            value={props.amountA}
            max="100"
            style={{ direction: 'rtl' }}
          ></progress>
        </div>
        <div className="col-span-1 text-center">{props.nutrient}</div>
        <div className="col-span-3">
          <progress
            className="progress progress-error my-3"
            value={props.amountB}
            max="100"
          ></progress>
        </div>
      </div>
    </div>
  );
}

export default PillCompareGage;
