import { Space, Tag } from "antd";
import { FC } from "react";
import { ActionButton, DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

export const BanksTable: FC<TTable<TBank>> = ({
  handleModal,
  handleConfirm,
  data,
  pagination,
  handlePagination,
  loading,
}) => {
  const columns: TColumnsType<TBank> = [
    {
      dataIndex: "Id",
      title: "ID",
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
          <Tag color={record?.Active ? "blue" : "red"}>
            {record?.Active ? "Hiện" : "Ẩn"}
          </Tag>
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

  // const expandable = {
  // 	expandedRowRender: (record) => (
  // 		<ul className="px-2 text-xs">
  // 			<li className="sm:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Chủ tài khoản:</span>
  // 				{record.Branch}
  // 			</li>
  // 			<li className="md:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Số tài khoản:</span>
  // 				{record.BankNumber}
  // 			</li>
  // 			<li className="md:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Chi nhánh:</span>
  // 				{record.Name}
  // 			</li>
  // 			<li className="lg:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Lần cuối thay đổi:</span>
  // 				<div className="w-full text-right">
  // 					{_format.getVNDate(record.Updated)}
  // 				</div>
  // 			</li>
  // 			<li className="xl:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Thao tác:</span>
  // 				<Space>
  // 					<ActionButton
  // 						onClick={() => handleModal(record, "update")}
  // 						icon="fas fa-edit"
  // 						title="Cập nhật"
  // 					/>
  // 				</Space>
  // 			</li>
  // 		</ul>
  // 	),
  // };

  return (
    <DataTable
      {...{
        loading,
        columns,
        data,
        bordered: true,
        pagination,
        onChange: handlePagination,
        // expandable: expandable,
      }}
    />
  );
};
