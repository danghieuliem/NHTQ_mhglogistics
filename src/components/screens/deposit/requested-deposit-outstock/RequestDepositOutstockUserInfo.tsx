import React from 'react';
import { Button, FilterInput } from '~/components';
import { IconButton } from '~/components/globals/button/IconButton';

const nameProps = {
	id: 'name',
	name: 'name',
	placeholder: 'Họ tên người nhận'
};

const phoneProps = {
	id: 'phone',
	name: 'phone',
	placeholder: 'Số điện thoại người nhận'
};

type TProps = {
	userName: string;
	userPhone: string;
	onReload: () => void;
};

export const RequestDepositOutstockUserInfo: React.FC<TProps> = ({
	onReload,
	userName,
	userPhone
}) => {
	return (
		<div className="grid grid-cols-3 gap-4 max-w-[900px]">
			<div className="col-span-1">
				<FilterInput
					handleSearch={() => null}
					{...nameProps}
					defaultValue={userName}
				/>
			</div>
			<div className="col-span-1">
				<FilterInput
					handleSearch={() => null}
					{...phoneProps}
					defaultValue={userPhone}
				/>
			</div>
			<div className="col-span-1">
				<IconButton
					title=""
					btnClass=""
					onClick={onReload}
					icon={'fas fa-sync-alt'}
					toolip={'Reload'}
					btnIconClass="!mr-0"
				/>
			</div>
		</div>
	);
};
