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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { Bar } from "react-chartjs-2";

const TransactionChart = ({ dataChart }) => {
  const labels = [`Thống kê tiền giao dịch`];
  const data = {
    labels,
    datasets: [
      {
        label: "Đặt cọc",
        data: [dataChart?.TotalDeposit],
        backgroundColor: "#5F9D46",
      },
      {
        label: "Nhận lại đặt cọc",
        data: [dataChart?.TotalReciveDeposit],
        backgroundColor: "rgba(255, 159, 64, 0.8)",
      },
      {
        label: "Thanh toán hoá đơn",
        data: [dataChart?.TotalPaymentBill],
        backgroundColor: "rgba(255, 205, 86, 0.8)",
      },
      {
        label: "Admin nạp tiền",
        data: [dataChart?.TotalAdminSend],
        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },
      {
        label: "Rút tiền",
        data: [dataChart?.TotalWithDraw],
        backgroundColor: "rgba(54, 162, 235, 0.8)",
      },
      {
        label: "Huỷ rút tiền",
        data: [dataChart?.TotalCancelWithDraw],
        backgroundColor: "rgba(153, 102, 255, 0.8)",
      },
      {
        label: "Nhận tiền khiếu nại",
        data: [dataChart?.TotalComplain],
        backgroundColor: "rgba(40, 29, 63, 0.8)",
      },
      {
        label: "Thanh toán ký gửi",
        data: [dataChart?.TotalPaymentTransport],
        backgroundColor: "rgba(41, 12, 99, 0.8)",
      },
      {
        label: "Thanh toán hộ",
        data: [dataChart?.TotalPaymentHo],
        backgroundColor: "rgba(119, 62, 235, 0.8)",
      },
      {
        label: "Thanh toán tiền lưu kho",
        data: [dataChart?.TotalPaymentSaveWare],
        backgroundColor: "rgba(17, 99, 49, 0.8)",
      },
      {
        label: "Nhận lại tiền ký gửi",
        data: [dataChart?.TotalRecivePaymentTransport],
        backgroundColor: "rgba(87, 18, 60, 0.8)",
      },
    ],
  };
  return (
    <React.Fragment>
      <p className="text-base !my-4 font-medium text-center text-active uppercase">
        Biểu đồ thống kê giao dịch
      </p>
      <Bar height={80} data={data} />
    </React.Fragment>
  );
};

export { TransactionChart };
