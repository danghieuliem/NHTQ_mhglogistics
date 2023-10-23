import { Popover } from "antd";
import clsx from "clsx";
import React from "react";
import { ActionButton, DataTable, WithDrawalVNDForm } from "~/components";
import { ERechargeStatusData, moneyStatus } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

export const WithDrawalVNDTable: React.FC<TTable<TWithDraw>> = ({
  data,
  loading,
  pagination,
  handlePagination,
  handleModal,
}) => {
  const columns: TColumnsType<TWithDraw> = [
    {
      dataIndex: "Id",
      title: "ID đơn",
      responsive: ["sm"],
      width: 90,
    },
    {
      dataIndex: "Created",
      title: "Ngày rút",
      render: (date) => <>{_format.getVNDate(date)}</>,
      responsive: ["xl"],
    },
    {
      dataIndex: "Note",
      title: "Nội dung",
      responsive: ["lg"],
    },
    {
      dataIndex: "Amount",
      title: "Số tiền rút (VNĐ)",
      align: "right",
      render: (record) => _format.getVND(record, " "),
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status, _) => {
        const color = moneyStatus.find((x) => x.id === status);
        return <TagStatus color={color?.color} statusName={color?.name} />;
      },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      align: "right",
      width: 90,
      responsive: ["lg"],
      render: (_, record) => {
        return (
          record?.Status === ERechargeStatusData.Pending && (
            <ActionButton
              onClick={() => handleModal(record)}
              icon="far fa-trash-alt"
              title="Huỷ"
              isButton={true}
              isButtonClassName="bg-red !text-white"
            />
          )
        );
      },
    },
  ];

  return (
    <DataTable
      {...{
        loading,
        columns,
        data,
        style: "secondary",
        pagination,
        onChange: handlePagination,

        mediaWidth: 1200,
        scroll: { y: 660 },
        extraElement: (
          <div>
            <Popover
              trigger={"click"}
              placement="bottomRight"
              content={<WithDrawalVNDForm />}
            >
              <div>
                <ActionButton
                  icon="fas fa-plus-circle"
                  isButton
                  isButtonClassName="bg-green !text-white hover:!bg-red"
                  title="Tạo"
                />
              </div>
            </Popover>
          </div>
        ),
      }}
    />
  );
};
