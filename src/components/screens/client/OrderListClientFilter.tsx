import React, {useRef} from "react";
import {FilterCheckbox, FilterInput, FilterInputNumber, FilterRangeDate, FilterSelect} from "~/components";
import {IconButton} from "~/components/globals/button/IconButton";
import {searchData, statusData} from "~/configs/appConfigs";

const codeProps = {
	id: "code",
	placeholder: "Nhập thông tin tìm kiếm",
	label: "Mã đơn hàng / vận đơn / tên sản phẩm",
	name: "code",
};

const fromPriceProps = {
	id: "fromPrice",
	placeholder: "Giá từ",
	label: "Nhập giá từ",
	name: "fromPrice",
};

const toPriceProps = {
	id: "toPrice",
	placeholder: "Giá đến",
	label: "Nhập giá đến",
	name: "toPrice",
};

type TProps = {
	handleFilter: (
		searchId: number,
		code: string,
		fromDate: string,
		toDate: string,
		fromPrice: number,
		toPrice: number,
		statusIds: number[],
		orderHasnotCode: boolean
	) => void;
	handleExporTExcel: () => void;
};

export const OrderListClientFilter: React.FC<TProps> = ({handleFilter, handleExporTExcel}) => {
	const searchId = useRef<number>(null);
	const code = useRef("");
	const fromDate = useRef<string>(null);
	const toDate = useRef<string>(null);
	const fromPrice = useRef<number>(null);
	const toPrice = useRef<number>(null);
	const statusIds = useRef<number[]>(null);
	const orderHasnotCode = useRef(false);

	return (
		<div className="lg:grid grid-cols-3 gap-4 mb-4 mt-6">
			<div className="col-span-1 mb-4 lg:mb-0">
				<FilterSelect
					data={searchData}
					placeholder="Chọn ..."
					label="Tìm kiếm theo"
					defaultValue={searchData[0]}
					handleSearch={(val: number) => (searchId.current = val)}
				/>
			</div>
			<div className="col-span-1 mb-4 lg:mb-0">
				<FilterInput
					{...{
						...codeProps,
						handleSearch: (val: string) => (code.current = val),
					}}
				/>
			</div>
			<div className="col-span-1 mb-4 lg:mb-0">
				<FilterRangeDate
					placeholder="Từ ngày - đến ngày"
					handleDate={(val: string[]) => {
						fromDate.current = val[0];
						toDate.current = val[1];
					}}
				/>
			</div>
			<div className="col-span-1 mb-4 lg:mb-0">
				<FilterInputNumber
					{...{
						...fromPriceProps,
						handleSearch: (val: number) => (fromPrice.current = val),
					}}
				/>
			</div>
			<div className="col-span-1 mb-4 lg:mb-0">
				<FilterInputNumber
					{...{
						...toPriceProps,
						handleSearch: (val: number) => (toPrice.current = val),
					}}
				/>
			</div>
			<div className="col-span-1 mb-4 lg:mb-0">
				<FilterSelect
					closeMenuOnSelect={false}
					isMulti
					data={statusData}
					placeholder=""
					label="Tìm kiếm theo"
					defaultValue={statusData[0]}
					handleSearch={(val: number[]) => (statusIds.current = val)}
				/>
			</div>
			<div className="col-span-3 lg:flex items-center justify-end">
				<FilterCheckbox
					label="Đơn không có mã vận đơn"
					onChange={() => (orderHasnotCode.current = !orderHasnotCode.current)}
				/>
				<IconButton
					onClick={() =>
						handleFilter(
							searchId.current,
							code.current,
							fromDate.current,
							toDate.current,
							fromPrice.current,
							toPrice.current,
							statusIds.current,
							orderHasnotCode.current
						)
					}
					btnClass={"!mr-2 my-4 lg:my-0"}
					btnIconClass="!mr-2"
					icon="fas fa-filter"
					title="Lọc"
					toolip="Lọc kết quả"
				/>
				<IconButton
					onClick={() => handleExporTExcel()}
					btnIconClass="!mr-2"
					icon="fas fa-chart-line"
					title="Xuất"
					showLoading
					toolip="Xuất thống kê"
				/>
			</div>
		</div>
	);
};
