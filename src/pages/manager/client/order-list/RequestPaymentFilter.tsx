import {FC, useRef} from "react";
import {IconButton} from "~/components/globals/button/IconButton";
import {FilterRangeDate, FilterSelect} from "~/components/globals/filterBase";
import {paymentData} from "~/configs/appConfigs";

type TProps = {
	handleFilter: (UserName: string, FromDate: string, ToDate: string, Status: number) => void;
	handleExporTExcel: () => void;
};

const RequestPaymentFilter: FC<TProps> = ({handleFilter, handleExporTExcel}) => {
	const UserName = useRef<string>(null);
	const FromDate = useRef<string>(null);
	const ToDate = useRef<string>(null);
	const Status = useRef<number>(null);

	return (
		<div className="xl:grid xl:grid-cols-4 xl:gap-4 w-full">
			<div className="col-span-1 xl:pb-0 pb-4">
				<FilterRangeDate
					placeholder="Từ ngày / đến ngày"
					format="DD/MM/YYYY"
					handleDate={(val: string[]) => {
						FromDate.current = val[0];
						ToDate.current = val[1];
					}}
				/>
			</div>
			<div className="col-span-1 xl:pb-0 pb-4">
				<FilterSelect
					data={paymentData}
					defaultValue={paymentData[0]}
					placeholder="Trạng thái"
					label="Lọc theo trạng thái"
					handleSearch={(val: number) => (Status.current = val)}
				/>
			</div>
			<div className="col-span-2 xl:pb-0 flex justify-between items-end">
				<IconButton
					onClick={() => handleFilter(UserName.current, FromDate.current, ToDate.current, Status.current)}
					icon="fas fa-filter"
					btnClass="!mr-4"
					title="Lọc"
					showLoading
					toolip="Lọc"
				/>

				<IconButton
					onClick={() => handleExporTExcel()}
					btnClass=""
					icon="fas fa-file-export"
					title="Xuất"
					showLoading
					toolip="Xuất thống kê"
					green
				/>
			</div>
		</div>
	);
};

export default RequestPaymentFilter;
