import { Tag } from "antd";
import React from "react";
import { DataTable } from "~/components";
import { paymentData } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

const RequestPaymentTable: React.FC<TTable<TRequestPaymentOrder>> = ({
  data,
  handlePagination,
  pagination,
  loading,
}) => {
  const columns: TColumnsType<TRequestPaymentOrder> = [
    {
      dataIndex: "Id",
      title: "ID",
      align: "center",
      sorter: true,
    },
    {
      dataIndex: "TotalPrice",
      title: "Tổng tiền (¥)",
      align: "center",
      render: (money) => _format.getVND(money, " "),
      responsive: ["sm"],
    },
    {
      dataIndex: "TotalPriceVND",
      title: "Tổng tiền (VNĐ)",
      align: "center",
      render: (money) => _format.getVND(money, " "),
      responsive: ["md"],
    },
    {
      dataIndex: "Currency",
      title: "Tỷ giá",
      align: "center",
      responsive: ["md"],
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      align: "center",
      render: (date) => _format.getShortVNDate(date),
      responsive: ["xl"],
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      align: "center",
      sorter: true,
      render: (status, record) => {
        let color = "green";
        if (status === 1) {
          color = "orange";
        } else if (status === 2) {
          color = "blue";
        } else if (status === 3) {
          color = "red";
        }
        return <Tag color={color}>{record?.StatusName}</Tag>;
      },
      responsive: ["xl"],
    },
  ];

  return (
    <DataTable
      {...{
        loading,
        columns,
        data,
        bordered: true,
        pagination,
        onChange: handlePagination,
      }}
    />
  );
};

export default RequestPaymentTable;
