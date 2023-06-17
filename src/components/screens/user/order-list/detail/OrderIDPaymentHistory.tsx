import { Tag } from "antd";
import React from "react";
import { DataTable } from "~/components";
import { formalPaymentData } from "~/configs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

export const OrderIDPaymentHistory: React.FC<TTable<TPayOrderHistory>> = ({
  data,
}) => {
  const columns: TColumnsType<TPayOrderHistory> = [
    {
      dataIndex: "Id",
      title: "ID",
    },
    {
      dataIndex: "Type",
      title: "Hình thức thanh toán",
      render: (record) => {
        const type = formalPaymentData.find((item) => item.id === record);
        return <Tag color={type.color}>{type?.name}</Tag>;
      },
    },
    {
      dataIndex: "Amount",
      align: "right",
      title: "Số tiền (VNĐ)",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "Created",
      title: "Ngày thanh toán",
      responsive: ["lg"],
      render: (date) => <>{_format.getVNDate(date)}</>,
    },
    {
      dataIndex: "StatusName",
      align: "right",
      title: "Loại thanh toán",
      responsive: ["lg"],
      render: (record) => <>{record}</>,
    },
  ];

  const expandable = {
    expandedRowRender: (item) => {
      return (
        <div className="extentable">
          <div className="extentable-content">
            <div className="extentable-row">
              <span className="extentable-label">Ngày thanh toán: </span>
              <span className="extentable-value">
                {_format.getVNDate(item?.Created)}
              </span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">Loại thanh toán: </span>
              <span className="extentable-value">
                {item?.StatusName}
              </span>
            </div>
          </div>
        </div>
      );
    },
  };



  return (
    <div className="tableBox rounded-b-none mt-4">
      <div className="titleTable">Lịch sử thanh toán</div>
      <DataTable
        {...{
          columns,
          data,
          bordered: true,
          expandable: expandable,
        }}
      />
    </div>
  );
};
