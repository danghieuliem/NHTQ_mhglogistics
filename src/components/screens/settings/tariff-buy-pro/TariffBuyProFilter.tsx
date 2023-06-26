import React from 'react';
import { FilterInput } from '~/components';

const inputProps = {
	id: 'code',
	name: 'code',
	placeholder: 'Nhập giá'
};

type TProps = {
	handleFilter: (SearchContent: string) => void;
};

export const TariffBuyProFilter: React.FC<TProps> = ({ handleFilter }) => {
	return (
		<div className="w-[300px] ml-auto">
			<FilterInput
				{...{
					...inputProps,
					handleSubmit: handleFilter,
				}}
			/>
		</div>
	);
};
