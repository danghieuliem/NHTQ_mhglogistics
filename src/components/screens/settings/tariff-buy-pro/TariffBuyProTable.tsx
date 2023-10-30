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
      align: "right",
    },
    {
      dataIndex: "PriceFrom",
      title: "Giá từ",
      align: "right",
      render: (price) => _format.getVND(price, " "),
    },
    {
      dataIndex: "PriceTo",
      title: "Giá đến",
      align: "right",
      render: (price) => _format.getVND(price, " "),
    },
    {
      dataIndex: "FeePercent",
      title: "Phần trăm",
      align: "right",
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      render: (_, record) => (
        <ActionButton
          onClick={() => handleModal(record)}
          icon="fas fa-edit md:text-base text-xs"
          title="Cập nhật"
        />
      ),
    },
  ];

  return (
    <DataTable
      {...{
        isExpand: false,
        columns,
        loading,
        data,
        bordered: true,
      }}
    />
  );
};
