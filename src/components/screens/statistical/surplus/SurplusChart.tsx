import React from "react";
import {Bar} from "react-chartjs-2";
import {_format} from "~/utils";

export const SurplusChart = ({dataChart, totalWallet}) => {
	const labels = ["Số dư"];
	const data = {
		labels,
		datasets: [
			{
				label: "Lớn hơn 0",
				backgroundColor: "rgba(255, 99, 132)",
				data: [dataChart?.GreaterThan0],
			},
			{
				label: "Bằng 0",
				backgroundColor: "rgba(255, 159, 64)",
				data: [dataChart?.Equals0],
			},
			{
				label: "1 triệu - 5 triệu",
				backgroundColor: "rgba(25, 19, 122)",
				data: [dataChart?.From1MTo5M],
			},
			{
				label: "5 triệu - 10 triệu",
				backgroundColor: "rgba(28, 199, 232)",
				data: [dataChart?.From5MTo10M],
			},
			{
				label: "Lớn hơn 10 triệu",
				backgroundColor: "rgba(56, 99, 2)",
				data: [dataChart?.GreaterThan10M],
			},
		],
	};
	return (
		<React.Fragment>
			<div className="text-lg py-4">
				<span className="text-base">Tổng số dư:</span>
				<span className="text-blue"> {_format.getVND(totalWallet)}</span>
			</div>
			<div className="text-base font-semibold text-center pb-2 text-[#626262]">
				<span>Biểu đồ số lượng user theo số dư</span>
				<Bar data={data} height={"100px"} />
			</div>
		</React.Fragment>
	);
};
