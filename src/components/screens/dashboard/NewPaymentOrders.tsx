import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { payHelp } from "~/api";
import { payHelpStatus } from "~/configs";
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
      responsive: ["md"],
      render: (value) => {
        return (
          <Link href={`/manager/order/request-payment/detail/?id=${value}`}>
            <a target="_blank">{value}</a>
          </Link>
        );
      },
    },
    {
      title: "Username",
      dataIndex: "UserName",
    },
    {
      title: (
        <>
          Tổng tiền
          <br />
          (¥)
        </>
      ),
      dataIndex: "TotalPrice",
      align: "right",
      responsive: ["sm"],
      render: (TotalPrice) => _format.getYuan(TotalPrice, ""),
    },
    {
      title: (
        <>
          Tổng tiền
          <br />
          (VNĐ)
        </>
      ),
      dataIndex: "TotalPriceVND",
      align: "right",
      responsive: ["sm"],
      render: (TotalPriceVND) => _format.getVND(TotalPriceVND, ""),
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      render: (status) => {
        const color = payHelpStatus.find((x) => x.id === status);
        return <TagStatus color={color?.color} statusName={color.name} />;
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
      }}
    />
  );
});
