import React, { useRef } from 'react';
import { FilterRangeDate } from '~/components';
import { IconButton } from '~/components/globals/button/IconButton';

type TProps = {
	handleFilter: (fromDate: string, toDate: string) => void;
};

export const StatisticalMoneyFilter: React.FC<TProps> = ({ handleFilter }) => {
	const fromDate = useRef<string>(null);
	const toDate = useRef<string>(null);

	return (
		<div className="xl:grid grid-cols-3 gap-4 mb-4">
			<div className="col-span-1">
				<FilterRangeDate
					placeholder="Từ ngày/đến ngày"
					handleDate={(val: string[]) => {
						fromDate.current = val[0];
						toDate.current = val[1];
					}}
				/>
			</div>
			<div className="col-span-1 mt-4 xl:mt-0">
				<IconButton
					onClick={() => handleFilter(fromDate.current, toDate.current)}
					btnClass=""
					icon="fas fa-filter"
					title="Lọc"
					showLoading
					toolip={''}
				/>
			</div>
		</div>
	);
};
