import { Pagination } from "antd";
import { isNumber } from "lodash";
import React from "react";
import { DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

export const HistoryTransactionVNDTable: React.FC<
  TTable<TUserHistoryTransactionVND> & { filter; handleFilter }
> = ({ data, filter, handleFilter, loading }) => {
  const columns: TColumnsType<TUserHistoryTransactionVND> = [
    {
      dataIndex: "Id",
      title: "ID giao dịch",
      width: 90,
      responsive: ["sm"],
    },
    {
      dataIndex: "Created",
      title: "Ngày giờ",
      render: (date) => <>{_format.getVNDate(date)}</>,
      responsive: ["lg"],
    },
    {
      dataIndex: "Content",
      title: "Nội dung",
      responsive: ["md"],
    },
    {
      dataIndex: "TradeTypeName",
      title: "Loại giao dịch",
    },
    {
      dataIndex: "Amount",
      title: "Số tiền (VNĐ)",
      align: "right",
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
      responsive: ["lg"],
      title: "Số dư (VNĐ)",
      align: "right",
      render: (money) => _format.getVND(money, " "),
    },
  ];

  const expandable = {
    expandedRowRender: (item) => {
      return (
        <div className="extentable">
          <div className="extentable-content w-full">
            <div className="extentable-row sm:hidden">
              <span className="extentable-label">Id giao dịch: </span>
              <span className="extentable-value">{item?.Id}</span>
            </div>
            <div className="extentable-row md:hidden">
              <span className="extentable-label">Nội dung giao dịch: </span>
              <span className="extentable-value !max-w-[50%] text-right">
                {item?.Content}
              </span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">Số dư hiện tại: </span>
              <span className="extentable-value">
                {_format.getVND(item?.MoneyLeft, " ")}
              </span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">Ngày: </span>
              <span className="extentable-value">
                {_format.getVNDate(item?.Created)}
              </span>
            </div>
          </div>
        </div>
      );
    },
  };

  return (
    <>
      <DataTable
        {...{
          columns,
          data,
          loading,
          bordered: true,
          expandable: expandable,
          scroll: { y: 620 },
        }}
      />
      <Pagination
        total={filter?.TotalItems}
        current={filter?.PageIndex}
        pageSize={filter?.PageSize}
        onChange={(page, pageSize) =>
          handleFilter({ ...filter, PageIndex: page, PageSize: pageSize })
        }
      />
    </>
  );
};
