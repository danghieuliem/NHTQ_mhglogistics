import { Tag } from 'antd';
import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { ActionButton } from '~/components/globals/button/ActionButton';
import { DataTable } from '~/components/globals/table';
import { smallPackageStatusData } from '~/configs/appConfigs';
import { TControl } from '~/types/field';
import { TColumnsType } from '~/types/table';
import { _format } from '~/utils';

type TProps = TControl<{ [key: string]: TSmallPackage[] }> & {
	name: string;
	onHide: (key: string, item: TSmallPackage | TSmallPackage[]) => void;
};

export const RequestedDepositOutstockTable: React.FC<TProps> = ({
	name,
	control,
	onHide
}) => {
	const { fields, update } = useFieldArray({
		name,
		control,
		keyName: 'Id'
	});

	const columns: TColumnsType<TSmallPackage> = [
		{
			dataIndex: 'Id',
			title: 'ID đơn hàng',
			align: 'center'
		},
		{
			dataIndex: 'ProductType',
			title: 'Đơn hàng',
			align: 'center'
		},
		{
			dataIndex: 'OrderTransactionCode',
			title: 'Mã vận đơn',
			align: 'center'
		},
		{
			dataIndex: 'Weight',
			title: 'Cân nặng (kg)',
			align: 'center'
		},
		{
			dataIndex: 'LWH',
			title: 'Kích thước',
			align: 'center'
		},
		{
			dataIndex: 'TotalDateInLasteWareHouse',
			title: 'Tổng ngày lưu kho',
			align: 'center',
			render: (total) => total && _format.getVND(total, '')
		},
		{
			dataIndex: 'Status',
			title: 'Trạng thái',
			align: 'center',
			render: (status) => (
				<Tag color={smallPackageStatusData.find((x) => x.id === status).color}>
					{smallPackageStatusData.find((x) => x.id === status).name}
				</Tag>
			)
		},
		{
			dataIndex: 'action',
			title: 'Thao tác',
			align: 'center',
			render: (_, record, index) => (
				<React.Fragment>
					<ActionButton
						icon="fas fa-eye-slash"
						title="Ẩn"
						onClick={() => onHide(name, record)}
					/>
					{!record.Checked && (
						<ActionButton
							icon="fas fa-check"
							onClick={() => update(index, { ...record, Checked: true })}
							title="Xác nhận kiện"
						/>
					)}
				</React.Fragment>
			)
		}
	];

	return (
		<div className="mt-4">
			<div className="text-green font-semibold px-4 mb-2 text-xs">
				{' '}
				Bạn đã quét <span className="text-orange text-sm">
					{fields.length}
				</span>{' '}
				kiện
			</div>
			<DataTable
				{...{
					data: fields,
					columns
				}}
			/>
		</div>
	);
};
