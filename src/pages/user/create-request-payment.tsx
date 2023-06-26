import { CreateRequestPaymentForm, UserLayout } from "~/components";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  return <CreateRequestPaymentForm />;
};

Index.displayName = SEOHomeConfigs.payFor.createRequest;
Index.Layout = UserLayout;
Index.breadcrumb = "Tạo yêu cầu thanh toán hộ";

export default Index;
