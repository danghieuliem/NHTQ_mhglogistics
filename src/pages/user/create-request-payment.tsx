import { CreateRequestPaymentForm, UserLayout } from "~/components";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  return (
    <>
      <div className="titlePageUser">Gửi yêu cầu thanh toán hộ</div>
      <CreateRequestPaymentForm />
    </>
  );
};

Index.displayName = SEOHomeConfigs.payFor.createRequest;
Index.Layout = UserLayout;

export default Index;
