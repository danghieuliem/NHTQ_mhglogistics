import React from 'react';
import { Bar } from 'react-chartjs-2';

const PurchaseProfitChart = ({ dataChart }) => {
	const labels = [`Thống kê lợi nhuận mua hàng hộ`];
	const data = {
		labels,
		datasets: [
			{
				label: 'Tổng tiền đơn hàng',
				data: [dataChart?.MaxTotalPriceVND],
				backgroundColor: 'rgba(255, 99, 132, 0.8)'
			},
			{
				label: 'Tổng tiền lời',
				data: [dataChart?.MaxProfit],
				backgroundColor: 'rgba(255, 159, 64, 0.8)'
			},
			{
				label: 'Tổng tiền ship Trung Quốc',
				data: [dataChart?.MaxFeeShipCN],
				backgroundColor: 'rgba(255, 205, 86, 0.8)'
			},
			{
				label: 'Tổng tiền mua hàng',
				data: [dataChart?.MaxFeeBuyPro],
				backgroundColor: 'rgba(75, 192, 192, 0.8)'
			},
			{
				label: 'Tổng tiền đóng gỗ',
				data: [dataChart?.MaxIsPackedPrice],
				backgroundColor: 'rgba(54, 162, 235, 0.8)'
			},
			{
				label: 'Tổng tiền lưu kho',
				data: [dataChart?.MaxFeeInWareHouse],
				backgroundColor: 'rgba(153, 102, 255, 0.8)'
			}
		]
	};
	return (
		<div>
			<p className="text-sm !my-4 text-[#2d2d2daa] font-bold uppercase text-center">
				Thống kê lợi nhuận mua hàng hộ
			</p>
			<Bar height={100} data={data} />
		</div>
	);
};

export { PurchaseProfitChart };
