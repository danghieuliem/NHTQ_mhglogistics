import { FC } from "react";
import { ActionButton, DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

export const TariffBuyProTable: FC<TTable<TTariffBuyPro>> = ({
  handleModal,
  data,
  loading,
}) => {
  const columns: TColumnsType<TTariffBuyPro> = [
    {
      dataIndex: "Id",
      title: "ID",
    },
    {
      dataIndex: "PriceFrom",
      title: "Giá từ",
      align: "right",
      render: (price) => _format.getVND(price),
    },
    {
      dataIndex: "PriceTo",
      title: "Giá đến",
      align: "right",
      render: (price) => _format.getVND(price),
    },
    {
      dataIndex: "FeePercent",
      title: "Phần trăm",
      align: "right",
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      render: (_, record) => (
        <ActionButton
          onClick={() => handleModal(record)}
          icon="fas fa-edit md:text-base text-xs"
          title="Cập nhật"
        />
      ),
    },
  ];

  // const expandable = {
  //   expandedRowRender: (record) => (
  //     <ul className="px-2 text-xs">
  //       <li className="md:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Phần trăm:</span>
  //         {record.FeePercent}
  //       </li>
  //       <li className="xl:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Thao tác:</span>
  //         <ActionButton
  //           onClick={() => handleModal(record)}
  //           icon="fas fa-edit md:text-base text-xs"
  //           title="Cập nhật"
  //         />
  //       </li>
  //     </ul>
  //   ),
  // };

  return (
    <DataTable
      {...{
        columns,
        loading,
        data,
        bordered: true,
        // expandable: expandable,
      }}
    />
  );
};
