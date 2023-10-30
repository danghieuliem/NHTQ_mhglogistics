import { Table } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";
import Link from "next/link";

export const OutStockFormTableDetail: React.FC<
  TTable<TOutStockSessionPackages> & { totalMustPay; dataAll }
> = ({ data, loading, totalMustPay, dataAll }) => {
  const columns: TColumnsType<TOutStockSessionPackages> = [
    {
      dataIndex: "MainOrderID",
      title: "ID đơn",
      width: 100,
      render: (_, record) => {
        return (
          <Link
            href={
              Number(record?.MainOrderID)
                ? `/manager/order/order-list/detail/?id=${Number(
                    record?.MainOrderID
                  )}`
                : `/manager/deposit/deposit-list/detail/?id=${Number(
                    record?.TransportationID
                  )}`
            }
            passHref
          >
            <a target="_blank">
              {Number(record?.MainOrderID)
                ? record?.MainOrderID
                : record?.TransportationID}
            </a>
          </Link>
        );
      },
    },
    {
      dataIndex: "SmallPackage",
      title: "Loại đơn hàng",
      render(_, record, ___) {
        // return <div>{record?.SmallPackage?.MainOrderCode.split(":")[0]}</div>;
        return (
          <TagStatus
            color={record?.SmallPackage?.OrderType === 3 ? "red" : "green"}
            statusName={
              record?.SmallPackage?.OrderType === 3 ? "Trôi nổi" : "Ký gửi"
            }
          />
        );
      },
      width: 120,
    },
    {
      dataIndex: "SmallPackage",
      title: "Mã kiện",
      render: (record) => record.OrderTransactionCode,
      width: 200,
    },
    {
      dataIndex: "SmallPackage",
      title: (
        <>
          Cân nặng
          <br />
          (kg)
        </>
      ),
      align: "right",
      width: 120,
      render: (smallpackage: TSmallPackage) =>
        smallpackage.Weight && smallpackage.Weight.toFixed(2),
    },
    {
      dataIndex: "SmallPackage",
      title: (
        <>
          Số khối
          <br />
          (m3)
        </>
      ),
      align: "right",
      width: 120,
      render: (smallpackage: TSmallPackage) =>
        smallpackage.VolumePayment && smallpackage.VolumePayment.toFixed(5),
    },
    {
      dataIndex: "SmallPackage",
      align: "right",
      width: 200,
      title: (
        <>
          Kích thước
          <br />
          (D x R x C)
        </>
      ),
      render: (_, record, index) => {
        return `${record.SmallPackage.Length ?? 0} x ${
          record.SmallPackage.Width ?? 0
        } x ${record.SmallPackage.Height ?? 0}`;
      },
    },
    // {
    //   dataIndex: "SmallPackage",
    //   align: "right",
    //   title: () => (
    //     <React.Fragment>
    //       Cân quy
    //       <br />
    //       đổi (kg)
    //     </React.Fragment>
    //   ),
    //   render: (_, record, index) => {
    //     return record.SmallPackage.Volume;
    //   },
    // },
    // {
    //   dataIndex: "SmallPackage",
    //   align: "right",
    //   title: () => (
    //     <React.Fragment>
    //       Cân tính
    //       <br />
    //       tiền (kg)
    //     </React.Fragment>
    //   ),
    //   render: (_, record, index) => {
    //     return record.SmallPackage.PayableWeight;
    //   },
    // },
    {
      dataIndex: "IsPayment",
      title: "Trạng thái thanh toán",
      render: (record) => {
        return (
          <TagStatus
            color={record ? "#388E3C" : "#D32F2F"}
            statusName={record ? "Đã thanh toán" : "Chưa thanh toán"}
          />
        );
      },
    },
    {
      dataIndex: "OrderRemaining",
      title: "Số tiền cần thanh toán (VNĐ)",
      align: "right",
      render: (price) => _format.getVND(price, " "),
    },
  ];

  const summary = (data: TOutStockSessionPackages[]) => {
    return (
      <>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={7}>
            <b>Tổng số khối</b>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1} colSpan={1} align="right">
            <Text type="danger">
              {data
                .reduce(
                  (prev, cur) => prev + cur?.SmallPackage?.VolumePayment,
                  0
                )
                .toFixed(5) + " m3"}
            </Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={7}>
            <b>Tổng cân nặng</b>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1} colSpan={1} align="right">
            <Text type="danger">
              {data
                .reduce(
                  (prev, cur) => prev + cur?.SmallPackage?.PayableWeight,
                  0
                )
                .toFixed(2) + " KG"}
            </Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={7}>
            <b>Số dư tài khoản khách</b>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1} colSpan={1} align="right">
            {_format.getVND(dataAll?.UserWallet)}
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={7}>
            <b>Tổng tiền cần thanh toán</b>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1} colSpan={1} align="right">
            <Text type="danger">
              {/* {_format.getVND(totalMustPay)} */}
              {_format.getVND(dataAll?.TotalPay)}
            </Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </>
    );
  };

  return (
    <DataTable
      {...{
        isExpand: false,
        data: data,
        columns: columns,
        loading: loading,
        summary: !!data?.length ? summary : undefined,
        scroll: { x: 1200, y: 600 },
      }}
    />
  );
};
