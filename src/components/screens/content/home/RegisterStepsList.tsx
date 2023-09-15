import { Image } from "antd";
import React, { useRef, useState } from "react";
import { ActionButton, DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";
import { RegisterStepsForm } from "./RegisterStepsForm";

export const RegisterStepsList: React.FC<
  TTable<TStep> & { refetchRegisterSteps }
> = ({ data, refetchRegisterSteps }) => {
  const columns: TColumnsType<TStep> = [
    {
      dataIndex: "Id",
      title: "Index",
      render: (_, __, index) => ++index,
    },
    {
      dataIndex: "IMG",
      title: "Ảnh",
      align: "center",
      render: (_, record) => {
        return (
          <Image
            src={record?.IMG ? record.IMG : "/default/pro-empty.jpg"}
            className="!h-[30px] !w-[30px]"
          />
        );
      },
    },
    {
      dataIndex: "Name",
      title: "Tên bước",
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
          icon="fas fa-edit text-sec"
          onClick={() => handleModal(record)}
          title="Cập nhật"
          isButton
        />
      ),
    },
  ];

  const item = useRef<TStep>();
  const [modal, setModal] = useState(false);
  const handleModal = (itemSelected: TStep) => {
    item.current = itemSelected;
    setModal(true);
  };


  return (
    <React.Fragment>
      <DataTable
        {...{
          columns,
          data,
          title: "Cách bước đăng ký",
        }}
      />
      <RegisterStepsForm
        {...{
          onCancel: () => setModal(false),
          visible: modal,
          defaultValues: item.current,
          refetchRegisterSteps: refetchRegisterSteps,
        }}
      />
    </React.Fragment>
  );
};
