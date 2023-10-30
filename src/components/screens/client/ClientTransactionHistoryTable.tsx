import { Pagination } from "antd";
import { isNumber } from "lodash";
import React from "react";
import { DataTable } from "~/components/globals/table";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

export const ClientTransactionHistoryTable: React.FC<
  TTable<TUserHistoryTransactionVND> & { filter; handleFilter }
> = ({ data, filter, handleFilter, loading }) => {
  const columns: TColumnsType<TUserHistoryTransactionVND> = [
    {
      dataIndex: "Id",
      title: "STT",
      render: (_, __, index) => index + 1,
      width: 50,
      responsive: ["lg"],
    },
    {
      dataIndex: "Created",
      title: "Ngày giao dịch",
      responsive: ["lg"],
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: "Content",
      title: "Nội dung",
      responsive: ["lg"],
      width: 300,
    },
    {
      dataIndex: "TradeTypeName",
      title: "Loại giao dịch",
    },
    {
      dataIndex: "Amount",
      align: "right",
      title: "Số tiền  (VNĐ)",
      // render: (money) => _format.getVND(money, ""),
      render: (_, record) => {
        return (
          <>{`${record?.Amount > 0 ? (record?.Type === 1 ? "-" : "+") : ""} ${
            isNumber(record?.Amount) && _format.getVND(record?.Amount, " ")
          }`}</>
        );
      },
    },
    {
      dataIndex: "MoneyLeft",
      align: "right",
      title: "Số dư  (VNĐ)",
      responsive: ["sm"],
      render: (money) => _format.getVND(money, ""),
    },
  ];

  return (
    <>
      <DataTable
        bordered
        {...{
          data,
          columns,
          // bordered,
          loading,
        }}
      />
      <div className="mt-4 text-right">
        <Pagination
          total={filter?.TotalItems}
          current={filter?.PageIndex}
          pageSize={filter?.PageSize}
          onChange={(page, pageSize) =>
            handleFilter({ ...filter, PageIndex: page, PageSize: pageSize })
          }
        />
      </div>
    </>
  );
};
