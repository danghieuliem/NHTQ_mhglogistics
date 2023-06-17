import { Pagination, Tag } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { DataTable, TransactionCodeManagementFilter } from "~/components";
import { packageStatus } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
type TProps = {
  filter;
  handleFilter: (newFilter) => void;
  handleExporTExcel;
};
export const TransactionCodeManagementTable: React.FC<
  TTable<TSmallPackage> & TProps
> = ({ data, loading, filter, handleFilter, handleExporTExcel }) => {
  const router = useRouter();

  const columnsUser: TColumnsType<TSmallPackage> = [
    {
      dataIndex: "Id",
      title: "ID",
      align: "right",
      width: 70,
      responsive: ["sm"],
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      responsive: ["xl"],
      render: (date) => {
        return (
          <>
            <div>{_format.getVNDate(date)}</div>
          </>
        );
      },
    },
    {
      dataIndex: "Code",
      title: "Bao hàng",
      responsive: ["lg"],
      render: (_) => <>{_ === "" ? "--" : _}</>,
    },
    {
      dataIndex: "OrderTransactionCode",
      title: "Mã vận đơn",
      width: 160,
    },
    {
      dataIndex: "MainOrderCode",
      title: "Mã đơn hàng",
      render: (_, record) => {
        return <Tag color={record?.OrderType === 1 ? "red" : "blue"}>{_}</Tag>;
      },
      responsive: ["xl"],
      sorter: (a, b) => a.OrderType - b.OrderType,
    },
    // {
    //   dataIndex: "ProductType",
    //   title: "Loại hàng",
    //   responsive: ["xl"],
    // },
    {
      dataIndex: "PayableWeight",
      title: (
        <>
          Cân nặng <br />
          (Kg)
        </>
      ),
      align: "right",
      render: (_, record) => {
        return <>{_format.getVND(_, " ")}</>;
      },
      responsive: ["md"],
      width: 100,
    },
    {
      dataIndex: "VolumePayment",
      title: (
        <>
          Số khối <br />
          (m3)
        </>
      ),
      responsive: ["md"],
      align: "right",
      render: (_, record) => {
        return <>{_format.getVND(_, " ")}</>;
      },
      width: 100,
    },
    {
      dataIndex: "Width",
      title: (
        <>
          Kích thước <br /> (D x R x C)
        </>
      ),
      align: "right",
      responsive: ["lg"],
      render: (_, record) => (
        <>{`${record.Length} x ${record.Width} x ${record.Height}`}</>
      ),
    },
    {
      dataIndex: "Description",
      title: "Ghi chú",
      width: 200,
      responsive: ["xl"],
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status, record) => {
        const color = packageStatus.find((x) => x.id === status);
        return <Tag color={color?.color}>{record?.StatusName}</Tag>;
      },
      width: 140,
    },
  ];

  const columnsAmin: TColumnsType<TSmallPackage> = [
    {
      dataIndex: "Id",
      title: "ID",
    },
    {
      dataIndex: "UserName",
      title: "Username",
    },
    {
      dataIndex: "Code",
      title: "Bao hàng",
      responsive: ["xl"],
    },
    {
      dataIndex: "OrderTransactionCode",
      title: "Mã vận đơn",
      width: 200,
    },
    {
      dataIndex: "MainOrderCode",
      title: "Mã đơn hàng",
    },
    {
      dataIndex: "ProductType",
      title: "Loại hàng",
      responsive: ["xl"],
    },
    {
      dataIndex: "Weight",
      title: "Cân nặng",
      align: "right",
      render: (_, record) => {
        return <>{_format.getVND(record?.Weight, "")}</>;
      },
    },
    {
      dataIndex: "VolumePayment",
      title: "Số khối (m3)",
      align: "right",
      render: (_, record) => {
        return <>{_format.getVND(record?.VolumePayment, " ")}</>;
      },
      width: 100,
    },
    {
      dataIndex: "Width",
      title: "D x R x C",
      align: "right",
      render: (_, record) => (
        <>{`${record.Length} x ${record.Width} x ${record.Height}`}</>
      ),
    },
    {
      dataIndex: "Description",
      title: "Ghi chú",
      responsive: ["xl"],
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      render: (date) => {
        return (
          <>
            <div>{_format.getVNDate(date)}</div>
          </>
        );
      },
      responsive: ["xl"],
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      fixed: "right",
      render: (status, record) => {
        const color = packageStatus.find((x) => x.id === status);
        return <Tag color={color?.color}>{record?.StatusName}</Tag>;
      },
      width: 140,
    },
  ];

  const expandable = {
    expandedRowRender: (item) => {
      return (
        <div className="extentable">
          <div className="extentable-content w-full">
            <div className="extentable-row sm:hidden">
              <span className="extentable-label">ID: </span>
              <span className="extentable-value">{item?.Id}</span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">Mã đơn hàng: </span>
              <span className="extentable-value">
                {
                  <Tag color={item?.OrderType === 1 ? "red" : "blue"}>
                    {item?.MainOrderCode}
                  </Tag>
                }
              </span>
            </div>
            <div className="extentable-row lg:hidden">
              <span className="extentable-label ">Bao hàng: </span>
              <span className="extentable-value">
                {item?.Code ? item?.Code : "--"}
              </span>
            </div>

            <div className="extentable-row md:hidden">
              <span className="extentable-label">Cân nặng (Kg): </span>
              <span className="extentable-value">
                {_format.getVND(item?.PayableWeight, " ")}
              </span>
            </div>
            <div className="extentable-row md:hidden">
              <span className="extentable-label">Thể tích (m3): </span>
              <span className="extentable-value">
                {_format.getVND(item?.VolumePayment, " ")}
              </span>
            </div>
            <div className="extentable-row lg:hidden">
              <span className="extentable-label">Kích thước (DxRxC): </span>
              <span className="extentable-value">{item?.Width}</span>
            </div>
            <div className="extentable-row lg:hidden">
              <span className="extentable-label">Ghi chú: </span>
              <span className="extentable-value max-w-[50%] text-right">
                {item?.Description}
              </span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">Ngày tạo: </span>
              <span className="extentable-value">
                {_format.getVNDate(item?.Created)}
              </span>
            </div>
          </div>
        </div>
      );
    },
  };

  return (
    <>
      <DataTable
        {...{
          columns: !router?.asPath.includes("/user/")
            ? columnsAmin
            : columnsUser,
          data,
          bordered: true,
          expandable: expandable,
          mediaWidth: 1200,
          loading: loading,
          scroll: { y: 660 },
          title: "Quản lý mã vẫn đơn",
          extraElment: (
            <TransactionCodeManagementFilter
              handleFilter={handleFilter}
              handleExporTExcel={handleExporTExcel}
            />
          ),
        }}
      />
      <div className="mt-4 text-right">
        <Pagination
          total={filter?.TotalItems}
          current={filter?.PageIndex}
          pageSize={filter?.PageSize}
          onChange={(page, pageSize) =>
            handleFilter({ ...filter, PageIndex: page, PageSize: pageSize })
          }
        />
      </div>
    </>
  );
};
