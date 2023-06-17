import {TablePaginationConfig} from "antd";
import {useRef, useState} from "react";
import {useQuery} from "react-query";
import {userLevel} from "~/api";
import {Layout, TariffUserForm, TariffUserTable, toast} from "~/components";
import {breadcrumb} from "~/configs";
import {defaultPagination} from "~/configs/appConfigs";
import {SEOConfigs} from "~/configs/SEOConfigs";
import {selectUser, useAppSelector} from "~/store";
import {TNextPageWithLayout} from "~/types/layout";

const Index: TNextPageWithLayout = () => {
	const {user} = useAppSelector(selectUser);

	const [pagination, setPagination] = useState<TablePaginationConfig>(defaultPagination);

	const {isFetching, isError, error, data, isLoading} = useQuery(
		["userLevelData", {Current: pagination.current, PageSize: pagination.pageSize}],
		() =>
			userLevel
				.getList({
					PageIndex: pagination.current,
					PageSize: pagination.pageSize,
					OrderBy: "Id desc",
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
	const item = useRef<TTariffUser>();
	const handleModal = (itemSelected) => {
		item.current = itemSelected;
		setModal(!modal);
	};

	return (
		<div className="tableBox">
			<div className="tableBoxNon mb-0">
				<TariffUserTable
					{...{
						loading: isFetching,
						data: data?.Items,
						handleModal,
						pagination,
						handlePagination: (pagination) => setPagination(pagination),
					}}
				/>
			</div>
			<TariffUserForm
				{...{
					onCancel: () => setModal(false),
					defaultValues: item.current,
					visible: modal,
				}}
			/>
		</div>
	);
};
Index.displayName = SEOConfigs?.settings?.feeUser;
Index.breadcrumb = breadcrumb.settings.tariffUser;
Index.Layout = Layout;

export default Index;
