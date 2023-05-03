import React from 'react';

type Props = {
  subject: string;
  content: string;
};

function PillDetailContents(props: Props) {
  return (
    <div>
      <div className="bg-white min-h-[60px] px-5 py-30 grid grid-cols-6 rounded-lg mt-3">
        <div className="col-span-1 grid content-center">
          {props.subject}
        </div>
        <div className="col-span-5 grid content-center">
          {props.content}
        </div>
      </div>
    </div>
  );
}

export default PillDetailContents;
