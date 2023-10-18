import { Modal, Popover, Tabs } from "antd";
import "antd/dist/antd.css";
import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { transportationOrder } from "~/api";
import {
  ActionButton,
  DataTable,
  FormInput,
  ReportContentMemo,
  UserDepositListFilterMemo,
  toast,
} from "~/components";
import { ETransportationOrder, transportationStatus } from "~/configs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";
import { DetailInfoMemo } from "./components/DetailInfoMemo";

const TimelineRender = (props: { record: TUserDeposit }) => {
  const { record } = props;

  const data = [
    record.Created && {
      isActive: record?.Status === ETransportationOrder.ChoDuyet,
      title: "Tạo đơn:",
      display: (
        <>
          {_format.getVNDate(record.Created, "HH:mm")} -{" "}
          {_format.getVNDate(record.Created, "DD/MM/YYYY")}
        </>
      ),
    },

    record.ConfirmDate && {
      isActive: record?.Status === ETransportationOrder.DonMoi,
      title: "Đơn mới:",
      display: (
        <>
          {_format.getVNDate(record.ConfirmDate, "HH:mm")} -{" "}
          {_format.getVNDate(record.ConfirmDate, "DD/MM/YYYY")}
        </>
      ),
    },

    record.TQDate && {
      isActive: record?.Status === ETransportationOrder.VeKhoTQ,
      title: "Về kho TQ:",
      display: (
        <>
          {_format.getVNDate(record.TQDate, "HH:mm")} -{" "}
          {_format.getVNDate(record.TQDate, "DD/MM/YYYY")}
        </>
      ),
    },

    record.ComingVNDate && {
      isActive: record?.Status === ETransportationOrder.DangVeVN,
      title: "Đang về VN:",
      display: (
        <>
          {_format.getVNDate(record.ComingVNDate, "HH:mm")} -{" "}
          {_format.getVNDate(record.ComingVNDate, "DD/MM/YYYY")}
        </>
      ),
    },

    record.VNDate && {
      isActive: record?.Status === ETransportationOrder.VeKhoVN,
      title: "Về kho VN:",
      display: (
        <>
          {_format.getVNDate(record.VNDate, "HH:mm")} -{" "}
          {_format.getVNDate(record.VNDate, "DD/MM/YYYY")}
        </>
      ),
    },

    record.PaidDate && {
      isActive: record?.Status === ETransportationOrder.DaThanhToan,
      title: "Thanh toán:",
      display: (
        <>
          {_format.getVNDate(record.PaidDate, "HH:mm")} -{" "}
          {_format.getVNDate(record.PaidDate, "DD/MM/YYYY")}
        </>
      ),
    },

    record.CompleteDate && {
      isActive: record?.Status === ETransportationOrder.DaHoanThanh,
      title: "Hoàn thành:",
      display: (
        <>
          {_format.getVNDate(record.CompleteDate, "HH:mm")} -{" "}
          {_format.getVNDate(record.CompleteDate, "DD/MM/YYYY")}
        </>
      ),
    },

    record.ComplainDate && {
      isActive: record?.Status === ETransportationOrder.DaKhieuNai,
      title: "Khiếu nại:",
      display: (
        <>
          {_format.getVNDate(record.ComplainDate, "HH:mm")} -{" "}
          {_format.getVNDate(record.ComplainDate, "DD/MM/YYYY")}
        </>
      ),
    },

    record.CancelDate && {
      isActive: record?.Status === ETransportationOrder.Huy,
      title: "Huỷ đơn:",
      display: (
        <>
          {_format.getVNDate(record.CancelDate, "HH:mm")} -{" "}
          {_format.getVNDate(record.CancelDate, "DD/MM/YYYY")}
        </>
      ),
    },
  ];

  return (
    <div className="display flex flex-col w-full gap-1 xs:gap-0">
      {data.map(
        (item) =>
          item && (
            <p
              className={clsx(
                item.isActive && "text-red",
                "grid grid-cols-7 items-center justify-between px-2 gap-1 border rounded-md xs:border-none"
              )}
            >
              <span className="title col-span-3">{item.title}</span>
              <span className="display col-span-4">{item.display}</span>
            </p>
          )
      )}
    </div>
  );
};

type TProps = {
  handleSelectIds: (item: TUserDeposit) => void;
  filter;
  handleFilter: (newFilter) => void;
  moneyOfOrders;
  ids;
};

