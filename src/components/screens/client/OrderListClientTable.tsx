import { Tag } from "antd";
import React from "react";
import { DataTable } from "~/components";
import { orderStatus } from "~/configs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

export const OrderListClientTable: React.FC<TTable<TOrder>> = ({
  data,
  handlePagination,
  pagination,
}) => {
  const columns: TColumnsType<TOrder> = [
    {
      dataIndex: "Id",
      title: "ID",
      align: "center",
    },
    {
      dataIndex: "ImageOrigin",
      title: "Ảnh sản phẩm",
      align: "center",
      render: (img, record) => (
        <div className="flex justify-center">
          <img
            src={img ? img : "/default/pro-empty.jpg"}
            alt={`Product image ${record.Id}`}
            width={78}
            height={78}
          />
        </div>
      ),
    },
    {
      dataIndex: "TotalOrderAmount",
      title: "Tổng tiền",
      align: "center",
      render: (money) => _format.getVND(money, ""),
    },
    {
      dataIndex: "OrderTypeName",
      title: "Loại",
      align: "center",
    },
    {
      dataIndex: "OrdererUserName",
      title: "Nhân viên đặt hàng",
      align: "center",
    },
    {
      dataIndex: "SalerUserName",
      title: "Nhân viên kinh doanh",
      align: "center",
    },
    {
      dataIndex: "Created",
      title: "Ngày đặt",
      align: "center",
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: "Status",
      title: "Trạng thái hiện tại",
      render: (status, record) => {
        const color = orderStatus.find((x) => x.id === status);
        return <Tag color={color?.color}>{record?.StatusName}</Tag>;
      },
      responsive: ["xl"],
      width: 160,
    },
    // {
    // 	dataIndex: 'action',
    // 	title: 'Thao tác',
    // 	align: 'center'
    // }
  ];

  return (
    <DataTable {...{ pagination, data, onChange: handlePagination, columns }} />
  );
};
