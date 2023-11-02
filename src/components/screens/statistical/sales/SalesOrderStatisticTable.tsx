import React from "react";
import { ActionButton, DataTable } from "~/components";
import { orderStatus } from "~/configs";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils/index";
import TagStatus from "../../status/TagStatus";
import { useScreen } from "~/hooks";

export const SalesOrderStatisticTable = ({
  loading,
  pagination,
  handlePagination,
  data,
  exportExcel,
  RoleID,
}) => {
  const { isWidthMD } = useScreen();

  const columns: TColumnsType<TStatisticalOrder> = [
    {
      dataIndex: "Id",
      title: "ID",
      fixed: isWidthMD ? null : "left",
      width: 80,
      responsive: ["md"],
    },
    {
      dataIndex: "Created",
      key: "Created",
      title: "Ngày tạo",
      width: 200,
      responsive: ["lg"],
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: "SalerUserName",
      key: "SalerUserName",
      width: 120,
      title: (
        <>
          Nhân viên <br /> bán hàng
        </>
      ),
      render: (_, record) => <>{record.SalerUserName || "--"}</>,
    },
    {
      dataIndex: "PriceVND",
      title: (
        <>
          Tổng <br /> tiền hàng
        </>
      ),
      align: "right",
      width: 120,
      responsive: ["lg"],
      render: (money) => <>{_format.getVND(money, "")}</>,
    },
    {
      width: 120,
      dataIndex: "FeeShipCN",
      key: "FeeShipCN",
      responsive: ["lg"],
      title: (
        <>
          Phí ship <br /> Trung Quốc (VNĐ)
        </>
      ),
      align: "right",
      render: (money) => _format.getVND(money, ""),
    },
    {
      width: 120,
      dataIndex: "FeeBuyPro",
      key: "FeeBuyPro",
      responsive: ["lg"],
      title: (
        <>
          Phí <br /> mua hàng (VNĐ)
        </>
      ),
      align: "right",
      render: (money) => _format.getVND(money, ""),
    },
    {
      width: 120,
      dataIndex: "IsFastDeliveryPrice",
      key: "IsFastDeliveryPrice",
      responsive: ["lg"],
      title: (
        <>
          Phí <br /> giao hàng (VNĐ)
        </>
      ),
      align: "right",
      render: (money) => _format.getVND(money, ""),
    },
    {
      width: 120,
      dataIndex: "FeeWeight",
      key: "FeeWeight",
      title: (
        <>
          Phí <br /> cân nặng (VNĐ)
        </>
      ),
      align: "right",
      responsive: ["md"],
      render: (money) => _format.getVND(money, ""),
    },
    {
      width: 120,
      dataIndex: "IsCheckProductPrice",
      key: "IsCheckProductPrice",
      title: (
        <>
          Phí <br /> kiểm đếm (VNĐ)
        </>
      ),
      align: "right",
      responsive: ["md"],
      render: (money) => _format.getVND(money, ""),
    },
    {
      width: 120,
      dataIndex: "IsPackedPrice",
      key: "IsPackedPrice",
      title: (
        <>
          Phí <br /> đóng gói (VNĐ)
        </>
      ),
      align: "right",
      responsive: ["md"],
      render: (money) => _format.getVND(money, ""),
    },
    {
      width: 120,
      dataIndex: "TotalPriceVND",
      key: "TotalPriceVND",
      title: (
        <>
          Tổng tiền <br /> (VNĐ)
        </>
      ),
      align: "right",
      responsive: ["sm"],
      render: (money) => _format.getVND(money, ""),
    },
    {
      width: 120,
      dataIndex: "Deposit",
      key: "Deposit",
      title: (
        <>
          Đã trả <br /> (VNĐ)
        </>
      ),
      align: "right",
      responsive: ["sm"],
      render: (money) => _format.getVND(money, ""),
    },
    {
      width: 120,
      dataIndex: "MustPay",
      key: "MustPay",
      title: (
        <>
          Còn lại <br /> (VNĐ)
        </>
      ),
      align: "right",
      responsive: ["sm"],
      render: (money) => _format.getVND(money, ""),
    },
    {
      dataIndex: "StatusName",
      key: "StatusName",
      title: "Trạng thái",
      width: 180,
      render: (statusName, _record) => {
        const color = orderStatus.find((x) => x.id === _record?.Status);
        return <TagStatus color={color?.color} statusName={statusName} />;
      },
      fixed: isWidthMD ? null : "right",
    },
  ];

  return (
    <React.Fragment>
      <DataTable
        {...{
          columns,
          data,
          bordered: true,
          pagination,
          onChange: (pagination) => handlePagination(pagination),
          loading,
          scroll: isWidthMD ? { x: true } : { x: 1200, y: 700 },
          title: "Thống kê đơn hàng",
          extraElement: (
            <div className="">
              {(RoleID === 1 || RoleID === 3) && (
                <ActionButton
                  title="Xuất"
                  onClick={exportExcel}
                  icon="fas fa-file-export"
                  isButton
                  isButtonClassName="bg-green !text-white"
                />
              )}
            </div>
          ),
        }}
      />
    </React.Fragment>
  );
};
