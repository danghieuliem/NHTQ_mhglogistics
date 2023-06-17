import {useState} from "react";
import {useQuery} from "react-query";
import {bigPackage} from "~/api";
import {Layout, PackageManagementFilter, PackageManagementTable, showToast} from "~/components";
import {breadcrumb} from "~/configs";
import {SEOConfigs} from "~/configs/SEOConfigs";
import {useAppSelector, selectUser} from "~/store";
import {TNextPageWithLayout} from "~/types/layout";

const Index: TNextPageWithLayout = () => {
	const {user: userStore} = useAppSelector(selectUser);
	if (!userStore) return null;

	const [filter, setFilter] = useState({
		PageIndex: 1,
		PageSize: 20,
		OrderBy: "Id desc",
		SearchContent: null,
		TotalItems: null,
	});

	const handleFilter = (newFilter) => {
		setFilter({...filter, ...newFilter});
	};
	const {data, isFetching, isLoading} = useQuery(
		["bigPackageList", {...filter}],
		() => bigPackage.getList(filter).then((res) => res.Data),
		{
			keepPreviousData: true,
			onSuccess: (data) =>
				setFilter({...filter, TotalItems: data?.TotalItem, PageIndex: data?.PageIndex, PageSize: data?.PageSize}),
			onError: () => {
				showToast({
					title: "Lỗi!",
					message: "Đường truyền kết nối server bị lỗi! Vui lòng thử lại!",
					type: "error",
				});
			},
		}
	);

	if (!data) return null;

	return (
		<div className="tableBox">
			<PackageManagementFilter handleFilter={handleFilter} />
			<PackageManagementTable filter={filter} handleFilter={handleFilter} data={data?.Items} loading={isFetching} />
		</div>
	);
};

Index.displayName = SEOConfigs.parcelManagement.packageManagement;
Index.breadcrumb = breadcrumb.warehouse.packageManagement.detail;
Index.Layout = Layout;

export default Index;
