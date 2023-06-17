import { Tag } from "antd";
import React from "react";
import { DataTable } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";

export const StatisticalWithdrawTable = ({
  data,
  loading,
  handlePagination,
  pagination,
  handleExportExcelWithDraw,
}) => {
  const columns: TColumnsType<TStatisticalWithdrawList> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 70
    },
    {
      dataIndex: "CreatedBy",
      title: "Người duyệt",
    },
    {
      dataIndex: "UserName",
      title: "Username",
    },
    {
      dataIndex: "Amount",
      title: "Số tiền (VNĐ)",
      align: "right",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: () => <Tag color="green">Thành công</Tag>,
    },
  ];

  // const expandable = {
  //   expandedRowRender: (data) => (
  //     <ul className="px-2 text-xs">
  //       <li className="sm:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Trạng thái:</span>
  //         <Tag color="green">Đã duyệt</Tag>
  //       </li>
  //       <li className="lg:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Ngày tạo:</span>
  //         {_format.getVNDate(data.createdAt)}
  //       </li>
  //       <li className="xl:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Người duyệt:</span>
  //         {data.creator}
  //       </li>
  //     </ul>
  //   ),
  // };

  return (
    <React.Fragment>
      <div className="flex items-end justify-between mb-4">
        <h2 className="titleTable !pb-0 !mb-0 !text-[16px]">Danh sách rút tiền</h2>
        <IconButton
          onClick={() => handleExportExcelWithDraw()}
          title="Xuất thống kê"
          icon="fas fa-file-export"
          btnIconClass="!mr-2"
          showLoading
        />
      </div>
      <DataTable
        {...{
          columns,
          data,
          bordered: true,
          // expandable: expandable,
          loading,
          pagination,
          onChange: handlePagination,
          scroll: {y: 500}
        }}
      />
    </React.Fragment>
  );
};
