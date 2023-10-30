import { Layout, OutStockFormDetail } from "~/components";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  return <OutStockFormDetail />;
};

Index.displayName = "Chi tiết xuất kho";
Index.breadcrumb = "Chi tiết phiên xuất kho";
Index.Layout = Layout;

export default Index;
