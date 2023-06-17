import React, {useRef} from "react";
import {IconButton} from "~/components/globals/button/IconButton";
import {
	FilterInput,
	FilterRangeDate,
	FilterSelect,
} from "~/components/globals/filterBase";
import {outstockStatusData} from "~/configs/appConfigs";

const usernameProps = {
	placeholder: "Username",
	name: "username",
	id: "username",
};

type TProps = {
	handleFilter: (
		username: string,
		statusId: number,
		fromDate: string,
		toDate: string
	) => void;
	handleExportExcel: () => void;
};

export const IncomeSaleFilter: React.FC<TProps> = ({
	handleFilter,
	handleExportExcel,
}) => {
	const username = useRef<string>(null);
	const clientId = useRef<number>(null);
	const statusId = useRef<number>(null);
	const fromDate = useRef<string>(null);
	const toDate = useRef<string>(null);

	return (
		<div className="xl:grid xl:grid-cols-4 xl:gap-4 w-full mb-4">
			<div className="col-span-1 xl:mb-0 mb-4">
				<FilterInput
					{...usernameProps}
					handleSearch={(val: string) => (username.current = val)}
				/>
			</div>
			<div className="col-span-1 xl:mb-0 mb-4">
				<FilterSelect
					data={outstockStatusData}
					placeholder="Trạng thái"
					handleSearch={(val: number) => (statusId.current = val)}
				/>
			</div>
			<div className="col-span-1 xl:mb-0 mb-4">
				<FilterRangeDate
					format="DD/MM/YYYY"
					placeholder="Trạng thái"
					handleDate={(val: string[]) => {
						fromDate.current = val[0];
						toDate.current = val[1];
					}}
				/>
			</div>
			<div className="col-span-1 xl:mb-0 mb-4 flex justify-end">
				<IconButton
					onClick={() =>
						handleFilter(
							username.current,
							statusId.current,
							fromDate.current,
							toDate.current
						)
					}
					icon="fas fa-filter"
					title="Lọc"
					showLoading
					toolip="Lọc"
					btnClass="!mr-4"
				/>

				<IconButton
					title="Xuất"
					btnClass=""
					icon={"fas fa-file-export"}
					onClick={() => handleExportExcel()}
					showLoading
					toolip="Xuất Thống Kê"
				/>
			</div>
		</div>
	);
};
