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
import { Bar } from "react-chartjs-2";

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
  scales: {
    xAxes: { grid: { display: false, drawBorder: false } },
    yAxes: {
      grid: { display: true, borderDash: [3, 3], drawBorder: false },
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
      label: "Mua hàng hộ",
      data: dataChart?.map((item) => item.MainOrder),
      backgroundColor: "#2A8BD5",
      borderColor: "#2A8BD5",
    },
    {
      label: "Mua hàng hộ khác",
      data: dataChart?.map((item) => item.MainOrderAnother),
      backgroundColor: "#27A689",
      borderColor: "#27A689",
    },
    {
      label: "Ký gửi",
      data: dataChart?.map((item) => item.TransportationOrder),
      backgroundColor: "#F1A934",
      borderColor: "#F1A934",
    },
    {
      label: "Thanh toán hộ",
      data: dataChart?.map((item) => item.PayHelp),
      backgroundColor: "#E54C36",
      borderColor: "#E54C36",
    },
  ];

  const data = {
    labels,
    datasets: dataWeek,
  };

  // console.log("dataWeek: ", { dataWeek });

  return <Bar data={data} options={options} />;
};
