import React from 'react';
// import { ResponsiveBar } from '@nivo/bar';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  scales: {
    x: {
      grid: {
        drawOnChartArea: false, //차트 뒤 가로 격자 없애줌
        drawTicks: false, //그래프의 눈금 라벨 없애주는 설정
        drawBorder: false, //그래프의 눈금 라벨 있는 쪽 border 없애주는 설정
      },
      beginAtZero: true, //그래프의 눈금 라벨 없애주는 설정
      ticks: {
        //그래프의 index 표시 없애주는 설정
        display: false,
      },
    },
    y: {
      grid: {
        drawOnChartArea: false, //차트 뒤 세로 격자 없애줌
      },
    },
  },

  indexAxis: 'y' as const, //이부분이 bar차트의 가로 세로 구분 위치
  elements: {
    bar: {
      borderWidth: 2, //이건 legend에 붙어있는 bar(색 표현)의 테두리 두께 설정
    },
  },
  responsive: true,
  plugins: {
    legend: {
      //legend(옆에 붙어있는 어떤 데이터인지 정보제공 색 ( 범례 ))
      position: 'right' as const,
    },
    tooltip: {
      //tooltip을 밑에서 올라오는 말풍선으로 만드는 속성
      yAlign: 'bottom',
    },
  },
};

const labels = [
  '비타민A',
  '비타민B',
  '비타민C',
  '비타민D',
  '비타민E',
  '비타민F',
  '비타민G',
  '비타민H',
  '비타민I',
  '비타민G',
  '비타민H',

  '비타민H',
  '비타민I',
];

export const data = {
  labels,
  datasets: [
    {
      label: '과연', //legend 이름
      //위 라벨은 툴팁처럼 써도 될듯
      data: [4, 5, 6, 7, 8, 9, 10],
      barThickness: 13, //bar의 두께 조절해주는 설정
      borderRadius: 10,
      borderColor: [
        'rgba(255, 99, 132, 0.7)', //컬러코드 1, 2, 3, opacity
        'rgba(255, 159, 64, 0.7)',
        'rgba(255, 205, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(201, 203, 207, 0.7)',
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(255, 205, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(201, 203, 207, 0.7)',
      ],
      // hoverborderColor: [
      //   //hover시 색 변하도록
      //   'rgba(255, 99, 132, 1)',
      //   'rgba(255, 159, 64, 1)',
      //   'rgba(255, 205, 86, 1)',
      //   'rgba(75, 192, 192, 1)',
      //   'rgba(54, 162, 235, 1)',
      //   'rgba(153, 102, 255, 1)',
      //   'rgba(201, 203, 207, 1)',
      // ],
      // hoverBackgroundColor: [
      //   'rgba(255, 99, 132, 1)',
      //   'rgba(255, 159, 64, 1)',
      //   'rgba(255, 205, 86, 1)',
      //   'rgba(75, 192, 192, 1)',
      //   'rgba(54, 162, 235, 1)',
      //   'rgba(153, 102, 255, 1)',
      //   'rgba(201, 203, 207, 1)',
      // ],
    },
  ],
};

type Props = {
  analysisType: number;
  dataId: number;
};

function PillAnalysisGraph(props: Props) {
  // useEffect(()=>{
  //   //-1일경우는 복용중인영양제로 리스트를 보여준다.
  //   if(props.analysisType===-1){

  //   }else if(props.analysisType==0){ //0일경우는 저장된 조합 누를경우

  //   }else{//1일경우는 조합 만들면서 복용중/관심 누를때

  //   }

  // },[])

  return (
    <div className="p-6">
      <Bar options={options} data={data} className="w-full h-full" />
    </div>
  );
}

export default PillAnalysisGraph;
