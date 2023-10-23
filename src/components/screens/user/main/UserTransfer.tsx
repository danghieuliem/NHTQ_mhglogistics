import { Modal, Popover, Tabs } from "antd";
import clsx from "clsx";
import React from "react";
import { ActionButton, DataTable } from "~/components";
import { transportationStatus } from "~/configs";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

// ffefe0

const DetailInfo = (record) => {
  const divStyle = `flex justify-between items-center border-b border-[#e4e4e4] py-1`;
  const detailBox = `grid grid-cols-2 gap-7`;
  const title = `text-[18px] font-bold`;
  const color = transportationStatus.find(
    (x) => x.id === record?.record?.Status
  );
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

const DetailInfoMemo = React.memo(DetailInfo);

export const UserTransfer = ({ data, isFetching }) => {
  const columns: TColumnsType<TNewDeliveryOrders> = [
    {
      title: "ID",
      dataIndex: "Id",
      responsive: ["md"],
    },
    {
      title: "Ngày đặt",
      dataIndex: "Created",
      render: (date) => <span>{_format.getVNDate(date)}</span>,
      responsive: ["lg"],
    },
    {
      title: "Mã vận đơn",
      dataIndex: "OrderTransactionCode",
    },
    {
      dataIndex: "PayableWeight",
      title: "Cân nặng (kg)",
      align: "right",
      responsive: ["lg"],
    },
    {
      dataIndex: "TotalPriceVND",
      title: "Tổng tiền (VNĐ)",
      align: "right",
      responsive: ["lg"],
      render: (_) => _format.getVND(_, ""),
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      render: (status) => {
        const color = transportationStatus.find((x) => x.id === status);
        return <TagStatus color={color?.color} statusName={color?.name} />;
      },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      responsive: ["lg"],
      align: "right",
      render: (_, record) => (
        <Popover
          trigger={"click"}
          placement="leftBottom"
          content={
            <div className="p-4 !bg-[#fab34a85] rounded-md">
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
      ),
    },
  ];

  return (
    <DataTable
      {...{
        columns,
        data: data?.Items,
        loading: isFetching,
        bordered: true,
        title: "Đơn hàng ký gửi",

        bgHeaderType: "depositTable",
      }}
    />
  );
};
