import { Tag } from "antd";
import React from "react";
import { DataTable } from "~/components";
import { reportStatus } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

export const ReportListTable: React.FC<TTable<TReport>> = ({
  data,
  loading,
  pagination,
  handlePagination,
}) => {
  const columns: TColumnsType<TReport> = [
    {
      dataIndex: "MainOrderId",
      title: "ID đơn hàng",
      width: 100,
      align: "right",
      responsive: ["sm"],
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      responsive: ["lg"],
      width: 200,
      render: (date) => <div>{_format.getVNDate(date)}</div>,
    },
    {
      dataIndex: "ComplainText",
      title: "Nội dung",
      responsive: ["md"],
      render: (_) => <>{_ ? _ : "--"}</>,
    },
    {
      dataIndex: "Amount",
      align: "right",
      width: 200,
      title: <>Tiền bồi thường</>,
      render: (money) => _format.getVND(money, ""),
    },
    {
      dataIndex: "UpdatedBy",
      title: "Nhân viên xử lý",
      width: 140,
      responsive: ["xl"],
    },
    {
      dataIndex: "Updated",
      title: "Ngày xử lý",
      responsive: ["xl"],
      render: (date) => <div>{_format.getVNDate(date)}</div>,
      width: 200,
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      width: 120,
      render: (status, record) => (
        <TagStatus
          color={reportStatus[status]?.color}
          statusName={record?.StatusName}
        />
        // <Tag color={reportStatus[status]?.color}>{record?.StatusName}</Tag>
      ),
    },
  ];

  const expandable = {
    expandedRowRender: (item) => {
      return (
        <div className="extentable">
          <div className="extentable-content w-full">
            <div className="extentable-row sm:hidden">
              <span className="extentable-label">ID đơn hàng: </span>
              <span className="extentable-value">{item?.MainOrderId}</span>
            </div>
            <div className="extentable-row md:hidden">
              <span className="extentable-label">Nội dung: </span>
              <span className="extentable-value">{item?.ComplainText}</span>
            </div>
            <div className="extentable-row lg:hidden">
              <span className="extentable-label">Ngày tạo: </span>
              <span className="extentable-value">
                {_format.getVNDate(item?.Created)}
              </span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">Ngày xử lý: </span>
              <span className="extentable-value">
                {_format.getVNDate(item?.Updated)}
              </span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">Nhân viên xử lý: </span>
              <span className="extentable-value">{item?.UpdatedBy}</span>
            </div>
          </div>
        </div>
      );
    },
  };

  return (
    <DataTable
      {...{
        columns,
        data,
        loading,
        expandable,
        // bordered: false,
        pagination,
        onChange: handlePagination,
        scroll: { y: 660 },
        mediaWidth: 1200,
      }}
    />
  );
};
