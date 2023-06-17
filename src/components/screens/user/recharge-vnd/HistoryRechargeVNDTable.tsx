import { Tag, Tooltip } from "antd";
import clsx from "clsx";
import React from "react";
import { ActionButton, DataTable } from "~/components";
import { ERechargeStatusData, rechargeStatusData } from "~/configs/appConfigs";
import { CreateRequestCom } from "~/pages/user/recharge-vnd";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

interface TProps {
  newUser;
  bank;
  TotalAmount;
}

export const HistoryRechargeVNDTable: React.FC<
  TTable<TUserHistoryRechargeVND> & TProps
> = ({
  data,
  pagination,
  handlePagination,
  loading,
  handleModal,
  newUser,
  bank,
  TotalAmount,
}) => {
  const columns: TColumnsType<TUserHistoryRechargeVND> = [
    {
      dataIndex: "Id",
      title: "ID đơn",
      width: 80,
      responsive: ["sm"],
    },
    {
      title: "Nội dung",
      dataIndex: "TradeContent",
      responsive: ["md"],
    },
    {
      dataIndex: "Amount",
      title: "Số tiền nạp (VNĐ)",
      align: "right",
      render: (money) => _format.getVND(money, " "),
      width: 140,
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      render: (status) => (
        <Tag color={rechargeStatusData[status - 1].color}>
          {rechargeStatusData[status - 1].name}
        </Tag>
      ),
      width: 140,
    },
    {
      title: "Ngày nạp",
      dataIndex: "Created",
      render: (date) => _format.getVNDate(date),
      responsive: ["lg"],
      width: 200,
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      align: "right",
      render: (_, record) =>
        record?.Status === ERechargeStatusData.Pending && (
          <ActionButton
            onClick={() => handleModal(record)}
            icon="far fa-trash-alt"
            title="Xóa"
            isButton={true}
          />
        ),
      responsive: ["md"],
      width: 100,
    },
  ];

  const expandable = {
    expandedRowRender: (item) => {
      return (
        <div className="extentable">
          <div
            className={clsx(
              "extentable-content",
              item?.Status !== ERechargeStatusData.Pending ? "w-full" : "flex-1"
            )}
          >
            <div className="extentable-row md:hidden">
              <span className="extentable-label">Nội dung: </span>
              <span className="extentable-value text-right">
                {_format.getVND(item?.TradeContent)}
              </span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">Ngày đặt: </span>
              <span className="extentable-value">
                {_format.getVNDate(item?.Created)}
              </span>
            </div>
          </div>

          {item?.Status === ERechargeStatusData.Pending && (
            <div className={clsx("extentable-actions w-fit ml-4")}>
              <div className="extentable-button">
                <ActionButton
                  onClick={() => handleModal(item)}
                  icon="far fa-trash-alt"
                  title="Xóa"
                  isButton={true}
                />
              </div>
            </div>
          )}
        </div>
      );
    },
  };

  return (
    <DataTable
      {...{
        columns,
        data,
        pagination,
        onChange: handlePagination,
        loading,
        expandable: expandable,
        scroll: { y: 600 },
        title: "Danh sách nạp gần đây",
        extraElment:
          window.innerWidth >= 860 ? (
            <Tooltip title="Tổng tiền đã nạp">
              <div className="bg-red font-bold text-[#fff] py-1 px-4 rounded-[4px]">
                {_format.getVND(data?.[0]?.TotalAmount)}
              </div>
            </Tooltip>
          ) : (
            <CreateRequestCom
              newUser={newUser}
              bank={bank}
              TotalAmount={TotalAmount}
            />
          ),
      }}
    />
  );
};
