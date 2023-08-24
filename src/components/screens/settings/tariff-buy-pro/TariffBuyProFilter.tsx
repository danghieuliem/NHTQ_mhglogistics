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
		<div className="max-w-[300px]">
			<FilterInput
				{...{
					...inputProps,
					handleSubmit: handleFilter,
				}}
			/>
		</div>
	);
};
