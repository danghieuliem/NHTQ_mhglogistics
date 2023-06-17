import {TablePaginationConfig} from "antd";
import {SorterResult} from "antd/lib/table/interface";
import router, {useRouter} from "next/router";
import {useState} from "react";
import {useQuery} from "react-query";
import {payHelp} from "~/api";
import {toast} from "~/components";
import {controllerList, EPermission} from "~/configs";
import {defaultPagination, defaultSorter} from "~/configs/appConfigs";
import {selectIsAcceptRoles, useAppSelector} from "~/store";
import {_format} from "~/utils";
import RequestPaymentFilter from "./RequestPaymentFilter";
import RequestPaymentTable from "./RequestPaymentTable";

const PayHelp = () => {
	const {query} = useRouter();

	const [pagination, setPagination] = useState<TablePaginationConfig>(defaultPagination);
	const [sorter, setSorter] = useState<SorterResult<TRequestPaymentOrder>>(defaultSorter);

	const [SearchContent, setSearchContent] = useState<string>(null);
	const [FromDate, setFromDate] = useState<string>(null);
	const [ToDate, setToDate] = useState<string>(null);
	const [Status, setStatus] = useState<number>(0);

	const handleFilter = (SearchContent: string, FromDate: string, ToDate: string, Status: number) => {
		setSearchContent(SearchContent);
		setFromDate(FromDate);
		setToDate(ToDate);
		setStatus(Status);
	};

	const {isFetching, data, isLoading} = useQuery(
		[
			"requestPaymentData",
			{
				PageCurrent: pagination.current,
				PageSize: pagination.pageSize,
				FromDate,
				ToDate,
				Status,
				OrderBy: _format.getCurrentSorter(sorter),
				SearchContent,
				uid: +query?.id,
			},
		],
		() =>
			payHelp
				.getList({
					PageIndex: pagination.current,
					PageSize: pagination.pageSize,
					Status: Status > 0 ? Status : null,
					OrderBy: _format.getCurrentSorter(sorter),
					SearchContent,
					FromDate,
					ToDate,
					UID: +query?.id,
				})
				.then((res) => res.Data),
		{
			keepPreviousData: true,
			onSuccess: (data) => setPagination({...pagination, total: data?.TotalItem}),
			onError: toast.error,
			enabled: !!query?.id,
		}
	);

	const handleExporTExcel = async () => {
		try {
			const res = await payHelp.exportExcel({});
			router.push(`${res.Data}`);
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<>
			<div className="my-4">
				<RequestPaymentFilter handleFilter={handleFilter} handleExporTExcel={handleExporTExcel} />
			</div>
			<RequestPaymentTable
				loading={isFetching}
				data={data?.Items}
				pagination={pagination}
				handlePagination={(pagination, _, sorter) => {
					setPagination(pagination);
					setSorter(sorter);
				}}
			/>
		</>
	);
};

export default PayHelp;
