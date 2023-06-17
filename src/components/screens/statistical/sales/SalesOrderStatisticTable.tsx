import { Tag } from "antd";
import React from "react";
import { DataTable, IconButton } from "~/components";
import { orderStatus } from "~/configs";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils/index";

export const SalesOrderStatisticTable = ({
  loading,
  pagination,
  handlePagination,
  data,
  exportExcel,
  RoleID,
}) => {
  const columns: TColumnsType<TStatisticalOrder> = [
    {
      dataIndex: "Id",
      title: "ID",
      fixed: "left",
      width: 80,
    },
    {
      dataIndex: "Created",
      key: "Created",
      title: "Ngày tạo",
      render: (date) => _format.getVNDate(date),
      fixed: "left",
    },
    {
      dataIndex: "SalerUserName",
      key: "SalerUserName",
      title: (
        <>
          Nhân viên <br /> bán hàng
        </>
      ),
      width: 80,
      render: (_, record) => <>{record.SalerUserName ?? "--"}</>,
    },
    {
      dataIndex: "PriceVND",
      title: (
        <>
          Tổng <br /> tiền hàng
        </>
      ),
      align: "right",
      render: (money) => _format.getVND(money, ""),
    },
    {
      dataIndex: "FeeShipCN",
      key: "FeeShipCN",
      title: (
        <>
          Phí ship <br /> Trung Quốc
        </>
      ),
      align: "right",
      responsive: ["xl"],
      render: (money) => _format.getVND(money, ""),
    },
    {
      dataIndex: "FeeBuyPro",
      key: "FeeBuyPro",
      title: (
        <>
          Phí <br /> mua hàng
        </>
      ),
      responsive: ["xl"],
      align: "right",
      render: (money) => _format.getVND(money, ""),
    },
    {
      dataIndex: "IsFastDeliveryPrice",
      key: "IsFastDeliveryPrice",
      title: (
        <>
          Phí <br /> giao hàng <br /> tận nhà
        </>
      ),
      align: "right",
      responsive: ["xl"],
      render: (money) => _format.getVND(money, ""),
    },
    {
      dataIndex: "FeeWeight",
      key: "FeeWeight",
      title: (
        <>
          Phí <br /> cân nặng
        </>
      ),
      align: "right",
      responsive: ["xl"],
      render: (money) => _format.getVND(money, ""),
    },
    {
      dataIndex: "IsCheckProductPrice",
      key: "IsCheckProductPrice",
      title: (
        <>
          Phí <br /> kiểm đếm
        </>
      ),
      align: "right",
      responsive: ["xl"],
      render: (money) => _format.getVND(money, ""),
    },
    {
      dataIndex: "IsPackedPrice",
      key: "IsPackedPrice",
      title: (
        <>
          Phí <br /> đóng gói
        </>
      ),
      align: "right",
      responsive: ["xl"],
      render: (money) => _format.getVND(money, ""),
    },
    {
      dataIndex: "TotalPriceVND",
      key: "TotalPriceVND",
      title: "Tổng tiền",
      align: "right",
      render: (money) => _format.getVND(money, ""),
    },
    {
      dataIndex: "Deposit",
      key: "Deposit",
      title: "Đã trả",
      align: "right",
      render: (money) => _format.getVND(money, ""),
    },
    {
      dataIndex: "MustPay",
      key: "MustPay",
      title: "Còn lại",
      align: "right",
      render: (money) => _format.getVND(money, ""),
    },
    {
      dataIndex: "StatusName",
      key: "StatusName",
      title: "Trạng thái",
      width: 180,
      render: (statusName, _record) => {
        const color = orderStatus.find((x) => x.id === _record?.Status);
        return <Tag color={color?.color}>{statusName}</Tag>;
      },
      fixed: "right",
    },
  ];

  const expandable = {
    expandedRowRender: (data) => (
      <ul className="px-2 text-xs">
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Phí ship TQ:</span>
          {_format.getVND(data.FeeShipCN)}
        </li>
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Phí mua hàng:</span>
          {_format.getVND(data.FeeBuyPro)}
        </li>
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Phí giao hàng tận nhà:</span>
          {_format.getVND(data.IsFastDeliveryPrice)}
        </li>
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Phí cân nặng:</span>
          {_format.getVND(data.FeeWeight)}
        </li>
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Phí kiểm đếm:</span>
          {_format.getVND(data.IsCheckProductPrice)}
        </li>
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Phí đóng gói:</span>
          {_format.getVND(data.IsPackedPrice)}
        </li>
      </ul>
    ),
  };

  return (
    <React.Fragment>
      <div className="flex items-end mb-4 justify-between">
        <h2 className="titleTable !pb-0 !mb-0 !text-[16px]">Thống kê đơn hàng</h2>
        {(RoleID === 1 || RoleID === 3) && (
          <IconButton
            title="Xuất Thống Kê"
            onClick={exportExcel}
            btnClass={"lg:mx-4"}
            icon="fas fa-file-export"
            btnIconClass="!mr-2"
            showLoading
          />
        )}
      </div>
      <DataTable
        {...{
          columns,
          data,
          bordered: true,
          pagination,
          onChange: (pagination) => handlePagination(pagination),
          expandable: expandable,
          loading,
          scroll: { x: 1500, y: 700 },
        }}
      />
    </React.Fragment>
  );
};
