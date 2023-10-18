import React from "react";
import { DataTable } from "~/components";
import TagStatus from "~/components/screens/status/TagStatus";
import { formalPaymentData } from "~/configs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

const OrderIDPaymentHistory: React.FC<TTable<TPayOrderHistory>> = ({
  data,
}) => {
  const columns: TColumnsType<TPayOrderHistory> = [
    {
      dataIndex: "Id",
      title: "ID",
      responsive: ["md"],
    },
    {
      dataIndex: "Type",
      title: (
        <>
          Hình thức
          <br />
          thanh toán
        </>
      ),
      render: (record) => {
        const type = formalPaymentData.find((item) => item.id === record);
        return <TagStatus color={type.color} statusName={type?.name} />;
      },
    },
    {
      dataIndex: "Amount",
      align: "right",
      title: (
        <>
          Số tiền
          <br />
          (VNĐ)
        </>
      ),
      render: (money) => _format.getVND(money, ""),
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

  return (
    <div className="mt-4">
      <DataTable
        {...{
          columns,
          data,
          bordered: true,

          title: "Lịch sử thanh toán",
        }}
      />
    </div>
  );
};

export const OrderIDPaymentHistoryMemo = React.memo(OrderIDPaymentHistory);
