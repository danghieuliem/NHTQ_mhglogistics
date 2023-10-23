import React, { FC } from "react";
import { DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

const PaymentProfitTable: FC<
  TTable<TStatisticalPaymentProfit> & { filter; handleFilter }
> = ({ data, filter, handleFilter }) => {
  const columns: TColumnsType<TStatisticalPaymentProfit> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 50,
      align: "right",
      fixed: "left",
    },
    {
      dataIndex: "Created",
      title: "Ngày đặt",
      render: (date) => _format.getVNDate(date),
      width: 120,
      fixed: "left",
    },
    {
      dataIndex: "UserName",
      title: "Username",
      fixed: "left",
      width: 100,
    },
    {
      dataIndex: "TotalPrice",
      title: "Số tiền (¥)",
      align: "right",
      width: 120,
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "TotalPriceVNDGiaGoc",
      title: "Tiền gốc (VNĐ)",
      align: "right",
      render: (money) => _format.getVND(money, " "),
      width: 120,
    },
    {
      dataIndex: "TotalPriceVND",
      title: "Tiền thu (VNĐ)",
      align: "right",
      render: (money) => _format.getVND(money, " "),
      width: 120,
    },
    {
      dataIndex: "Profit",
      title: "Lợi nhuận (VNĐ)",
      align: "right",
      render: (money) => _format.getVND(money, " "),
      width: 120,
    },
  ];

  return (
    <DataTable
      {...{
        columns,
        data,
        bordered: true,
        scroll: { y: 700, x: 1200 },
        pagination: {
          current: filter.PageIndex,
          total: filter.TotalItems,
          pageSize: filter.PageSize,
        },
        onChange: (page, pageSize) => {
          handleFilter({
            ...filter,
            PageIndex: page.current,
            PageSize: page.pageSize,
          });
        },
      }}
    />
  );
};

export { PaymentProfitTable };
