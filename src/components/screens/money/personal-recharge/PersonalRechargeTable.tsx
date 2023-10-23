import Link from "next/link";
import React from "react";
import { ActionButton, DataTable } from "~/components";
import { activeData } from "~/configs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";
type TProps = {
  filter;
  handleFilter: (newFilter) => void;
};

export const PersonalRechargeTable: React.FC<
  TTable<TClient | any> & TProps
> = ({ data, loading, handleFilter, filter }) => {
  const columns: TColumnsType<TClient> = [
    {
      dataIndex: "Id",
      fixed: "left",
      title: "ID",
      width: 60,
    },
    {
      dataIndex: "UserName",
      title: "Username",
      fixed: "left",
    },
    {
      dataIndex: "FullName",
      title: "Họ và tên",
    },
    {
      dataIndex: "Phone",
      title: "Điện thoại",
      align: "right",
    },
    {
      dataIndex: "Wallet",
      title: "Số dư",
      align: "right",
      render: (record) => _format.getVND(record, ""),
    },
    {
      dataIndex: "Created",
      title: "Ngày nạp",
      render: (_, record) => <>{_format.getVNDate(record.Created)}</>,
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status: number) => (
        <TagStatus
          color={activeData[status]?.color}
          statusName={activeData[status]?.name}
        />
      ),
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      width: 120,
      fixed: "right",
      render: (_, record) => (
        <div className="flex flex-wrap gap-1">
          <Link
            href={`/manager/money/vietnam-recharge/?id=${record?.Id}`}
            passHref
          >
            <a target="_blank">
              <ActionButton
                icon="fas fa-badge-dollar"
                title="Nạp tiền"
                isButton
                isButtonClassName="bg-green !text-white"
              />
            </a>
          </Link>
          <Link
            href={`/manager/money/vietnam-withdrawal/?id=${record?.Id}`}
            passHref
          >
            <a target="_blank">
              <ActionButton
                icon="fas fa-wallet"
                title="Rút tiền"
                isButtonClassName="bg-orange-900 !text-white"
                isButton
              />
            </a>
          </Link>
        </div>
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
          loading: loading,
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
