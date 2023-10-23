import { Pagination } from "antd";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { getAllNewNotify } from "~/api";
import { ActionButton } from "~/components/globals/button/ActionButton";
import { DataTable } from "~/components/globals/table";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../status/TagStatus";
import NotificationFilter from "./NotificationFilter";
import { useQueryClient } from "react-query";

type TProps = {
  data: any;
  isFetching?: boolean;
  handleFilter: (newFilter) => void;
  filter: any;
  refetch: any;
};

export const NotificationTable: React.FC<TTable & TProps> = ({
  data,
  loading,
  handleFilter,
  filter,
  refetch,
  isFetching,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const queryClient = useQueryClient();

  const columns: TColumnsType<any> = [
    {
      dataIndex: "Id",
      title: "STT",
      width: 30,
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
          <TagStatus
            color={data.IsRead ? "blue" : "red"}
            statusName={data.IsRead ? "Đã xem" : "Chưa xem"}
          />
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
      title: "Thao tác",
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
                icon="fas fa-info-square"
                title="Chi tiết"
                isButton
                onClick={() => {
                  if (!data.IsRead) {
                    data.IsRead = true;
                    getAllNewNotify.readNotify([data?.Id]).then(() => {
                      queryClient.invalidateQueries("new-notification");
                    });
                  }
                }}
              />
            </a>
          </Link>
        );
      },
    },
  ];

  const handleMarkRead = useCallback(() => {
    const id = toast.loading("Đang xử lý ...");
    getAllNewNotify
      .readNotify(selectedRowKeys)
      .then(() => {
        toast.update(id, {
          render: "Đã đọc thông báo!",
          isLoading: false,
          autoClose: 500,
          type: "success",
        });
        setSelectedRowKeys([]);
        refetch();
        queryClient.invalidateQueries("new-notification");
      })
      .catch((error) => {
        toast.update(id, {
          render: (error as any)?.response?.data?.ResultMessage,
          isLoading: false,
          autoClose: 1000,
          type: "error",
        });
      });
  }, []);

  const rowSelection = {
    selectedRowKeys,
    getCheckboxProps: (record) => {
      return !record.IsRead
        ? { name: record.Id.toString(), disabled: false }
        : { name: record.Id.toString(), disabled: true, className: "!hidden" };
    },
    onChange: (selectedRowKeys: React.Key[], selectedRows: TOrder[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  return (
    <>
      <DataTable
        {...{
          loading,
          columns,
          data,
          bordered: true,
          scroll: { y: 700 },
          rowSelection,
          extraElementClassName: "flex !w-full items-end justify-between",
          extraElement: (
            <>
              <NotificationFilter
                handleFilter={handleFilter}
                isFetching={isFetching}
                onMarkRead={handleMarkRead}
                isShowMarkRead={selectedRowKeys.length > 0}
              />
            </>
          ),
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
