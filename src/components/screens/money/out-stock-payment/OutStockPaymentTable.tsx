import { Pagination } from "antd";
import Link from "next/link";
import React from "react";
import { ActionButton, DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

type TProps = {
  filter;
  handleFilter: (newFilter) => void;
};

const OutStockPaymentTable: React.FC<TTable<TOutStockSession> & TProps> = ({
  data,
  loading,
  filter,
  handleFilter,
}) => {
  const columns: TColumnsType<TOutStockSession> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 50
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: "UserName",
      title: "Username",
      render: (_, record) => <>{record?.UserName ?? "--"}</>,
    },
    {
      dataIndex: "TotalPay",
      title: "Tổng tiền (VNĐ)",
      align: "right",
      render: (val) => _format.getVND(val, ""),
    },
    
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status, record) => (
        <TagStatus
          color={status === 1 ? "#cf1322" : "#389e0d"}
          statusName={record.StatusName}
        />
      ),
    },
    {
      dataIndex: "Updated",
      title: "Ngày cập nhật",
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      width: 120,
      render: (_, record) => (
        <Link
          href={`/manager/money/out-stock-payment/detail/?id=${record?.Id}`}
        >
          <a target="_blank">
            <ActionButton icon="fad fa-edit" title="Cập nhật" isButton />
          </a>
        </Link>
      ),
    },
  ];

  return (
    <>
      <DataTable
        {...{
          columns,
          data,
          bordered: true,
          // expandable: expandable,
          loading,
          scroll: { y: 700 },
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

export { OutStockPaymentTable };
