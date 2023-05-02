import React from 'react';

type Props = {
  subject: string;
};

function PillDetailBadge(props: Props) {
  return (
    <div>
      <div className="bg-white min-h-[60px] px-5 py-30 grid grid-cols-6 rounded-lg mt-3">
        <div className="col-span-1 grid content-center">
          {props.subject}
        </div>
        <div className="col-span-5 bg-red-50 grid content-center">
          <div className="badge bg-[#90B5EA] badge-ghost text-white ">
            GMP
          </div>
        </div>
      </div>
    </div>
  );
}

export default PillDetailBadge;
