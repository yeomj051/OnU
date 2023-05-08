import React from 'react';
import { StarFill } from '@emotion-icons/bootstrap';

type Props = {
  starRate: number;
};

function PillDetailStar(props: Props) {
  return (
    <div className=" z-40 my-6 border border-blue-950 overflow-hidden">
      <div
        className="text-[#FFE70D] flex z-10 relative h-8 w-[100px]"
        // className={` text-[#FFE70D] flex z-10 w-[${starRate}%] absolute`}
        style={{ width: props.starRate }}
      >
        <StarFill />
        <StarFill />
        <StarFill />
        <StarFill />
        <StarFill />
      </div>

      <div className="text-gray-200 flex absolute h-8 w-[100px]">
        <StarFill />
        <StarFill />
        <StarFill />
        <StarFill />
        <StarFill />
      </div>
    </div>
  );
}

export default PillDetailStar;
