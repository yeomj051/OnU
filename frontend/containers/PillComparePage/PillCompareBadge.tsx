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
        <div className="font-semibold">{props.subject}</div>
      </div>
      <hr className="mx-4" />
      <div className="mx-4">
        <div className="grid grid-cols-2 py-2">
          <div className="col-span-1 py-4 mr-2 bg-white border rounded-lg">
            <ul>
              {props.first.map((item, idx) => (
                <li
                  className="bg-[#90B5EA] text-white my-1 mx-3 text-center rounded-2xl py-1"
                  key={idx}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1 py-4 ml-2 bg-white border rounded-lg">
            <ul>
              {props.second.map((item, idx) => (
                <li
                  className="bg-[#90B5EA] text-white my-1 mx-3 text-center rounded-2xl py-1"
                  key={idx}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PillCompareBox;
