import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { mainOrder } from "~/api";
import { Empty, Layout, OrderPaymentForm } from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const { query } = useRouter();

  const { data, isLoading, isError, refetch } = useQuery(
    ["orderPayment", +query?.id],
    () => mainOrder.getByID(+query?.id),
    {
      select: (data) => data.Data,
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: !!query?.id,
    }
  );

  if (isError)
    return (
      <Empty
        description={`Không tìm thấy đơn hàng ${query?.id} để thanh toán`}
      />
    );

  return (
    <div className="tableBox px-4">
      <OrderPaymentForm data={data} loading={isLoading} refetch={refetch} />
    </div>
  );
};

Index.displayName = SEOConfigs.oder.payOder;
Index.breadcrumb = breadcrumb.order.payment.detail;
Index.Layout = Layout;

export default Index;
