import React from 'react';
import { OutstockPaymentDetail } from '../../money/out-stock-payment';

export const PrintPurchaseForm = () => {
	const data: TMoneyOutstockPaymentDetail[] = [
		{
			id: 1,
			code: 'YT1234547/878',
			kg: 3.2,
			totalDaysSaveInWarehouse: 13,
			statusId: 1,
			statusName: 'Đã thanh toán',
			money: 0
		},
		{
			id: 2,
			code: 'YT78979879854878',
			kg: 2.3,
			totalDaysSaveInWarehouse: 13,
			statusId: 1,
			statusName: 'Đã thanh toán',
			money: 0
		}
	];

	return <OutstockPaymentDetail type="print" data={data} />;
};
