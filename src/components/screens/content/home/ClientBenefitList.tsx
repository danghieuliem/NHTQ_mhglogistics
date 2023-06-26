import { Image } from "antd";
import React, { useRef, useState } from "react";
import { ActionButton, DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import TagStatus from "../../status/TagStatus";
import { ClientBenefitForm } from "./ClientBenefitForm";

export const ClientBenefitList: React.FC<
  TTable<TCustomerBenefit> & { refetchcustomerBenefits }
> = ({ data, refetchcustomerBenefits }) => {
  const columns: TColumnsType<TCustomerBenefit> = [
    {
      dataIndex: "Id",
      title: "Vị trí",
      render: (_, __, index) => ++index,
      width: 50,
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
            className="!h-[50px] !w-[50px]"
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
        <TagStatus
          color={record?.Active ? "green" : "red"}
          statusName={record?.Active ? "Hiện" : "Ẩn"}
        />
      ),
    },
    {
      dataIndex: "ItemTypeName",
      title: "Loại",
      sorter: (a, b) => a?.ItemType - b?.ItemType,
      render(value, record, index) {
        return (
          <TagStatus color={record?.ItemType == 1 ? "magenta" : "blue"} statusName={record?.ItemTypeName} />
        );
      },
    },
    // {
    //   dataIndex: "Created",
    //   title: "Ngày tạo",
    //   render: (date) => _format.getVNDate(date),
    // },
    {
      dataIndex: "action",
      align: "right",
      title: "Thao tác",
      render: (_, record) => (
        <ActionButton
          icon="fas fa-edit text-sec"
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

  return (
    <React.Fragment>
      <DataTable
        {...{
          columns,
          data,
          title: "Danh sách quyền lợi/cam kết",
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
