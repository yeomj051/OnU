import React from 'react';

type Props = {
  subject: string;
};

function PillCompareContent(props: Props) {
  return (
    <div className="mb-6">
      <hr className="mx-4" />
      <div className="tabs grid justify-items-center py-4 bg-white mx-4">
        <div className="">{props.subject}</div>
      </div>
      <hr className="mx-4" />
      <div className="mx-4">
        <div className="grid grid-cols-2 py-2">
          <div className="bg-white col-span-1 border rounded-lg h-20 mr-2"></div>
          <div className="bg-white col-span-1 border  rounded-lg h-20 ml-2"></div>
        </div>
      </div>
    </div>
  );
}

export default PillCompareContent;
