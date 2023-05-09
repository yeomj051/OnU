import React from 'react';
// import { PersonCircle } from '@emotion-icons/bootstrap/PersonCircle';
import Image from 'next/image';
import fillStar from '../../public/fillStar.png';
import emptyStar from '../../public/emptyStar.png';
type Props = {
  review: PersonalReview;
};

type PersonalReview = {
  nickname: string;
  age: number;
  gender: string;
  date: string;
  rate: number;
  review: string;
};

// const StarFillComponent = styled(StarFill)``;

function PillDetailReviewBox(props: Props) {
  // console.log(props.review);
  // console.log(props.review.nickname);

  const age = Math.floor(props.review.age / 10) * 10;
  let gender = '';
  if (props.review.gender === 'm') {
    gender = '남';
  } else {
    gender = '여';
  }

  function repeatStar(score: number): JSX.Element[] {
    let arr = [];
    for (let i = 0; i < score; i++) {
      arr.push(
        <p>
          <Image src={fillStar} alt="fillStar" className="w-4 h-4" />
        </p>,
      );
    }
    for (let i = 0; i < 5 - score; i++) {
      arr.push(
        <p>
          <Image
            src={emptyStar}
            alt="emptyStar"
            className="w-4 h-4"
          />
        </p>,
      );
    }

    return arr;
  }

  return (
    <div className="bg-white min-h-[60px] px-5 py-30 rounded-lg mt-4">
      <div className="grid grid-cols-8 pt-6">
        <div className="w-10 col-span-1 pt-0.5">
          {/* <PersonCircle /> */}
        </div>
        <div className="col-span-4 pb-1">
          <div className="text-xl">{props.review.nickname}</div>
          <div className="text-sm">
            {age}대 {gender}성
          </div>
        </div>
        <div className="col-span-3 grid justify-items-end">
          <div className="text-sm">{props.review.date}</div>
          <div className="flex">{repeatStar(props.review.rate)}</div>
        </div>
      </div>
      <hr />
      <div className="my-3 pb-5 ">{props.review.review}</div>
    </div>
  );
}

export default PillDetailReviewBox;
