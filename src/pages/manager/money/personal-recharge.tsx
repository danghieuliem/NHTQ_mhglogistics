import {useState} from "react";
import {breadcrumb} from "~/configs";
import {selectUser, useAppSelector} from "~/store";
import {useQuery} from "react-query";
import {user} from "~/api";
import {ClientListFilter, Layout, PersonalRechargeTable, toast} from "~/components";
import {SEOConfigs} from "~/configs/SEOConfigs";
import {TNextPageWithLayout} from "~/types/layout";

const Index: TNextPageWithLayout = () => {
	const {user: userStore} = useAppSelector(selectUser);
	if (!userStore) return null;
	const [filter, setFilter] = useState({
		PageIndex: 1,
		PageSize: 20,
		TotalItems: null,
		OrderBy: "Id desc",
		Id: null,
		UserGroupId: 2,
		UserName: null,
		Phone: null,
		SearchContent: null,
		SalerID: null,
		OrdererID: null,
	});

	const handleFilter = (newFilter) => {
		setFilter({...filter, ...newFilter});
	};

	const {isFetching, data} = useQuery(["clientData", {...filter}], () => user.getList(filter).then((res) => res.Data), {
		keepPreviousData: true,
		onSuccess: (data) =>
			setFilter({...filter, TotalItems: data?.TotalItem, PageIndex: data?.PageIndex, PageSize: data?.PageSize}),
		onError: toast.error,
	});

	return (
		<div className="tableBox">
			<div className="col-span-3 xl:mb-0 pb-4">
				<ClientListFilter handleFilter={handleFilter} isShow={false} />
			</div>
			<PersonalRechargeTable data={data?.Items} filter={filter} handleFilter={handleFilter} loading={isFetching} />
		</div>
	);
};

Index.displayName = SEOConfigs.moneyManagement.personalRecharge;
Index.breadcrumb = breadcrumb.money.personalRecharge;
Index.Layout = Layout;

export default Index;
