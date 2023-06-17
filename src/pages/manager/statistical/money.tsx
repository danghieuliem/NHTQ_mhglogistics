import { TNextPageWithLayout } from '~/types/layout';
import { Layout, StatisticalMoneyFilter, toast } from '~/components';
import { useState } from 'react';
import { SEOConfigs } from '~/configs/SEOConfigs';
import { breadcrumb, defaultPagination } from '~/configs';
import { useQuery } from 'react-query';
import { money } from '~/api';
import { TablePaginationConfig } from 'antd';

const Index: TNextPageWithLayout = () => {
	const [fromDate, setFromDate] = useState<string>(null);
	const [toDate, setToDate] = useState<string>(null);
	const handleFilter = (fromDate: string, toDate: string) => {
		setFromDate(fromDate);
		setToDate(toDate);
	};
	const [pagination, setPagination] =
		useState<TablePaginationConfig>(defaultPagination);
	const { data } = useQuery(
		[
			'dataMoney',
			{
				Current: pagination.current,
				PageSize: pagination.pageSize,
				fromDate,
				toDate
			}
		],
		() =>
			money
				.getList({
					PageIndex: pagination.current,
					PageSize: pagination.pageSize,
					OrderBy: 'Id desc',
					FromDate: fromDate,
					ToDate: toDate
				})
				.then((res) => res.Data),
		{
			onSuccess: (data) => {
				setPagination({ ...pagination, total: data?.TotalItem });
			},
			onError: toast.error
		}
	);

	return (
		<div className="bg-white rounded-3xl p-8 mb-4">
			<StatisticalMoneyFilter handleFilter={handleFilter} />
			<div className="mb-4">
				<div className="flex mb-2">
					<p className="mr-4">
						<i className="fal fa-poll text-sm text-[#f14f04] mr-2"></i>
						Tổng tiền mua hàng (¥):
					</p>
					<span className="text-blue font-semibold">{}</span>
				</div>
				<div className="flex mb-2">
					<p className="mr-4">
						<i className="fal fa-ballot text-sm text-[#f14f04] mr-2"></i>
						Tổng số đơn hàng:
					</p>
					<span className="text-blue font-semibold"> {}</span>
				</div>
			</div>
		</div>
	);
};

Index.displayName = SEOConfigs.statistical.realMoney;
Index.breadcrumb = breadcrumb.statistical.money;
Index.Layout = Layout;

export default Index;
