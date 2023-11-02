import React from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { smallPackage } from "~/api";
import { ActionButton } from "~/components";
import { DataTable } from "~/components/globals/table";
import TagStatus from "~/components/screens/status/TagStatus";
import { smallPackageStatus } from "~/configs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

export const PackageManagementFormTable: React.FC<
  TTable<TSmallPackage> & { refetch }
> = ({ data, handleModal, loading, refetch }) => {
  const mutationUpdate = useMutation(smallPackage.update);

  const columns: TColumnsType<TSmallPackage> = [
    {
      dataIndex: "Id",
      align: "center",
      title: "STT",
      responsive: ["lg"],
      render: (_, __, index) => index + 1,
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
      responsive: ["lg"],
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
      render: (fee) => _format.getYuan(fee, ""),
    },
    {
      dataIndex: "Weight",
      align: "right",
      title: "Cận nặng kg",
      responsive: ["lg"],
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
          color={smallPackageStatus.find((x) => x.id === status)?.color}
          statusName={smallPackageStatus.find((x) => x.id === status)?.name}
        />
      ),
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      width: 90,
      responsive: ["sm"],
      render: (_, record) => {
        return (
          <ActionButton
            title="Xoá mã"
            icon="fas fa-trash-alt !text-red"
            onClick={() => {
              const id = toast.loading("Đang xử lý ...");

              mutationUpdate
                .mutateAsync([{ ...record, BigPackageId: 0 }])
                .then(() => {
                  toast.update(id, {
                    render: "Gán vào bao thành công!",
                    type: "success",
                    autoClose: 500,
                    isLoading: false,
                  });
                  refetch();
                })
                .catch((error) => {
                  toast.update(id, {
                    render: (error as any)?.response?.data?.ResultMessage,
                    type: "error",
                    autoClose: 1000,
                    isLoading: false,
                  });
                });
            }}
          />
        );
      },
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
