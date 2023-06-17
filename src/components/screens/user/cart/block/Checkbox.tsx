import React from 'react';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

type TProps = {
	defaultChecked: boolean;
	label: string;
	onChange: (e: CheckboxChangeEvent, type: 'IsPacked' | 'IsFastDelivery' | 'IsInsurrance' | 'IsCheckProduct') => Promise<void>;
};

const Index: React.FC<TProps> = ({ defaultChecked, onChange, label }) => {
	const [checked, setChecked] = React.useState(defaultChecked);

	return (
		<Checkbox
			checked={checked}
			onChange={(e) => {
				setChecked((checked) => !checked);
				onChange(e, 'IsFastDelivery').catch(() => {
					setChecked((checked) => !checked);
				});
			}}
		>
			{label}
		</Checkbox>
	);
};

export default Index;
