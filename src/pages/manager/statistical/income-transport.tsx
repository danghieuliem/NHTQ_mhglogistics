import {TablePaginationConfig} from "antd";
import router from "next/router";
import {useState} from "react";
import {useQuery} from "react-query";
import {reportTransportationOrder} from "~/api";
import {IncomeTransportFilter, IncomeTransportTable, Layout, toast} from "~/components";
import {breadcrumb, defaultPagination} from "~/configs";
import {SEOConfigs} from "~/configs/SEOConfigs";
import {TNextPageWithLayout} from "~/types/layout";

const Index: TNextPageWithLayout = () => {
	const [fromDate, setFromDate] = useState<string>(null);
	const [toDate, setToDate] = useState<string>(null);
	const [pagination, setPagination] = useState<TablePaginationConfig>(defaultPagination);
	const handleFilter = (fromDate: string, toDate: string) => {
		setFromDate(fromDate);
		setToDate(toDate);
		setPagination(defaultPagination);
	};

	const {data, isFetching} = useQuery(
		[
			"clientIncomeTransportReportData",
			{
				Current: pagination.current,
				PageSize: pagination.pageSize,
				fromDate,
				toDate,
			},
		],
		() =>
			reportTransportationOrder
				.getList({
					PageIndex: pagination.current,
					PageSize: pagination.pageSize,
					OrderBy: "Id desc",
					FromDate: fromDate,
					ToDate: toDate,
				})
				.then((res) => res.Data),
		{
			onSuccess: (data) => {
				setPagination({...pagination, total: data?.TotalItem});
			},
			onError: toast.error,
		}
	);

	const handleExportExcel = async () => {
		try {
			const res = await reportTransportationOrder.exportExcel({});
			router.push(res?.Data);
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<div className="bg-white rounded-3xl p-8 mb-4">
			<IncomeTransportFilter handleFilter={handleFilter} handleExportExcel={handleExportExcel} />
			<div className="mt-10">
				<IncomeTransportTable
					{...{
						data: data?.Items,
						pagination,
						handlePagination: (pagination) => setPagination(pagination),
						loading: isFetching,
					}}
				/>
			</div>
		</div>
	);
};

Index.displayName = SEOConfigs?.statistical?.depositRevenue;
Index.breadcrumb = breadcrumb.statistical.incomeTransport;
Index.Layout = Layout;

export default Index;
