import React, { useEffect, useState } from 'react';
import yellowCircle from '../../public/yellowCircle.png';
import greenCircle from '../../public/greenCircle.png';
import redCircle from '../../public/redCircle.png';
import Image from 'next/image';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { makeCombinationStore } from '@/store/makeCombinationStore';
import api from '@/apis/config';
import { haveStore } from '@/store/haveStore';
import { combinationStore } from '@/store/combinationStore';
import PillDetailNutrientGage from '../PillDetailPage/PillDetailNutrientGage';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// );

// export const options: any = {
//   scales: {
//     x: {
//       grid: {
//         drawOnChartArea: false, //차트 뒤 가로 격자 없애줌
//         drawTicks: false, //그래프의 눈금 라벨 없애주는 설정
//         // drawBorder: false, //그래프의 눈금 라벨 있는 쪽 border 없애주는 설정
//       },
//       beginAtZero: true, //그래프의 눈금 라벨 없애주는 설정
//       ticks: {
//         //그래프의 index 표시 없애주는 설정
//         display: false,
//       },
//     },
//     y: {
//       grid: {
//         drawOnChartArea: false, //차트 뒤 세로 격자 없애줌
//       },
//     },
//   },

//   indexAxis: 'y' as const, //이부분이 bar차트의 가로 세로 구분 위치
//   elements: {
//     bar: {
//       borderWidth: 2, //이건 legend에 붙어있는 bar(색 표현)의 테두리 두께 설정
//     },
//   },
//   responsive: true,
//   plugins: {
//     legend: {
//       //legend(옆에 붙어있는 어떤 데이터인지 정보제공 색 ( 범례 ))
//       position: 'right' as const,
//     },
//     tooltip: {
//       //tooltip을 밑에서 올라오는 말풍선으로 만드는 속성
//       yAlign: 'bottom',
//     },
//   },
// };

// const labels = ['비타민A', '비타민B', '비타민C', '비타민I'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: '과연', //legend 이름
//       //위 라벨은 툴팁처럼 써도 될듯
//       data: [4, 5, 6, 7, 8, 9, 10],
//       barThickness: 13, //bar의 두께 조절해주는 설정
//       borderRadius: 10,
//       borderColor: [
//         'rgba(255, 99, 132, 0.7)', //컬러코드 1, 2, 3, opacity
//         'rgba(255, 159, 64, 0.7)',
//         'rgba(255, 205, 86, 0.7)',
//         'rgba(75, 192, 192, 0.7)',
//         'rgba(54, 162, 235, 0.7)',
//         'rgba(153, 102, 255, 0.7)',
//         'rgba(201, 203, 207, 0.7)',
//       ],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.7)',
//         'rgba(255, 159, 64, 0.7)',
//         'rgba(255, 205, 86, 0.7)',
//         'rgba(75, 192, 192, 0.7)',
//         'rgba(54, 162, 235, 0.7)',
//         'rgba(153, 102, 255, 0.7)',
//         'rgba(201, 203, 207, 0.7)',
//       ],
//       // hoverborderColor: [
//       //   //hover시 색 변하도록
//       //   'rgba(255, 99, 132, 1)',
//       //   'rgba(255, 159, 64, 1)',
//       //   'rgba(255, 205, 86, 1)',
//       //   'rgba(75, 192, 192, 1)',
//       //   'rgba(54, 162, 235, 1)',
//       //   'rgba(153, 102, 255, 1)',
//       //   'rgba(201, 203, 207, 1)',
//       // ],
//       // hoverBackgroundColor: [
//       //   'rgba(255, 99, 132, 1)',
//       //   'rgba(255, 159, 64, 1)',
//       //   'rgba(255, 205, 86, 1)',
//       //   'rgba(75, 192, 192, 1)',
//       //   'rgba(54, 162, 235, 1)',
//       //   'rgba(153, 102, 255, 1)',
//       //   'rgba(201, 203, 207, 1)',
//       // ],
//     },
//   ],
// };

type Props = {
  userId: number;
  analysisType: number;
};

type ingredient = {
  nutrientName: string;
  nutrientAmount: string;
  nutrientMin: number;
  nutrientMax: number;
};

function PillAnalysisGraph(props: Props) {
  const [analysisList, setAnalysisList] = useState<Array<number>>([]);
  const { haveList } = haveStore();
  const { combinations } = combinationStore();
  const { combList } = makeCombinationStore(); //zstand에 들어있는 combList에서 영양제 id 가져옴
  const [ingredientList, setIngredientList] = useState<
    Array<ingredient>
  >([]);

  useEffect(() => {
    let tmpArr: number[] = [];
    //-1일경우는 복용중인영양제 id들로 number[] 초기화
    if (props.analysisType === -1) {
      for (let i = 0; i < haveList.length; i++) {
        tmpArr.push(haveList[i].nutrientId);
      }
    } else if (props.analysisType == -2) {
      //-2일경우는 조합 만들면서 복용중/관심 누를때
      tmpArr = combList;
    } else {
      // 여기 그룹id로 받자
      //그룹 아이디일경우는 저장된 조합 누를경우 combinationStore에서 combination id에 맞는 nutrientId들 배열에 넣음
      const allNutrientsOfComb = combinations
        .filter(
          (combination) =>
            combination.combinationId === props.analysisType,
        )
        .flatMap((combination) =>
          combination.nutrientInfoList.map((info) => info.nutrientId),
        );
      tmpArr = allNutrientsOfComb;
    }

    setAnalysisList(tmpArr);
  }, []);

  useEffect(() => {
    //가져온 id를 바탕으로 api 호출
    getAnalysisData().then((res) => {
      if (res) {
        console.log(res);
        setIngredientList(res.data.nutrientIngredient);
      }
    });
  }, [analysisList]);

  const getAnalysisData = async () => {
    return await api.getIngredientListByCombination(
      props.userId,
      analysisList,
    ); // userId랑 조합 number[]
  };

  return (
    // <div className="p-6">
    //   <Bar options={options} data={data} className=" bg-red-100" />
    // </div>
    <div>
      <div className="bg-white px-5 py-30 rounded-lg mt-3 min-h-[140px]">
        <div className="mt-5">
          <div className="flex flex-row-reverse my-1 pt-4">
            <div className="flex items-center mx-1">
              <Image
                src={redCircle}
                alt="빨강"
                className="w-3 h-3 mr-1"
              />
              <div className="text-sm">과다</div>
            </div>
            <div className="flex items-center mx-1">
              <Image
                src={greenCircle}
                alt="초록"
                className="w-3 h-3 mr-1"
              />
              <div className="text-sm">적정</div>
            </div>
            <div className="flex items-center mx-1">
              <Image
                src={yellowCircle}
                alt="노랑"
                className="w-3 h-3 mr-1"
              />
              <div className="text-sm">부족</div>
            </div>
          </div>
          <div className="grid content-center pl-2 mb-3">
            {ingredientList &&
              ingredientList.map((nutrient, idx) => (
                <PillDetailNutrientGage
                  key={idx}
                  ingredientName={nutrient.nutrientName}
                  ingredientAmount={nutrient.nutrientAmount}
                  recommendedIntakeStart={nutrient.nutrientMin}
                  recommendedIntakeEnd={nutrient.nutrientMax}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PillAnalysisGraph;
