import { Table } from 'antd';
import React from 'react';
import { DataTable } from '~/components';
import { TColumnsType, TTable } from '~/types/table';
import { _format } from '~/utils';

export const RequestDepositOutstockStatistic: React.FC<
	TTable<TTransportationOrder> & {
		paymentStatusName: string;
		smallPackagesData: any;
	}
> = ({ data, loading, paymentStatusName, smallPackagesData }) => {
	const columns: TColumnsType<TTransportationOrder> = [
		{
			dataIndex: 'BarCode',
			title: 'Mã kiện',
			align: 'center'
		},
		{
			dataIndex: 'Weight',
			title: 'Cân nặng (kg)',
			align: 'center',
			render: (weight) => weight && _format.getVND(weight, '')
		},
		{
			dataIndex: 'SensorFeeVND',
			title: 'Cước vật tư',
			align: 'center',
			render: (fee) => fee && _format.getVND(fee)
		},
		{
			dataIndex: 'AdditionFeeVND',
			title: 'PP hàng ĐB',
			align: 'center',
			render: (fee) => fee && _format.getVND(fee)
		}
	];

	const summary = (data: TTransportationOrder[]) => (
		<React.Fragment>
			<Table.Summary.Row>
				<Table.Summary.Cell index={0} colSpan={3}>
					<b>Tổng số kiện</b>
				</Table.Summary.Cell>
				<Table.Summary.Cell index={1} align="center">
					<b>{_format.getVND(data?.length, '') || 0} kiện</b>
				</Table.Summary.Cell>
			</Table.Summary.Row>
			<Table.Summary.Row>
				<Table.Summary.Cell index={0} colSpan={3}>
					<b>Tổng cân nặng</b>
				</Table.Summary.Cell>
				<Table.Summary.Cell index={1} align="center">
					{_format.getVND(
						data.reduce((prev, cur) => prev + cur.Weight, 0),
						' Kg'
					)}
				</Table.Summary.Cell>
			</Table.Summary.Row>
			<Table.Summary.Row>
				<Table.Summary.Cell index={0} colSpan={3}>
					<b>Trạng thái</b>
				</Table.Summary.Cell>
				<Table.Summary.Cell index={1} align="center">
					{paymentStatusName}
				</Table.Summary.Cell>
			</Table.Summary.Row>
			<Table.Summary.Row>
				<Table.Summary.Cell index={0} colSpan={3}>
					<b>Tổng tiền</b>
				</Table.Summary.Cell>
				<Table.Summary.Cell index={1} align="center">
					<b className="text-warning">
						{_format.getVND(
							data.reduce((prev, cur) => prev + cur.TotalPriceVND, 0)
						)}
					</b>
				</Table.Summary.Cell>
			</Table.Summary.Row>
		</React.Fragment>
	);

	return (
		<div className="mt-4">
			<DataTable
				{...{
					columns,
					data,
					loading,
					summary: !!data?.length ? summary : undefined
				}}
			/>
		</div>
	);
};
