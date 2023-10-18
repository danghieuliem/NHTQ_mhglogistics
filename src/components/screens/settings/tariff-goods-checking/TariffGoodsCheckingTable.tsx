import { FC } from "react";
import { ActionButton, DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "../../../../utils/index";

export const TariffGoodsCheckingTable: FC<TTable<any>> = ({
  handleModal,
  data,
  loading,
}) => {
  const columns: TColumnsType<any> = [
    {
      dataIndex: "Id",
      title: "ID",
      align: "right",
    },
    {
      dataIndex: "AmountFrom",
      title: "Số lượng từ",
      align: "right",
      sorter: (a, b) => a.Id - b.Id,
    },
    {
      dataIndex: "AmountTo",
      title: "Số lượng đến",
      align: "right",
      render: (_, record) => {
        return <>{_format.getVND(record.AmountTo, "")}</>;
      },
    },
    // {
    // 	dataIndex: "TypeName",
    // 	title: "Tên loại phí",
    // 	align: "center",
    // 	responsive: ["sm"],
    // 	render: (feeName) => {
    // 		const isGreater = feeName.split(" ")[0] === ">=";
    // 		return (
    // 			<Tag
    // 				style={{
    // 					backgroundColor: isGreater ? "#bdbdff" : "#fbbaba",
    // 					color: "#333",
    // 				}}
    // 			>
    // 				{feeName}
    // 			</Tag>
    // 		);
    // 	},
    // },
    {
      dataIndex: "Fee",
      title: "Mức phí",
      align: "right",
      render: (fee) => {
        return <>{_format.getVND(fee)}</>;
      },
    },
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
      }}
    />
  );
};
