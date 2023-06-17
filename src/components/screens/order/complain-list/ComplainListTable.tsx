import { Pagination, Space, Tag } from "antd";
import router from "next/router";
import React from "react";
import { ActionButton, DataTable } from "~/components";
import { reportStatus, reportStatusData } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

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
    },
    {
      dataIndex: "UserName",
      title: "Username",
    },
    {
      dataIndex: "MainOrderId",
      title: "Mã đơn hàng",
    },
    {
      dataIndex: "Amount",
      title: "Số tiền",
      align: "right",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "ComplainText",
      title: "Nội dung",
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status, record) => {
        const color = reportStatus.find((x) => x.id === status);
        return <Tag color={color?.color}>{record?.StatusName}</Tag>;
      },
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      render: (_, record) => {
        return (
          <>
            <div className="text-left">{_format.getVNDate(record.Created)}</div>
            <div className="text-left">{record?.CreatedBy}</div>
          </>
        );
      },
      responsive: ["xl"],
    },
    {
      dataIndex: "Updated",
      title: "Ngày duyệt",
      align: "center",
      render: (_, record) => {
        return (
          <>
            <div className="text-left">{_format.getVNDate(record.Updated)}</div>
            <div className="text-left">{record?.UpdatedBy}</div>
          </>
        );
      },
      responsive: ["xl"],
    },
    {
      dataIndex: "action",
      key: "action",
      title: "Thao tác",
      align: "right",
      render: (_, record) => (
        <Space className="flex">
          <ActionButton
            onClick={() => handleModal(record)}
            icon="fas fa-edit"
            title="Cập nhật"
          />

          <ActionButton
            onClick={() =>
              router.push({
                pathname: "/manager/order/order-list/detail",
                query: { id: record?.MainOrderId },
              })
            }
            icon="fas fa-info"
            title="Chi tiết đơn"
          />
        </Space>
      ),
    },
  ];

  const expandable = {
    expandedRowRender: (record) => (
      <ul className="px-2 text-xs">
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Ngày tạo - Người tạo:</span>
          {_format.getVNDate(record.Created)} - {record.CreatedBy}
        </li>
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Ngày duyệt - Người duyệt:</span>
          {_format.getVNDate(record.Updated)} - {record?.UpdatedBy}
        </li>
      </ul>
    ),
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
