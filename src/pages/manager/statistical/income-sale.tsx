import {TablePaginationConfig} from "antd";
import router from "next/router";
import {useState} from "react";
import {useQuery} from "react-query";
import {reportMainOrderRevenue} from "~/api";
import {IncomeSaleFilter, IncomeSaleOrderTable, IncomeSaleSum, Layout, toast} from "~/components";
import {breadcrumb, defaultPagination} from "~/configs";
import {SEOConfigs} from "~/configs/SEOConfigs";
import {TNextPageWithLayout} from "~/types/layout";

const Index: TNextPageWithLayout = () => {
	const [userName, setUserName] = useState<string>(null);
	const [status, setStatus] = useState<number>(null);
	const [fromDate, setFromDate] = useState<string>(null);
	const [toDate, setToDate] = useState<string>(null);
	const [pagination, setPagination] = useState<TablePaginationConfig>(defaultPagination);
	const [sumData, setSumData] = useState(null);

	const handleFilter = (userName: string, status: number, fromDate: string, toDate: string) => {
		setUserName(userName);
		setStatus(status);
		setFromDate(fromDate);
		setToDate(toDate);
		setPagination(defaultPagination);
	};

	const {data, isFetching} = useQuery(
		[
			"clientIncomeSaleReportData",
			{
				Current: pagination.current,
				PageSize: pagination.pageSize,
				userName,
				status,
				fromDate,
				toDate,
			},
		],
		() =>
			reportMainOrderRevenue
				.getList({
					PageIndex: pagination.current,
					PageSize: pagination.pageSize,
					OrderBy: "Id desc",
					FromDate: fromDate,
					ToDate: toDate,
					Type: 1,
					SearchContent: userName,
				})
				.then((res) => res.Data),
		{
			onSuccess: (data) => {
				setPagination({...pagination, total: data?.TotalItem});
				setSumData({
					MaxTotalPriceVND: data?.Items[0]?.MaxTotalPriceVND,
					MaxPriceVND: data?.Items[0]?.MaxPriceVND,
					MaxFeeBuyPro: data?.Items[0]?.MaxFeeBuyPro,
					MaxFeeShipCN: data?.Items[0]?.MaxFeeShipCN,
					MaxTQVNWeight: data?.Items[0]?.MaxTQVNWeight,
					MaxFeeWeight: data?.Items[0]?.MaxFeeWeight,
					MaxOrderFee: data?.Items[0]?.MaxOrderFee,
					MaxBargainMoney: data?.Items[0]?.MaxBargainMoney,
					MaxTotalOrder: data?.Items[0]?.MaxTotalOrder,
				});
			},
			onError: toast.error,
		}
	);

	const handleExportExcel = async () => {
		try {
			const res = await reportMainOrderRevenue.exportExcel({});
			router.push(`${res.Data}`);
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<div className="tableBox">
			<div className=" mx-4">
				<IncomeSaleFilter handleFilter={handleFilter} handleExportExcel={handleExportExcel} />
			</div>
			<div className="mx-4">
				<IncomeSaleSum data={sumData} />
			</div>
			<div className="mt-4">
				<IncomeSaleOrderTable
					{...{
						data: data?.Items,
						pagination,
						handlePagination: (pagination) => setPagination(pagination),
						loading: isFetching,
						type: "sale",
					}}
				/>
			</div>
		</div>
	);
};

Index.displayName = SEOConfigs?.statistical?.salesRevenue;
Index.breadcrumb = breadcrumb.statistical.incomeSale;
Index.Layout = Layout;

export default Index;
