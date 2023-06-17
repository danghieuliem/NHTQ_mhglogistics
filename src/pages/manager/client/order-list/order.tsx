import {TablePaginationConfig} from "antd";
import router, {useRouter} from "next/router";
import {useState} from "react";
import {useQuery} from "react-query";
import {mainOrder} from "~/api";
import {NotFound, OrderListClientFilter, OrderListClientTable, toast} from "~/components";
import {controllerList, defaultPagination, EPermission} from "~/configs";
import {selectIsAcceptRoles, useAppSelector} from "~/store";

const Order = () => {
	const {query} = useRouter();

	const [pagination, setPagination] = useState<TablePaginationConfig>(defaultPagination);
	const [searchId, setSearchId] = useState<number>(null);
	const [code, setCode] = useState<string>("");
	const [fromDate, setFromDate] = useState<string>(null);
	const [toDate, setToDate] = useState<string>(null);
	const [fromPrice, setFromPrice] = useState<number>(null);
	const [toPrice, setToPrice] = useState<number>(null);
	const [statusIds, setStatusIds] = useState<number[]>(null);
	const [orderHasnotCode, setOrderHasnotCode] = useState(false);

	const handleFilter = (
		searchId: number,
		code: string,
		fromDate: string,
		toDate: string,
		fromPrice: number,
		toPrice: number,
		statusIds: number[],
		orderHasnotCode: boolean
	) => {
		setSearchId(searchId);
		setCode(code);
		setFromDate(fromDate);
		setToDate(toDate);
		setFromPrice(fromPrice);
		setToPrice(toPrice);
		setStatusIds(statusIds);
		setOrderHasnotCode(orderHasnotCode);
	};

	const {
		data: userOrderData,
		isLoading,
		isError,
	} = useQuery(
		[
			"clientOrderData",
			{
				Current: pagination.current,
				PageSize: pagination.pageSize,
				uid: +query?.id,
				searchId,
				code,
				fromDate,
				toDate,
				fromPrice,
				toPrice,
				statusIds, // không thấy trên api
				orderHasnotCode,
			},
		],
		() =>
			mainOrder
				.getList({
					PageIndex: pagination.current,
					PageSize: pagination.pageSize,
					OrderBy: "Id desc",
					UID: +query?.id,
					TypeSearch: searchId,
					OrderType: null,
					FromDate: fromDate,
					ToDate: toDate,
					FromPrice: toPrice,
					ToPrice: toPrice,
					IsNotMainOrderCode: orderHasnotCode, //Lỗi serverP
				})
				.then((res) => res.Data),
		{
			onSuccess: (data) => setPagination({...pagination, total: data?.TotalItem}),
			onError: toast.error,
			enabled: !!query?.id,
		}
	);

	const handleExporTExcel = async () => {
		try {
			const res = await mainOrder.exportExcel({
				UID: +query?.id,
			});
			router.push(`${res.Data}`);
		} catch (error) {
			toast.error(error);
		}
	};

	if (isError) return <NotFound />;

	return (
		<div className="">
			<div className="px-4">
				<OrderListClientFilter handleFilter={handleFilter} handleExporTExcel={handleExporTExcel} />
			</div>
			<OrderListClientTable
				{...{
					data: userOrderData?.Items,
					pagination,
					handlePagination: (pagination) => setPagination(pagination),
					loading: isLoading,
				}}
			/>
		</div>
	);
};

export default Order;
