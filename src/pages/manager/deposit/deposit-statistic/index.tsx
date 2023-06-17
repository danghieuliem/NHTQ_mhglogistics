import {TablePaginationConfig} from "antd";
import {useState} from "react";
import {breadcrumb, controllerList, EPermission} from "~/configs";

import {useMutation, useQuery, useQueryClient} from "react-query";
import {exportRequestTurn} from "~/api";
import {
	DepositStatisticFilter,
	DepositStatisticTable,
	Layout,
	toast,
} from "~/components";
import {defaultPagination, EPaymentData} from "~/configs/appConfigs";
import {SEOConfigs} from "~/configs/SEOConfigs";
import {selectIsAcceptRoles, useAppSelector} from "~/store";
import {TNextPageWithLayout} from "~/types/layout";

const Index: TNextPageWithLayout = () => {
	const [UserName, setUserName] = useState<string>(null);
	const [OrderTransactionCode, setOrderTransactionCode] =
		useState<string>(null);
	const [FromDate, setFromDate] = useState<string>(null);
	const [ToDate, setToDate] = useState<string>(null);
	const [Status, setStatus] = useState<EPaymentData>(null);

	const handleFilter = (
		UserName: string,
		OrderTransactionCode: string,
		FromDate: string,
		ToDate: string,
		Status: EPaymentData
	) => {
		setUserName(UserName);
		setOrderTransactionCode(OrderTransactionCode);
		setFromDate(FromDate);
		setToDate(ToDate);
		setStatus(Status);
	};

	const [pagination, setPagination] =
		useState<TablePaginationConfig>(defaultPagination);

	const canViewExportRequestTurn = useAppSelector(
		selectIsAcceptRoles({
			controller: controllerList.ExportRequestTurn,
			permissionsRequired: [EPermission.ViewAll],
		})
	);

	const {isFetching, data} = useQuery(
		[
			"statisticalDepositList",
			{
				Current: pagination.current,
				PageSize: pagination.pageSize,
				UserName,
				OrderTransactionCode,
				FromDate,
				ToDate,
				Status,
			},
		],
		() =>
			exportRequestTurn
				.getList({
					PageIndex: pagination.current,
					PageSize: pagination.pageSize,
					UserName,
					OrderTransactionCode,
					FromDate,
					ToDate,
					Status,
				})
				.then((res) => res.Data),
		{
			keepPreviousData: true,
			onSuccess: (data) =>
				setPagination({...pagination, total: data?.TotalItem}),
			onError: toast.error,
			enabled: canViewExportRequestTurn,
		}
	);

	const queryClient = useQueryClient();
	const mutationPayment = useMutation(exportRequestTurn.updateStatus, {
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries("statisticalDepositList");
			if (variables.Status === 2) {
				if (variables.IsPaymentWallet) {
					toast.success("Thanh toán bằng ví thành công");
				} else {
					toast.success("Thanh toán trực tiếp thành công");
				}
			} else {
				toast.success("Huỷ thống kê thành công");
			}
		},
		onError: toast.error,
	});

	const onPayment = async (data: TUserStatisticalDepositUpdateStatus) => {
		try {
			if (data.Status) {
				if (data.IsPaymentWallet) {
					toast.info("Đang thực hiện thanh toán bằng ví");
					await mutationPayment.mutateAsync(data);
				} else {
					toast.info("Đang thực hiện thanh toán trực tiếp");
					await mutationPayment.mutateAsync(data);
				}
			} else {
				toast.info("Đang thực hiện huỷ thống kê");
				await mutationPayment.mutateAsync(data);
			}
		} catch (error) {}
	};

	const mutationUpdateNote = useMutation(exportRequestTurn.updateNote, {
		onSuccess: () => toast.success("Cập nhật ghi chú thành công"),
		onError: toast.error,
	});

	const onUpdateNote = (data: TUserStatisticalDepositUpdateNote) =>
		mutationUpdateNote.mutateAsync(data);

	return (
		<div className="tableBox">
			<div className="">
				<DepositStatisticFilter handleFilter={handleFilter} />
			</div>
			<DepositStatisticTable
				data={data?.Items}
				loading={isFetching}
				pagination={pagination}
				handlePagination={(pagination) => setPagination(pagination)}
				onPayment={onPayment}
				onUpdateNote={onUpdateNote}
			/>
		</div>
	);
};

Index.displayName = SEOConfigs.deposit.statisticalFeeDeposit;
Index.breadcrumb = breadcrumb.deposit.depositStatistic;
Index.Layout = Layout;

export default Index;
