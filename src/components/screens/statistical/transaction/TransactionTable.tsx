import { FC } from "react";
import { DataTable } from "~/components";
import { transactionData } from "~/configs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

const TransactionTable: FC<TTable<TStatisticalTransaction>> = ({
  data,
  pagination,
  handlePagination,
  loading,
}) => {
  const columns: TColumnsType<TStatisticalTransaction> = [
    {
      dataIndex: "Id",
      title: "STT",
      render: (_, __, index) => <>{++index}</>,
      width: 70,
    },
    {
      dataIndex: "Content",
      key: "Content",
      title: "Nội dung",
      // width: 220,
    },
    {
      dataIndex: "TradeTypeName",
      key: "TradeTypeName",
      title: "Loại giao dịch",
      responsive: ["xl"],
      sorter: (a, b) => a?.TradeType - b?.TradeType,
      render: (record) => <>{record}</>,
      // width: 100,
    },
    {
      dataIndex: "Amount",
      key: "Amount",
      title: "Số tiền (VNĐ)",
      align: "right",
      render: (money) => _format.getVND(money, " "),
      width: 160,
    },
    {
      dataIndex: "MoneyLeft",
      key: "MoneyLeft",
      title: "Số dư (VNĐ)",
      align: "right",
      render: (money) => _format.getVND(money, " "),
      width: 160,
    },
    {
      dataIndex: "Created",
      key: "Created",
      title: "Ngày giờ",
      render: (date) => _format.getVNDate(date),
      // width: 120,
      responsive: ["xl"],
    },
  ];

  const expandable = {
    expandedRowRender: (record) => (
      <ul className="px-2 text-xs">
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Loại giao dịch:</span>
          {record.TradeTypeName}
        </li>
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Ngày thực hiện giao dịch:</span>
          {_format.getVNDate(record.Created)}
        </li>
      </ul>
    ),
  };

  return (
    <DataTable
      {...{
        columns,
        data,
        bordered: true,
        pagination,
        onChange: handlePagination,
        expandable: expandable,
        loading,
        scroll: { y: 500 },
      }}
    />
  );
};

export { TransactionTable };
