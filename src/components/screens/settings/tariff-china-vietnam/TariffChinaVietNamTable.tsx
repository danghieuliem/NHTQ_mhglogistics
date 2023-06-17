import { Modal, Tag } from "antd";
import { FC } from "react";
import { toast } from "react-toastify";
import { warehouseFee } from "~/api";
import { ActionButton, DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
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
  handleModal,
  filter,
  handleFilter,
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
    },
    {
      dataIndex: "HelpMovingName",
      title: "Loại đơn hàng",
      render: (_, record) => {
        return (
          <Tag color={record.IsHelpMoving ? "#097aeb" : "#b31717"}>
            {record.HelpMovingName}
          </Tag>
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
              icon="fas fa-trash"
              title="Xóa"
            />
          </>
        );
      },
    },
  ];

  // const expandable = {
  //   expandedRowRender: (record) => (
  //     <ul className="px-2 text-xs">
  //       <li className="sm:hidden py-2 flex justify-between">
  //         <span className="font-medium mr-4">Đến kho:</span>
  //         {record.WareHouseToName}
  //       </li>
  //       <li className="md:hidden py-2 flex justify-between">
  //         <span className="font-medium mr-4">Cân nặng từ:</span>
  //         {record.WeightFrom}
  //       </li>
  //       <li className="lg:hidden py-2 flex justify-between">
  //         <span className="font-medium mr-4">Cân nặng đến:</span>
  //         {record.WeightTo}
  //       </li>
  //       <li className="lg:hidden py-2 flex justify-between">
  //         <span className="font-medium mr-4">Giá (vnđ):</span>
  //         {record.Price}
  //       </li>
  //       <li className="xl:hidden py-2 flex justify-between">
  //         <span className="font-medium mr-4">Hình thức vận chuyển:</span>
  //         {record.ShippingType}
  //       </li>
  //       <li className="xl:hidden py-2 flex justify-between">
  //         <span className="font-medium mr-4">Loại đơn hàng:</span>
  //         <div>
  //           <Tag color={record.Status === 1 ? "blue" : "red"}>
  //             {record.Status === 1 ? "Đơn ký gửi" : "Đơn hàng mua hộ"}
  //           </Tag>
  //         </div>
  //       </li>

  //       <li className="xl:hidden py-2 flex justify-between">
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
    <>
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
      {/* <div className="mt-4 text-right">
				<Pagination
					total={filter?.TotalItems}
					current={filter?.PageIndex}
					pageSize={filter?.PageSize}
					onChange={(page, pageSize) => handleFilter({...filter, PageIndex: page, PageSize: pageSize})}
				/>
			</div> */}
    </>
  );
};
