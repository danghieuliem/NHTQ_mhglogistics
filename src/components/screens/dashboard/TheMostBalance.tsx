import React from "react";
import { useQuery } from "react-query";
import { user } from "~/api";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";
import { DataTable, showToast } from "../..";

export const TheMostBalance = React.memo(() => {
  const { isFetching, data, isLoading } = useQuery(
    [
      "clientData",
      {
        PageIndex: 1,
        PageSize: 10,
        OrderBy: "SumAmount desc",
        UserGroupId: 2,
      },
    ],
    () =>
      user
        .getList({
          PageIndex: 1,
          PageSize: 10,
          OrderBy: "SumAmount desc",
          UserGroupId: 2,
        })
        .then((res) => res.Data.Items),
    {
      keepPreviousData: true,
      onError: (error) =>
        showToast({
          title: "Đã xảy ra lỗi!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        }),
    }
  );

  const columns: TColumnsType<TTheMostBalance> = [
    {
      title: "Username",
      dataIndex: "UserName",
    },
    {
      title: "Vip",
      dataIndex: "LevelName",
      render: (_) => <span className="text-sec font-semibold">{_}</span>
    },
    {
      title: "Số dư hiện tại",
      dataIndex: "Wallet",
      align: "right",
      render: (Wallet) => _format.getVND(Wallet, ""),
    },
    {
      title: "Tổng nạp",
      dataIndex: "SumAmount",
      align: "right",
      render: (SumAmount) => _format.getVND(SumAmount, ""),
    }
  ];

  return (
    <DataTable
      {...{
        columns,
        data,
        loading: isFetching,
        style: "secondary",
        title: "Khách hàng có số dư nhiều nhất",
        // expandable: expandable,
      }}
    />
  );
});
