import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar, Bubble, Line } from "react-chartjs-2";
import { useQuery } from "react-query";
import { dashboard } from "~/api";
import { showToast } from "~/components/toast";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  tension: 0.4,
  scales: {
    xAxes: { grid: { display: false, drawBorder: true } },
    yAxes: {
      grid: { display: true, borderDash: [1,1], drawBorder: false },
    },
  },
};

const labels = [
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
  "Chủ nhật",
];

export const TotalRechargesPerWeek = React.memo(() => {
  const { data: dataChart, refetch } = useQuery(
    "get-item-in-week",
    () => dashboard.getItemInWeek(),
    {
      onError: (error) =>
        showToast({
          title: "Đã xảy ra lỗi!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        }),
      onSuccess: (res) => {
        let value = 0;
        res.Data.forEach((item) => {
          value += item.AdminSendUserWallet;
        });
        return res.Data;
      },
    }
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Tổng tiền",
        data: dataChart?.Data?.map((item) => item.AdminSendUserWallet),
        backgroundColor: "green",
      },
    ],
  };

  return (
    <div className="tableBox">
      <p className="titleTable !mb-4">Tổng tiền khách nạp trong tuần qua</p>
      <Bar options={options} data={data} height={252} />
    </div>
  );
});
