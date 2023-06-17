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
      render: (_, __, index) => <>{++index}</>,
      width: 50,
    },
    {
      dataIndex: "Created",
      title: "Ngày giao dịch",
      render: (date) => _format.getVNDate(date),
      width: 170,
    },
    {
      dataIndex: "Content",
      title: "Nội dung",
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
          scroll: { y: 600 },
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
