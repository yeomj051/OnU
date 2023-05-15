import React from 'react';

type Props = {
  subject: string;
  badges: string[];
};

function PillDetailBadge(props: Props) {
  return (
    <div>
      <div className="bg-white min-h-[60px] px-5 py-30 grid grid-cols-6 rounded-lg mt-3">
        <div className="col-span-1 grid content-center">
          {props.subject}
        </div>
        <div className="col-span-5 mx-5 my-2">
          <ul>
            {props.badges.map((badge, idx) => (
              <li
                // className="badge bg-[#90B5EA] badge-ghost  text-white h-6 mt-[18px] text-center mx-2 inline"
                className="bg-[#90B5EA] text-white my-1 px-10 text-center rounded-2xl py-1"
                key={idx}
              >
                {badge}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PillDetailBadge;
