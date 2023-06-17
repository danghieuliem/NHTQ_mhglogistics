import clsx from 'clsx';
import React, { useRef } from 'react';
import { FilterRangeDate } from '~/components';
import { IconButton } from '~/components/globals/button/IconButton';
import { Button } from '~/components/globals/button/PrimaryButton';

type TProps = {
	handleFilter: (fromDate: string, toDate: string) => void;
	handleExportExcel: () => void;
};

export const IncomeTransportFilter: React.FC<TProps> = ({
	handleFilter,
	handleExportExcel
}) => {
	const fromDate = useRef<string>(null);
	const toDate = useRef<string>(null);

	return (
		<div className="flex flex-wrap mb-4">
			<div className="max-w-xl w-full">
				<FilterRangeDate
					placeholder="Từ ngày/đến ngày"
					handleDate={(val: string[]) => {
						fromDate.current = val[0];
						toDate.current = val[1];
					}}
				/>
			</div>
			<IconButton
				onClick={() => handleFilter(fromDate.current, toDate.current)}
				btnClass="ml-0 xl:ml-4 xl:mt-0 mt-4"
				icon="far fa-info-square"
				title="Xem thống kê"
				showLoading
				toolip=""
			/>
		</div>
	);
};
