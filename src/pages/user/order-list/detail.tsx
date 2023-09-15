import router, { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { mainOrder } from "~/api";
import {
  DataTable,
  OrderIDDetailMemo,
  OrderIDPaymentHistoryMemo,
  OrderIDProductList,
  OrderOverViewMemo,
  OrderTransportListMemo,
  UserLayout
} from "~/components";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";

type TFeeSupports = {
  Id?: number;
  MainOrderId?: number;
  SupportName?: string;
  Updated?: Date;
  UpdatedBy?: string;
  SupportInfoVND?: number;
};

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
          autoClose: 500,
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

  const columns: TColumnsType<TFeeSupports> = [
    {
      dataIndex: "Id",
      render: (value, record, index) => <>{++index}</>,
      title: "STT",
      responsive: ["lg"],
    },
    {
      dataIndex: "SupportName",
      title: "Tên phụ phí",
    },
    {
      title: "Số tiền (VNĐ)",
      dataIndex: "SupportInfoVND",
      render: (_, record) => {
        return <>{_format.getVND(record?.SupportInfoVND)}</>;
      },
    },
  ];

  return (
    <React.Fragment>
      <div className="titlePageUser">Chi tiết đơn hàng #{id}</div>
      <OrderIDProductList data={data?.Data?.Orders} />
      <OrderTransportListMemo data={data?.Data?.SmallPackages} />
      <div className="mb-4">
        <DataTable
          {...{
            columns,
            data: data?.Data?.FeeSupports,
            // bordered: true,
            title: "Danh sách phụ phí",
          }}
        />
      </div>
      <div className="sm:grid sm:grid-cols-2 gap-4 mb-4">
        <div className="col-span-1 mb-4">
          <OrderOverViewMemo data={data?.Data} updatePaid={updatePaid} />
        </div>
        <div className="col-span-1">
          <OrderIDDetailMemo
            data2={data?.Data?.Orders}
            dataAll={data?.Data}
          />
        </div>
      </div>
      <OrderIDPaymentHistoryMemo data={data?.Data?.PayOrderHistories} />
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
