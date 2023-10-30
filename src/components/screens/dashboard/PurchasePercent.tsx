import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { dashboard } from "~/api";
import TagStatus from "../status/TagStatus";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const PercentOrder = () => {
  const [dataChart, setDataChart] = useState([]);
  const [dataLabels, setDataLabels] = useState([]);

  const { isLoading } = useQuery(
    "get-order-percent",
    () => dashboard.getPercentOrder(),
    {
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
      onSuccess: (data) => {
        setDataChart(data.Data.map((i) => i.Amount));
        setDataLabels(data.Data.map((i) => i.Name));
      },
      refetchOnWindowFocus: true,
      staleTime: 5000,
    }
  );

  const data = {
    labels: dataLabels,
    datasets: [
      {
        // labels: dataLabels,
        backgroundColor: [
          "#000",
          "purple",
          "#f00",
          "#ffa500",
          "#008080",
          "#F04438",
          "#f57c00",
          "#FDB022",
          "#c71585",
          "#096dd9",
          "#008000",
          "#601010",
        ],
        data: dataChart,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="tableBox w-full h-full flex flex-col justify-between">
      <p className="titleTable">Tỉ lệ đơn mua hộ</p>
      <div className="grid grid-cols-2 gap-1 mt-4 ">
        <TagStatus color="#000" statusName="Đã huỷ" />
        <TagStatus color="purple" statusName="Chờ báo giá" />
        <TagStatus color="#f00" statusName="Đơn mới" />
        <TagStatus color="#ffa500" statusName="Đã cọc" />
        <TagStatus color="#008080" statusName="Đã mua hàng" />
        <TagStatus color="#F04438" statusName="Shop phát hàng" />
        <TagStatus color="#f57c00" statusName="Về kho TQ" />
        <TagStatus color="#FDB022" statusName="Đang về VN" />
        <TagStatus color="#c71585" statusName="Về kho VN" />
        <TagStatus color="#096dd9" statusName="Đã thanh toán" />
        <TagStatus color="#008000" statusName="Hoàn thành" />
        <TagStatus color="#601010" statusName="Khiếu nại" />
      </div>
      <Pie
        data={data}
        height={270}
        options={options}
        className="p-6 xl:p-10 my-[-17px]"
      />
    </div>
  );
};

const PercentTransport = () => {
  const [dataChart, setDataChart] = useState([]);
  const [dataLabels, setDataLabels] = useState([]);

  const { isLoading } = useQuery(
    "get-trans-percent",
    () => dashboard.getPercentTransport(),
    {
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
      onSuccess: (data) => {
        setDataChart(data.Data.map((i) => i.Amount));
        setDataLabels(data.Data.map((i) => i.Name));
      },
      refetchOnWindowFocus: true,
      staleTime: 5000,
    }
  );

  const data = {
    labels: dataLabels,
    datasets: [
      {
        // labels: dataLabels,
        backgroundColor: [
          "#000",
          "magenta",
          "#f00",
          "#f57c00",
          "#FDB022",
          "#c71585",
          "#096dd9",
          "#008000",
          "#601010",
        ],
        data: dataChart,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="tableBox w-full h-full flex flex-col justify-between">
      <p className="titleTable">Tỉ lệ đơn ký gửi</p>
      <div className="grid grid-cols-2 gap-1 mt-4 ">
        <TagStatus color="#000" statusName="Đã huỷ" />
        <TagStatus color="magenta" statusName="Chờ duyệt" />
        <TagStatus color="#f00" statusName="Đơn mới" />
        <TagStatus color="#f57c00" statusName="Về kho TQ" />
        <TagStatus color="#FDB022" statusName="Đang về VN" />
        <TagStatus color="#c71585" statusName="Về kho VN" />
        <TagStatus color="#096dd9" statusName="Đã thanh toán" />
        <TagStatus color="#008000" statusName="Hoàn thành" />
        <TagStatus color="#601010" statusName="Khiếu nại" />
      </div>
      <Pie
        data={data}
        height={270}
        options={options}
        className="p-6 xl:p-10 my-[-17px]"
      />
    </div>
  );
};

const PercentPayment = () => {
  const [dataChart, setDataChart] = useState([]);
  const [dataLabels, setDataLabels] = useState([]);

  const { isLoading } = useQuery(
    "get-payhelp-percent",
    () => dashboard.getPercentPayhelp(),
    {
      onError: (error) =>
        toast.error((error as any)?.response?.data?.ResultMessage),
      onSuccess: (data) => {
        setDataChart(data.Data.map((i) => i.Amount));
        setDataLabels(data.Data.map((i) => i.Name));
      },
      refetchOnWindowFocus: true,
      staleTime: 5000,
    }
  );

  const data = {
    labels: dataLabels,
    datasets: [
      {
        // labels: dataLabels,
        backgroundColor: ["#000", "magenta", "#008080", "#096dd9", "#008000"],
        data: dataChart,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="tableBox w-full h-full flex flex-col justify-between">
      <p className="titleTable">Tỉ lệ đơn thanh toán hộ</p>
      <div className="grid grid-cols-2 gap-1 mt-4 ">
        <TagStatus color="#000" statusName="Đã huỷ" />
        <TagStatus color="magenta" statusName="Chờ duyệt" />
        <TagStatus color="#008080" statusName="Đã duyệt" />
        <TagStatus color="#096dd9" statusName="Đã thanh toán" />
        <TagStatus color="#008000" statusName="Hoàn thành" />
      </div>
      <Pie
        data={data}
        height={270}
        options={options}
        className="p-6 xl:p-10 my-[-17px]"
      />
    </div>
  );
};

const PercentOrderMemo = React.memo(PercentOrder);
const PercentTransportMemo = React.memo(PercentTransport);
const PercentPaymentMemo = React.memo(PercentPayment);

export const PurchasePercent = () => {
  return (
    <div className="xs:grid hidden md:grid-cols-3 gap-4 w-full">
      <PercentOrderMemo />
      <PercentTransportMemo />
      <PercentPaymentMemo />
    </div>
  );
};
