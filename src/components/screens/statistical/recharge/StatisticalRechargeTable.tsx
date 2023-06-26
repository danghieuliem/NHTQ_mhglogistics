import React from "react";
import { DataTable, IconButton } from "~/components";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

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
      width: 70,
      fixed: "left"
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
      fixed: "right",
      render: () => <TagStatus color="green" statusName="Đã duyệt" />,
    },
  ];

  return (
      <DataTable
        {...{
          columns,
          data,
          bordered: true,
          // expandable: expandable,
          loading,
          pagination,
          title: "Danh sách nạp tiền",
          scroll: { y: 700, x: 1200 },
          onChange: handlePagination,
          extraElment: (
            <IconButton
              onClick={() => handleExportExcelRecharge()}
              icon="fas fa-file-export"
              title="Xuất thống kê"
              showLoading
            />
          ),
        }}
      />
  );
};
