import React from 'react';
import PillAnalysisHave from './PillAnalysisHave';
import { haveStore } from '../../store/haveStore';
import { makeCombinationStore } from '@/store/makeCombinationStore';

function PillAnalysisHaveBox() {
  const { haveList } = haveStore();
  const { combList, addSelected } = makeCombinationStore();

  return (
    <div className="flex justify-between">
      <PillAnalysisHave />
      <PillAnalysisHave />
      <PillAnalysisHave />
    </div>
  );
}

export default PillAnalysisHaveBox;
