import React, {useRef} from "react";
import {FilterRangeDate} from "~/components";
import {IconButton} from "~/components/globals/button/IconButton";

type TProps = {
	handleFilter: (newFilter) => void;
};

export const TransactionFilter: React.FC<TProps> = ({handleFilter}) => {
	const fromDate = useRef<string>(null);
	const toDate = useRef<string>(null);

	return (
		<div className="flex flex-wrap mb-4 items-end">
			<div className="max-w-xl w-full">
				<FilterRangeDate
					placeholder="Từ ngày/đến ngày"
					handleDate={(val: string[]) => {
						fromDate.current = val[0];
						toDate.current = val[1];
					}}
				/>
			</div>
			<IconButton
				icon="far fa-info-square"
				btnIconClass="!mr-2"
				title="Xem thống kê"
				onClick={() =>
					handleFilter({
						FromDate: fromDate.current,
						ToDate: toDate.current,
					})
				}
				btnClass={"lg:ml-4 mt-4 lg:mt-0"}
				toolip=""
			/>
		</div>
	);
};
