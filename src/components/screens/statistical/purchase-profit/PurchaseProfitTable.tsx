import { FC } from "react";
import { ActionButton, DataTable, IconButton } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

const PurchaseProfitTable: FC<
  TTable<TStatisticalPurchaseProfit> & { handleExportExcel: () => void }
> = ({ data, pagination, handlePagination, loading, handleExportExcel }) => {
  const columns: TColumnsType<TStatisticalPurchaseProfit> = [
    {
      dataIndex: "Id",
      title: () => <>Mã đơn hàng</>,
      fixed: "left",
      align: "right",
      width: 100,
    },
    {
      dataIndex: "UserName",
      title: "Username",
      fixed: "left",
      width: 120,
    },
    {
      dataIndex: "TotalPriceVND",
      title: () => <>Tổng tiền</>,
      width: 120,
      align: "right",
      fixed: "left",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "TotalPriceReal",
      title: () => <>Tổng tiền thật</>,
      align: "right",
      width: 120,
      fixed: "left",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "PriceVND",
      title: () => <>Tiền hàng</>,
      align: "right",
      width: 120,
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "Profit",
      title: () => <>Lợi nhuận</>,
      align: "right",
      width: 120,
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "FeeShipCN",
      width: 120,
      title: () => <>Ship TQ</>,
      align: "right",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "FeeShipCNReal",
      width: 120,
      title: () => <>Ship TQ thật</>,
      align: "right",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "FeeWeight",
      title: () => <>Phí vận chuyển</>,
      align: "right",
      width: 120,
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "FeeBuyPro",
      title: () => <>Phí mua hàng</>,
      align: "right",
      width: 120,
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "FeeInWareHouse",
      title: () => <>Phí lưu kho</>,
      align: "right",
      width: 120,
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "IsCheckProductPrice",
      title: () => <>Phí kiểm đếm</>,
      align: "right",
      width: 120,
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "IsPackedPrice",
      title: () => <>Phí đóng gỗ</>,
      align: "right",
      width: 120,
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "InsuranceMoney",
      title: () => <>Phí bảo hiểm</>,
      align: "right",
      width: 120,
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "Created",
      title: "Ngày đặt",
      width: 200,
      render: (_, record) => <>{_format.getVNDate(record.Created)}</>,
      fixed: "right",
    },
  ];
  return (
    <DataTable
      {...{
        columns,
        data,
        bordered: true,
        pagination,
        onChange: handlePagination,
        // expandable: expandable,
        loading,
        scroll: { y: 700, x: 1200 },
        extraElmentClassName: "ml-auto",
        extraElment: (
          <ActionButton
            onClick={handleExportExcel}
            icon="fas fa-file-export"
            title="Xuất"
            isButton
            isButtonClassName="bg-green !text-white"
          />
        ),
      }}
    />
  );
};

export { PurchaseProfitTable };
