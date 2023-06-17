import { Skeleton, Tag } from "antd";
import React from "react";
import { ActionButton } from "~/components";
import { DataTable } from "~/components/globals/table";
import { smallPackageStatusData } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

export const PackageManagementFormTable: React.FC<
  TTable<TSmallPackage>
> & {} = ({ data, handleModal, loading }) => {
  const columns: TColumnsType<TSmallPackage> = [
    {
      dataIndex: "Id",
      align: "center",
      title: "STT",
      render: (_, __, index) => ++index,
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      render: (date) => {
        return (
          <>
            <div>{_format.getShortVNDate(date)}</div>
            <div>{_format.getTime(date)}</div>
          </>
        );
      },
      responsive: ["xl"],
    },
    {
      dataIndex: "OrderTransactionCode",
      title: "Mã vận đơn",
    },
    {
      dataIndex: "ProductType",
      title: "Loại hàng",
      responsive: ["sm"],
    },
    {
      dataIndex: "FeeShip",
      align: "right",
      title: "Phí ship tệ",
      responsive: ["md"],
      render: (fee) => _format.getVND(fee, ""),
    },
    {
      dataIndex: "Weight",
      align: "right",
      title: "Cận nặng kg",
      responsive: ["lg"],
      render: (fee) => _format.getVND(fee, ""),
    },
    // {
    //   dataIndex: "Volume",
    //   align: "right",
    //   title: "Cân quy đổi",
    //   responsive: ["xl"],
    //   render: (fee) => _format.getVND(fee, ""),
    // },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status) => (
        <Tag color={smallPackageStatusData.find((x) => x.id === status).color}>
          {smallPackageStatusData.find((x) => x.id === status).name}
        </Tag>
      ),
      responsive: ["xl"],
    },
    // {
    // 	dataIndex: 'action',
    // 	align: 'right',
    // 	title: 'Thao tác',
    // 	render: (_, record) => (
    // 		<ActionButton
    // 			onClick={() => handleModal(record)}
    // 			icon="fas fa-edit"
    // 			title="Cập nhật"
    // 		/>
    // 	),
    // 	responsive: ['xl']
    // }
  ];

  const expandable = {
    expandedRowRender: (record) => (
      <ul className="px-2 text-xs">
        <li className="sm:hidden justify-between flex py-2">
          <span className="font-medium mr-4">Loại hàng:</span>
          {record.category}
        </li>
        <li className="md:hidden justify-between flex py-2">
          <span className="font-medium mr-4">Phí ship (tệ):</span>
          {record.ship}
        </li>
        <li className="lg:hidden justify-between flex py-2">
          <span className="font-medium mr-4">Cân nặng (kg):</span>
          {record.kg}
        </li>
        <li className="xl:hidden justify-between flex py-2">
          <span className="font-medium mr-4">Khối (m3):</span>
          {record.m3}
        </li>
        <li className="xl:hidden justify-between flex py-2">
          <span className="font-medium mr-4">Trạng thái:</span>
          {/* <Tag color={record.Status === 1 ? 'green' : 'yellow'}>{record.StatusName}</Tag>{' '} */}
        </li>
        <li className="xl:hidden justify-between flex py-2">
          <span className="font-medium mr-4">Ngày tạo:</span>
          {_format.getVNDate(record.created)}
        </li>
        <li className="xl:hidden justify-between flex py-2">
          <span className="font-medium mr-4">Thao tác:</span>
          <ActionButton
            onClick={() => handleModal(record)}
            icon="fas fa-edit"
            title="Cập nhật"
          />{" "}
        </li>
      </ul>
    ),
  };

  return (
    <DataTable
      loading={loading}
      data={data}
      columns={columns}
      bordered
      expandable={expandable}
    />
  );
};
