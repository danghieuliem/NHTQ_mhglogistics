import React, { useRef, useState } from "react";
import { ActionButton, DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import TagStatus from "../../status/TagStatus";
import { ServiceForm } from "./ServiceForm";

export const ServiceList: React.FC<TTable<TService> & { refetchService }> = ({
  data,
  refetchService,
}) => {
  const columns: TColumnsType<TService> = [
    {
      dataIndex: "Id",
      title: "Vị trí",
      render: (_, __, index) => ++index,
      width: 50,
      align: "right",
    },
    {
      dataIndex: "IMG",
      align: "center",
      title: "Hình ảnh",
      render: (_, record) => (
        <img
          src={record.IMG}
          width={30}
          height={30}
          style={{ margin: "auto" }}
        />
      ),
    },
    {
      dataIndex: "Name",
      title: "Tên dịch vụ",
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

  const item = useRef<TService>();
  const [modal, setModal] = useState(false);
  const handleModal = (itemSelected: TService) => {
    item.current = itemSelected;
    setModal(true);
  };

  return (
    <React.Fragment>
      <DataTable
        {...{
          columns,
          data,
          title: "Danh sách dịch vụ",
        }}
      />
      <ServiceForm
        {...{
          onCancel: () => setModal(false),
          visible: modal,
          defaultValues: item.current,
          refetchService: refetchService,
        }}
      />
    </React.Fragment>
  );
};
