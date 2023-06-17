import { Table, Tag } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

export const OutStockFormTableDetail: React.FC<
  TTable<TOutStockSessionPackages> & { totalMustPay; dataAll }
> = ({ data, loading, totalMustPay, dataAll }) => {
  const columns: TColumnsType<TOutStockSessionPackages> = [
    {
      dataIndex: "MainOrderID",
      title: "ID đơn",
    },
    {
      dataIndex: "SmallPackage",
      title: "Loại đơn hàng",
      render(_, record, ___) {
        return <div>{record?.SmallPackage?.MainOrderCode.split(":")[0]}</div>;
      },
    },
    {
      dataIndex: "SmallPackage",
      title: "Mã kiện",
      render: (record) => record.OrderTransactionCode,
    },
    {
      dataIndex: "SmallPackage",
      title: "Cân nặng (kg)",
      align: "right",
      render: (smallpackage: TSmallPackage) =>
        smallpackage.Weight && _format.getVND(smallpackage.Weight, ""),
    },
    {
      dataIndex: "SmallPackage",
      title: "Số khối (m3)",
      align: "right",
      render: (smallpackage: TSmallPackage) =>
        smallpackage.VolumePayment &&
        _format.getVND(smallpackage.VolumePayment, ""),
    },
    {
      dataIndex: "SmallPackage",
      align: "right",
      width: 105,
      title: () => <React.Fragment>Kích thước (D x R x C)</React.Fragment>,
      render: (_, record, index) => {
        return `${record.SmallPackage.Length ?? 0} x ${
          record.SmallPackage.Width ?? 0
        } x ${record.SmallPackage.Height ?? 0}`;
      },
      responsive: ["lg"],
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
          <Tag color={record ? "#388E3C" : "#D32F2F"}>
            {record ? "Đã thanh toán" : "Chưa thanh toán"}
          </Tag>
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
            <b>Tổng cân nặng</b>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1} colSpan={1} align="right">
            <Text type="danger">
              {_format.getVND(
                data.reduce(
                  (prev, cur) => prev + cur?.SmallPackage?.PayableWeight,
                  0
                ),
                " KG"
              ) || "0 KG"}
            </Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={7}>
            <b>Tổng số khối</b>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1} colSpan={1} align="right">
            <Text type="danger">
              {_format.getVND(
                data.reduce(
                  (prev, cur) => prev + cur?.SmallPackage?.VolumePayment,
                  0
                ),
                " m3"
              ) || "0 KG"}
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
    <div className="mt-6">
      <DataTable
        {...{
          data: data,
          columns: columns,
          loading: loading,
          summary: !!data?.length ? summary : undefined,
        }}
      />
    </div>
  );
};
