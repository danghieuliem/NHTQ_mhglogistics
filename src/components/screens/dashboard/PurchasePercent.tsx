import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { useQuery } from "react-query";
import { dashboard } from "~/api";
import { showToast } from "~/components/toast";
import TagStatus from "../status/TagStatus";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  // scales: {
  //   xAxes: { grid: { display: false, drawBorder: false } },
  //   yAxes: {
  //     grid: { display: true, borderDash: [3, 3], drawBorder: false },
  //   },
  // },
};

export const PurchasePercent = () => {
  const [dataChart, setDataChart] = useState([]);
  const [dataLabels, setDataLabels] = useState([]);

  const { isLoading } = useQuery(
    "get-order-percent",
    () => dashboard.getPercentOrder(),
    {
      onError: (error) =>
        showToast({
          title: "Đã xảy ra lỗi!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        }),
      onSuccess: (data) => {
        setDataChart(data.Data.map((i) => i.Amount));
        setDataLabels(data.Data.map((i) => i.Name));
      },
    }
  );

  const data = {
    labels: dataLabels,
    datasets: [
      {
        // labels: dataLabels,
        backgroundColor: [
          "#000",
          "#f57c00",
          "#c71585",
          "#008000",
          "#ffa500",
          "#008080",
          "#096dd9",
          "#f00",
        ],
        data: dataChart,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="tableBox">
      <p className="titleTable">Tỉ lệ đơn mua hộ</p>
      <div className="grid grid-cols-2 gap-1 mt-4 ">
        <TagStatus color="#000" statusName="Huỷ đơn hàng"/>
        <TagStatus color="#f57c00" statusName="Đã về kho TQ"/>
        <TagStatus color="#c71585" statusName="Đã về kho VN"/>
        <TagStatus color="#008000" statusName="Đã hoàn thành"/>
        <TagStatus color="#ffa500" statusName="Đã đặt cọc"/>
        <TagStatus color="#008080" statusName="Đã mua hàng"/>
        <TagStatus color="#096dd9" statusName="Đã thanh toán"/>
        <TagStatus color="#f00" statusName="Chưa đặc cọc"/>
      </div>
      <Pie data={data} height={270} options={options} className="p-6 xl:p-10 my-[-17px]" />
    </div>
  );
};
