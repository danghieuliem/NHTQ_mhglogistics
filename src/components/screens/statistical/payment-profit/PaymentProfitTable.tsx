import React, { FC } from "react";
import { DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

const PaymentProfitTable: FC<TTable<TStatisticalPaymentProfit>> = ({
  data,
  handlePagination,
  pagination,
}) => {
  const columns: TColumnsType<TStatisticalPaymentProfit> = [
    {
      dataIndex: "Id",
      title: "ID",
    },
    {
      dataIndex: "UserName",
      title: "Username",
    },
    {
      dataIndex: "TotalPrice",
      title: "Số tiền (¥)",
      align: "right",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "TotalPriceVNDGiaGoc",
      title: "Tiền gốc (VNĐ)",
      align: "right",
      render: (money) => _format.getVND(money, " "),
      responsive: ["sm"],
    },
    {
      dataIndex: "TotalPriceVND",
      title: "Tiền thu (VNĐ)",
      align: "right",
      render: (money) => _format.getVND(money, " "),
      responsive: ["md"],
    },
    {
      dataIndex: "Profit",
      title: "Lợi nhuận (VNĐ)",
      align: "right",
      render: (money) => _format.getVND(money, " "),
      responsive: ["lg"],
    },
    {
      dataIndex: "Created",
      title: "Ngày đặt",
      render: (date) => _format.getVNDate(date),
    },
  ];

  // const expandable = {
  //   expandedRowRender: (record) => (
  //     <ul className="px-2 text-xs">
  //       <li className="sm:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Tiền gốc:</span>
  //         <div>{_format.getVND(record?.TotalPriceVNDGiaGoc)}</div>
  //       </li>
  //       <li className="md:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Tiền thu:</span>
  //         <div>{_format.getVND(record?.TotalPriceVND)}</div>
  //       </li>
  //       <li className="lg:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Lợi nhuận:</span>
  //         <div>{_format.getVND(record?.Profit)}</div>
  //       </li>
  //       <li className="xl:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Ngày đặt:</span>
  //         <div>{_format.getVNDate(record?.Created)}</div>
  //       </li>
  //     </ul>
  //   ),
  // };

  return (
    <DataTable
      {...{
        columns,
        data,
        bordered: true,
        // expandable: expandable,
      }}
    />
  );
};

export { PaymentProfitTable };
