import React, { useRef } from 'react';
import { FilterInput, FilterSelect } from '~/components';
import { IconButton } from '~/components/globals/button/IconButton';
import { FilterRangeDate } from '~/components/globals/filterBase';
import { EPaymentData, paymentData } from '~/configs/appConfigs';

const usernameProps = {
	id: 'username',
	name: 'username',
	placeholder: 'Username'
};

const codeProps = {
	id: 'code',
	name: 'code',
	placeholder: 'Mã vận đơn'
};

type TProps = {
	handleFilter: (
		UserName: string,
		OrderTransactionCode: string,
		FromDate: string,
		ToDate: string,
		Status: EPaymentData
	) => void;
};

export const DepositStatisticFilter: React.FC<TProps> = ({ handleFilter }) => {
	const UserName = useRef<string>(null);
	const OrderTransactionCode = useRef<string>(null);
	const FromDate = useRef<string>(null);
	const ToDate = useRef<string>(null);
	const Status = useRef<EPaymentData>(null);

	return (
		<div className="xl:grid xl:grid-cols-5 xl:gap-4 w-full px-4 pb-4">
			<div className="col-span-1 xl:mb-0 mb-4">
				<FilterInput
					{...usernameProps}
					handleSearch={(val: string) => (UserName.current = val)}
				/>
			</div>
			<div className="col-span-1 xl:mb-0 mb-4">
				<FilterInput
					{...codeProps}
					handleSearch={(val: string) => (OrderTransactionCode.current = val)}
				/>
			</div>
			<div className="col-span-1 xl:mb-0 mb-4">
				<FilterRangeDate
					handleDate={(val: string[]) => {
						FromDate.current = val[0];
						ToDate.current = val[1];
					}}
					placeholder="Từ ngày / đến ngày"
				/>
			</div>
			<div className="col-span-1 xl:mb-0 mb-4">
				<FilterSelect
					data={paymentData.slice(0, 3)}
					placeholder="Trạng thái"
					handleSearch={(val: EPaymentData) => (Status.current = val)}
				/>
			</div>
			<div className="col-span-1 xl:text-right text-left xl:mb-0 mb-4">
				<IconButton
					onClick={() =>
						handleFilter(
							UserName.current,
							OrderTransactionCode.current,
							FromDate.current,
							ToDate.current,
							Status.current
						)
					}
					title="Lọc"
					icon="fas fa-filter"
					showLoading
					toolip="Lọc"
				/>
			</div>
		</div>
	);
};
