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
import {Bar} from "react-chartjs-2";
import {useQuery} from "react-query";
import {dashboard} from "~/api";
import {showToast} from "~/components/toast";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
	},
	scales: {
		xAxes: {grid: {display: false, drawBorder: false}},
		yAxes: {
			grid: {display: true, borderDash: [3, 3], drawBorder: false},
		},
	},
};

const labels = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];

export const TotalRechargesPerWeek = React.memo(() => {
	const {data: dataChart, refetch} = useQuery("get-item-in-week", () => dashboard.getItemInWeek(), {
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
	});

	const data = {
		labels,
		datasets: [
			{
				label: "Tổng tiền",
				data: dataChart?.Data?.map((item) => item.AdminSendUserWallet),
				borderColor: "#1f1f67",
				backgroundColor: "#f5851f",
				borderWidth: 2,
				tension: 0.3,
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				fill: true,
			},
		],
	};

	return (
		<div className="xl:grid grid-cols-1">
			{/* <div className="lg:grid grid-cols-2 gap-4  p-0 col-span-1"> */}
			{/* <div className={boxItem}>
					<div className="m-auto mb-2">
						<p className={title}>Tuần này</p>
					</div>
					<div className={valueContain}>
						<div className="mt-2">
							<p className="text-2xl">
								100 <span>%</span>
							</p>
							<p className={clsx(valueItem, "text-green")}>+ 200k</p>
						</div>
						<i
							className={clsx(
								styleIcon,
								"fas fa-calendar-alt bg-[#2A8BD5] "
							)}></i>
					</div>
				</div> */}
			{/* <div className={boxItem}>
					<div className="m-auto mb-2">
						<p className={title}>Tổng tiền</p>
					</div>
					<div className={valueContain}>
						<div className="mt-2">
							<p className="text-2xl">
								{_format.getVND(totalPrice, " VNĐ")}
							</p>
						</div>
						<i className={clsx(styleIcon, "fas fa-usd-circle bg-[#27A689]")}></i>
					</div>
				</div> */}
			{/* </div> */}
			<div className="tableBox !mb-0 lg:p-6 p-4 w-full col-span-1">
				<p className="titleTable px-0">Tổng tiền khách nạp trong tuần qua</p>
				<Bar options={options} data={data} height={135} />
			</div>
		</div>
	);
})
