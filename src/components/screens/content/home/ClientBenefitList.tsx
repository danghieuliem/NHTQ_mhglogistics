import { Tag, Image } from "antd";
import React, { useRef, useState } from "react";
import { ActionButton, DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import { ClientBenefitForm } from "./ClientBenefitForm";

export const ClientBenefitList: React.FC<
  TTable<TCustomerBenefit> & { refetchcustomerBenefits }
> = ({ data, refetchcustomerBenefits }) => {
  const columns: TColumnsType<TCustomerBenefit> = [
    {
      dataIndex: "Id",
      title: "Vị trí",
      render: (_, __, index) => ++index,
      width: 70
    },
    {
      dataIndex: "IMG",
      align: "center",
      title: "Ảnh",
      render: (_, record) => {
        return (
          <Image
            src={record?.IMG ? record.IMG : "/default/pro-empty.jpg"}
            preview={false}
            className="!h-[30px] !w-[30px]"
          />
        );
      },
    },
    {
      dataIndex: "Name",
      title: "Tên quyền lợi",
    },
    {
      dataIndex: "Active",
      title: "Trạng thái",
      render: (_, record) => (
        <Tag color={record?.Active ? "green" : "red"}>
          {record?.Active ? "Hiện" : "Ẩn"}
        </Tag>
      ),
    },
    {
      dataIndex: "ItemTypeName",
      title: "Loại",
      sorter: (a, b) => a?.ItemType - b?.ItemType,
      render(value, record, index) {
        return (
          <Tag color={record?.ItemType == 1 ? "magenta" : "geekblue"}>
            {record?.ItemTypeName}
          </Tag>
        );
      },
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: "action",
      align: "right",
      title: "Thao tác",
      render: (_, record) => (
        <ActionButton
          icon="fas fa-edit"
          onClick={() => handleModal(record)}
          title="Cập nhật"
        />
      ),
    },
  ];

  const item = useRef<TCustomerBenefit>();
  const [modal, setModal] = useState(false);
  const handleModal = (itemSelected: TCustomerBenefit) => {
    item.current = itemSelected;
    setModal(true);
  };

  // const expandable = {
  //   expandedRowRender: (record) => (
  //     <ul className="px-2 text-xs">
  //       <li className="sm:hidden flex justify-between py-2">
  //         <span className="font-medium mr-4">Trạng thái:</span>
  //         <Tag color={record.Active ? "green" : "red"}>
  //           {record.Active ? "Hiện" : "Ẩn"}
  //         </Tag>
  //       </li>
  //       <li className="md:hidden flex justify-between py-2">
  //         <span className="font-medium mr-4">Vị trí:</span>
  //         {record.index}
  //       </li>
  //       <li className="lg:hidden flex justify-between py-2">
  //         <span className="font-medium mr-4">Loại:</span>
  //         {record.ItemTypeName}
  //       </li>
  //       <li className="xl:hidden flex justify-between py-2">
  //         <span className="font-medium mr-4">Ngày tạo:</span>
  //         {_format.getVNDate(record.Created)}
  //       </li>
  //       <li className="xl:hidden flex justify-between py-2">
  //         <span className="font-medium mr-4">Thao tác:</span>
  //         <ActionButton
  //           icon="fas fa-edit"
  //           onClick={() => handleModal(record)}
  //           title="Cập nhật"
  //         />
  //       </li>
  //     </ul>
  //   ),
  // };

  return (
    <React.Fragment>
      <DataTable
        {...{
          columns,
          data,
          title: "DANH SÁCH QUYỀN LỢI KHÁCH HÀNG",
          // expandable: expandable,
        }}
      />
      <ClientBenefitForm
        {...{
          onCancel: () => setModal(false),
          visible: modal,
          defaultValues: item?.current,
          refetchcustomerBenefits: refetchcustomerBenefits,
        }}
      />
    </React.Fragment>
  );
};
