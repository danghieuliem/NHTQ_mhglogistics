import {TablePaginationConfig} from "antd";
import React, {useState} from "react";
import {useQuery} from "react-query";
import {outStockSessionReport} from "~/api";
import {
	breadcrumb,
	controllerList,
	defaultPagination,
	EPermission,
} from "~/configs";
import {
	Layout,
	PrintPurchaseTable,
	PrintPurchaseFilter,
	showToast,
	AuthContainer,
} from "~/components";
import {SEOConfigs} from "~/configs/SEOConfigs";
import {TNextPageWithLayout} from "~/types/layout";
import {selectIsAcceptRoles, useAppSelector} from "~/store";

const Index: TNextPageWithLayout = () => {
	const [pagination, setPagination] =
		useState<TablePaginationConfig>(defaultPagination);
	const [username, setUsername] = useState<string>(null);
	const [clientId, setClientId] = useState<number>(null);
	const [orderId, setOrderId] = useState<number>(null);
	const [statusId, setStatusId] = useState<number>(null);
	const [fromDate, setFromDate] = useState<string>(null);
	const [toDate, setToDate] = useState<string>(null);

	const handleFilter = (
		username: string,
		clientId: number,
		orderId: number,
		statusId: number,
		fromDate: string,
		toDate: string
	) => {
		setUsername(username);
		setClientId(clientId);
		setOrderId(orderId);
		setStatusId(statusId);
		setFromDate(fromDate);
		setToDate(toDate);
		setPagination(defaultPagination);
	};
	const canViewAllOutStockSessionReport = useAppSelector(
		selectIsAcceptRoles({
			controller: controllerList.OutStockSessionReport,
			permissionsRequired: [EPermission.ViewAll],
		})
	);
	const {
		data: outStockReportData,
		isFetching,
		isError,
	} = useQuery(
		[
			"clientRechargeData",
			{
				Current: pagination.current,
				PageSize: pagination.pageSize,
				username,
				fromDate,
				toDate,
				statusId,
			},
		],
		() =>
			outStockSessionReport
				.getList({
					PageIndex: pagination.current,
					PageSize: pagination.pageSize,
					OrderBy: "Id desc",
					SearchContent: username,
					FromDate: fromDate,
					ToDate: toDate,
					Status: statusId,
				})
				.then((res) => res.Data),
		{
			onSuccess: (data) =>
				setPagination({...pagination, total: data?.TotalItem}),
			onError: (error) =>
				showToast({
					title: (error as any)?.response?.data?.ResultCode,
					message: (error as any)?.response?.data?.ResultMessage,
					type: "error",
				}),
			enabled: canViewAllOutStockSessionReport,
		}
	);

	return (
		<div className="tableBox !pb-0 !rounded-b-none ">
			<div className="px-4 ">
				<PrintPurchaseFilter handleFilter={handleFilter} />
			</div>
			<PrintPurchaseTable
				data={outStockReportData?.Items}
				loading={isFetching}
				pagination={pagination}
				handlePagination={setPagination}
			/>
		</div>
	);
};

Index.displayName = SEOConfigs.statistical.printPurchaseVoucher;
Index.breadcrumb = breadcrumb.statistical.printPurchase.main;
Index.Layout = Layout;

export default Index;
