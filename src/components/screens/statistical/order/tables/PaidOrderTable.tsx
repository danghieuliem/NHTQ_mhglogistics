import { FC } from 'react';
import { useQuery } from 'react-query';
import { reportMainOrder } from '~/api';
import { toast } from '~/components/toast';
import { _format } from '~/utils';
import { SimpleOrderTable } from '..';

const PaidOrderTable: FC = () => {
	const { data, isFetching } = useQuery(
		['clientPurchaseReportData'],
		() =>
			reportMainOrder
				.getList({
					PageIndex: 1,
					PageSize: 1,
					OrderBy: 'Id desc',
					Status: 9
				})
				.then((res) => res.Data),
		{
			onSuccess: (data) => {},
			onError: toast.error
		}
	);
	const rows = [
		{
			name: 'Tổng đơn đã thanh toán',
			value: `${data?.TotalItem} đơn hàng`
		},
		{
			name: 'Tổng tiền đã thanh toán',
			value: _format.getVND(data?.Items[0]?.MaxTotalPriceVND)
		}
	];
	const title = 'Khách đã thanh toán';
	return <SimpleOrderTable rows={rows} title={title} />;
};

export { PaidOrderTable };

