import { Space } from 'antd';
import Link from 'next/link';
import React, { FC } from 'react';
import { DataTable, ActionButton } from '~/components';
import { TColumnsType, TTable } from '~/types/table';
import { _format } from '~/utils';

const IncomeSaleOrderTable: FC<
	TTable<TStatisticalIncomeSale> & { type: 'sale' | 'order' }
> = ({ data, pagination, handlePagination, loading, type }) => {
	const columns: TColumnsType<TStatisticalIncomeSale> = [
		{
			dataIndex: 'UserName',
			title: type === 'sale' ? 'Saler' : 'NV Đặt Hàng',
			align: 'center',
			fixed: 'left'
		},
		{
			dataIndex: 'TotalPriceVND',
			title: 'Giá trị đơn hàng',
			align: 'center',
			responsive: ['sm'],
			render: (money) => _format.getVND(money),
			fixed: 'left'
		},
		{
			dataIndex: 'PriceVND',
			title: 'Tiền hàng',
			align: 'center',
			render: (money) => _format.getVND(money),
			responsive: ['md']
		},
		{
			dataIndex: 'OrderFee',
			title: 'Phí đơn hàng',
			align: 'center',
			responsive: ['md'],
			render: (money) => _format.getVND(money)
		},
		{
			dataIndex: 'FeeBuyPro',
			title: 'Phí mua hàng',
			align: 'center',
			responsive: ['md'],
			render: (money) => _format.getVND(money)
		},
		{
			dataIndex: 'FeeWeight',
			title: 'Vận chuyển TQ-VN',
			align: 'center',
			render: (money) => _format.getVND(money),
			responsive: ['lg']
		},
		{
			dataIndex: 'FeeShipCN',
			title: 'Vận chuyển nội địa',
			align: 'center',
			render: (money) => _format.getVND(money),
			responsive: ['lg']
		},
		{
			dataIndex: 'BargainMoney',
			title: 'Mặc cả',
			align: 'center',
			render: (money) => _format.getVND(money),
			responsive: ['lg']
		},
		{
			dataIndex: 'TQVNWeight',
			title: 'Cân nặng',
			align: 'center',
			responsive: ['xl']
		},
		{
			dataIndex: 'TotalOrder',
			title: 'Số đơn hàng',
			align: 'center',
			responsive: ['xl']
		},
		{
			dataIndex: 'TotalCus',
			title: 'Số khách hàng',
			align: 'center',
			responsive: ['xl']
		},
		{
			dataIndex: 'TQVNWeight',
			title: 'Xem khách hàng',
			align: 'center',
			responsive: ['xl'],
			render: (_, record) => (
				<Space>
					<Link href={`/manager/client/client-list/${record.Id}`}>
						<a>
							<ActionButton
								onClick={undefined}
								icon="fas fa-edit"
								title="Xem danh sách khách hàng"
							/>
						</a>
					</Link>
				</Space>
			),
			fixed: 'right'
		}
	];

	const expandable = {
		expandedRowRender: (record) => (
			<ul className="px-2 text-xs">
				<li className="sm:hidden py-2 flex justify-between">
					<span className="font-medium mr-4">Giá trị đơn hàng:</span>
					{record?.TotalPriceVND}
				</li>
				<li className="md:hidden py-2 flex justify-between">
					<span className="font-medium mr-4">Tiền hàng:</span>
					{_format.getVND(record?.PriceVND)}
				</li>
				<li className="md:hidden py-2 flex justify-between">
					<span className="font-medium mr-4">Phí đơn hàng:</span>
					{_format.getVND(record?.OrderFee)}
				</li>
				<li className="md:hidden py-2 flex justify-between">
					<span className="font-medium mr-4">Phí mua hàng:</span>
					{_format.getVND(record?.FeeBuyPro)}
				</li>
				<li className="lg:hidden py-2 flex justify-between">
					<span className="font-medium mr-4">Vận chuyển TQ-VN:</span>
					{_format.getVND(record?.FeeWeight)}
				</li>
				<li className="lg:hidden py-2 flex justify-between">
					<span className="font-medium mr-4">Vận chuyển nội địa:</span>
					{_format.getVND(record?.FeeShipCN)}
				</li>
				<li className="lg:hidden py-2 flex justify-between">
					<span className="font-medium mr-4">Mặc cả:</span>
					{_format.getVND(record?.BargainMoney)}
				</li>
				<li className="xl:hidden py-2 flex justify-between">
					<span className="font-medium mr-4">Cân nặng:</span>
					{record?.TQVNWeight}
				</li>
				<li className="xl:hidden py-2 flex justify-between">
					<span className="font-medium mr-4">Số đơn hàng:</span>
					{record?.TotalOrder}
				</li>
				<li className="xl:hidden py-2 flex justify-between">
					<span className="font-medium mr-4">Số khách hàng:</span>
					{record?.TotalCus}
				</li>
				<li className="xl:hidden py-2 flex justify-between">
					<span className="font-medium mr-4">Xem khách hàng:</span>
					<div>
						<Space>
							<Link href={`/manager/client/client-list/${record?.Id}`}>
								<a>
									<ActionButton
										onClick={undefined}
										icon="fas fa-edit"
										title="Xem danh sách khách hàng"
									/>
								</a>
							</Link>
						</Space>
					</div>
				</li>
			</ul>
		)
	};

	return (
		<DataTable
			{...{
				columns,
				data,
				bordered: true,
				pagination,
				onChange: handlePagination,
				expandable: expandable,
				loading
			}}
		/>
	);
};

export { IncomeSaleOrderTable };
