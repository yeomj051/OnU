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
      <div className="grid py-4 mx-4 bg-white tabs justify-items-center">
        <div className="">{props.subject}</div>
      </div>
      <hr className="mx-4" />
      <div className="mx-4">
        <div className="grid grid-cols-2 py-2">
          <div className="col-span-1 py-4 mr-2 bg-white border rounded-lg">
            {props.first.map((item, idx) => (
              <div
                className="badge bg-[#90B5EA] badge-ghost text-white block my-2 mx-auto h-6 w-20 text-center"
                key={idx}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="col-span-1 py-4 ml-2 bg-white border rounded-lg">
            {props.second.map((item, idx) => (
              <div
                className="badge bg-[#90B5EA] badge-ghost text-white  block my-2 mx-auto h-6 w-20 text-center"
                key={idx}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PillCompareBox;
