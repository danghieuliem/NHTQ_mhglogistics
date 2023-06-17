import { TablePaginationConfig } from "antd";
import React, { useState } from "react";
import { defaultPagination } from "~/configs/appConfigs";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";
import { History } from "./History";

type TProps = {
  data: TOrder;
  loading: boolean;
};

export const OrderHistory: React.FC<TProps> = ({ data, loading }) => {
  const paymentHistoryColumns: TColumnsType<TPayOrderHistory> = [
    {
      dataIndex: "Created",
      title: "Ngày thanh toán",
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: "CreatedBy",
      title: "Người Thực hiện",
    },
    {
      dataIndex: "StatusName",
      title: "Loại thanh toán",
      render: (status, record) => {
        // let color = "orange";
        // if (category === 1) color = "blue";
        // return <Tag color={color}>{data?.categoryName}</Tag>;
        return status;
      },
    },
    {
      dataIndex: "TypeName",
      title: "Hình thức thanh toán",
    },
    {
      dataIndex: "Amount",
      title: "Tiền thanh toán",
      align: "right",
      render: (money) => _format.getVND(money),
    },
  ];

  // const expandablePay = {
  //   expandedRowRender: (record) => (
  //     <ul className="px-2 text-xs">
  //       <li className="sm:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Ngày thanh toán:</span>
  //         <div>{_format.getVNDate(record.Created)}</div>
  //       </li>
  //       <li className="xl:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Tiền thanh toán:</span>
  //         <div>{_format.getVND(record.Amount)}</div>
  //       </li>
  //     </ul>
  //   ),
  // };

  const changeHistoryColumns: TColumnsType<THistoryOrderChange> = [
    {
      dataIndex: "Created",
      title: "Ngày thay đổi",
      // width: 179,
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: "CreatedBy",
      title: "Người thay đổi",
      // width: 120,
    },
    {
      dataIndex: "UserGroupName",
      title: "Quyền hạn",
      // width: 110,
    },
    {
      dataIndex: "HistoryContent",
      title: "Nội dung",
      width: 400,
    },
  ];

  // const expandableChange = {
  //   expandedRowRender: (record) => (
  //     <ul className="px-2 text-xs">
  //       <li className="sm:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Ngày thay đổi:</span>
  //         <div>{record.Created}</div>
  //       </li>
  //       <li className="xl:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Nội dung:</span>
  //         <div className="text-right">{record.HistoryContent}</div>
  //       </li>
  //     </ul>
  //   ),
  // };

  const complainHistoryColumns: TColumnsType<TOrderComplain> = [
    {
      dataIndex: "Created",
      title: "Ngày khiếu nại",
      // width: 179,
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: "UpdatedBy",
      title: "Người duyệt",
      // width: 120,
    },
    {
      dataIndex: "Updated",
      title: "Ngày duyệt",
      // width: 110,
    },
    {
      dataIndex: "StatusName",
      title: "Trạng thái",
      // width: 110,
    },
    {
      dataIndex: "ComplainText",
      title: "Nội dung",
      // width: 110,
    },
  ];

  // const expandableComplain = {
  //   expandedRowRender: (record) => (
  //     <ul className="px-2 text-xs">
  //       <li className="sm:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Ngày khiếu nại:</span>
  //         <div>{_format.getVNDate(record.Created)}</div>
  //       </li>
  //       <li className="md:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Trạng thái:</span>
  //         <div>{record.StatusName}</div>
  //       </li>
  //       <li className="xl:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Nội dung:</span>
  //         <div>{record.ComplainText}</div>
  //       </li>
  //     </ul>
  //   ),
  // };

  const [pagination, setPagination] =
    useState<TablePaginationConfig>(defaultPagination);

  return (
    <React.Fragment>
      <div className="mx-2">
        <History
          title="LỊCH SỬ THANH TOÁN"
          columns={paymentHistoryColumns}
          data={data?.PayOrderHistories}
          // expandable={expandablePay}
        />
      </div>
      <div className="mt-8 border-t pt-4 mx-2">
        <History
          title="LỊCH SỬ THAY ĐỔI"
          columns={changeHistoryColumns}
          data={data?.HistoryOrderChanges}
          pagination={pagination}
          handlePagination={(pagination) => setPagination(pagination)}
          // expandable={expandableChange}
        />
      </div>
      <div className="mt-8 border-t pt-4 mx-2">
        <History
          title="LỊCH SỬ KHIẾU NẠI"
          columns={complainHistoryColumns}
          data={data?.Complains}
          // expandable={undefined}
        />
      </div>
    </React.Fragment>
  );
};
