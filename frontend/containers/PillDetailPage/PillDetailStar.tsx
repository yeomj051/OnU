import React from 'react';
// import { StarFill } from '@emotion-icons/bootstrap';
import styled from '@emotion/styled';

type Props = {
  starRate: number;
};

// const StarFillComponent = styled(StarFill)``;

function PillDetailStar(props: Props) {
  return (
    <div className=" z-40 my-6 border border-blue-950 overflow-hidden">
      {/* <div
        className="text-[#FFE70D] flex z-10 relative h-8 w-[100px]"
        // className={` text-[#FFE70D] flex z-10 w-[${starRate}%] absolute`}
        style={{ width: props.starRate }}
      >
        <StarFillComponent />
        <StarFillComponent />
        <StarFillComponent />
        <StarFillComponent />
        <StarFillComponent />
      </div>

      <div className="text-gray-200 flex absolute h-8 w-[100px]">
        <StarFillComponent />
        <StarFillComponent />
        <StarFillComponent />
        <StarFillComponent />
        <StarFillComponent />
      </div> */}
    </div>
  );
}

export default PillDetailStar;
