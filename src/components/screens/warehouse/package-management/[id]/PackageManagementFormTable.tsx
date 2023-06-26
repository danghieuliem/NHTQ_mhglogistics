import React from "react";
import { DataTable } from "~/components/globals/table";
import TagStatus from "~/components/screens/status/TagStatus";
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
        <TagStatus
          color={smallPackageStatusData.find((x) => x.id === status).color}
          statusName={smallPackageStatusData.find((x) => x.id === status).name}
        />
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
  return <DataTable loading={loading} data={data} columns={columns} />;
};
