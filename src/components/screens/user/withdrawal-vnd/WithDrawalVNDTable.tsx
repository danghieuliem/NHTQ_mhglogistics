import { Popover, Tag } from "antd";
import clsx from "clsx";
import React from "react";
import { ActionButton, DataTable, WithDrawalVNDForm } from "~/components";
import { ERechargeStatusData, moneyStatus } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

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
    },
    {
      dataIndex: "Created",
      title: "Ngày rút",
      render: (date) => <>{_format.getVNDate(date)}</>,
      responsive: ["xl"],
    },
    {
      dataIndex: "Amount",
      title: "Số tiền rút (VNĐ)",
      align: "right",
      render: (record) => _format.getVND(record, " "),
    },
    {
      dataIndex: "Note",
      title: "Nội dung",
      responsive: ["lg"],
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status, _) => {
        const color = moneyStatus.find((x) => x.id === status);
        return <Tag color={color?.color}>{_?.StatusName}</Tag>;
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
              isButtonClassName="bg-red !text-white"
              isButton={true}
            />
          )
        );
      },
    },
  ];

  const expandable = {
    expandedRowRender: (item) => {
      return (
        <div className="extentable">
          <div
            className={clsx(
              "extentable-content",
              item?.Status === ERechargeStatusData.Pending && "!w-full"
            )}
          >
            <div className="extentable-row sm:hidden">
              <span className="extentable-label">ID: </span>
              <span className="extentable-value">{item?.Id}</span>
            </div>
            <div className="extentable-row lg:hidden">
              <span className="extentable-label">Nội dung: </span>
              <span className="extentable-value">{item?.Note}</span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">Ngày đặt: </span>
              <span className="extentable-value">
                {_format.getVNDate(item?.Created)}
              </span>
            </div>
          </div>

          {item?.Status === ERechargeStatusData.Pending && (
            <div className="extentable-actions lg:hidden">
              <div className="extentable-button">
                <ActionButton
                  onClick={() => handleModal(item)}
                  icon="far fa-trash-alt"
                  title="Xóa"
                  btnRed
                  isButton={true}
                />
              </div>
            </div>
          )}
        </div>
      );
    },
  };

  return (
    <DataTable
      {...{
        loading,
        columns,
        data,
        style: "secondary",
        pagination,
        onChange: handlePagination,
        expandable: expandable,
        mediaWidth: 1200,
        scroll: { y: 660 },
        title: "Rút tiền",
        extraElment: (
          <div>
            <Popover
              trigger={"click"}
              placement="bottomRight"
              content={<WithDrawalVNDForm />}
            >
              <div>
                <ActionButton
                  icon=""
                  isButton
                  isButtonClassName="bg-main !text-white hover:!bg-red"
                  title="Tạo yêu cầu rút"
                />
              </div>
            </Popover>
          </div>
        ),
      }}
    />
  );
};
