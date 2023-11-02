import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { _format } from "~/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labelsDetailChart = [
  "Từ đặt cọc đến khi hàng về VN",
  "Từ đã thanh toán đến đã hoàn thành",
];

const labelsSumChart = ["Biểu đồ tổng tiền"];

export const SalesMoneyStatisticChart = ({ type, dataChart }) => {
  const labels = type === "sum" ? labelsSumChart : labelsDetailChart;

  if (!dataChart) {
    return <></>;
  }

  const datasets =
    type === "sum"
      ? [
          {
            label: "Đã mua",
            data: [dataChart[1]?.Total],
            backgroundColor: "#CD6155",
          },
          {
            label: "Hoàn thành",
            data: [dataChart[7]?.Total],
            backgroundColor: "#AF7AC5",
          },
          {
            label: "Đặt cọc - hoàn thành",
            data: [dataChart[8]?.Total],
            backgroundColor: "#5499C7",
          },
          {
            label: "Tiền cọc",
            data: [dataChart[9]?.Total],
            backgroundColor: "#45B39D",
          },
          {
            label: "Chưa thanh toán",
            data: [dataChart[10]?.Total],
            backgroundColor: "#616A6B",
          },
          {
            label: "Đơn hoả tốc",
            data: [dataChart?.Total],
            backgroundColor: "#D35400",
          },
          {
            label: "Ship",
            data: [dataChart[11]?.Total],
            backgroundColor: "#5499C7",
          },
        ]
      : [
          {
            label: "Tiền ship Trung Quốc",
            data: [dataChart[1]?.NotPay, dataChart[1]?.Pay],
            backgroundColor: "#58D68D",
          },
          {
            label: "Tiền phí mua hàng",
            data: [dataChart[2]?.NotPay, dataChart[2]?.Pay],
            backgroundColor: "#F5B041",
          },
          {
            label: "Tiền phí cân nặng",
            data: [dataChart[3]?.NotPay, dataChart[3]?.Pay],
            backgroundColor: "#2980B9",
          },
          {
            label: "Tiền phí kiểm đếm",
            data: [dataChart[4]?.NotPay, dataChart[4]?.Pay],
            backgroundColor: "#CB4335",
          },
          {
            label: "Tiền phí đóng gói",
            data: [dataChart[5]?.NotPay, dataChart[5]?.Pay],
            backgroundColor: "#F4D03F",
          },
          {
            label: "Tiền phí giao tận nhà",
            data: [dataChart[7]?.NotPay, dataChart[7]?.Pay],
            backgroundColor: "#333333",
          },
          {
            label: "Tiền phí bảo hiểm",
            data: [dataChart[6]?.NotPay, dataChart[6]?.Pay],
            backgroundColor: "blue",
          },
        ];

  const data = {
    labels,
    datasets,
  };

  return (
    <div className="">
      <Bar height={160} data={data} />
    </div>
  );
};
