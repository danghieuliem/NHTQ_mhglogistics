import { Modal } from "antd";
import { FC } from "react";
import { toast } from "react-toastify";
import { warehouseFee } from "~/api";
import { ActionButton, DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";
type TProps = {
  refetch: () => void;
  handleUpdate: () => void;
  handleGetID: (id: number) => void;
  filter: {
    TotalItems: number;
    PageIndex: number;
    PageSize: number;
  };
  handleFilter: (newFiter) => void;
};

export const TariffChinaVietNamTable: FC<TTable<TTariffTQVN> & TProps> = ({
  data,
  loading,
  refetch,
  handleUpdate,
  handleGetID,
}) => {
  const columns: TColumnsType<TTariffTQVN> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 50,
      align: "right",
    },
    {
      dataIndex: "HelpMovingName",
      title: "Loại đơn hàng",
      render: (_, record) => {
        return (
          <TagStatus
            color={record.IsHelpMoving ? "#097aeb" : "#b31717"}
            statusName={record.HelpMovingName}
          />
        );
      },
      sorter: (a, b) => +a?.IsHelpMoving - +b?.IsHelpMoving,
      width: 140,
    },
    {
      dataIndex: "WareHouseFromName",
      title: "Từ kho",
    },
    {
      dataIndex: "WareHouseToName",
      title: "Đến kho",
    },
    {
      dataIndex: "WeightFrom",
      title: "Cân nặng từ",
      align: "right",
      render: (_, record) => _format.getVND(record?.WeightFrom, ""),
    },
    {
      dataIndex: "WeightTo",
      title: "Cân nặng đến",
      align: "right",
      render: (_, record) => _format.getVND(record?.WeightTo, ""),
    },
    {
      dataIndex: "Price",
      title: "Giá (VNĐ)",
      align: "right",
      render: (_, record) => _format.getVND(record?.Price, ""),
    },
    {
      dataIndex: "ShippingTypeToWareHouseName",
      title: "Hình thức vc",
      // render: (_, record) => record.ShippingType,
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      render: (_, record) => {
        return (
          <>
            <ActionButton
              onClick={() => {
                handleGetID(record?.Id);
                handleUpdate();
              }}
              icon="fas fa-edit"
              title="Cập nhật"
            />

            <ActionButton
              onClick={() =>
                Modal.confirm({
                  title: "Xác nhận xóa cấu hình này?",
                  onOk: () => {
                    warehouseFee.delete(record.Id);
                    toast.success("Xóa thành công!");
                    refetch();
                  },
                })
              }
              icon="fas fa-trash !text-red"
              title="Xóa"
            />
          </>
        );
      },
    },
  ];

  return (
    <DataTable
      {...{
        columns,
        data,
        loading,
        bordered: true,
        // expandable: expandable,
        scroll: { y: 700 },
      }}
    />
  );
};
