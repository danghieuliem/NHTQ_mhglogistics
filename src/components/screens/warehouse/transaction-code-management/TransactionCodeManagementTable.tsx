import { Pagination, Tag, Tooltip } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { DataTable } from "~/components";
import { packageStatus } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";
import Link from "next/link";
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
      dataIndex: "MainOrderCode",
      title: "Mã đơn hàng",
      render: (_, record) => {
        return <Tag color={record?.OrderType === 1 ? "red" : "blue"}>{_}</Tag>;
      },
      responsive: ["xl"],
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
        return (
          <TagStatus color={color?.color} statusName={record?.StatusName} />
        );
      },
      width: 140,
    },
  ];

  const columnsAmin: TColumnsType<TSmallPackage> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 50,
      align: "center",
      fixed: "left",
      render: (_, record) => {
        const getId = record?.MainOrderCode.split(": ");
        const targetHerf =
          record?.OrderType === 1
            ? `/manager/order/order-list/detail/?id=${getId[1]}`
            : `/manager/deposit/deposit-list/detail/?id=${getId[1]}`;
        return (
          <>
            {
              Number(getId[1]) !== 0 ?
                <Link href={targetHerf}>
                  <a target="_blank" className="font-semibold">
                    <Tooltip title="Chi tiết đơn" placement="right">
                      {_}
                    </Tooltip>
                  </a>
                </Link>
              : <>{_}</>
            }
          </>
        );
      },
    },
    {
      dataIndex: "UserName",
      title: "Username",
      fixed: "left",
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
      width: 180,
    },
    {
      dataIndex: "ProductType",
      title: "Loại hàng",
      width: 120,
    },
    {
      dataIndex: "Weight",
      title: "Cân nặng",
      align: "right",
      width: 120,
      render: (_, record) => {
        return <>{_format.getVND(record?.Weight, "")}</>;
      },
    },
    {
      dataIndex: "VolumePayment",
      title: "Số khối (m3)",
      align: "right",
      width: 120,
      render: (_, record) => {
        return <>{_format.getVND(record?.VolumePayment, " ")}</>;
      },
    },
    {
      dataIndex: "Width",
      title: "D x R x C",
      align: "right",
      width: 120,
      render: (_, record) => (
        <>{`${record.Length} x ${record.Width} x ${record.Height}`}</>
      ),
    },
    {
      dataIndex: "Description",
      title: "Ghi chú",
      width: 200,
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      width: 200,
      render: (date) => {
        return (
          <>
            <div>{_format.getVNDate(date)}</div>
          </>
        );
      },
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
