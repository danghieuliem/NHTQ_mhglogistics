import { Popconfirm, Tag } from 'antd';
import React from 'react';
import { DataTable, ActionButton } from '~/components';
import {
	EPaymentData,
	exportStatusData,
	paymentData
} from '~/configs/appConfigs';
import { TColumnsType, TTable } from '~/types/table';
import { _format } from '~/utils';

export const StatisticalDepositTable: React.FC<
	TTable<TUserStatisticalDeposit>
> = ({ data, handleConfirm, handlePagination, loading, pagination }) => {
	const columns: TColumnsType<TUserStatisticalDeposit> = [
		{
			dataIndex: 'Id',
			title: 'ID',
			align: 'left'
		},
		{
			dataIndex: 'OutStockDate',
			title: 'Ngày YCXK',
			align: 'left',
			render: (date) => date && _format.getShortVNDate(date)
		},
		{
			dataIndex: 'BarCodeAndDateOuts',
			title: 'Ngày XK',
			align: 'left',
			render: (record) =>
				record.map((item) => (
					<div className="flex mb-2">
						{item?.OrderTransactionCode !== '' && (
							<div className=" w-[140px]">
								<p className="text-[#686868] font-medium text-xs pb-1">
									Mã vận đơn
								</p>
								<div className="text-xs text-[#686868] bg-[#f5f4f4] p-1 rounded-md mr-2 ">
									{item?.OrderTransactionCode}
								</div>
							</div>
						)}
						{item?.DateOutWarehouse !== '' && (
							<div className="w-[140px]">
								<p className="text-[#686868] font-medium text-xs pb-1">
									Ngày XK
								</p>
								<div className="text-xs text-[#686868] bg-[#f5f4f4] p-1 rounded-md">
									{_format.getShortVNDate(item?.DateOutWarehouse)}
								</div>
							</div>
						)}
					</div>
				)),
			responsive: ['md']
		},
		{
			dataIndex: 'TotalPackage',
			title: 'Tổng số kiện',
			align: 'left',
			responsive: ['md']
		},
		{
			dataIndex: 'TotalWeight',
			title: 'Tổng số kg',
			align: 'left',
			responsive: ['lg']
		},
		{
			dataIndex: 'TotalPriceVND',
			title: 'Tổng tiền',
			align: 'left',
			responsive: ['lg']
		},
		{
			dataIndex: 'ShippingTypeInVNName',
			title: 'HTVC',
			align: 'left',
			responsive: ['lg']
		},
		{
			dataIndex: 'Status',
			title: 'Trạng thái',
			align: 'left',
			render: (status) => (
				<Tag color={paymentData?.[status]?.color}>
					{paymentData?.[status]?.name}
				</Tag>
			),
			responsive: ['xl']
		},
		{
			dataIndex: 'StatusExport',
			title: 'Trạng thái XK',
			align: 'left',
			render: (status) => {
				const exportStatus = exportStatusData.find((x) => x.id === status);

				return <Tag color={exportStatus?.color}>{exportStatus?.name}</Tag>;
			},
			responsive: ['xl']
		},
		{
			dataIndex: 'StaffNote',
			title: 'Ghi chú',
			align: 'left',
			responsive: ['xl']
		},
		{
			dataIndex: 'action',
			title: 'Thao tác',
			align: 'left',
			responsive: ['xl'],
			render: (_, record) =>
				record.Status === EPaymentData.Unpaid && (
					<Popconfirm
						title="Bạn có muốn thanh toán trực tiếp?"
						placement="leftBottom"
						onConfirm={() => handleConfirm(record)}
					>
						<ActionButton icon="fas fa-credit-card" title="Thanh toán" />
					</Popconfirm>
				)
		}
	];

	const expandable = {
		expandedRowRender: (record) => (
			<ul className="px-2 text-xs">
				<li className="md:hidden justify-between py-2">
					<span className="font-medium mr-4">Ngày xk:</span>
					{record.map((item) => (
						<div className="mt-2 flex justify-end">
							<div className="mb-4 w-[140px]">
								<p className="text-[#686868] font-medium text-xs">Mã vận đơn</p>
								<div className="text-xs text-[#686868] bg-[#f5f4f4] px-2 rounded-md mr-2 ">
									{item?.OrderTransactionCode}
								</div>
							</div>
							<div className="w-[140px]">
								<p className="text-[#686868] font-medium text-xs">Ngày XK</p>
								<div className="text-xs text-[#686868] bg-[#f5f4f4] px-2 rounded-md">
									{_format.getShortVNDate(item?.DateOutWarehouse)}
								</div>
							</div>
						</div>
					))}
				</li>
				<li className="md:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Tổng số kiện:</span>
					{record.TotalPackage}
				</li>
				<li className="lg:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Tổng số kg:</span>
					{record.TotalWeight}
				</li>
				<li className="lg:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Tổng tiền:</span>
					{record.TotalPriceVND}
				</li>
				<li className="lg:hidden justify-between flex py-2">
					<span className="font-medium mr-4">HTVC:</span>
					{record.ShippingTypeInVNName}
				</li>
				<li className="xl:hidden justify-between flex py-2">
					<span className="font-medium  mr-4">Trạng thái:</span>
					<Tag color={paymentData?.[record?.Status]?.color}>
						{paymentData?.[record.Status]?.name}
					</Tag>
				</li>
				<li className="xl:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Trạng thái xk:</span>
					<Tag
						color={exportStatusData.find((x) => x.id === record.Status)?.color}
					>
						{exportStatusData.find((x) => x.id === record.Status)?.name}
					</Tag>
				</li>
				<li className="xl:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Ghi chú:</span>
					{record.StaffNote}
				</li>
				<li className="xl:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Thao tác:</span>
					{record.Status === EPaymentData.Unpaid && (
						<Popconfirm
							title="Bạn có muốn thanh toán trực tiếp?"
							placement="leftBottom"
							onConfirm={() => handleConfirm(record)}
						>
							<ActionButton icon="fas fa-credit-card" title="Thanh toán" />
						</Popconfirm>
					)}
				</li>
			</ul>
		)
	};

	return (
		<DataTable
			{...{
				loading,
				pagination,
				onChange: handlePagination,
				columns,
				data,
				bordered: true,
				expandable: expandable
			}}
		/>
	);
};
