import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { transportationOrder } from "~/api";
import { TColumnsType } from "~/types/table";
import { DataTable } from "../..";
import TagStatus from "../status/TagStatus";
import { transportationStatus } from "~/configs";

export const NewDeliveryOrders = React.memo(() => {
  const { isFetching, data, isLoading } = useQuery(
    [
      "deliveryOrder",
      {
        Current: 1,
        PageSize: 10,
        Status: 2,
        OrderBy: "Id desc",
      },
    ],
    () =>
      transportationOrder
        .getList({
          PageIndex: 1,
          PageSize: 10,
          OrderBy: "Id desc",
          Status: 2,
        })
        .then((res) => res?.Data?.Items),
    {
      keepPreviousData: true,
      staleTime: 10000,
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
    }
  );

  const columns: TColumnsType<TNewDeliveryOrders> = [
    {
      title: "ID đơn",
      dataIndex: "Id",
      responsive: ["sm"],
      render: (value) => {
        return (
          <Link href={`/manager/deposit/deposit-list/detail/?id=${value}`}>
            <a target="_blank">{value}</a>
          </Link>
        );
      },
    },
    {
      title: "Khách hàng",
      dataIndex: "UserName",
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "OrderTransactionCode",
      responsive: ["sm"],
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      render: (status) => {
        const color = transportationStatus.find((x) => x.id === status);
        return <TagStatus color={color?.color} statusName={color?.name} />;
      },
    },
  ];

  return (
    <DataTable
      {...{
        columns,
        data,
        loading: isFetching,
        title: "Đơn ký gửi mới",
      }}
    />
  );
});
