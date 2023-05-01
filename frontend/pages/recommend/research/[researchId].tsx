import React from 'react';
import { NextPageWithLayout } from '../../_app';
import AppLayout from '@/components/layout/AppLayout';
import HeaderLayout from '@/components/layout/HeaderLayout';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import api from '@/apis/config';

interface Props {
  question?: string;
  options?: string[];
}

const ResearchQuestion: NextPageWithLayout<Props> = (
  props: Props,
) => {
  const router = useRouter();
  const { researchId } = router.query;

  //userId는 추후에 로그인한 유저의 id로 변경
  // const userId = 1;

  // api.nextSurvey(userId).then((res) => {
  //   console.log(res);
  // });

  return (
    <div>
      <div id="progressbar">hi</div>
      <div id="question">{props.question}</div>
      <div id="options">
        <ul>
          {props.options?.map((option: string) => {
            return (
              <li>
                <button className="btn btn-outline">{option}</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

ResearchQuestion.getLayout = function getLayout(
  page: React.ReactElement,
) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default ResearchQuestion;
