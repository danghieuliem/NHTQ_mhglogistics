import React from 'react';

import { Bar } from 'react-chartjs-2';

const options = {
	plugins: {
		legend: {
			display: false
		}
	},
	responsive: true,
	scales: {
		xAxes: { grid: { display: false } },
		yAxes: {
			grid: { display: true, borderDash: [3, 3] }
		}
	}
};

const PaymentProfitChart = ({ dataChart }) => {
	const labels = [`Thống kê lợi nhuận thanh toán hộ`];
	const data = {
		labels,
		datasets: [
			{
				label: 'Tổng tiền tệ',
				data: [dataChart?.MaxTotalPrice],
				backgroundColor: 'rgba(255, 99, 132, 0.8)'
			},
			{
				label: 'Tổng tiền vốn',
				data: [dataChart?.MaxTotalPriceVNDGiaGoc],
				backgroundColor: 'rgba(255, 159, 64, 0.8)'
			},
			{
				label: 'Tổng tiền thu',
				data: [dataChart?.MaxTotalPriceVND],
				backgroundColor: 'rgba(255, 205, 86, 0.8)'
			},
			{
				label: 'Tổng tiền lời',
				data: [dataChart?.MaxProfit],
				backgroundColor: 'rgba(75, 192, 192, 0.8)'
			}
		]
	};
	return (
		<div>
			<p className="text-sm !my-4 text-[#2d2d2daa] uppercase font-bold text-center">
				Thống kê lợi nhuận thanh toán hộ
			</p>
			<Bar height={110} options={options} data={data} />
		</div>
	);
};

export { PaymentProfitChart };
