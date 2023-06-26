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
      align: "right"
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
      align: 'right',
      render: (_, record) => (
        <ActionButton
          onClick={() => handleModal(record)}
          icon="fas fa-edit"
          title="Cập nhật"
        />
      ),
    },
  ];

  // const expandable = {
  //   expandedRowRender: (record) => (
  //     <ul className="px-2 text-xs">
  //       <li className="xl:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Số lượng từ: </span>
  //         <span style={{ backgroundColor: "blue" }}>{record.AmountFrom}</span>
  //       </li>
  //       <li className="xl:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Số lượng đến: </span>
  //         {record.AmountTo}
  //       </li>
  //       <li className="sm:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Mức phí: </span>
  //         {record.Fee}
  //       </li>
  //       <li className="xl:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Tên loại phí:</span>
  //         {record.TypeName}
  //       </li>

  //       <li className="xl:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Thao tác:</span>
  //         <ActionButton
  //           onClick={() => handleModal(record)}
  //           icon="fas fa-edit"
  //           title="Cập nhật"
  //         />
  //       </li>
  //     </ul>
  //   ),
  // };

  return (
    <DataTable
      {...{
        loading,
        columns,
        data,
        bordered: true,
        // expandable: expandable,
      }}
    />
  );
};
