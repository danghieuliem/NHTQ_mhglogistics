import { Image } from "antd";
import React, { useRef, useState } from "react";
import { ActionButton, DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import TagStatus from "../../status/TagStatus";
import { ClientCommentForm } from "./ClientCommentForm";

export const ClientCommentList: React.FC<
  TTable<TCustomerBenefit> & { refetchcustomerComment }
> = ({ data, refetchcustomerComment }) => {
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
            className="!h-[60px] !w-[60px]"
          />
        );
      },
      width: 100,
    },
    {
      dataIndex: "Name",
      title: "Tên khách hàng",
      width: 180,
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
      width: 120,
    },
    {
      dataIndex: "Description",
      title: "Nội dung nhận xét",
    },
    // {
    //   dataIndex: "Created",
    //   title: "Ngày tạo",
    //   render: (date) => _format.getVNDate(date),
    //   width: 200,
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
      width: 120,
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
          isExpand: false,
          title: "Khách hàng nhận xét",
        }}
      />
      <ClientCommentForm
        {...{
          onCancel: () => setModal(false),
          visible: modal,
          defaultValues: item?.current,
          refetchcustomerComment: refetchcustomerComment,
        }}
      />
    </React.Fragment>
  );
};
