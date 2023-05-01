import React from 'react';

type Props = {
  subject: string;
  first: string[];
  second: string[];
};

function PillCompareBox(props: Props) {
  return (
    <div className="mb-6">
      <hr className="mx-4" />
      <div className="tabs grid justify-items-center py-4 bg-white mx-4">
        <div className="">{props.subject}</div>
      </div>
      <hr className="mx-4" />
      <div className="mx-4">
        <div className="grid grid-cols-2 py-2">
          <div className="bg-white col-span-1 border rounded-lg h-20 mr-2">
            {props.first.map((item, idx) => (
              <div className="badge">{item}</div>
            ))}
          </div>
          <div className="bg-white col-span-1 border  rounded-lg h-20 ml-2">
            {props.second.map((item, idx) => (
              <div className="badge">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PillCompareBox;
