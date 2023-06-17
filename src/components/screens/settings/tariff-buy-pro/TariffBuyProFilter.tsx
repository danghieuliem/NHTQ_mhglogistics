import React, { useRef } from 'react';
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
		<div className="max-w-[400px] pb-4">
			<FilterInput
				{...{
					...inputProps,
					handleSubmit: handleFilter,
				}}
			/>
		</div>
	);
};
