import { Checkbox, Tag } from "antd";
import React from "react";
import { DataTable } from "~/components";
import { transportationStatus } from "~/configs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

export const DepositDetail: React.FC<TTable<TUserDeposit>> = ({ data }) => {
  const columns: TColumnsType<TUserDeposit> = [
    {
      dataIndex: "Id",
      title: "ID",
    },
    {
      dataIndex: "OrderTransactionCode",
      title: "Mã vận đơn",
      align: "right",
      render: (_, record) => {
        return <>{record?.OrderTransactionCode}</>;
      },
    },
    {
      dataIndex: "Category",
      title: "Loại hàng hóa",
      responsive: ["xl"],
    },
    {
      dataIndex: "Amount",
      title: "Số lượng",
      align: "right",
      render: (_, record) => <div>{_format.getVND(record?.Amount, "")}</div>,
    },
    {
      dataIndex: "PayableWeight",
      title: (
        <>
          Cân nặng <br /> (KG)
        </>
      ),
      align: "right",
      render: (weight) => _format.getVND(weight, " "),
    },
    {
      dataIndex: "VolumePayment",
      title: (
        <>
          Số khối <br /> (m3)
        </>
      ),
      align: "right",
      render: (VolumePayment) => {
        return _format.getVND(VolumePayment, " ");
      },
    },
    {
      dataIndex: "IsCheckProduct",
      title: "Kiểm đếm",
      align: "center",
      render: (_, record) => {
        return <Checkbox disabled checked={record?.IsCheckProduct} />;
      },
    },
    {
      dataIndex: "IsPacked",
      title: "Đóng gỗ",
      align: "center",
      render: (_, record) => <Checkbox disabled checked={record?.IsPacked} />,
    },
    {
      dataIndex: "IsInsurance",
      title: "Bảo hiểm",
      align: "center",
      render: (_, record) => (
        <Checkbox disabled checked={record?.IsInsurance} />
      ),
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status, _) => {
        const color = transportationStatus.find((x) => x.id === status);
        return (
          <Tag color={color?.color} key={status}>
            {_?.StatusName}
          </Tag>
        );
      },
    },
  ];

  return (
    <DataTable
      {...{
        columns,
        data: data,
        bordered: true,
      }}
    />
  );
};
