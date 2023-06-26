import router from "next/router";
import React from "react";
import { smallPackage } from "~/api";
import { DataTable, IconButton, toast } from "~/components";
import TagStatus from "~/components/screens/status/TagStatus";
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
      dataIndex: "VolumePayment",
      align: "right",
      title: "Thể tích (m3)",
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
        return <TagStatus color={orderStatus?.color} statusName={record?.StatusName} />
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
                Kích thước (D x R x C):{" "}
              </span>
              <span className="extentable-value">{item?.LWH}</span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">Số khối: </span>
              <span className="extentable-value">
                {_format.getVND(item?.VolumePayment, " m3")}
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
    <DataTable
      {...{
        columns,
        data,
        bordered: true,
        expandable: expandable,
        title: "Danh sách mã vận đơn",
        extraElment: (
          <IconButton
            onClick={() => onExportExcel()}
            title="Xuất"
            icon="fas fa-file-export"
            showLoading
            toolip="Xuất thống kê"
            green
            btnClass="!h-fit"
          />
        ),
      }}
    />
  );
};
