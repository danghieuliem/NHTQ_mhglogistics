import { FC } from "react";
import { ActionButton, DataTable } from "~/components";
import { getLevelId } from "~/configs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

export const TariffUserTable: FC<TTable<TTariffUser>> = ({
  handleModal,
  data,
  loading,
}) => {
  const columns: TColumnsType<TTariffUser> = [
    {
      dataIndex: "Name",
      title: "VIP",
      render: (_, record) => {
        const target = getLevelId?.find((x) => x.LevelId === record?.Id);
        return <TagStatus statusName={_} color={target.color} />;
      },
    },
    {
      dataIndex: "FeeBuyPro",
      title: (
        <>
          Chiết khấu
          <br />
          phí mua hàng (%)
        </>
      ),
      align: "right",
      responsive: ["sm"],
      render: (_, record) => {
        return <span>{record?.FeeBuyPro}</span>;
      },
    },
    {
      dataIndex: "FeeWeight",
      title: (
        <>
          Chiết khấu
          <br />
          phí vận chuyển TQ- VN (%)
        </>
      ),
      align: "right",
      responsive: ["sm"],
      render: (_, record) => {
        return <span>{record?.FeeWeight}</span>;
      },
    },
    {
      dataIndex: "Money",
      title: "Tích luỹ tối thiểu",
      align: "right",
      responsive: ["sm"],
      render: (_, record) => {
        return <span>{_format.getVND(record?.Money, " ")}</span>;
      },
    },
    {
      dataIndex: "MoneyTo",
      title: "Tích luỹ tối đa",
      align: "right",
      responsive: ["sm"],
      render: (_, record) => {
        return <span>{_format.getVND(record?.MoneyTo, " ")}</span>;
      },
    },
    {
      dataIndex: "LessDeposit",
      title: "Đặt cọc tối thiểu %",
      align: "right",
      responsive: ["sm"],
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
        columns,
        loading,
        data,
        // bordered: true,
      }}
    />
  );
};
