import { FC } from "react";
import { ActionButton, DataTable, IconButton } from "~/components";
import { useScreen } from "~/hooks";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

const PurchaseProfitTable: FC<
  TTable<TStatisticalPurchaseProfit> & {
    handleExportExcel: () => void;
    filter;
    handleFilter: (newFilter) => void;
  }
> = ({ data, filter, handleFilter, loading, handleExportExcel }) => {
  const { isWidthMD } = useScreen();
  const columns: TColumnsType<TStatisticalPurchaseProfit> = [
    {
      dataIndex: "Id",
      title: () => <>Mã đơn hàng</>,
      fixed: "left",
      align: "right",
      width: 100,
      responsive: ["lg"],
    },
    {
      dataIndex: "UserName",
      title: "Username",
      fixed: isWidthMD ? null : "left",
      width: 120,
    },
    {
      dataIndex: "TotalPriceVND",
      title: () => <>Tổng tiền</>,
      width: 120,
      align: "right",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "TotalPriceReal",
      title: () => <>Tổng tiền thật</>,
      align: "right",
      width: 120,
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "PriceVND",
      title: () => <>Tiền hàng</>,
      align: "right",
      width: 120,
      responsive: ["md"],
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "Profit",
      title: () => <>Lợi nhuận</>,
      align: "right",
      width: 120,
      responsive: ["md"],
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "FeeShipCN",
      width: 120,
      title: () => <>Ship TQ</>,
      align: "right",
      responsive: ["md"],
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "FeeShipCNReal",
      width: 120,
      title: () => <>Ship TQ thật</>,
      align: "right",
      responsive: ["md"],
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "FeeWeight",
      title: () => <>Phí vận chuyển</>,
      align: "right",
      width: 120,
      responsive: ["md"],
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "FeeBuyPro",
      title: () => <>Phí mua hàng</>,
      align: "right",
      width: 120,
      responsive: ["md"],
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "FeeInWareHouse",
      title: () => <>Phí lưu kho</>,
      align: "right",
      width: 120,
      responsive: ["lg"],
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "IsCheckProductPrice",
      title: () => <>Phí kiểm đếm</>,
      align: "right",
      width: 120,
      responsive: ["lg"],
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "IsPackedPrice",
      title: () => <>Phí đóng gỗ</>,
      align: "right",
      width: 120,
      responsive: ["lg"],
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "InsuranceMoney",
      title: () => <>Phí bảo hiểm</>,
      align: "right",
      width: 120,
      responsive: ["lg"],
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "Created",
      title: "Ngày đặt",
      width: 200,
      render: (_, record) => <>{_format.getVNDate(record.Created)}</>,
      fixed: "right",
      responsive: ["lg"],
    },
  ];
  return (
    <DataTable
      {...{
        columns,
        data,
        bordered: true,
        loading,
        scroll: isWidthMD ? { x: true } : { y: 700, x: 1200 },
        extraElementClassName: "ml-auto",
        extraElement: (
          <ActionButton
            onClick={handleExportExcel}
            icon="fas fa-file-export"
            title="Xuất"
            isButton
            isButtonClassName="bg-green !text-white"
          />
        ),
        pagination: {
          current: filter.PageIndex,
          total: filter.TotalItems,
          pageSize: filter.PageSize,
        },
        onChange: (page, pageSize) => {
          handleFilter({
            ...filter,
            PageIndex: page.current,
            PageSize: page.pageSize,
          });
        },
      }}
    />
  );
};

export { PurchaseProfitTable };
