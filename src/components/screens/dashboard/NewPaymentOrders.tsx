import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { payHelp } from "~/api";
import { paymentStatus } from "~/configs";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";
import { DataTable } from "../..";
import TagStatus from "../status/TagStatus";

export const NewPaymentOrders = React.memo(() => {
  const { isFetching, data, isLoading } = useQuery(
    [
      "requestPaymentData",
      {
        PageCurrent: 1,
        PageSize: 10,
        OrderBy: "",
        Status: 1,
      },
    ],
    () =>
      payHelp
        .getList({
          PageIndex: 1,
          PageSize: 10,
          OrderBy: "",
          Status: 1,
        })
        .then((res) => res.Data.Items),
    {
      keepPreviousData: true,
      staleTime: 10000,
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
    }
  );

  const columns: TColumnsType<TNewPaymentOrders> = [
    {
      title: "ID",
      dataIndex: "Id",
      render: (_, __, index) => {
        return (
          <Link href={`/manager/order/request-payment/detail/?id=${_}`}>
            <a target="_blank">{_}</a>
          </Link>
        );
      },
    },
    {
      title: "Username",
      dataIndex: "UserName",
    },
    {
      title: "Tổng tiền (¥)",
      dataIndex: "TotalPrice",
      align: "right",
      render: (TotalPrice) => _format.getVND(TotalPrice, ""),
    },
    {
      title: "Tổng tiền (VNĐ)",
      dataIndex: "TotalPriceVND",
      align: "right",
      render: (TotalPriceVND) => _format.getVND(TotalPriceVND, ""),
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      render: (status, _) => {
        const color = paymentStatus.find((x) => x.id === status);
        return <TagStatus color={color?.color} statusName={_.StatusName} />;
      },
    },
  ];

  return (
    <DataTable
      {...{
        columns,
        data,
        loading: isFetching,
        style: "secondary",
        title: "Đơn thanh toán hộ mới",
        // expandable: expandable,
      }}
    />
  );
});
