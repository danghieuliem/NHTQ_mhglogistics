import { Tag } from "antd";
import Link from "next/link";
import React from "react";
import { ActionButton, DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

export const SurplusTable: React.FC<TTable<TStatisticalSurplus>> = ({
  data,
  handlePagination,
  pagination,
}) => {
  const columns: TColumnsType<TStatisticalSurplus> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 70,
      fixed: "left",
      align: "right"
    },
    {
      dataIndex: "UserName",
      key: "UserName",
      title: "Username",
      width: 120,
      fixed: "left",
    },
    {
      dataIndex: "UserGroupName",
      key: "UserGroupName",
      title: "Quyền hạn",
      width: 150,
    },
    {
      dataIndex: "Wallet",
      key: "Wallet",
      title: "Số dư (VNĐ)",
      align: "right",
      render: (money) => _format.getVND(money, " "),
      width: 120,
    },
    {
      dataIndex: "Created",
      key: "Created",
      title: "Ngày tạo",
      render: (date) => _format.getVNDate(date),
      width: 200,
    },
    {
      dataIndex: "Status",
      key: "Status",
      title: "Trạng thái",
      render: (status, record) => {
        let color = "red";
        if (status === 1) {
          color = "green";
        } else if (status === 2) {
          color = "yellow";
        }
        return <TagStatus color={color} statusName={record.StatusName}/>
      },
      width: 120,
    },
    {
      dataIndex: "SalerUserName",
      key: "SalerUserName",
      title: "NV kinh doanh",
      render: (record) => (
        <>{record?.SalerUserName ? record?.SalerUserName : "--"}</>
      ),
      width: 120,
    },
    {
      dataIndex: "OrdererUserName",
      key: "OrdererUserName",
      title: "NV đặt hàng",
      render: (record) => (
        <>{record?.OrdererUserName ? record?.OrdererUserName : "--"}</>
      ),
      width: 120,
    },
    {
      dataIndex: "action",
      key: "action",
      title: "Thao tác",
      align: "right",
      width: 200,
      fixed: "right",
      render: (_, record) => (
        <div className="flex flex-wrap gap-1">
          <Link href={`/manager/client/client-list/detail/?id=${record?.Id}`}>
            <a target="_blank">
              <ActionButton icon="mr-0" title="Cập nhật" isButton />
            </a>
          </Link>

          <Link href={`/manager/money/vietnam-recharge/?id=${record?.Id}`}>
            <a target="_blank">
              <ActionButton
                icon="mr-0"
                title="Nạp tiền"
                isButton
              />
            </a>
          </Link>

          <Link href={`/manager/client/transaction-history/?id=${record?.Id}`}>
            <a target="_blank">
              <ActionButton
                icon="mr-0"
                title="Lịch sử"
                isButton
              />
            </a>
          </Link>
        </div>
      ),
      // width: 200,
    },
  ];

  return (
    <DataTable
      {...{
        columns,
        data,
        pagination,
        onChange: handlePagination,
        scroll: { y: 700, x: 1200 },
      }}
    />
  );
};
