import { Space } from "antd";
import { FC } from "react";
import { ActionButton, DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

export const BanksTable: FC<TTable<TBank>> = ({
  handleModal,
  data,
  loading,
}) => {
  const columns: TColumnsType<TBank> = [
    {
      dataIndex: "Id",
      title: "ID",
      align: "right"
    },
    {
      dataIndex: "BankName",
      title: "Tên ngân hàng",
    },
    {
      dataIndex: "Branch",
      title: "Chủ tài khoản",
      responsive: ["sm"],
    },
    {
      dataIndex: "BankNumber",
      title: "Số tài khoản",
      align: "right",
      responsive: ["md"],
    },
    {
      dataIndex: "Name",
      title: "Chi nhánh",
      responsive: ["md"],
    },
    {
      dataIndex: "Updated",
      title: "Lần cuối thay đổi",
      render: (_, record) => {
        return _format.getVNDate(record.Updated ?? record.Created);
      },
      responsive: ["lg"],
    },
    {
      dataIndex: "Active",
      title: "Trạng thái",
      align: "right",
      render: (_, record) => {
        return (
          <TagStatus
            color={record?.Active ? "blue" : "red"}
            statusName={record?.Active ? "Hiện" : "Ẩn"}
          />
        );
      },
    },
    {
      dataIndex: "action",
      key: "action",
      title: "Thao tác",
      align: "right",
      render: (_, record) => (
        <Space>
          <ActionButton
            onClick={() => handleModal(record, "update")}
            icon="fas fa-edit"
            title="Cập nhật"
          />
        </Space>
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
        // pagination,
        // onChange: handlePagination,
        // expandable: expandable,
      }}
    />
  );
};
