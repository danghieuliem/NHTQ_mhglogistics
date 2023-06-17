import { Checkbox, Tag } from "antd";
import React from "react";
import { DataTable } from "~/components";
import { transportStatus } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

export const DepositDetail: React.FC<TTable<TUserDeposit>> = ({ data }) => {
  const columns: TColumnsType<TUserDeposit> = [
    {
      dataIndex: "Id",
      title: "ID",
    },
    {
      dataIndex: "OrderTransactionCode",
      title: "Mã vận đơn",
      align: "right",
      render: (_, record) => {
        return <>{record?.OrderTransactionCode}</>;
      },
    },
    {
      dataIndex: "Category",
      title: "Loại hàng hóa",
      responsive: ["xl"],
    },
    {
      dataIndex: "Amount",
      title: "Số lượng",
      align: "right",
      render: (_, record) => <div>{_format.getVND(record?.Amount, "")}</div>,
    },
    {
      dataIndex: "PayableWeight",
      title: (
        <>
          Cân nặng <br /> (KG)
        </>
      ),
      align: "right",
      render: (weight) => _format.getVND(weight, " "),
    },
    {
      dataIndex: "VolumePayment",
      title: (
        <>
          Số khối <br /> (m3)
        </>
      ),
      align: "right",
      render: (VolumePayment) => {
        return _format.getVND(VolumePayment, " ");
      },
    },
    {
      dataIndex: "IsCheckProduct",
      title: "Kiểm đếm",
      align: "center",
      render: (_, record) => {
        return <Checkbox disabled checked={record?.IsCheckProduct} />;
      },
    },
    {
      dataIndex: "IsPacked",
      title: "Đóng gỗ",
      align: "center",
      render: (_, record) => <Checkbox disabled checked={record?.IsPacked} />,
    },
    {
      dataIndex: "IsInsurance",
      title: "Bảo hiểm",
      align: "center",
      render: (_, record) => (
        <Checkbox disabled checked={record?.IsInsurance} />
      ),
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status, _) => {
        const color = transportStatus.find((x) => x.id === status);
        return (
          <Tag color={color?.color} key={status}>
            {_?.StatusName}
          </Tag>
        );
      },
    },
  ];

  // const expandable = {
  //   expandedRowRender: (record) => (
  //     <ul className="px-2 text-xs">
  //       <li className="sm:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Mã vận đơn:</span>
  //         {record.OrderTransactionCode}
  //       </li>
  //       <li className="lg:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Cân nặng:</span>
  //         {_format.getVND(record.Weight, "KG")}
  //       </li>
  //       <li className="lg:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Kho TQ:</span>
  //         {record.WareHouseFrom}
  //       </li>
  //       <li className="lg:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Kho VN:</span>
  //         {record.WareHouseTo}
  //       </li>
  //       <li className="lg:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">PTVC:</span>
  //         {record.ShippingTypeName}
  //       </li>
  //       <li className="xl:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Cước vật tư:</span>
  //         {_format.getVND(record.SensorFeeVND)}
  //       </li>
  //       <li className="xl:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">PP mặt hàng ĐB:</span>
  //         {_format.getVND(record.AdditionFeeVND)}
  //       </li>
  //       <li className="xl:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Ngày tạo:</span>
  //         {_format.getVNDate(record.Created)}
  //       </li>
  //       <li className="xl:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Ngày về đến kho đích:</span>
  //         {_format.getVNDate(record.DateInVNWareHouse)}
  //       </li>
  //       <li className="xl:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Ngày yêu cầu xuất kho:</span>
  //         {_format.getVNDate(record.DateExportRequest)}
  //       </li>
  //       <li className="xl:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Ngày xuất kho:</span>
  //         {_format.getVNDate(record.DateExport)}
  //       </li>
  //       <li className="xl:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Trạng thái:</span>
  //         {
  //           <Tag
  //             color={orderStatusData.find((x) => x.id === record.Status)?.color}
  //           >
  //             {orderStatusData.find((x) => x.id === record.Status)?.name}
  //           </Tag>
  //         }
  //       </li>

  //       <li className="xl:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Thao tác:</span>

  //         <Link href={`/manager/deposit/deposit-list/${record.id}`}>
  //           <a>
  //             <ActionButton
  //               onClick={undefined}
  //               icon="fas fa-edit"
  //               title="Cập nhật"
  //             />
  //           </a>
  //         </Link>
  //       </li>
  //     </ul>
  //   ),
  // };

  return (
    <DataTable
      {...{
        columns,
        data: data,
        bordered: true,
        // expandable: expandable,
      }}
    />
  );
};
