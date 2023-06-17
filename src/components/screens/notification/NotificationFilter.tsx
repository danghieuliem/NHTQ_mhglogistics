import moment from "moment";
import {FC, useRef} from "react";
import {FilterRangeDate, IconButton} from "~/components";

type TProps = {
	handleFilter: (newFilter) => void;
	isFetching?: boolean;
};

export const NotificationFilter: FC<TProps> = ({handleFilter, isFetching}) => {
	const FromDate = useRef<string>(null);
	const ToDate = useRef<string>(null);

	async function handleTransformDate(isToday: boolean = false) {
		if (!handleFilter) return;
		if (!isToday) {
			handleFilter({
				FromDate: FromDate.current,
				ToDate: ToDate.current,
			});
			return;
		}

		const now = moment().format("YYYY-MM-DD");
		handleFilter({
			FromDate: now,
			ToDate: now,
		});
	}

	return (
		<div className="xl:flex w-fit items-end">
			<div className="mr-4 mb-4 xl:mb-0 w-[400px]">
				<FilterRangeDate
					disabled={isFetching}
					format="DD/MM/YYYY"
					placeholder="Từ ngày / đến ngày"
					handleDate={(val: string[]) => {
						FromDate.current = val[0];
						ToDate.current = val[1];
					}}
				/>
			</div>
			<div>
				<IconButton
					icon="fas fa-search"
					title="Tìm?"
					onClick={handleTransformDate}
					showLoading
					toolip=""
					disabled={isFetching}
				/>
			</div>
			<div className="ml-4">
				<IconButton
					icon="far fa-info-square"
					title="Lọc hôm nay"
					onClick={() => {
						handleTransformDate(true);
					}}
					showLoading
					toolip=""
					disabled={isFetching}
				/>
			</div>
		</div>
	);
};

export default NotificationFilter;
