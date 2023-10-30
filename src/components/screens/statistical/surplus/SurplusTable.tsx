import { Popover } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { ActionButton, DataTable, Menu } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";
import { useScreen } from "~/hooks";

export const SurplusTable: React.FC<TTable<TStatisticalSurplus>> = ({
  data,
  handlePagination,
  pagination,
}) => {
  const router = useRouter();
  const { isWidthSM } = useScreen();

  const columns: TColumnsType<TStatisticalSurplus> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 70,
      align: "right",
      responsive: ["lg"],
    },
    {
      dataIndex: "UserName",
      title: "Khách hàng",
      width: 200,
      render: (_, record) => {
        return (
          <div className="flex flex-col gap-[4px]">
            <div className="font-bold">
              <i className="fas fa-user mr-2"></i>
              {record?.UserName}
            </div>
            <div className="font-bold text-main text-xs">
              <i className="fas fa-coins mr-2"></i>
              {_format.getVND(record?.Wallet, " ")}
            </div>
            <div className="font-bold text-sec">{record?.UserGroupName}</div>
          </div>
        );
      },
    },
    {
      dataIndex: "SalerUserName",
      key: "SalerUserName",
      title: "NV kinh doanh",
      responsive: ["sm"],
      render: (record) => (
        <>{record?.SalerUserName ? record?.SalerUserName : "--"}</>
      ),
      width: 120,
    },
    {
      dataIndex: "OrdererUserName",
      key: "OrdererUserName",
      title: "NV đặt hàng",
      responsive: ["sm"],
      render: (record) => (
        <>{record?.OrdererUserName ? record?.OrdererUserName : "--"}</>
      ),
      width: 120,
    },
    {
      dataIndex: "Created",
      key: "Created",
      title: "Ngày tạo",
      responsive: ["lg"],
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
        return <TagStatus color={color} statusName={record.StatusName} />;
      },
      width: 120,
    },
    {
      dataIndex: "action",
      key: "action",
      title: "Thao tác",
      align: "right",
      width: 90,
      fixed: "right",
      responsive: ["sm"],
      render: (_, record) => (
        <Popover
          placement="left"
          content={
            <Menu
              data={[
                {
                  title: "Cập nhật",
                  onClick: () => {
                    router.push({
                      pathname: "/manager/client/client-list/detail",
                      query: { id: record?.Id },
                    });
                  },
                  target: "_blank",
                  className: "font-bold",
                },
                {
                  title: "Nạp tiền",
                  target: "_blank",
                  isHidden: true,
                  className: "font-bold",
                  onClick: () => {
                    router.push({
                      pathname: "/manager/money/vietnam-recharge",
                      query: { id: record?.Id },
                    });
                  },
                },
                {
                  title: "Rút tiền",
                  className: "font-bold",
                  isHidden: true,
                  onClick: () => {
                    router.push({
                      pathname: "/manager/money/vietnam-withdrawal",
                      query: { id: record?.Id },
                    });
                  },
                },
                {
                  title: "Lịch sử giao dịch",
                  className: "font-bold",
                  target: "_blank",
                  isHidden: true,
                  onClick: () => {
                    router.push({
                      pathname: "/manager/client/transaction-history",
                      query: { id: record?.Id },
                    });
                  },
                },
              ]}
            />
          }
        >
          <ActionButton icon="fas fa-info-square" title="Thao tác" isButton />
        </Popover>
      ),
    },
  ];

  return (
    <DataTable
      {...{
        columns,
        data,
        pagination,
        onChange: handlePagination,
        scroll: isWidthSM ? { x: true } : { y: 700, x: 1200 },
      }}
    />
  );
};
