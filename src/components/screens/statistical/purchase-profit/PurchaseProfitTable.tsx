import React, { FC } from "react";
import { DataTable, IconButton } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

const PurchaseProfitTable: FC<
  TTable<TStatisticalPurchaseProfit> & { handleExportExcel: () => void }
> = ({ data, pagination, handlePagination, loading, handleExportExcel }) => {
  const columns: TColumnsType<TStatisticalPurchaseProfit> = [
    {
      dataIndex: "Id",
      title: () => (
        <div>
          Mã <br />
          đơn hàng
        </div>
      ),
      fixed: "left",
    },
    {
      dataIndex: "UserName",
      title: "Username",
      fixed: "left",
    },
    {
      dataIndex: "TotalPriceVND",
      title: () => (
        <div>
          Tổng tiền <br /> (VNĐ)
        </div>
      ),
      align: "right",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "TotalPriceReal",
      title: () => (
        <div>
          Tổng tiền thật <br /> (VNĐ)
        </div>
      ),
      align: "right",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "PriceVND",
      title: () => (
        <div>
          Tiền hàng <br /> (VNĐ)
        </div>
      ),
      align: "right",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "Profit",
      title: () => (
        <div>
          Lợi nhuận <br /> (VNĐ)
        </div>
      ),
      align: "right",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "FeeShipCN",
      title: () => (
        <div>
          Ship TQ <br /> (VNĐ)
        </div>
      ),
      align: "right",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "FeeShipCNReal",
      title: () => (
        <div>
          Ship TQ thật
          <br /> (VNĐ)
        </div>
      ),
      align: "right",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "FeeWeight",
      title: () => (
        <div>
          Phí vận chuyển <br /> (VNĐ)
        </div>
      ),
      align: "right",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "FeeBuyPro",
      title: () => (
        <div>
          Phí mua hàng <br /> (VNĐ)
        </div>
      ),
      align: "right",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "FeeInWareHouse",
      title: () => (
        <div>
          Phí lưu kho <br /> (VNĐ)
        </div>
      ),
      align: "right",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "IsCheckProductPrice",
      title: () => (
        <div>
          Phí kiểm đếm <br /> (VNĐ)
        </div>
      ),
      align: "right",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "IsPackedPrice",
      title: () => (
        <div>
          Phí đóng gỗ <br /> (VNĐ)
        </div>
      ),
      align: "right",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "InsuranceMoney",
      title: () => (
        <div>
          Phí bảo hiểm <br /> (VNĐ)
        </div>
      ),
      align: "right",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "Created",
      title: "Ngày đặt",
      render: (_, record) => <>{_format.getVNDate(record.Created)}</>,
      fixed: "right",
    },
  ];

  // const expandable = {
  // 	expandedRowRender: (record) => (
  // 		<ul className="px-2 text-xs">
  // 			<li className="sm:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Tổng tiền:</span>
  // 				<div>{_format.getVND(record.FeeBuyPro)}</div>
  // 			</li>
  // 			<li className="md:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Tổng tiền thật:</span>
  // 				<div>{_format.getVND(record.MaxTotalPriceVND)}</div>
  // 			</li>
  // 			<li className="lg:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Tổng tiền lời:</span>
  // 				<div>{_format.getVND(record.MaxProfit)}</div>
  // 			</li>
  // 			<li className="xl:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Tiền hàng:</span>
  // 				<div>{_format.getVND(record.MaxPriceVND)}</div>
  // 			</li>
  // 			<li className="xl:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Lợi nhuận:</span>
  // 				<div>{_format.getVND(record.Profit)}</div>
  // 			</li>
  // 			<li className="xl:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Ship TQ:</span>
  // 				<div>{_format.getVND(record.FeeShipCN)}</div>
  // 			</li>
  // 			<li className="xl:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Ship TQ-VN:</span>
  // 				<div>{_format.getVND(record.FeeWeight)}</div>
  // 			</li>
  // 			<li className="xl:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Phí mua hàng:</span>
  // 				<div>{_format.getVND(record.FeeBuyPro)}</div>
  // 			</li>
  // 			<li className="xl:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Phí lưu kho:</span>
  // 				<div>{_format.getVND(record.FeeInWareHouse)}</div>
  // 			</li>
  // 			<li className="xl:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Phí kiểm đếm:</span>
  // 				<div>{_format.getVND(record.IsCheckProductPrice)}</div>
  // 			</li>
  // 			<li className="xl:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Phí đóng gỗ:</span>
  // 				<div>{_format.getVND(record.IsPackedPrice)}</div>
  // 			</li>
  // 			<li className="xl:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Phí bảo hiểm:</span>
  // 				<div>{_format.getVND(record.InsuranceMoney)}</div>
  // 			</li>
  // 			<li className="xl:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Ngày đặt:</span>
  // 				<div>{_format.getVNDate(record.Created)}</div>
  // 			</li>
  // 		</ul>
  // 	),
  // };

  return (
    <React.Fragment>
      <div className="w-full text-right">
        <IconButton
          onClick={handleExportExcel}
          icon="fas fa-file-export"
          title="Xuất thống kê"
          showLoading
          btnClass="mb-4"
        />
      </div>
      <DataTable
        {...{
          columns,
          data,
          bordered: true,
          pagination,
          onChange: handlePagination,
          // expandable: expandable,
          loading,
          // scroll: { y: 700 },
        }}
      />
    </React.Fragment>
  );
};

export { PurchaseProfitTable };
