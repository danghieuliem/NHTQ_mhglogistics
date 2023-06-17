import { Space, Tag } from 'antd';
import Link from 'next/link';
import React from 'react';
import { ActionButton, DataTable } from '~/components';
import { TColumnsType } from '~/types/table';
import { _format } from '~/utils';

export const ChinaRechargeHistoryTable = () => {
	const columns: TColumnsType<TMoneyChinaRechargeHistory> = [
		{
			dataIndex: 'id',
			title: 'ID',
			align: 'center'
		},
		{
			dataIndex: 'username',
			key: 'username',
			title: 'Username',
			align: 'center'
		},
		{
			dataIndex: 'sendCash',
			key: 'sendCash',
			title: 'Số tiền nạp',
			align: 'center'
		},
		{
			dataIndex: 'status',
			key: 'status',
			title: 'Trạng thái',
			align: 'center',
			render: (status, record) => (
				<Tag color={status === 1 ? '#388E3C' : '#D32F2F'}>Đã duyệt</Tag>
			)
		},
		{
			dataIndex: 'createdAt',
			key: 'createdAt',
			title: 'Ngày tạo',
			align: 'center',
			render: (date) => _format.getShortVNDate(date)
		},
		{
			dataIndex: 'createdBy',
			key: 'createdBy',
			title: 'Người tạo',
			align: 'center'
		},

		{
			dataIndex: 'approvedBy',
			key: 'approvedBy',
			title: 'Người duyệt',
			align: 'center'
		},

		{
			dataIndex: 'approvedDate',
			key: 'approvedDate',
			title: 'Ngày duyệt',
			align: 'center',
			render: (date) => _format.getShortVNDate(date)
		},

		{
			dataIndex: 'action',
			key: 'action',
			title: 'Thao tác',
			align: 'center',
			render: (_, record) => (
				<Space>
					<Link href={`/manager/employee/bonus-management/${record.id}`} replace>
						<a>
							<ActionButton
								onClick={undefined}
								icon="fad fa-edit"
								title="Cập nhật"
							/>
						</a>
					</Link>
				</Space>
			)
		}
	];

	const data: TMoneyChinaRechargeHistory[] = [
		{
			id: 12,
			username: 'khanhchi',
			status: 1,
			sendCash: 1000,
			createdAt: new Date(2021, 1, 18, 10, 12, 13),
			createdBy: 'admin',
			approvedBy: 'admin',
			approvedDate: new Date(2021, 1, 18, 10, 12, 13)
		},
		{
			id: 12,
			username: 'khanhchi',
			status: 1,
			sendCash: 1000,
			createdAt: new Date(2021, 1, 18, 10, 12, 13),
			createdBy: 'admin',
			approvedBy: 'admin',
			approvedDate: new Date(2021, 1, 18, 10, 12, 13)
		},
		{
			id: 12,
			username: 'khanhchi',
			status: 1,
			sendCash: 1000,
			createdAt: new Date(2021, 1, 18, 10, 12, 13),
			createdBy: 'admin',
			approvedBy: 'admin',
			approvedDate: new Date(2021, 1, 18, 10, 12, 13)
		},
		{
			id: 12,
			username: 'khanhchi',
			status: 1,
			sendCash: 1000,
			createdAt: new Date(2021, 1, 18, 10, 12, 13),
			createdBy: 'admin',
			approvedBy: 'admin',
			approvedDate: new Date(2021, 1, 18, 10, 12, 13)
		}
	];

	return (
		<DataTable
			{...{
				columns,
				data,
				bordered: true
			}}
		/>
	);
};
