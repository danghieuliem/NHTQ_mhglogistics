import {TablePaginationConfig} from "antd";
import {useRef, useState} from "react";
import {useQuery} from "react-query";
import {smallPackage} from "~/api";
import {Layout, MissingPackageFilter, MissingPackageTable, PackageManagementFormDetail, toast} from "~/components";
import {breadcrumb} from "~/configs";
import {defaultPagination} from "~/configs/appConfigs";
import {SEOConfigs} from "~/configs/SEOConfigs";
import {TNextPageWithLayout} from "~/types/layout";

const Index: TNextPageWithLayout = () => {
	const [pagination, setPagination] = useState<TablePaginationConfig>(defaultPagination);
	const [SearchContent, setSearchContent] = useState<string>(null);
	const handleFilter = (SearchContent: string) => {
		setSearchContent(SearchContent);
	};

	const {data, isFetching, isLoading, refetch} = useQuery(
		[
			"smallPackageList",
			{
				PageIndex: pagination.current,
				PageSize: pagination.pageSize,
				SearchType: 1,
				Menu: 3,
				SearchContent,
			},
		],
		() =>
			smallPackage
				.getList({
					PageIndex: pagination.current,
					PageSize: pagination.pageSize,
					SearchContent,
					SearchType: null,
					OrderBy: "Id desc",
					Menu: 3,
				})
				.then((res) => res.Data),
		{
			keepPreviousData: true,
			onSuccess: (data) => setPagination({...pagination, total: data?.TotalItem}),
			onError: toast.error,
		}
	);

	const item = useRef<TSmallPackage>();
	const [modal, setModal] = useState(false);
	const handleModal = (itemSelected: TSmallPackage) => {
		item.current = itemSelected;
		setModal(true);
	};

	return (
		<div className="tableBox pt-4">
			<MissingPackageFilter handleFilter={handleFilter} />
			<MissingPackageTable
				{...{
					data: data?.Items,
					loading: isFetching,
					pagination,
					handlePagination: (pagination) => setPagination(pagination),
					handleModal,
				}}
			/>
			<PackageManagementFormDetail
				{...{
					visible: modal,
					onCancel: () => {
						item.current = undefined;
						setModal(false);
					},
					defaultValues: item.current,
					refetch,
				}}
			/>
		</div>
	);
};

Index.displayName = SEOConfigs.parcelManagement.lostCase;
Index.breadcrumb = breadcrumb.warehouse.missingPackage;
Index.Layout = Layout;

export default Index;
