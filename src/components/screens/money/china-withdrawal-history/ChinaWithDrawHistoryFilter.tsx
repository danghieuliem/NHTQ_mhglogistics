import React, { useRef } from 'react';
import { FilterInput, FilterSelect } from '~/components';
import { IconButton } from '~/components/globals/button/IconButton';
import { paymentStatusData } from '~/configs/appConfigs';

const usernameProps = {
	placeholder: 'Username',
	id: 'username',
	name: 'username'
};

type TProps = {
	handleFilter: (SearchContent: string, Status: number) => void;
};

export const ChinaWithDrawHistoryFilter: React.FC<TProps> = ({
	handleFilter
}) => {
	const SearchContent = useRef<string>(null);
	const Status = useRef<number>(null);

	return (
		<div className="xl:grid xl:grid-cols-3 xl:gap-4 w-full px-4 pb-4">
			<div className="col-span-1 xl:mb-0 mb-4">
				<FilterInput
					{...usernameProps}
					handleSearch={(val: string) => (SearchContent.current = val)}
				/>
			</div>
			<div className="col-span-1 xl:mb-0 mb-4">
				<FilterSelect
					data={paymentStatusData}
					defaultValue={paymentStatusData[0]}
					placeholder="Trạng thái"
					handleSearch={(val: number) => (Status.current = val)}
				/>
			</div>
			<div className="col-span-1 xl:mb-0 mb-4 flex justify-end">
				<IconButton
					onClick={() => handleFilter(SearchContent.current, Status.current)}
					icon="fas fa-filter"
					btnIconClass="!mr-2"
					title="Lọc"
					showLoading
					toolip="Lọc"
				/>
			</div>
		</div>
	);
};
