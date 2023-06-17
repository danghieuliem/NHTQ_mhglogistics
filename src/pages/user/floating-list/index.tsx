import { TablePaginationConfig } from "antd";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { smallPackage } from "~/api";
import {
	FloatingListFilter,
	FloatingListTable,
	toast,
	UserLayout
} from "~/components";
import { defaultPagination } from "~/configs/appConfigs";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
	const [SearchContent, setSearchContent] = useState<string>(null);
	const [Status, setStatus] = useState<any>(null);
	const handleFilter = (SearchContent: string, Status: any) => {
		setSearchContent(SearchContent);
		setStatus(Status);
	};

	const [pagination, setPagination] =
		useState<TablePaginationConfig>(defaultPagination);

	const {data, isFetching} = useQuery(
		[
			"smallPackageList",
			{
				PageIndex: pagination.current,
				PageSize: pagination.pageSize,
				Menu: 0,
				SearchContent,
			},
		],
		() =>
			smallPackage
				.getList({
					PageIndex: pagination.current,
					PageSize: pagination.pageSize,
					SearchContent,
					Menu: 0,
				})
				.then((res) => res.Data),
		{
			keepPreviousData: true,
			onSuccess: (data) =>
				setPagination({...pagination, total: data?.TotalItem}),
			onError: toast.error,
		}
	);

	return (
		<React.Fragment>
			<h1 className="titlePageUser !mb-0">
				Danh sách kiện trôi nổi
			</h1>
			<div className="tableBox">
				<div className="px-4 pb-4">
					<FloatingListFilter
						handleFilter={(searchContent, Status) =>
							handleFilter(searchContent, Status)
						}
					/>
				</div>
				<div className="">
					<FloatingListTable
						data={data?.Items}
						loading={isFetching}
						pagination={pagination}
					/>
				</div>
			</div>
		</React.Fragment>
	);
};

Index.displayName = SEOHomeConfigs.floating;
Index.Layout = UserLayout;

export default Index;
