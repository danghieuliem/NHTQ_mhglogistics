import { CheckWarehouseVietNamForm, Layout } from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  return <CheckWarehouseVietNamForm type={"exportWarehouseVN"}/>;
};

Index.displayName = SEOConfigs.checkExportWarehouseTQ;
Index.breadcrumb = breadcrumb.warehouse.exportChina;
Index.Layout = Layout;

export default Index;
