import React from 'react';
import { FilterInput } from '~/components';

const inputProps = {
	id: 'code',
	name: 'code',
	placeholder: 'Nhập mã bao hàng',
	label: 'Mã bao hàng'
};

type TProps = {
	handleFilter: (newFilter) => void;
};

export const PackageManagementFilter: React.FC<TProps> = ({ handleFilter }) => {
	return (
		<div className="max-w-[400px] pb-4">
			<FilterInput
				{...{
					...inputProps,
					handleSubmit: (val) => handleFilter({PageIndex: 1, SearchContent: val})
				}}
				allowClear={false}
			/>
		</div>
	);
};
