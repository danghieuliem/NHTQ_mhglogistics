import { Tooltip } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import { Button } from '~/components';

type TProps = {
	name: string;
	defaultValue: string;
	onClick: (val: string) => Promise<any>;
};

export const DepositStatisticNote: React.FC<TProps> = ({ name, defaultValue, onClick }) => {
	const value = React.useRef(null);

	return (
		<div className="flex flex-col items-center">
			<Tooltip placement="topRight" title={'Enter để cập nhật'}>
				<TextArea
					className="border border-[transparent] text-xs outline-0 block rounded-md p-2 bg-[#f8f6f6] text-black min-h-[60px] focus-visible:border-orange"
					id={name}
					rows={2}
					name={name}
					defaultValue={defaultValue}
					onChange={(e) => (value.current = e.target.value)}
					placeholder="Nhập ghi chú..."
					onPressEnter={() => onClick(value.current)}
				/>
			</Tooltip>
			{/* <Button showLoading title="Cập nhật" onClick={() => onClick(value.current)} btnClass="mt-2 !bg-orange h-8 w-[60%]" /> */}
		</div>
	);
};
