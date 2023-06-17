import React from 'react';
import { DataTable } from '~/components';
import { TColumnsType, TTable } from '~/types/table';
import { _format } from '~/utils';

export const ChangeRequestPaymentOrderHistory: React.FC<TTable<THistoryService>> = ({ data, loading }) => {
	const columns: TColumnsType<THistoryService> = [
		{
			dataIndex: 'Created',
			title: 'Ngày đặt',
			render: (date) => _format.getVNDate(date)
		},
		{
			dataIndex: 'UserName',
			title: 'Username'
		},
		{
			dataIndex: 'Note',
			title: 'Nội dung'
		}
	];

	return <DataTable {...{ columns, data, style: 'secondary', loading }} />;
};
