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
  UserDepositListFilterMemo,
  toast,
} from "~/components";
import { EOrderStatusData, transportStatus } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";
type TProps = {
  handleSelectIds: (item: TUserDeposit) => void;
  filter;
  handleFilter: (newFilter) => void;
  moneyOfOrders;
  ids;
};

const DetailInfo = (record) => {
  const divStyle = `flex justify-between items-center border-b border-[#e4e4e4] py-1`;
  const detailBox = `grid grid-cols-2 gap-7`;
  const title = `text-[18px] font-bold`;
  const color = transportStatus.find((x) => x.id === record?.record?.Status);
  return (
    <>
      {window.innerWidth >= 768 ? (
        <div className={clsx(detailBox, "xl:!min-w-[46vw]")}>
          <div className="col-span-1">
            <span className={title}>Thông tin</span>
            <div className={divStyle}>
              Mã vận đơn:{" "}
              <span className="font-bold text-[12px]">
                {record?.record?.OrderTransactionCode}
              </span>
            </div>
            <div className={divStyle}>
              UserName:{" "}
              <span className="font-bold text-[12px]">
                {record?.record?.UserName}
              </span>
            </div>
            <div className={divStyle}>
              Kho Trung Quốc:{" "}
              <span className="font-bold text-[12px]">
                {record?.record?.WareHouseFrom}
              </span>
            </div>
            <div className={divStyle}>
              Kho Việt Nam:{" "}
              <span className="font-bold text-[12px]">
                {record?.record?.WareHouseTo}
              </span>
            </div>
            <div className={divStyle}>
              Ngày tạo:{" "}
              <span className="font-bold text-[12px]">
                {_format.getVNDate(record?.record?.Created)}
              </span>
            </div>
            <div className={divStyle}>
              Trạng thái:{" "}
              <TagStatus
                color={color?.color}
                statusName={record?.record?.StatusName}
              />
            </div>
            <div className={divStyle}>
              Phương thức vận chuyển:{" "}
              <span className="font-bold text-[12px]">
                {record?.record?.ShippingTypeName}
              </span>
            </div>
            <div className={`${divStyle} flex-col items-baseline`}>
              Ghi chú nhân viên:{" "}
              <textarea
                className="w-full border border-[#e4e4e4] px-3 py-2 bg-white"
                readOnly
                disabled
                value={record?.record?.StaffNote ?? "--"}
              />
            </div>
            <div className={`${divStyle} flex-col items-baseline`}>
              Ghi chú khách hàng (hủy nếu có):{" "}
              <textarea
                className="w-full border border-[#e4e4e4] px-3 py-2 bg-white"
                readOnly
                disabled
                value={
                  record?.record?.CancelReason === ""
                    ? record?.record?.Note
                    : record?.record?.CancelReason
                }
              />
            </div>
          </div>

          <div className="col-span-1">
            <span className={title}>Phí chi tiết</span>
            <div className={divStyle}>
              Cân nặng:{" "}
              <span className="font-bold text-[12px]">
                {record?.record?.PayableWeight ?? 0} kg
              </span>
            </div>
            <div className={divStyle}>
              Phí cân nặng:{" "}
              <span className="font-bold text-[12px]">
                {_format.getVND(record?.record?.FeeWeightPerKg)}
              </span>
            </div>
            <div className={divStyle}>
              Số khối:{" "}
              <span className="font-bold text-[12px]">
                {record?.record?.VolumePayment ?? 0} m3
              </span>
            </div>
            <div className={divStyle}>
              Phí khối:{" "}
              <span className="font-bold text-[12px]">
                {_format.getVND(record?.record?.FeePerVolume)}
              </span>
            </div>
            <div className={divStyle}>
              Phí vận chuyển:{" "}
              <span className="font-bold text-[12px]">
                {_format.getVND(record?.record?.DeliveryPrice)}
              </span>
            </div>
            <div className={divStyle}>
              Phí COD Trung Quốc:{" "}
              <span className="font-bold text-[12px]">
                {_format.getVND(record?.record?.CODFee)}
              </span>
            </div>
            <div className={divStyle}>
              Phí đóng gỗ:{" "}
              <span className="font-bold text-[12px]">
                {_format.getVND(record?.record?.IsPackedPrice)}
              </span>
            </div>
            <div className={divStyle}>
              Phí bảo hiểm:{" "}
              <span className="font-bold text-[12px]">
                {_format.getVND(record?.record?.InsuranceMoney)}
              </span>
            </div>
            <div className={divStyle}>
              Phí kiểm hàng:{" "}
              <span className="font-bold text-[12px]">
                {_format.getVND(record?.record?.IsCheckProductPrice)}
              </span>
            </div>
            <div className={divStyle}>
              Tổng tiền:{" "}
              <span className="font-bold text-[12px]">
                {_format.getVND(record?.record?.TotalPriceVND)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <Tabs>
          <Tabs.TabPane tab="Thông tin" tabKey="1" key={"1"}>
            <div className="my-4">
              <span className={title}>Thông tin</span>
              <div className={divStyle}>
                Mã vận đơn:{" "}
                <span className="font-bold text-[12px]">
                  {record?.record?.OrderTransactionCode}
                </span>
              </div>
              <div className={divStyle}>
                UserName:{" "}
                <span className="font-bold text-[12px]">
                  {record?.record?.UserName}
                </span>
              </div>
              <div className={divStyle}>
                Kho Trung Quốc:{" "}
                <span className="font-bold text-[12px]">
                  {record?.record?.WareHouseFrom}
                </span>
              </div>
              <div className={divStyle}>
                Kho Việt Nam:{" "}
                <span className="font-bold text-[12px]">
                  {record?.record?.WareHouseTo}
                </span>
              </div>
              <div className={divStyle}>
                Ngày tạo:{" "}
                <span className="font-bold text-[12px]">
                  {_format.getVNDate(record?.record?.Created)}
                </span>
              </div>
              <div className={divStyle}>
                Trạng thái:{" "}
                <TagStatus
                  color={color?.color}
                  statusName={record?.record?.StatusName}
                />
              </div>
              <div className={divStyle}>
                Phương thức vận chuyển:{" "}
                <span className="font-bold text-[12px]">
                  {record?.record?.ShippingTypeName}
                </span>
              </div>
              <div className={`${divStyle} flex-col items-baseline`}>
                Ghi chú nhân viên:{" "}
                <textarea
                  className="w-full border border-[#e4e4e4] px-3 py-2 bg-white"
                  readOnly
                  disabled
                  value={record?.record?.StaffNote ?? "--"}
                />
              </div>
              <div className={`${divStyle} flex-col items-baseline`}>
                Ghi chú khách hàng (hủy nếu có):{" "}
                <textarea
                  className="w-full border border-[#e4e4e4] px-3 py-2 bg-white"
                  readOnly
                  disabled
                  value={
                    record?.record?.CancelReason === ""
                      ? record?.record?.Note
                      : record?.record?.CancelReason
                  }
                />
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Các khoản phí" tabKey="2" key={"2"}>
            <div className="my-4">
              <span className={title}>Phí chi tiết</span>
              <div className={divStyle}>
                Cân nặng:{" "}
                <span className="font-bold text-[12px]">
                  {record?.record?.PayableWeight ?? 0} kg
                </span>
              </div>
              <div className={divStyle}>
                Phí cân nặng:{" "}
                <span className="font-bold text-[12px]">
                  {_format.getVND(record?.record?.FeeWeightPerKg)}
                </span>
              </div>
              <div className={divStyle}>
                Số khối:{" "}
                <span className="font-bold text-[12px]">
                  {record?.record?.VolumePayment ?? 0} m3
                </span>
              </div>
              <div className={divStyle}>
                Phí khối:{" "}
                <span className="font-bold text-[12px]">
                  {_format.getVND(record?.record?.FeePerVolume)}
                </span>
              </div>
              <div className={divStyle}>
                Phí vận chuyển:{" "}
                <span className="font-bold text-[12px]">
                  {_format.getVND(record?.record?.DeliveryPrice)}
                </span>
              </div>
              <div className={divStyle}>
                Phí COD Trung Quốc:{" "}
                <span className="font-bold text-[12px]">
                  {_format.getVND(record?.record?.CODFee)}
                </span>
              </div>
              <div className={divStyle}>
                Phí đóng gỗ:{" "}
                <span className="font-bold text-[12px]">
                  {_format.getVND(record?.record?.IsPackedPrice)}
                </span>
              </div>
              <div className={divStyle}>
                Phí bảo hiểm:{" "}
                <span className="font-bold text-[12px]">
                  {_format.getVND(record?.record?.InsuranceMoney)}
                </span>
              </div>
              <div className={divStyle}>
                Phí kiểm hàng:{" "}
                <span className="font-bold text-[12px]">
                  {_format.getVND(record?.record?.IsCheckProductPrice)}
                </span>
              </div>
              <div className={divStyle}>
                Tổng tiền:{" "}
                <span className="font-bold text-[12px]">
                  {_format.getVND(record?.record?.TotalPriceVND)}
                </span>
              </div>
            </div>
          </Tabs.TabPane>
        </Tabs>
      )}
    </>
  );
};

const DetailInfoMemo = React.memo(DetailInfo)

export const UserDepositListTable: React.FC<TTable<TUserDeposit> & TProps> = ({
  data,
  loading,
  handleModal,
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
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      render: (date) => <div>{_format.getVNDate(date)}</div>,
      responsive: ["lg"],
    },
    {
      dataIndex: "OrderTransactionCode",
      title: "Mã vận đơn",
    },
    {
      dataIndex: "TotalPriceVND",
      title: "Tổng tiền(VNĐ)",
      align: "right",
      render: (money) => _format.getVND(money, ""),
      responsive: ["md"],
    },
    {
      dataIndex: "PayableWeight",
      title: "Cân nặng (Kg)",
      align: "right",
      render: (PayableWeight) => <>{_format.getVND(PayableWeight, " ")}</>,
      responsive: ["lg"],
    },
    {
      dataIndex: "VolumePayment",
      title: "Thể tích (m3)",
      align: "right",
      render: (_) => <>{_format.getVND(_, " ")}</>,
      responsive: ["lg"],
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status, record) => {
        const color = transportStatus.find((x) => x.id === status);
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
            {record.Status === EOrderStatusData.ArrivedToVietNamWarehouse && (
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
            {record.Status === EOrderStatusData.NewOrder && (
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
          </div>
        );
      },
      responsive: ["lg"],
    },
  ];

  const expandable = {
    expandedRowRender: (item) => {
      return (
        <div className="extentable">
          <div className="extentable-content">
            <div className="extentable-row">
              <span className="extentable-label">Cân nặng: </span>
              <span className="extentable-value">
                {_format.getVND(item?.PayableWeight, " Kg")}
              </span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">Thể tích: </span>
              <span className="extentable-value">
                {_format.getVND(item?.VolumePayment, " m3")}
              </span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">Tổng tiền: </span>
              <span className="extentable-value">
                {_format.getVND(item?.TotalPriceVND)}
              </span>
            </div>

            <div className="extentable-row">
              <span className="extentable-label">Ngày đặt: </span>
              <span className="extentable-value">
                {_format.getVNDate(item?.Created)}
              </span>
            </div>
          </div>
          <div className="extentable-actions">
            <div className="extentable-button">
              <Popover
                trigger={"click"}
                placement="left"
                content={
                  <div className="p-4 w-[400px]">
                    <DetailInfo record={item} />
                  </div>
                }
              >
                <ActionButton
                  icon="fas fa-info-square"
                  title="Chi tiết đơn"
                  iconContainerClassName="iconRed"
                  isButton={true}
                />
              </Popover>
            </div>
            {item.Status === EOrderStatusData.ArrivedToVietNamWarehouse && (
              <div className="extentable-button">
                <ActionButton
                  onClick={() =>
                    Modal.confirm({
                      title: `Thanh toán đơn hàng #${item.Id}.`,
                      content: (
                        <b>
                          Tổng tiền:{" "}
                          {_format.getVND(item.TotalPriceVND, " VNĐ")}
                        </b>
                      ),
                      onOk: () =>
                        transportationOrder
                          .makePayment([item.Id])
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
                  iconContainerClassName="iconRed"
                  isButton={true}
                />
              </div>
            )}
            {item.Status === EOrderStatusData.NewOrder && (
              <div className="extentable-button">
                <ActionButton
                  onClick={() =>
                    Modal.confirm({
                      title: `Hủy đơn hàng #${item.Id}?`,
                      content: (
                        <FormInput
                          control={control}
                          name="note"
                          placeholder="Tại sao lại hủy đơn hàng?"
                          inputContainerClassName="!mb-4"
                          rules={{ required: "Vui lòng điền lý do hủy" }}
                        />
                      ),
                      onOk: () =>
                        mutationUpdate.mutateAsync({
                          Id: item.Id,
                          Note: getValues("note"),
                        }),
                    })
                  }
                  icon="far fa-trash-alt"
                  title="Hủy đơn"
                  iconContainerClassName="iconRed"
                  isButton={true}
                />
              </div>
            )}
          </div>
        </div>
      );
    },
  };

  return (
    <>
      <DataTable
        {...{
          loading,
          columns,
          data,
          bordered: true,
          expandable: expandable,
          scroll: { y: 640 },
          title: " ",
          extraElment: (
            <UserDepositListFilterMemo
              numberOfOrder={transportStatus}
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
          onChange: (page, pageSize) => {
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
