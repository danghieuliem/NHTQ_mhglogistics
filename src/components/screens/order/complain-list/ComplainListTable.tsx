import { Space } from "antd";
import Link from "next/link";
import React from "react";
import { ActionButton, DataTable } from "~/components";
import { complainStatus } from "~/configs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

type TProps = {
  filter;
  handleFilter: (newFilter) => void;
};

export const ComplainListTable: React.FC<TTable<TReport> & TProps> = ({
  data,
  loading,
  filter,
  handleFilter,
  handleModal,
}) => {
  const columns: TColumnsType<TReport> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 50,
      align: "center",
      fixed: "left",
    },
    {
      dataIndex: "UserName",
      title: "Username",
      fixed: "left",
      width: 140,
    },
    {
      dataIndex: "MainOrderId",
      title: "Mã đơn hàng",
      width: 120,
      align: "right",
    },
    {
      dataIndex: "Amount",
      title: "Số tiền",
      align: "right",
      width: 120,
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "ComplainText",
      title: "Nội dung",
      width: 260,
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      width: 120,
      render: (status) => {
        const color = complainStatus.find((x) => x.id === status);
        return <TagStatus color={color?.color} statusName={color?.name} />;
      },
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      width: 200,
      render: (_, record) => {
        return (
          <>
            <div className="text-left">{_format.getVNDate(record.Created)}</div>
            <div className="text-left">{record?.CreatedBy}</div>
          </>
        );
      },
    },
    {
      dataIndex: "Updated",
      title: "Ngày duyệt",
      width: 200,
      render: (_, record) => {
        return (
          <>
            <div className="text-left">{_format.getVNDate(record.Updated)}</div>
            <div className="text-left">{record?.UpdatedBy}</div>
          </>
        );
      },
    },
    {
      dataIndex: "action",
      key: "action",
      title: "Thao tác",
      width: 200,
      render: (_, record) => (
        <Space className="flex">
          <ActionButton
            onClick={() => handleModal(record)}
            icon="fas fa-edit"
            title="Cập nhật"
            isButton
          />

          <Link
            href={`/manager/order/order-list/detail/?id=${record?.MainOrderId}`}
          >
            <a target="_blank">
              <ActionButton icon="fas fa-info" title="Chi tiết" isButton />
            </a>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <DataTable
        {...{
          columns,
          data,
          loading,
          bordered: true,
          scroll: { y: 700, x: 1200 },
          pagination: {
            current: filter.PageIndex,
            total: filter.TotalItems,
            pageSize: filter.PageSize,
          },
          onChange: (page, pageSize) => {
            handleFilter({
              ...filter,
              PageIndex: page.current,
              PageSize: page.pageSize,
            });
          },
        }}
      />
    </>
  );
};
