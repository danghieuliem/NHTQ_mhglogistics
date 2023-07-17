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
import TagStatus from "../../status/TagStatus";

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
      grid: { display: true, borderDash: [1, 1], drawBorder: false },
    },
  },
};

const TransactionChart = ({ dataChart }) => {
  const labels = [`Thống kê tiền giao dịch`];

  const labelStatus = [
    {
      name: "Đặt cọc",
      color: "#5F9D46",
    },
    {
      name: "Nhận lại đặt cọc",
      color: "rgba(255, 159, 64, 0.8)",
    },
    {
      name: "Thanh toán hoá đơn",
      color: "rgba(255, 205, 86, 0.8)",
    },
    {
      name: "Admin nạp tiền",
      color: "rgba(75, 192, 192, 0.8)",
    },
    {
      name: "Rút tiền",
      color: "rgba(54, 162, 235, 0.8)",
    },
    {
      name: "Huỷ rút tiền",
      color: "rgba(153, 102, 255, 0.8)",
    },
    {
      name: "Nhận tiền khiếu nại",
      color: "rgba(40, 29, 63, 0.8)",
    },
    {
      name: "Thanh toán ký gửi",
      color: "rgba(41, 12, 99, 0.8)",
    },
    {
      name: "Thanh toán hộ",
      color: "rgba(119, 62, 235, 0.8)",
    },
    {
      name: "Thanh toán tiền lưu kho",
      color: "rgba(17, 99, 49, 0.8)",
    },
    {
      name: "Nhận lại tiền ký gửi",
      color: "rgba(87, 18, 60, 0.8)",
    },
  ];

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
    <div className="mt-4 grid grid-cols-12 gap-4">
      <div className="tableBox col-span-3 flex flex-col gap-4 h-fit">
        <p className="text-[18px] font-medium text-center text-active uppercase">
          Thống kê giao dịch
        </p>
        <div className="text-xl grid grid-cols-1 gap-1 pl-4">
          {labelStatus?.map((item) => (
            <div key={item?.name} className="flex gap-1 items-center">
              <div
                style={{
                  background: item?.color,
                  width: "40px",
                  height: "16px",
                  borderRadius: "2px",
                }}
              ></div>
              <span className="text-[14px]">{item?.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-9 tableBox">
        <Bar height={60} width={"100%"} data={data} options={options} />
      </div>
    </div>
  );
};

export { TransactionChart };
