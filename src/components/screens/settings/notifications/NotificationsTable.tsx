import { FC } from "react";
import { ActionButton, DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";

export const NotificationsTable: FC<TTable<any>> = ({
  handleModal,
  data,
  pagination,
  loading,
  handlePagination,
}) => {
  const columns: TColumnsType<TSettingNotification> = [
    {
      dataIndex: "Id",
      key: "Id",
      title: "ID",
      align: "right",
    },
    {
      dataIndex: "Name",
      key: "Name",
      title: "Tên thông báo",
    },
    {
      dataIndex: "IsNotifyAdmin",
      key: "IsNotifyAdmin",
      title: "Admin",
      align: "center",
      render: (isChecked) => {
        return (
          <i
            className={`xl:text-base text-sm fas ${
              isChecked ? "fa-check text-green" : "fa-minus text-[#fca7a7]"
            }`}
          ></i>
        );
      },
    },
    {
      dataIndex: "IsNotifyAccountant",
      key: "IsNotifyAccountant",
      title: "Kế toán",
      align: "center",
      render: (isChecked) => {
        return (
          <i
            className={`xl:text-base text-sm fas ${
              isChecked ? "fa-check text-green" : "fa-minus text-[#fca7a7]"
            }`}
          ></i>
        );
      },
    },
    {
      dataIndex: "IsNotifySaler",
      key: "IsNotifySaler",
      title: "Bán hàng",
      align: "center",
      render: (isChecked) => {
        return (
          <i
            className={`xl:text-base text-sm fas ${
              isChecked ? "fa-check text-green" : "fa-minus text-[#fca7a7]"
            }`}
          ></i>
        );
      },
    },
    {
      dataIndex: "IsNotifyWarehoue",
      key: "IsNotifyWarehoue",
      title: "Kho VN",
      align: "center",
      render: (isChecked) => {
        return (
          <i
            className={`xl:text-base text-sm fas ${
              isChecked ? "fa-check text-green" : "fa-minus text-[#fca7a7]"
            }`}
          ></i>
        );
      },
    },
    {
      dataIndex: "IsNotifyWarehoueFrom",
      key: "IsNotifyWarehoueFrom",
      title: "Kho TQ",
      align: "center",
      render: (isChecked) => {
        return (
          <i
            className={`xl:text-base text-sm fas ${
              isChecked ? "fa-check text-green" : "fa-minus text-[#fca7a7]"
            }`}
          ></i>
        );
      },
    },
    {
      dataIndex: "IsNotifyUser",
      key: "IsNotifyUser",
      title: "User",
      align: "center",
      render: (isChecked) => {
        return (
          <i
            className={`xl:text-base text-sm fas ${
              isChecked ? "fa-check text-green" : "fa-minus text-[#fca7a7]"
            }`}
          ></i>
        );
      },
    },
    {
      dataIndex: "IsEmailAdmin",
      key: "IsEmailAdmin",
      title: "Gửi mail admin",
      align: "center",
      render: (isChecked) => {
        return (
          <i
            className={`xl:text-base text-sm fas ${
              isChecked ? "fa-check text-green" : "fa-minus text-[#fca7a7]"
            }`}
          ></i>
        );
      },
    },
    // {
    // 	dataIndex: 'IsEmailUser',
    // 	key: 'IsEmailUser',
    // 	title: 'Gửi mail user',
    // 	align: 'center',
    // 	render: (isChecked) => {
    // 		return <i className={`xl:text-base text-sm fas ${isChecked ? "fa-check text-green" : "fa-minus text-[#fca7a7]"}`}></i>
    // 	},
    //
    // },
    {
      dataIndex: "action",
      key: "action",
      title: "Thao tác",
      align: "right",
      render: (_, record) => (
        <ActionButton
          onClick={() => handleModal(record)}
          icon="fas fa-edit"
          title="Cập nhật"
        />
      ),
    },
  ];

  return (
    <DataTable
      {...{
        loading,
        columns,
        data,
        bordered: true,
        pagination: data?.length === 0 ? null : pagination,
        onChange: handlePagination,
      }}
    />
  );
};
