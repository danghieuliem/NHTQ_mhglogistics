import { Pagination, Tag } from "antd";
import Link from "next/link";
import React from "react";
import { getAllNewNotify } from "~/api";
import { ActionButton } from "~/components/globals/button/ActionButton";
import { DataTable } from "~/components/globals/table";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

type TProps = {
  data: any;
  isFetching?: boolean;
  handleFilter: (newFilter) => void;
  filter: any;
};

export const NotificationTable: React.FC<TTable & TProps> = ({
  data,
  loading,
  handleFilter,
  filter,
}) => {
  const columns: TColumnsType<any> = [
    {
      dataIndex: "Id",
      title: "STT",
      width: 50,
      render: (_, __, index) => ++index,
    },
    {
      dataIndex: "NotificationContent",
      title: "Nội dung",
      responsive: ["lg"],
      width: 200,
    },
    {
      dataIndex: "TotalPriceReceive",
      title: "Trạng thái",
      responsive: ["xl"],
      width: 120,
      render: (_, data) => {
        return (
          <Tag color={data.IsRead ? "blue" : "red"}>
            {data.IsRead ? "Đã xem" : "Chưa xem"}
          </Tag>
        );
      },
    },
    {
      dataIndex: "Created",
      title: "Ngày",
      width: 130,
      render: (date) => _format.getVNDate(date),
      responsive: ["sm"],
    },
    {
      dataIndex: "GoToDetail",
      title: "Xem chi tiết",
      align: "center",
      width: 90,
      render: (_, data) => {
        return (
          <Link href={data?.Url}>
            <a
              style={{
                opacity: data.Url ? "1" : "0.3",
                pointerEvents: data.Url ? "all" : "none",
                cursor: data.Url ? "pointer" : "none",
              }}
              target="_blank"
              // href={data.Url || ''}
            >
              <ActionButton
                icon="far fa-info-square"
                title="Xem chi tiết"
                onClick={() => {
                  if (!data.IsRead) {
                    data.IsRead = true;
                    getAllNewNotify.readNotify([data?.Id]);
                  }
                }}
              />
            </a>
          </Link>
        );
      },
    },
  ];

  const expandable = {
    expandedRowRender: (record) => (
      <ul className="px-2 text-xs">
        <li className="sm:hidden justify-between flex py-2">
          <span className="font-medium mr-4">Ngày:</span>
          <div>{_format.getShortVNDate(record?.Created)}</div>
        </li>
        <li className="md:hidden justify-between flex py-2">
          <span className="font-medium mr-4">Nội dung:</span>
          <div>{record?.NotificationContent}</div>
        </li>
        <li className="xl:hidden justify-between flex py-2">
          <span className="font-medium mr-4">Trạng thái:</span>
          <div>{record?.TotalPriceReceive}</div>
        </li>
      </ul>
    ),
  };
  return (
    <>
      <DataTable
        {...{
          loading,
          columns,
          data,
          bordered: true,
          // pagination: data?.length === 0 ? null : pagination,
          // onChange: handlePagination,
          expandable: expandable,
          scroll: { y: 700 },
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

export default NotificationTable;