export const UserDepositListTable: React.FC<TTable<TUserDeposit> & TProps> = ({
  data,
  loading,
  handleModal, // ToDo: For conform delete
  handleFilter,
  filter,
  moneyOfOrders,
  ids,
}) => {
  const { control, getValues, reset } = useForm({
    mode: "onBlur",
    defaultValues: {
      note: "",
    },
  });

  const queryClient = useQueryClient();
  const mutationUpdate = useMutation(
    (data: Partial<TUserDeposit>) => transportationOrder.cancelOrder(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userDepositList");
        toast.success("Huỷ đơn thành công");
        reset();
      },
      onError: toast.error,
    }
  );

  const columns: TColumnsType<TUserDeposit> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 60,
      responsive: ["md"],
    },
    {
      dataIndex: "OrderTransactionCode",
      title: "Mã vận đơn",
    },
    {
      dataIndex: "TotalPriceVND",
      title: (
        <>
          Tổng tiền
          <br />
          (VNĐ)
        </>
      ),
      align: "right",
      render: (money) => _format.getVND(money, ""),
      responsive: ["md"],
    },
    {
      dataIndex: "PayableWeight",
      align: "right",
      title: (
        <>
          Cân nặng
          <br />
          (Kg)
        </>
      ),
      render: (PayableWeight) => <>{_format.getVND(PayableWeight, "")}</>,
      responsive: ["lg"],
    },
    {
      dataIndex: "VolumePayment",
      align: "right",
      title: (
        <>
          Thể tích
          <br />
          (m3)
        </>
      ),
      render: (value) => <>{_format.getVND(value, "")}</>,
      responsive: ["lg"],
    },
    {
      dataIndex: "CreateDate",
      title: "TimeLine",
      responsive: ["md"],
      render: (_, record) => <TimelineRender record={record} />,
      width: 280,
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status, record) => {
        const color = transportationStatus.find((x) => x.id === status);
        return (
          <TagStatus color={color?.color} statusName={record?.StatusName} />
        );
      },
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      fixed: "right",
      render: (_, record) => {
        return (
          <div className="flex gap-1 flex-wrap">
            <Popover
              trigger={"click"}
              placement="leftBottom"
              content={
                <div className="p-4 !bg-[#fdfdfd36] rounded-md border border-main">
                  <DetailInfoMemo record={record} />
                </div>
              }
            >
              <ActionButton
                icon="fas fa-info-square"
                title="Chi tiết"
                iconContainerClassName="iconRed"
                isButton={true}
              />
            </Popover>
            {record.Status === ETransportationOrder.VeKhoVN && (
              <ActionButton
                onClick={() =>
                  Modal.confirm({
                    title: `Thanh toán đơn hàng #${record.Id}.`,
                    content: (
                      <b>
                        Tổng tiền:{" "}
                        {_format.getVND(record.TotalPriceVND, " VNĐ")}
                      </b>
                    ),
                    onOk: () =>
                      transportationOrder
                        .makePayment([record.Id])
                        .then(() => {
                          queryClient.invalidateQueries("userDepositList");
                        })
                        .catch((error) => {
                          toast.error(
                            (error as any)?.response?.data?.ResultMessage
                          );
                        }),
                  })
                }
                icon="fas fa-money-check"
                title="Thanh toán"
                isButtonClassName="bg-blue !text-white"
                isButton={true}
              />
            )}
            {record.Status === ETransportationOrder.ChoDuyet && (
              <ActionButton
                onClick={() =>
                  Modal.confirm({
                    title: `Hủy đơn hàng #${record.Id} ?`,
                    content: (
                      <FormInput
                        control={control}
                        name="note"
                        placeholder="Tại sao lại hủy đơn hàng?"
                        rules={{ required: "Vui lòng điền lý do hủy" }}
                      />
                    ),
                    onOk: () =>
                      mutationUpdate.mutateAsync({
                        Id: record.Id,
                        Note: getValues("note"),
                      }),
                  })
                }
                icon="far fa-trash-alt"
                title="Hủy"
                isButtonClassName="bg-red !text-white"
                isButton={true}
              />
            )}
            {record?.Status === ETransportationOrder.DaHoanThanh && (
              <Popover
                trigger={"click"}
                placement="left"
                content={<ReportContentMemo defaultValue={record} />}
              >
                <ActionButton
                  icon="fas fa-balance-scale-right"
                  title="Khiếu nại"
                  isButton={true}
                  isButtonClassName="bg-red !text-white"
                />
              </Popover>
            )}
          </div>
        );
      },
      responsive: ["lg"],
    },
  ];

  return (
    <>
      <DataTable
        {...{
          loading,
          columns,
          data,
          bordered: true,
          scroll: { y: 640 },
          extraElementClassName: "!w-full",
          extraElement: (
            <UserDepositListFilterMemo
              numberOfOrder={transportationStatus}
              moneyOfOrders={moneyOfOrders}
              handleFilter={handleFilter}
              isSelectSomeItems={!!ids.length}
            />
          ),
          pagination: {
            current: filter.PageIndex,
            total: filter.TotalItems,
            pageSize: filter.PageSize,
          },
          onChange: (page) => {
            handleFilter({
              ...filter,
              PageIndex: page.current,
              PageSize: page.pageSize,
            });
          },
        }}
      />
    </>
  );
};
