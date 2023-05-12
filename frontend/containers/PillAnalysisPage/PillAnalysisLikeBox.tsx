import React from 'react';
import PillAnalysisLike from './PillAnalysisLike';

function PillAnalysisLikeBox() {
  return (
    <div className="flex justify-between">
      <PillAnalysisLike />
      <PillAnalysisLike />
      <PillAnalysisLike />
    </div>
  );
}

export default PillAnalysisLikeBox;
