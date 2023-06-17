import {useState} from "react";
import {useQuery} from "react-query";
import {outStockSession} from "~/api";
import {Layout, NotFound, OutStockPaymentFilter, OutStockPaymentTable, toast} from "~/components";
import {breadcrumb} from "~/configs";
import {SEOConfigs} from "~/configs/SEOConfigs";
import {useAppSelector, selectUser} from "~/store";
import {TNextPageWithLayout} from "~/types/layout";

const Index: TNextPageWithLayout = () => {
	const {user: userStore} = useAppSelector(selectUser);
	if (!userStore) return null;
	const [filter, setFilter] = useState({
		SearchContent: null,
		Status: null,
		FromDate: null,
		ToDate: null,
		TotalItems: null,
		PageIndex: 1,
		PageSize: 20,
	});

	const handleFilter = (newFilter) => {
		setFilter({...filter, ...newFilter});
	};

	const {
		data: userOutstockData,
		isFetching,
		isError,
	} = useQuery(["clientWithdrawData", {...filter}], () => outStockSession.getList(filter).then((res) => res.Data), {
		keepPreviousData: true,
		onSuccess: (data) =>
			setFilter({...filter, TotalItems: data?.TotalItem, PageIndex: data?.PageIndex, PageSize: data?.PageSize}),
		onError: toast.error,
	});
	if (isError) return <NotFound />;

	return (
		<div className="tableBox">
			<OutStockPaymentFilter handleFilter={handleFilter} />
			<OutStockPaymentTable
				data={userOutstockData?.Items}
				loading={isFetching}
				filter={filter}
				handleFilter={handleFilter}
			/>
		</div>
	);
};

Index.displayName = SEOConfigs.moneyManagement.payExport;
Index.breadcrumb = breadcrumb.money.outstockPayment.main;
Index.Layout = Layout;

export default Index;
