import React from "react";
import { DataTable } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

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
      width: 70,
      fixed: "left",
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
      fixed: "right",
      render: () => <TagStatus color="green" statusName="Thành công" />,
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
        title: "Danh sách rút tiền",
        onChange: handlePagination,
        scroll: { y: 600, x: 1200 },
        extraElment: (
          <IconButton
            onClick={() => handleExportExcelWithDraw()}
            title="Xuất thống kê"
            icon="fas fa-file-export"
            btnIconClass="!mr-2"
            showLoading
          />
        ),
      }}
    />
  );
};
