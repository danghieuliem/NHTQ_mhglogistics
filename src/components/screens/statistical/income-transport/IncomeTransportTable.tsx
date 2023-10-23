import { Tag } from "antd";
import React, { FC } from "react";
import { DataTable } from "~/components";
import { createdOrderStatusData } from "~/configs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

const IncomeTransportTable: FC<TTable<TStatisticalIncomeTransport>> = ({
  data,
  pagination,
  handlePagination,
  loading,
}) => {
  const columns: TColumnsType<TStatisticalIncomeTransport> = [
    {
      dataIndex: "Id",
      key: "Id",
      title: "Mã đơn hàng ",
      align: "center",
      fixed: "left",
      width: 100,
      responsive: ["sm"],
      ellipsis: true,
    },
    {
      dataIndex: "UserName",
      key: "UserName",
      title: "Username",
      align: "center",
      fixed: "left",
      width: 100,
      responsive: ["sm"],
      ellipsis: true,
    },
    {
      dataIndex: "OrderTransactionCode",
      key: "OrderTransactionCode",
      title: "Mã vận đơn",
      align: "center",
      width: 200,
      ellipsis: true,
    },
    {
      dataIndex: "Weight",
      key: "Weight",
      title: "Cân nặng",
      align: "center",
      responsive: ["sm"],
      width: 200,
      ellipsis: true,
    },
    {
      dataIndex: "WareHouseFrom",
      key: "WareHouseFrom",
      title: "Kho TQ",
      align: "center",
      responsive: ["md"],
      width: 200,
      ellipsis: true,
    },
    {
      dataIndex: "WareHouseTo",
      key: "WareHouseTo",
      title: "Kho VN",
      align: "center",
      responsive: ["md"],
      width: 200,
      ellipsis: true,
    },
    {
      dataIndex: "ShippingTypeName",
      key: "ShippingTypeName",
      title: "PTVC",
      align: "center",
      responsive: ["md"],
      width: 200,
      ellipsis: true,
    },
    {
      dataIndex: "SensorFeeVND",
      key: "SensorFeeVND",
      title: "Cước vật tư",
      align: "center",
      render: (money) => _format.getVND(money),
      responsive: ["md"],
      width: 200,
      ellipsis: true,
    },
    {
      dataIndex: "AdditionFeeVND",
      key: "AdditionFeeVND",
      title: "PP mặt hàng đặc biệt",
      align: "center",
      render: (money) => _format.getVND(money),
      responsive: ["lg"],
      width: 200,
      ellipsis: true,
    },
    {
      dataIndex: "FeeWeightPerKg",
      key: "FeeWeightPerKg",
      title: "Tiền cân KG",
      align: "center",
      render: (money) => _format.getVND(money),
      responsive: ["lg"],
      width: 200,
      ellipsis: true,
    },
    {
      dataIndex: "TotalPriceVND",
      key: "TotalPriceVND",
      title: "Tổng tiền",
      align: "center",
      render: (money) => _format.getVND(money),
      responsive: ["lg"],
      width: 200,
      ellipsis: true,
    },
    {
      dataIndex: "Created",
      key: "Created",
      title: "Ngày tạo",
      align: "center",
      render: (date) => _format.getShortVNDate(date),
      responsive: ["lg"],
      width: 200,
      ellipsis: true,
    },
    {
      dataIndex: "DateInTQWarehouse",
      key: "DateInTQWarehouse",
      title: "Ngày về TQ",
      align: "center",
      render: (date) => _format.getShortVNDate(date),
      responsive: ["xl"],
      width: 200,
      ellipsis: true,
    },
    {
      dataIndex: "DateInLasteWareHouse",
      key: "DateInLasteWareHouse",
      title: "Ngày về VN",
      align: "center",
      render: (date) => _format.getShortVNDate(date),
      responsive: ["xl"],
      width: 200,
      ellipsis: true,
    },
    {
      dataIndex: "DateExportRequest",
      key: "DateExportRequest",
      title: "Ngày YCXK",
      align: "center",
      render: (date) => _format.getShortVNDate(date),
      responsive: ["xl"],
      width: 200,
      ellipsis: true,
    },
    {
      dataIndex: "DateExport",
      key: "DateExport",
      title: "Ngày xuất kho",
      align: "center",
      render: (date) => _format.getShortVNDate(date),
      responsive: ["xl"],
      width: 200,
      ellipsis: true,
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      align: "center",
      fixed: "right",
      responsive: ["xl"],
      width: 200,
      ellipsis: true,
      render: (status, record) => {
        return (
          <Tag
            color={
              createdOrderStatusData.find((x) => x.id === record?.Status)?.color
            }
          >
            {record?.StatusName}
          </Tag>
        );
      },
    },
  ];

  return (
    <DataTable
      {...{
        columns,
        data,
        bordered: true,
        pagination,
        onChange: handlePagination,
        loading,
      }}
    />
  );
};

export { IncomeTransportTable };
