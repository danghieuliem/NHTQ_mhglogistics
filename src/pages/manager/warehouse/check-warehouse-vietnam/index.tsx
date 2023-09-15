import { CheckWarehouseVietNamForm, Layout } from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  return <CheckWarehouseVietNamForm type={'toWarehouseVN'}/>;
};

Index.displayName = SEOConfigs.checkWarehouseVN;
Index.breadcrumb = breadcrumb.warehouse.checkWarehouseVN;
Index.Layout = Layout;

export default Index;
