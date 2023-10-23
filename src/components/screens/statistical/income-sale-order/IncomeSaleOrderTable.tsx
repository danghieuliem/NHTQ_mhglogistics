import { Space } from "antd";
import Link from "next/link";
import React, { FC } from "react";
import { DataTable, ActionButton } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

const IncomeSaleOrderTable: FC<
  TTable<TStatisticalIncomeSale> & { type: "sale" | "order" }
> = ({ data, pagination, handlePagination, loading, type }) => {
  const columns: TColumnsType<TStatisticalIncomeSale> = [
    {
      dataIndex: "UserName",
      title: type === "sale" ? "Saler" : "NV Đặt Hàng",
      align: "center",
      fixed: "left",
    },
    {
      dataIndex: "TotalPriceVND",
      title: "Giá trị đơn hàng",
      align: "center",
      responsive: ["sm"],
      render: (money) => _format.getVND(money),
      fixed: "left",
    },
    {
      dataIndex: "PriceVND",
      title: "Tiền hàng",
      align: "center",
      render: (money) => _format.getVND(money),
      responsive: ["md"],
    },
    {
      dataIndex: "OrderFee",
      title: "Phí đơn hàng",
      align: "center",
      responsive: ["md"],
      render: (money) => _format.getVND(money),
    },
    {
      dataIndex: "FeeBuyPro",
      title: "Phí mua hàng",
      align: "center",
      responsive: ["md"],
      render: (money) => _format.getVND(money),
    },
    {
      dataIndex: "FeeWeight",
      title: "Vận chuyển TQ-VN",
      align: "center",
      render: (money) => _format.getVND(money),
      responsive: ["lg"],
    },
    {
      dataIndex: "FeeShipCN",
      title: "Vận chuyển nội địa",
      align: "center",
      render: (money) => _format.getVND(money),
      responsive: ["lg"],
    },
    {
      dataIndex: "BargainMoney",
      title: "Mặc cả",
      align: "center",
      render: (money) => _format.getVND(money),
      responsive: ["lg"],
    },
    {
      dataIndex: "TQVNWeight",
      title: "Cân nặng",
      align: "center",
      responsive: ["xl"],
    },
    {
      dataIndex: "TotalOrder",
      title: "Số đơn hàng",
      align: "center",
      responsive: ["xl"],
    },
    {
      dataIndex: "TotalCus",
      title: "Số khách hàng",
      align: "center",
      responsive: ["xl"],
    },
    {
      dataIndex: "TQVNWeight",
      title: "Xem khách hàng",
      align: "center",
      responsive: ["xl"],
      render: (_, record) => (
        <Space>
          <Link href={`/manager/client/client-list/${record.Id}`}>
            <a>
              <ActionButton
                onClick={undefined}
                icon="fas fa-edit"
                title="Xem danh sách khách hàng"
              />
            </a>
          </Link>
        </Space>
      ),
      fixed: "right",
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

export { IncomeSaleOrderTable };
