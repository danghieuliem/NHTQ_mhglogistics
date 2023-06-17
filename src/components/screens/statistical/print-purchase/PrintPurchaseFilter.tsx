import clsx from 'clsx';
import React, { useRef } from 'react';
import { IconButton } from '~/components/globals/button/IconButton';
import { Button } from '~/components/globals/button/PrimaryButton';
import {
	FilterInput,
	FilterInputNumber,
	FilterRangeDate,
	FilterSelect
} from '~/components/globals/filterBase';
import { outstockStatusData } from '~/configs/appConfigs';

const usernameProps = {
	placeholder: 'Username',
	name: 'username',
	id: 'username'
};

const clientIdProps = {
	placeholder: 'Mã khách hàng',
	name: 'clientId',
	id: 'clientId'
};

const orderIdProps = {
	placeholder: 'Mã đơn hàng',
	name: 'orderId',
	id: 'orderId'
};

type TProps = {
	handleFilter: (
		username: string,
		clientId: number,
		orderId: number,
		statusId: number,
		fromDate: string,
		toDate: string
	) => void;
};

export const PrintPurchaseFilter: React.FC<TProps> = ({ handleFilter }) => {
	const username = useRef<string>(null);
	const clientId = useRef<number>(null);
	const orderId = useRef<number>(null);
	const statusId = useRef<number>(null);
	const fromDate = useRef<string>(null);
	const toDate = useRef<string>(null);

	return (
		<div className="xl:grid xl:grid-cols-6 xl:gap-4 mb-4 w-full">
			<div className="col-span-1 xl:mb-0 mb-4">
				<FilterInput
					{...usernameProps}
					handleSearch={(val) => (username.current = val)}
				/>
			</div>
			<div className="col-span-1 xl:mb-0 mb-4">
				<FilterInputNumber
					{...clientIdProps}
					handleSearch={(val) => (clientId.current = val)}
				/>
			</div>
			<div className="col-span-1 xl:mb-0 mb-4">
				<FilterInputNumber
					{...orderIdProps}
					handleSearch={(val) => (orderId.current = val)}
				/>
			</div>
			<div className="col-span-1 xl:mb-0 mb-4">
				<FilterSelect
					data={outstockStatusData}
					placeholder="Trạng thái"
					handleSearch={(val: number) => (statusId.current = val)}
				/>
			</div>
			<div className="col-span-1 xl:mb-0 mb-4">
				<FilterRangeDate
					format="DD/MM/YYYY"
					placeholder="Trạng thái"
					handleDate={(val: string[]) => {
						fromDate.current = val[0];
						toDate.current = val[1];
					}}
				/>
			</div>
			<div className="col-span-1 xl:mb-0 mb-4 flex justify-end">
				<IconButton
					onClick={() =>
						handleFilter(
							username.current,
							clientId.current,
							orderId.current,
							statusId.current,
							fromDate.current,
							toDate.current
						)
					}
					icon="fas fa-filter"
					title="Lọc"
					showLoading
					toolip="Lọc"
				/>
			</div>
		</div>
	);
};
