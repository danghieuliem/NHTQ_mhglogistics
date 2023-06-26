import router, { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { mainOrder } from "~/api";
import {
  OrderIDDetail,
  OrderIDPaymentHistory,
  OrderIDProductList,
  OrderOverView,
  OrderTransportList,
  UserLayout,
} from "~/components";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const { id } = router.query;
  const { query } = useRouter();

  const { data, isError, isLoading, refetch } = useQuery(
    ["orderList", +query?.id],
    () => mainOrder.getByID(+query?.id),
    {
      onSuccess: (data) => data.Data,
      onError: toast.error,
      retry: false,
      enabled: !!+query?.id,
    }
  );
  const updatePaid = (type: "deposit" | "payment") => {
    const id = toast.loading("Đang xử lý ...");
    mainOrder
      .updateOrder([data?.Data?.Id], {
        Status: type === "deposit" ? 2 : 7,
      })
      .then((res) => {
        toast.update(id, {
          render:
            type === "deposit"
              ? "Đặt cọc thành công!"
              : "Thanh toán thành công!",
          isLoading: false,
          type: "success",
          autoClose: 1000,
        });
        refetch();
      })
      .catch((error) => {
        toast.update(id, {
          render: (error as any)?.response?.data?.ResultMessage,
          isLoading: false,
          type: "error",
          autoClose: 1000,
        });
      });
  };

  return (
    <React.Fragment>
      <div className="titlePageUser">Chi tiết đơn hàng #{id}</div>
      <div className="sm:grid sm:grid-cols-2 gap-4 mb-4">
        <div className="col-span-1 mb-4">
          <OrderOverView data={data?.Data} updatePaid={updatePaid} />
        </div>
        <div className="col-span-1">
          <OrderIDDetail
            data2={data?.Data?.Orders}
            dataAll={data?.Data}
            data={data?.Data?.FeeSupports}
          />
        </div>
      </div>
      <OrderIDProductList data={data?.Data?.Orders} />
      <OrderTransportList data={data?.Data?.SmallPackages} />
      <OrderIDPaymentHistory data={data?.Data?.PayOrderHistories} />
      {/* {data && (
          <MessageControlUser
            clientId={data.Data.UID}
            mainOrderId={+query?.id}
          />
        )} */}
    </React.Fragment>
  );
};

Index.displayName = SEOConfigs.oder.detail;
Index.breadcrumb = "";
Index.Layout = UserLayout;

export default Index;
