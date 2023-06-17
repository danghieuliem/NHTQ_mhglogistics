import React, { useState } from 'react';
import { Transfer, Switch, Table, Tag } from 'antd';
import difference from 'lodash/difference';
import type { TransferItem, TransferProps } from 'antd/es/transfer';
import type { ColumnsType, TableRowSelection } from 'antd/es/table/interface';

interface RecordType {
	key: string;
	title: string;
	description: string;
	disabled: boolean;
	tag: string;
}

interface DataType {
	title: string;
	tag: string;
	description: string;
}

// Customize Table Transfer

interface TableTransferProps extends TransferProps<TransferItem> {
	dataSource: DataType[];
	leftColumns: ColumnsType<DataType>;
	rightColumns: ColumnsType<DataType>;
}

export const TableTransfer = ({
	leftColumns,
	rightColumns,
	...restProps
}: TableTransferProps) => (
	<Transfer {...restProps}>
		{({
			direction,
			filteredItems,
			onItemSelectAll,
			onItemSelect,
			selectedKeys: listSelectedKeys,
			disabled: listDisabled
		}) => {
			const columns = direction === 'left' ? leftColumns : rightColumns;

			const rowSelection: TableRowSelection<TransferItem> = {
				getCheckboxProps: (item) => ({
					disabled: listDisabled || item.disabled
				}),
				onSelectAll(selected, selectedRows) {
					const treeSelectedKeys = selectedRows
						.filter((item) => !item.disabled)
						.map(({ key }) => key);
					const diffKeys = selected
						? difference(treeSelectedKeys, listSelectedKeys)
						: difference(listSelectedKeys, treeSelectedKeys);
					onItemSelectAll(diffKeys as string[], selected);
				},
				onSelect({ key }, selected) {
					onItemSelect(key as string, selected);
				},
				selectedRowKeys: listSelectedKeys
			};

			return (
				<Table
					rowSelection={rowSelection}
					columns={columns}
					dataSource={filteredItems}
					size="small"
					style={{ pointerEvents: listDisabled ? 'none' : undefined }}
					onRow={({ key, disabled: itemDisabled }) => ({
						onClick: () => {
							if (itemDisabled || listDisabled) return;
							onItemSelect(
								key as string,
								!listSelectedKeys.includes(key as string)
							);
						}
					})}
				/>
			);
		}}
	</Transfer>
);
