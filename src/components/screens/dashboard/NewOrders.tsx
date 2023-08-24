import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { mainOrder } from "~/api";
import { orderStatus } from "~/configs";
import { TColumnsType } from "~/types/table";
import { DataTable } from "../..";
import TagStatus from "../status/TagStatus";

export const NewOrders = React.memo(() => {
  const { data, isFetching, isLoading } = useQuery(
    [
      "orderList",
      {
        PageIndex: 1,
        PageSize: 10,
        // Status: 0,
        OrderBy: "Created desc",
      },
    ],
    () =>
      mainOrder
        .getList({
          PageIndex: 1,
          PageSize: 10,
          // Status: 0,
          OrderBy: "Created desc",
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

  const columns: TColumnsType<TNewOrders> = [
    {
      title: "ID đơn",
      dataIndex: "Id",
      render: (_) => {
        return (
          <Link href={`/manager/order/order-list/detail/?id=${_}`}>
            <a target="_blank" className="">
              {_}
            </a>
          </Link>
        );
      },
    },
    {
      title: "Username",
      dataIndex: "UserName",
    },
    {
      title: "Loại đơn hàng",
      dataIndex: "OrderTypeName",
      render: (_) => (
        <span
          className="font-bold"
          style={{ color: _.includes("khác") ? "#009000" : "#1582F5" }}
        >
          {_}
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      render: (status, _) => {
        const color = orderStatus.find((x) => x.id === status);
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
        title: "Đơn mua hộ mới",
        // expandable: expandable,
      }}
    />
  );
});
