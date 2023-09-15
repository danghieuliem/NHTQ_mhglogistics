import React from "react";
import { ActionButton, DataTable } from "~/components";
import { orderStatus } from "~/configs";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils/index";
import TagStatus from "../../status/TagStatus";

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
      width: 60,
    },
    {
      dataIndex: "Created",
      key: "Created",
      fixed: "left",
      title: "Ngày tạo",
      width: 200,
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: "SalerUserName",
      fixed: "left",
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
      fixed: "left",
      align: "right",
      width: 120,

      render: (money) => <>{_format.getVND(money, "")}</>,
    },
    {
      width: 120,
      dataIndex: "FeeShipCN",
      key: "FeeShipCN",
      title: (
        <>
          Phí ship <br /> Trung Quốc
        </>
      ),
      align: "right",
      render: (money) => _format.getVND(money, ""),
    },
    {
      width: 120,
      dataIndex: "FeeBuyPro",
      key: "FeeBuyPro",
      title: (
        <>
          Phí <br /> mua hàng
        </>
      ),
      align: "right",
      render: (money) => _format.getVND(money, ""),
    },
    {
      width: 120,
      dataIndex: "IsFastDeliveryPrice",
      key: "IsFastDeliveryPrice",
      title: (
        <>
          Phí <br /> giao hàng
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
          Phí <br /> cân nặng
        </>
      ),
      align: "right",
      render: (money) => _format.getVND(money, ""),
    },
    {
      width: 120,
      dataIndex: "IsCheckProductPrice",
      key: "IsCheckProductPrice",
      title: (
        <>
          Phí <br /> kiểm đếm
        </>
      ),
      align: "right",
      render: (money) => _format.getVND(money, ""),
    },
    {
      width: 120,
      dataIndex: "IsPackedPrice",
      key: "IsPackedPrice",
      title: (
        <>
          Phí <br /> đóng gói
        </>
      ),
      align: "right",
      render: (money) => _format.getVND(money, ""),
    },
    {
      width: 120,
      dataIndex: "TotalPriceVND",
      key: "TotalPriceVND",
      title: "Tổng tiền",
      align: "right",
      render: (money) => _format.getVND(money, ""),
    },
    {
      width: 120,
      dataIndex: "Deposit",
      key: "Deposit",
      title: "Đã trả",
      align: "right",
      render: (money) => _format.getVND(money, ""),
    },
    {
      width: 120,
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
        return <TagStatus color={color?.color} statusName={statusName} />;
      },
      fixed: "right",
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
          scroll: { x: 1200, y: 700 },
          title: "Thống kê đơn hàng",
          extraElment: (
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
