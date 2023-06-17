import { Tag } from "antd";
import router from "next/router";
import React from "react";
import { smallPackage } from "~/api";
import { DataTable, IconButton, toast } from "~/components";
import { smallPackageStatusData } from "~/configs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

export const OrderTransportList: React.FC<TTable<TSmallPackage>> = ({
  data,
}) => {
  const onExportExcel = async () => {
    try {
      const res = await smallPackage.exportExcel({
        MainOrderId: data[0].MainOrderId,
      });
      router.push(`${res.Data}`);
    } catch (error) {
      toast.error(error);
    }
  };

  const columns: TColumnsType<TSmallPackage> = [
    {
      dataIndex: "Code",
      title: "Mã đơn hàng",
      rowSpan: 1,
    },
    {
      dataIndex: "OrderTransactionCode",
      title: "Mã vận đơn",
      responsive: ["sm"],
    },
    {
      dataIndex: "Weight",
      align: "right",
      title: "Cân nặng (KG)",
      responsive: ["lg"],
    },
    {
      dataIndex: "LWH",
      align: "right",
      title: () => (
        <span>
          KÍCH THƯỚC <br /> (D x R x C)
        </span>
      ),
      responsive: ["lg"],
    },
    {
      dataIndex: "Volume",
      align: "right",
      title: "Cân quy đổi (KG)",
      responsive: ["lg"],
    },
    {
      dataIndex: "PayableWeight",
      align: "right",
      title: "Cân tính tiền (KG)",
      responsive: ["lg"],
    },
    {
      dataIndex: "UserNote",
      title: "Ghi chú",
      responsive: ["lg"],
    },
    {
      dataIndex: "Status",
      align: "right",
      title: "Trạng thái",
      render: (status, record) => {
        const orderStatus = smallPackageStatusData.find((x) => x.id === status);
        return <Tag color={orderStatus?.color}>{record?.StatusName}</Tag>;
      },
    },
  ];

  const expandable = {
    expandedRowRender: (item) => {
      return (
        <div className="extentable">
          <div className="extentable-content">
            <div className="extentable-row sm:hidden">
              <span className="extentable-label">Mã vận đơn: </span>
              <span className="extentable-value">
                {item?.OrderTransactionCode}
              </span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">Cân nặng: </span>
              <span className="extentable-value">
                {_format.getVND(item?.Weight, " Kg")}
              </span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">
                {" "}
                Kích thước (D x R x C):{" "}
              </span>
              <span className="extentable-value">{item?.LWH}</span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">Cân quy đổi: </span>
              <span className="extentable-value">
                {_format.getVND(item?.Volume, " Kg")}
              </span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">Cân tính tiền: </span>
              <span className="extentable-value">
                {_format.getVND(item?.PayableWeight, " Kg")}
              </span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">Cân quy đổi: </span>
              <span className="extentable-value">
                {_format.getVND(item?.Volume, " m3")}
              </span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">Note: </span>
              <span className="extentable-value">{item?.UserNote}</span>
            </div>
          </div>
        </div>
      );
    },
  };

  return (
    <div className="tableBox">
      <div className="flex justify-between items-end mb-4">
        <div className="titleTable pb-0">Danh sách mã vận đơn</div>
        <IconButton
          onClick={() => onExportExcel()}
          title="Xuất"
          icon="fas fa-file-export"
          showLoading
          toolip="Xuất thống kê"
          green
          btnClass="!h-fit"
        />
      </div>
      <DataTable
        {...{
          columns,
          data,
          bordered: true,
          expandable: expandable,
        }}
      />
    </div>
  );
};
