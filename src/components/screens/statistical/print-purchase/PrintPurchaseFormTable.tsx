import { Table } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { DataTable } from "~/components";
import { TColumnsType } from "~/types/table";

export const PrintPurchaseFormTable = () => {
  const columns: TColumnsType<TStatisticalPurchaseDetail> = [
    {
      dataIndex: "id",
      key: "id",
      title: "Mã kiện",
      align: "center",
    },
    {
      dataIndex: "weight",
      key: "weight",
      title: "Cân nặng",
      align: "center",
    },
    {
      dataIndex: "storedDay",
      key: "storedDay",
      title: "Ngày lưu kho (Ngày)",
      align: "center",
    },
    {
      dataIndex: "status",
      key: "status",
      title: "Trạng thái",
      align: "center",
    },
    {
      dataIndex: "cashInStore",
      key: "cashInStore",
      title: "Tiền lưu kho",
      align: "center",
    },
  ];

  const data = [
    {
      id: 8765432345678765,
      weight: 50,
      storedDay: 50,
      status: "Đã thanh toán",
      cashInStore: 0,
      debt: 0,
    },
  ];

  const summary = (pageData) => {
    const total = 0;
    return (
      <>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}>Tổng tiền lưu kho</Table.Summary.Cell>
          <Table.Summary.Cell index={4}>
            <Text type="danger">{total}</Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}>Balance</Table.Summary.Cell>
          <Table.Summary.Cell index={4} colSpan={2}>
            <Text type="danger">{0}</Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </>
    );
  };

  return (
    <div className="mt-3">
      <DataTable
        {...{
          columns,
          data,
          bordered: true,
          summary,
          title: "Đơn hàng mua hộ",
        }}
      />
    </div>
  );
};
