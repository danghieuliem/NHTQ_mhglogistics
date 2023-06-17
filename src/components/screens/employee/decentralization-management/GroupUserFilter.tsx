import React, { FC, useRef } from 'react';
import { FilterSelect } from '~/components';

export const GroupUserFilter: FC = () => {
	const UserGroup = useRef<number>(null);
	return (
		<div>
			<FilterSelect
				data={undefined}
				defaultValue={undefined}
				placeholder="Nhóm User"
				handleSearch={(val: number) => (UserGroup.current = val)}
			/>
		</div>
	);
};
