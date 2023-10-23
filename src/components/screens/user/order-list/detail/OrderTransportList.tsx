import router from "next/router";
import React from "react";
import { smallPackage } from "~/api";
import { ActionButton, DataTable, toast } from "~/components";
import TagStatus from "~/components/screens/status/TagStatus";
import { transportationStatus } from "~/configs";
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
      title: (
        <>
          Cân nặng
          <br />
          (KG)
        </>
      ),
      responsive: ["lg"],
    },
    {
      dataIndex: "VolumePayment",
      align: "right",
      title: (
        <>
          Thể tích
          <br />
          (m3)
        </>
      ),
      responsive: ["lg"],
    },
    {
      dataIndex: "LWH",
      align: "right",
      title: (
        <>
          KÍCH THƯỚC
          <br />
          (D x R x C)
        </>
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
      render: (status) => {
        const orderStatus = transportationStatus.find((x) => x.id === status);
        return (
          <TagStatus
            color={orderStatus?.color}
            statusName={orderStatus?.name}
          />
        );
      },
    },
  ];

  return (
    <div className="my-4">
      <DataTable
        {...{
          columns,
          data,
          bordered: true,
          title: "Danh sách mã vận đơn",
          extraElement: (
            <ActionButton
              onClick={() => onExportExcel()}
              title="Xuất"
              icon="fas fa-file-export"
              isButton
              isButtonClassName="bg-green !text-white"
            />
          ),
        }}
      />
    </div>
  );
};

export const OrderTransportListMemo = React.memo(OrderTransportList);
