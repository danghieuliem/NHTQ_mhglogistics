import router, {useRouter} from "next/router";
import {useState} from "react";
import {useQuery} from "react-query";
import {historyPayWallet, user} from "~/api";
import {ClientTransactionHistoryFilter, ClientTransactionHistoryTable, Layout, showToast, toast} from "~/components";
import {breadcrumb} from "~/configs";
import {SEOConfigs} from "~/configs/SEOConfigs";
import {TNextPageWithLayout} from "~/types/layout";
import {_format} from "~/utils";

const Index: TNextPageWithLayout = () => {
	const {query} = useRouter();

	const {data: userData} = useQuery(["clientData", +query?.id], () => user.getByID(+query?.id), {
		select: (data) => data.Data,
		retry: false,
		enabled: !!query?.id,
	});

	const [filter, setFilter] = useState({
		PageIndex: 1,
		PageSize: 20,
		TotalItems: null,
		OrderBy: "Id desc",
		UID: null,
		FromDate: null,
		ToDate: null,
		Status: null,
	});

	const handleFilter = (newFilter) => {
		setFilter({...filter, ...newFilter});
	};

	const {data: userTransactionData, isFetching} = useQuery(
		["clientTransactionrData", {...filter, UID: userData?.Id}],
		() => historyPayWallet.getList({...filter, UID: userData?.Id}).then((res) => res.Data),
		{
			keepPreviousData: true,
			onSuccess: (data) =>
				setFilter({...filter, TotalItems: data?.TotalItem, PageIndex: data?.PageIndex, PageSize: data?.PageSize}),
			onError: (error) =>
				showToast({
					title: (error as any)?.response?.data?.ResultCode,
					message: (error as any)?.response?.data?.ResultMessage,
					type: "error",
				}),
			enabled: !!query?.id && !!userData,
		}
	);

	const handleExportExcel = async () => {
		try {
			historyPayWallet
				.getExportExcel({
					UID: +query?.id,
				})
				.then((res) => router.push(res?.Data));
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<>
			<div className="flex xl:w-[50%] mb-4">
				<div className="tableBox py-2 text-sm flex justify-between mr-4 items-center">
					<div className="flex items-center mr-2 IconFilter text-[24px]">
						<i className="fas fa-user"></i>
					</div>
					<div className="ml-2">
						<p className="">Username: </p>
						<div className="flex items-center font-semibold text-[#535353]">
							<span>{userData?.UserName}</span>
						</div>
					</div>
				</div>
				<div className="tableBox py-2 text-sm flex justify-between">
					<div className="flex items-center IconFilter mr-2 text-[24px]">
						<i className="fas fa-usd-circle "></i>
					</div>
					<div className="ml-2">
						<p className="mt-[2px] font-semibold text-[#535353]">Tổng số dư:</p>
						<p className="text-blue flex items-center font-semibold text-base">
							<span>{_format.getVND(userData?.Wallet)}</span>
						</p>
					</div>
				</div>
			</div>
			<div className="tableBox">
				<div className="px-4">
					<ClientTransactionHistoryFilter handleFilter={handleFilter} handleExportExcel={handleExportExcel} />
				</div>
				<ClientTransactionHistoryTable
					data={userTransactionData?.Items}
					loading={isFetching}
					filter={filter}
					handleFilter={handleFilter}
				/>
			</div>
		</>
	);
};

Index.displayName = SEOConfigs.moneyManagement.historyTransaction;
Index.breadcrumb = breadcrumb.client.transactionHistory.detail;
Index.Layout = Layout;

export default Index;
