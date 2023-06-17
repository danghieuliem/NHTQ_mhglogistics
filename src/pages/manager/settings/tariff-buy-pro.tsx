import {TablePaginationConfig} from "antd";
import {useRef, useState} from "react";
import {useQuery} from "react-query";
import {feeBuyPro} from "~/api/fee-buy-pro";
import {Layout, TariffBuyProFilter, TariffBuyProForm, TariffBuyProTable, toast} from "~/components";
import {breadcrumb} from "~/configs";
import {defaultPagination} from "~/configs/appConfigs";
import {SEOConfigs} from "~/configs/SEOConfigs";
import {selectUser, useAppSelector} from "~/store";
import {TNextPageWithLayout} from "~/types/layout";

const Index: TNextPageWithLayout = () => {
	const {user} = useAppSelector(selectUser);

	const [SearchContent, setSearchContent] = useState<string>(null);
	const handleFilter = (SearchContent: any) => {
		setSearchContent(SearchContent);
	};
	const [pagination, setPagination] = useState<TablePaginationConfig>(defaultPagination);

	const {isFetching, data, isLoading} = useQuery(
		[
			"feeBuyProData",
			{
				SearchContent,
				Current: pagination.current,
				PageSize: pagination.pageSize,
			},
		],
		() =>
			feeBuyPro
				.getList({
					PageIndex: pagination.current,
					PageSize: pagination.pageSize,
					OrderBy: "Id desc",
					SearchContent,
				})
				.then((res) => res.Data),
		{
			keepPreviousData: true,
			onSuccess: (data) => setPagination({...pagination, total: data.TotalItem}),
			onError: toast.error,
			enabled: user?.UserGroupId === 1,
		}
	);

	const [modal, setModal] = useState(false);
	const item = useRef<TTariffBuyPro>();
	const handleModal = (itemSelected) => {
		item.current = itemSelected;
		setModal(!modal);
	};

	return (
		<div className="tableBox">
			<TariffBuyProFilter handleFilter={handleFilter} />
			<TariffBuyProTable
				{...{
					loading: isFetching,
					data: data?.Items,
					handleModal,
					pagination,
					handlePagination: (pagination) => setPagination(pagination),
				}}
			/>
			<TariffBuyProForm
				{...{
					onCancel: () => setModal(false),
					defaultValues: item.current,
					visible: modal,
				}}
			/>
		</div>
	);
};

Index.displayName = SEOConfigs?.settings?.feeBuy;
Index.breadcrumb = breadcrumb.settings.tariffBuyPro;
Index.Layout = Layout;

export default Index;
