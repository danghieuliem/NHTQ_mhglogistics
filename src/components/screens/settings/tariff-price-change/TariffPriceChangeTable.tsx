import { FC } from "react";
import { ActionButton, DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

export const TariffPriceChangeTable: FC<TTable<TTariffPriceChange>> = ({
  handleModal,
  data,
  loading,
}) => {
  const columns: TColumnsType<TTariffPriceChange> = [
    {
      dataIndex: "Id",
      title: "ID",
      align: "center",
    },
    {
      dataIndex: "PriceFromCNY",
      title: "Giá tệ từ (¥)",
      align: "right",
      render: (priceFromCNY) => _format.getVND(priceFromCNY, " "),
    },
    {
      dataIndex: "PriceToCNY",
      title: "Giá tệ đến (¥)",
      align: "right",
      render: (PriceToCNY) => _format.getVND(PriceToCNY, " "),
    },
    {
      dataIndex: "Vip0",
      title: "Vip 0",
      align: "center",
      responsive: ["sm"],
    },
    {
      dataIndex: "Vip1",
      title: "Vip 1",
      align: "center",
      responsive: ["sm"],
    },
    {
      dataIndex: "Vip2",
      title: "VIP 2",
      align: "center",
      responsive: ["md"],
    },
    {
      dataIndex: "Vip3",
      title: "Vip 3",
      align: "center",
      responsive: ["md"],
    },
    {
      dataIndex: "Vip4",
      title: "Vip 4",
      align: "center",
      responsive: ["md"],
    },
    {
      dataIndex: "Vip5",
      title: "Vip 5",
      align: "center",
      responsive: ["lg"],
    },
    {
      dataIndex: "Vip6",
      title: "Vip 6",
      align: "center",
      responsive: ["lg"],
    },
    {
      dataIndex: "Vip7",
      title: "Vip 7",
      align: "center",
      responsive: ["lg"],
    },
    {
      dataIndex: "Vip8",
      title: "Vip 8",
      align: "center",
      responsive: ["lg"],
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

  // const expandable = {
  // 	expandedRowRender: (record) => (
  // 		<ul className="px-2 text-xs">
  // 			<li className="sm:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Vip 0:</span>
  // 				{record.Vip0}
  // 			</li>
  // 			<li className="sm:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Vip 1:</span>
  // 				{record.Vip1}
  // 			</li>
  // 			<li className="md:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Vip 2:</span>
  // 				{record.Vip2}
  // 			</li>
  // 			<li className="md:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Vip 3:</span>
  // 				{record.Vip3}
  // 			</li>
  // 			<li className="md:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Vip 4:</span>
  // 				{record.Vip4}
  // 			</li>
  // 			<li className="lg:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Vip 5:</span>
  // 				{record.Vip5}
  // 			</li>
  // 			<li className="lg:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Vip 6:</span>
  // 				{record.Vip6}
  // 			</li>
  // 			<li className="lg:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Vip 7:</span>
  // 				{record.Vip7}
  // 			</li>
  // 			<li className="lg:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Vip 8:</span>
  // 				{record.Vip8}
  // 			</li>

  // 			<li className="xl:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Thao tác:</span>
  // 				<ActionButton
  // 					onClick={() => handleModal(record)}
  // 					icon="fas fa-edit"
  // 					title="Cập nhật"
  // 				/>
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
        // expandable: expandable,
      }}
    />
  );
};
