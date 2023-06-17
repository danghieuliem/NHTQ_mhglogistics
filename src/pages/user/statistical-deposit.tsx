import {TablePaginationConfig} from "antd";
import React from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {exportRequestTurn} from "~/api";
import {StatisticalDepositTable, toast, UserLayout} from "~/components";
import {defaultPagination} from "~/configs/appConfigs";
import {SEOHomeConfigs} from "~/configs/SEOConfigs";
import {selectUser, useAppSelector} from "~/store";
import {TNextPageWithLayout} from "~/types/layout";

const Index: TNextPageWithLayout = () => {
	const {user} = useAppSelector(selectUser);
	const UserId = user?.UserId;

	const [pagination, setPagination] =
		React.useState<TablePaginationConfig>(defaultPagination);

	const {isFetching, data} = useQuery(
		[
			"statisticalDepositList",
			{
				Current: pagination.current,
				PageSize: pagination.pageSize,
				UID: UserId,
			},
		],
		() =>
			exportRequestTurn
				.getList({
					PageIndex: pagination.current,
					PageSize: pagination.pageSize,
					UID: UserId,
					OrderBy: "Id desc",
				})
				.then((res) => res.Data),
		{
			keepPreviousData: true,
			onSuccess: (data) =>
				setPagination({...pagination, total: data?.TotalItem}),
			onError: toast.error,
			enabled: !!UserId,
		}
	);

	const queryClient = useQueryClient();
	const mutationPayment = useMutation(exportRequestTurn.updateStatus, {
		onSuccess: () => {
			queryClient.invalidateQueries("statisticalDepositList");
			toast.success("Thanh toán trực tiếp thành công");
		},
		onError: toast.error,
	});

	return (
		<React.Fragment>
			<div className="titlePageUser">
				{/* <i className="fas fa-signal mr-4"></i> */}
				Thống kê cước ký gửi
			</div>
			<div className="tableBox">
				<div className="titleTable">Cước ký gửi</div>
				<StatisticalDepositTable
					{...{
						loading: isFetching,
						data: data?.Items,
						pagination,
						handlePagination: (pagination) => setPagination(pagination),
						handleConfirm: (data) =>
							mutationPayment.mutateAsync({
								Id: data.Id,
								IsPaymentWallet: false,
								Status: 2,
							}),
					}}
				/>
			</div>
		</React.Fragment>
	);
};

Index.displayName = SEOHomeConfigs.consignmentShipping.statisticalDeposit;
Index.Layout = UserLayout;

export default Index;
