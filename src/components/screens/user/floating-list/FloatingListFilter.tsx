import React, { useRef } from 'react';
import {
	FilterInput, FilterSelect,
	IconButton
} from '~/components';
import {
	smallPackageStatusData
} from '~/configs/appConfigs';

const codeProps = {
	id: 'code',
	name: 'code',
	placeholder: 'Mã vận đơn'
};

type TProps = {
	handleFilter: (SearchContent: string, Status: any) => void;
};

export const FloatingListFilter: React.FC<TProps> = ({ handleFilter }) => {
	const SearchContent = useRef<string>('');
	const Status = useRef<any>(null);
	return (
		<div className="">
			<div className="sm:grid sm:grid-cols-5 md:gap-4 gap-2 w-full">
				<div className="col-span-2 sm:mb-0 mb-4">
					<div className="col-span-1 sm:mb-0 mb-4">
						<FilterInput
							{...codeProps}
							handleSearch={(val: string) => (SearchContent.current = val)}
							placeholder={'Nhập mã vận đơn'}
						/>
					</div>
				</div>
				<div className="col-span-2 sm:mb-0 mb-4">
					<FilterSelect
						data={smallPackageStatusData}
						defaultValue={{"name": "Chọn trạng thái", "id": 0}}
						isClearable={true}
						placeholder="Trạng thái"
						handleSearch={(val: any) => (Status.current = val)}
					/>
				</div>
				<div className="col-span-1 text-right sm:mb-0 mb-4">
					<IconButton
						onClick={() => handleFilter(SearchContent.current, Status.current)}
						icon="far fa-search"
						title="Tìm kiếm"
						btnClass="!mr-2"
						showLoading
					/>
				</div>
			</div>
		</div>
	);
};
