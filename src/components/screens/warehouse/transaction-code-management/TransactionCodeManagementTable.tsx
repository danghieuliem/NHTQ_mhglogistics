import { Pagination, Tag } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { DataTable } from "~/components";
import { packageStatus } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";
type TProps = {
  filter;
  handleFilter: (newFilter) => void;
  handleExporTExcel;
  isSelect?: any;
  handleOnChangeKey?: any;
};
export const TransactionCodeManagementTable: React.FC<
  TTable<TSmallPackage> & TProps
> = ({
  data,
  loading,
  filter,
  handleFilter,
  handleExporTExcel,
  isSelect,
  handleOnChangeKey,
}) => {
  const router = useRouter();

  const columnsUser: TColumnsType<TSmallPackage> = [
    {
      dataIndex: "MainOrderCode",
      title: "Mã đơn hàng",
      render: (_, record) => {
        return (
          <TagStatus
            color={record?.OrderType === 1 ? "red" : "blue"}
            statusName={_}
          />
        );
      },
      responsive: ["xl"],
      width: 120,
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      width: 200,
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
      width: 200,
      title: "Bao hàng",
      responsive: ["lg"],
      render: (_) => <>{_ === "" ? "--" : _}</>,
    },
    {
      dataIndex: "OrderTransactionCode",
      title: "Mã vận đơn",
      width: 160,
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
      width: 120,
    },
    {
      dataIndex: "VolumePayment",
      title: (
        <>
          Cân qui đổi <br />
          (kg)
        </>
      ),
      responsive: ["md"],
      align: "right",
      render: (_, record) => {
        return <>{_format.getVND(_, " ")}</>;
      },
      width: 120,
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
      width: 200,
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
        return (
          <TagStatus color={color?.color} statusName={record?.StatusName} />
        );
      },
      width: 200,
    },
  ];

  const columnsAmin: TColumnsType<TSmallPackage> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 50,
    },
    {
      dataIndex: "UserName",
      title: "Username",
      width: 120,
    },
    {
      dataIndex: "Code",
      title: "Bao hàng",
      width: 120,
    },
    {
      dataIndex: "OrderTransactionCode",
      title: "Mã vận đơn",
      width: 200,
    },
    {
      dataIndex: "MainOrderCode",
      title: "Mã đơn hàng",
      width: 120,
    },
    {
      dataIndex: "ProductType",
      title: "Loại hàng",
      width: 120,
    },
    {
      dataIndex: "Weight",
      title: "Cân nặng (kg)",
      align: "right",
      render: (_, record) => {
        return <>{_format.getVND(record?.Weight, "")}</>;
      },
      width: 120,
    },
    {
      dataIndex: "VolumePayment",
      title: "Cân qui đổi (kg)",
      align: "right",
      render: (_, record) => {
        return <>{_format.getVND(record?.VolumePayment, " ")}</>;
      },
      width: 120,
    },
    {
      dataIndex: "Width",
      title: "D x R x C",
      align: "right",
      render: (_, record) => (
        <>{`${record.Length} x ${record.Width} x ${record.Height}`}</>
      ),
      width: 120,
    },
    {
      dataIndex: "Description",
      title: "Ghi chú",
      width: 120,
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
      width: 220,
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      fixed: "right",
      render: (status, record) => {
        const color = packageStatus.find((x) => x.id === status);
        return (
          <TagStatus color={color?.color} statusName={record?.StatusName} />
        );
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
          scroll: { y: 700, x: 1200 },
          // title: "Danh sách mã vận đơn",
          rowSelection: isSelect
            ? {
                type: "checkbox",
                onChange: (value) => handleOnChangeKey(value),
                selectedRowKeys: isSelect,
              }
            : null,
        }}
      />
      <Pagination
        total={filter?.TotalItems}
        current={filter?.PageIndex}
        pageSize={filter?.PageSize}
        onChange={(page, pageSize) =>
          handleFilter({ ...filter, PageIndex: page, PageSize: pageSize })
        }
      />
    </>
  );
};
