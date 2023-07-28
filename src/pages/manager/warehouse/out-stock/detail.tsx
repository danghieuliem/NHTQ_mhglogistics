import { Layout, OutStockFormDetail } from '~/components';
import { TNextPageWithLayout } from '~/types/layout';

const Index: TNextPageWithLayout = () => {
	return <OutStockFormDetail />;
};

Index.breadcrumb = "Chi tiết phiên xuất kho";
Index.Layout = Layout;

export default Index;
