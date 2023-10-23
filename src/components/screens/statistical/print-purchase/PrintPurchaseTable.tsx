import { Tag } from "antd";
import router from "next/router";
import React from "react";
import { ActionButton, DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

export const PrintPurchaseTable: React.FC<
  TTable<TStatisticalPrintPurchase>
> = ({ data, loading, pagination, handlePagination }) => {
  const columns: TColumnsType<TStatisticalPrintPurchase> = [
    {
      dataIndex: "Id",
      title: "ID",
      align: "center",
    },
    {
      dataIndex: "customerID",
      title: "Mã khách hàng",
      align: "center",
    },
    {
      dataIndex: "OrderID",
      title: "Mã đơn hàng",
      align: "center",
      responsive: ["sm"],
    },
    {
      dataIndex: "UserName",
      title: "Username",
      align: "center",
      responsive: ["md"],
    },
    {
      dataIndex: "Amount",
      title: "Tổng tiền",
      align: "center",
      responsive: ["lg"],
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      align: "center",
      render: (date) => _format.getVNDate(date),
      responsive: ["xl"],
    },
    {
      dataIndex: "StatusName",
      title: "Trạng thái",
      align: "center",
      render: (status) => <Tag color="green">{status}</Tag>,
      responsive: ["xl"],
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      render: (_, record) => (
        <ActionButton
          onClick={() =>
            router.push({
              pathname: "/manager/statistical/print-purchase/detail",
              query: { id: record?.Id },
            })
          }
          icon="fas fa-edit"
          title="Cập nhật"
        />
      ),
      responsive: ["xl"],
    },
  ];

  return (
    <DataTable
      {...{
        columns,
        data,
        bordered: true,
        loading,
        pagination,
        onChange: handlePagination,
      }}
    />
  );
};
