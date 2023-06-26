import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    xAxes: { grid: { display: false, drawBorder: false } },
    yAxes: {
      grid: { display: true, borderDash: [3, 3], drawBorder: false },
    },
  },
};

type TProps = {
  dataChart: {
    totalRecharge: number;
    totalWithdraw: number;
  };
};

export const StatisticalRechargeChart = (dataChart: TProps) => {
  // const labels = ['Tiền nạp', 'Tiền rút', 'Dư tạm thời'];
  const labels = ["Tổng tiền nạp - rút"];

  const data = {
    labels,
    datasets: [
      // {
      //   label: "VND",
      //   data: [
      //     dataChart?.dataChart?.totalRecharge,
      //     dataChart?.dataChart?.totalWithdraw,
      //   ],
      //   borderColor: "rgba(232, 110, 58)",
      //   backgroundColor: "rgba(232, 110, 58,0.125)",
      //   borderWidth: 1,
      //   tension: 0.3,
      //   pointBackgroundColor: "#fff",
      //   pointBorderWidth: 1,
      //   fill: true,
      // },
      {
        label: "Tổng tiền nạp",
        data: [dataChart?.dataChart?.totalRecharge],
        backgroundColor: "green",
      },
      {
        label: "Tổng tiền rút",
        data: [dataChart?.dataChart?.totalWithdraw],
        backgroundColor: "darkred",
      },
    ],
  };

  return (
    <React.Fragment>
      <p className="text-sm !my-4 text-active font-bold text-center">
        Biểu đồ thống kê tiền nạp
      </p>
      {/* <Line options={options} data={data} height={100} /> */}
      <Bar height={100} data={data} options={options}/>
    </React.Fragment>
  );
};
