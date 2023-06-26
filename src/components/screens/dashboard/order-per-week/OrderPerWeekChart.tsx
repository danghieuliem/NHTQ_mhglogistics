import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import TagStatus from "../../status/TagStatus";

const labels = [
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
  "Chủ nhật",
];

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
      grid: { display: true, borderDash: [1, 1], drawBorder: false },
    },
  },
};

export const OrdersPerWeekChart = ({
  dataChart,
}: {
  dataChart: [] | TGetItemInWeek[];
}) => {
  const dataWeek = [
    {
      label: "Mua hộ",
      data: dataChart?.map((item) => item.MainOrder),
      backgroundColor: "#1582F5",
      // borderColor: "#2A8BD5",
    },
    {
      label: "Mua hộ khác",
      data: dataChart?.map((item) => item.MainOrderAnother),
      backgroundColor: "#009000",
      // borderColor: "#009000",
    },
    {
      label: "Ký gửi",
      data: dataChart?.map((item) => item.TransportationOrder),
      backgroundColor: "#FF7A00",
      // borderColor: "#F1A934",
    },
    {
      label: "Thanh toán hộ",
      data: dataChart?.map((item) => item.PayHelp),
      backgroundColor: "#FF0000",
      // borderColor: "#E54C36",
    },
  ];

  const data = {
    labels,
    datasets: dataWeek,
  };

  return (
    <div className="tableBox">
      <p className="titleTable">Số lượng đơn trong tuần</p>
      <div className="grid grid-cols-4 gap-1 mt-4">
        <TagStatus color="#1582F5" statusName="Mua hộ" />
        <TagStatus color="#009000" statusName="Mua hộ khác" />
        <TagStatus color="#FF7A00" statusName="Ký gửi" />
        <TagStatus color="#FF0000" statusName="Thanh toán hộ" />
      </div>
      <Bar data={data} options={options} height={190} />
    </div>
  );
};
