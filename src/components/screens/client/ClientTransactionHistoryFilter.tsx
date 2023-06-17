import {FC, useRef} from "react";
import {FilterRangeDate, FilterSelect} from "~/components";
import {IconButton} from "~/components/globals/button/IconButton";
import {categoryPaymentData, transactionData} from "~/configs/appConfigs";

type TProps = {
	handleFilter: (newFilter) => void;
	handleExportExcel: () => void;
};

export const ClientTransactionHistoryFilter: FC<TProps> = ({handleFilter, handleExportExcel}) => {
	const fromDate = useRef<string>(null);
	const toDate = useRef<string>(null);
	const transactionId = useRef<number>(null);

	return (
		<div className="lg:grid grid-cols-3 gap-4 mb-4">
			<div className="col-span-1 mb-4 lg:mb-0">
				<FilterRangeDate
					handleDate={(val: string[]) => {
						fromDate.current = val[0];
						toDate.current = val[1];
					}}
					placeholder="Từ ngày / đến ngày"
					format="DD/MM/YYYY"
				/>
			</div>
			<div className="col-span-1 mb-4 lg:mb-0">
				<FilterSelect
					data={categoryPaymentData}
					// defaultValue={transactionData[0]}
					placeholder="Chọn loại giao dịch"
					label="Loại giao dịch"
					handleSearch={(val: number) => (transactionId.current = val)}
				/>
			</div>
			<div className="col-span-1 flex justify-between items-end">
				<IconButton
					onClick={() =>
						handleFilter({
							fromDate: fromDate.current,
							toDate: toDate.current,
							status: transactionId.current,
						})
					}
					icon="fas fa-filter"
					title="Lọc"
					btnIconClass="!mr-2"
					showLoading
					toolip="Lọc"
					btnClass="!mr-4"
				/>
				<IconButton
					onClick={handleExportExcel}
					icon="fas fa-file-export"
					btnIconClass="!mr-2"
					title="Xuất"
					showLoading
					toolip="Xuất Thống Kê"
				/>
			</div>
		</div>
	);
};
