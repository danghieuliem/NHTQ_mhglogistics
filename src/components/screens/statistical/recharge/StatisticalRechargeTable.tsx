import { Tag } from "antd";
import React from "react";
import { DataTable, IconButton } from "~/components";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";

export const StatisticalRechargeTable = ({
  data,
  loading,
  pagination,
  handlePagination,
  handleExportExcelRecharge,
}) => {
  const columns: TColumnsType<TStatisticalRechargeList> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 70
    },
    {
      dataIndex: "CreatedBy",
      title: "Người tạo",
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
      dataIndex: "BankName",
      title: "Ngân hàng",
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: () => <Tag color="green">Đã duyệt</Tag>,
    },
  ];

  // const expandable = {
  //   expandedRowRender: (data) => (
  //     <ul className="px-2 text-xs">
  //       <li className="sm:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Ngân hàng:</span>
  //         {data.bank}
  //       </li>
  //       <li className="md:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Trạng thái:</span>
  //         <Tag color="green">Đã duyệt</Tag>
  //       </li>
  //       <li className="lg:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Ngày tạo:</span>
  //         {_format.getVNDate(data.createdAt)}
  //       </li>
  //       <li className="xl:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Người tạo:</span>
  //         {data.creator}
  //       </li>
  //     </ul>
  //   ),
  // };

  return (
    <React.Fragment>
      <div className="flex items-end justify-between mb-4">
        <h2 className="titleTable !pb-0 !mb-0 !text-[16px]">Danh sách nạp tiền</h2>
        <IconButton
          onClick={() => handleExportExcelRecharge()}
          icon="fas fa-file-export"
          title="Xuất thống kê"
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
          scroll: {y: 500},
          onChange: handlePagination,
        }}
      />
    </React.Fragment>
  );
};
