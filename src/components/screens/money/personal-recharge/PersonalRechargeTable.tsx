import { Pagination } from "antd";
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

export const PersonalRechargeTable: React.FC<TTable<TClient> & TProps> = ({
  data,
  loading,
  handleFilter,
  filter,
}) => {
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
      width: 220,
      fixed: "right",
      render: (_, record) => (
        <div className="flex w-fit m-auto">
          <Link href={`/manager/money/vietnam-recharge/?id=${record?.Id}`}>
            <a target="_blank">
              <ActionButton
                icon="fas fa-badge-dollar mr-1"
                title="Nạp tiền"
                iconContainerClassName="iconYellow !my-0"
                btnYellow
                isButton
              />
            </a>
          </Link>
          <Link href={`/manager/money/vietnam-withdrawal/?id=${record?.Id}`}>
            <a target="_blank">
              <ActionButton
                icon="fas fa-wallet"
                title="Rút tiền"
                iconContainerClassName="iconBlue"
                btnBlue
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
          // expandable: expandable,
          loading: loading,
          scroll: { y: 700, x: 1200 },
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
