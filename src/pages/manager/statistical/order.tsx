import {
	InCNRepoTable,
	InVNRepoTable,
	Layout,
	PaidOrderTable,
	PurchasedOrderTable,
} from "~/components";
import {breadcrumb} from "~/configs";
import {SEOConfigs} from "~/configs/SEOConfigs";
import {TNextPageWithLayout} from "~/types/layout";

const Index: TNextPageWithLayout = () => {
	return (
		<div className="bg-white rounded-3xl p-8 mb-4 xl:text-sm text-xs">
			<div className="xl:grid grid-cols-4 gap-4">
				<div className="col-span-2 mb-4 lg:mb-0">
					<PurchasedOrderTable />
				</div>
				<div className="col-span-2 mb-4 lg:mb-0">
					<InCNRepoTable />
				</div>
				<div className="col-span-2 mb-4 lg:mb-0">
					<InVNRepoTable />
				</div>
				<div className="col-span-2 mb-4 lg:mb-0">
					<PaidOrderTable />
				</div>
			</div>
		</div>
	);
};

Index.displayName = SEOConfigs.statistical.other;
Index.breadcrumb = breadcrumb.statistical.order;
Index.Layout = Layout;

export default Index;
