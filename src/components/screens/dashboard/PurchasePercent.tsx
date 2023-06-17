import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { PolarArea } from "react-chartjs-2";
import { useQuery } from "react-query";
import { dashboard } from "~/api";
import { showToast } from "~/components/toast";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const PurchasePercent = () => {
  const newUser = localStorage.getItem("currentUser");
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
      enabled: !!newUser,
      onSuccess: (data) => {
        setDataChart(data.Data.map((i) => i.Amount));
        setDataLabels(data.Data.map((i) => i.Name));
      },
    }
  );

  const data = {
    labels: dataLabels || [],
    datasets: [
      {
        label: "# of Votes",
        data: dataChart || [],
        backgroundColor: [
          "#00000085",
          "#ffa50065",
          "#00808085",
          "#f57c0085",
          "#c7158585",
          "#096dd985",
          "#00800085",
          "#f0000055",
        ],
        borderColor: [
          "#000",
          "#ffa500",
          "#008080",
          "#f57c00",
          "#c71585",
          "#096dd9",
          "#008000",
          "#f00",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 h-[100%]">
      <div className="tableBox lg:p-6 col-span-1 !py-4">
        <p className="titleTable">Tỉ lệ đơn mua hộ</p>
        <PolarArea className="mt-4" data={data} options={options} />
      </div>
      {/* <div className="col-span-1 tableBox">
				{templateColorPanel.map((item) => (
					<div className={boxContain} key={item?.id}>
						<div
							className={itemContain}
							style={{
								backgroundColor: item?.color,
								border: `1px solid ${item?.color}`,
							}}
						></div>
						<p>{item?.label}</p>
					</div>
				))}
			</div> */}
    </div>
  );
};
