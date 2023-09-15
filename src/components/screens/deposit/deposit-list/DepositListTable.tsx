import { Modal } from "antd";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import { transportationOrder } from "~/api";
import { ActionButton, DataTable, FilterSelect } from "~/components";
import { ETransportationOrder, transportationStatus } from "~/configs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";
import clsx from "clsx";

type TProps = {
  refetch: () => void;
  RoleID: number;
  dathangList?: any;
  saleList?: any;
  filter;
  handleFilter: (newFilter) => void;
  userSale;
  countRefetch;
};

export const DepositListTable: React.FC<TTable<TUserDeposit> & TProps> = ({
  data,
  loading,
  refetch,
  RoleID,
  filter,
  handleFilter,
  userSale,
  countRefetch,
}) => {
  const _onPress = (data: TUserDeposit) => {
    const id = toast.loading("Đang xử lý ...");
    transportationOrder
      .update(data)
      .then((res) => {
        refetch();
        countRefetch();
        toast.update(id, {
          render: "Duyệt đơn thành công!",
          isLoading: false,
          type: "success",
          autoClose: 500,
        });
      })
      .catch(() => {
        toast.update(id, {
          render: "Duyệt đơn thất bại!",
          isLoading: false,
          type: "error",
          autoClose: 1000,
        });
      });
  };

  const columns: TColumnsType<TUserDeposit> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 50,
      align: "right",
      fixed: "left",
      render: (_) => {
        return (
          <Link href={`/manager/deposit/deposit-list/detail/?id=${_}`}>
            <a target="_blank">{_}</a>
          </Link>
        );
      },
    },
    {
      dataIndex: "OrderTransactionCode",
      title: <>Mã vận đơn</>,
      width: 120,
      fixed: "left",
    },
    {
      dataIndex: "UserName",
      title: <>UserName</>,
      width: 120,
    },
    {
      dataIndex: "WareHouseFrom",
      title: <>Thông tin</>,
      width: 250,
      render: (_, record) => {
        return (
          <div className="h-full flex flex-col">
            <div className="flex justify-between">
              <span className="font-semibold">Kho Trung Quốc: </span>
              <span>{record?.WareHouseFrom}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Kho Việt Nam: </span>
              <span>{record?.WareHouseTo}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Phương thức: </span>
              <span>{record?.ShippingTypeName}</span>
            </div>
          </div>
        );
      },
    },
    {
      dataIndex: "TotalPriceVND",
      title: <>Thông tin phí (VNĐ)</>,
      width: 250,
      render: (_, record) => {
        return (
          <>
            <div className="flex justify-between">
              <span className="font-semibold">Phí cân nặng: </span>
              <span>
                {_format.getVND(
                  record?.PayableWeight * record?.FeeWeightPerKg,
                  " "
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Phí khối: </span>
              <span>
                {_format.getVND(
                  record?.VolumePayment * record?.FeePerVolume,
                  " "
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Phí vận chuyển: </span>
              <span>{_format.getVND(record?.DeliveryPrice, " ")}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Tổng tiền: </span>
              <span>{_format.getVND(record?.TotalPriceVND, " ")}</span>
            </div>
          </>
        );
      },
    },
    {
      dataIndex: "SalerID",
      title: <>Nhân viên</>,
      width: 160,
      render: (_, record) => {
        return (
          <FilterSelect
            placeholder="Kinh doanh"
            data={userSale}
            defaultValue={
              !!record.SalerID && {
                Id: userSale?.find((x) => x.Id === record?.SalerID)?.Id,
                UserName: userSale?.find((x) => x.Id === record?.SalerID)
                  ?.UserName,
              }
            }
            select={{ label: "UserName", value: "Id" }}
            callback={async (value) => {
              transportationOrder
                .updateStaff({ SalerID: value, Id: record?.Id })
                .then(() => {
                  toast.success("Cập nhật nhân viên thành công!");
                  refetch();
                });
            }}
            handleSearch={(val) => val}
          />
        );
      },
    },
    {
      dataIndex: "CreateDate",
      title: "TimeLine",
      render: (_, record) => (
        <React.Fragment>
          {record.Created && (
            <p
              className={clsx(
                record?.Status === ETransportationOrder.ChoDuyet && "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Đơn mới: </span>
              <span>
                {_format.getVNDate(record.Created, "HH:mm")} -
                {_format.getVNDate(record.Created, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.ConfirmDate && (
            <p
              className={clsx(
                record?.Status === ETransportationOrder.DonMoi && "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Xác nhận:</span>
              <span>
                {_format.getVNDate(record.ConfirmDate, "HH:mm")} -
                {_format.getVNDate(record.ConfirmDate, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.TQDate && (
            <p
              className={clsx(
                record?.Status === ETransportationOrder.VeKhoTQ && "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Về kho TQ:</span>
              <span>
                {_format.getVNDate(record.TQDate, "HH:mm")} -
                {_format.getVNDate(record.TQDate, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.ComingVNDate && (
            <p
              className={clsx(
                record?.Status === ETransportationOrder.DangVeVN && "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Đang về VN:</span>
              <span>
                {_format.getVNDate(record.ComingVNDate, "HH:mm")} -
                {_format.getVNDate(record.ComingVNDate, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.VNDate && (
            <p
              className={clsx(
                record?.Status === ETransportationOrder.VeKhoVN && "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Vê kho VN:</span>
              <span>
                {_format.getVNDate(record.VNDate, "HH:mm")} -
                {_format.getVNDate(record.VNDate, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.PaidDate && (
            <p
              className={clsx(
                record?.Status === ETransportationOrder.DaThanhToan &&
                  "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Thanh toán:</span>
              <span>
                {_format.getVNDate(record.PaidDate, "HH:mm")} -
                {_format.getVNDate(record.PaidDate, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.CompleteDate && (
            <p
              className={clsx(
                record?.Status === ETransportationOrder.DaHoanThanh &&
                  "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Hoàn thành:</span>
              <span>
                {_format.getVNDate(record.CompleteDate, "HH:mm")} -
                {_format.getVNDate(record.CompleteDate, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.ComplainDate && (
            <p
              className={clsx(
                record?.Status === ETransportationOrder.DaKhieuNai &&
                  "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Khiếu nại:</span>
              <span>
                {_format.getVNDate(record.ComplainDate, "HH:mm")} -
                {_format.getVNDate(record.ComplainDate, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.CancelDate && (
            <p
              className={clsx(
                record?.Status === ETransportationOrder.Huy && "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Huỷ đơn:</span>
              <span>
                {_format.getVNDate(record.CancelDate, "HH:mm")} -
                {_format.getVNDate(record.CancelDate, "DD/MM/YYYY")}
              </span>
            </p>
          )}
        </React.Fragment>
      ),
      width: 280,
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status) => {
        const color = transportationStatus.find((x) => x.id === status);
        return <TagStatus color={color?.color} statusName={color?.name} />;
      },
      width: 120,
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      width: 120,
      fixed: "right",
      render: (_, record) => {
        return (
          <div className="flex flex-wrap gap-1">
            <Link
              href={`/manager/deposit/deposit-list/detail/?id=${record.Id}`}
            >
              <a target="_blank">
                <ActionButton
                  icon="fas fa-info-square"
                  title="Chi tiết"
                  isButton
                />
              </a>
            </Link>
            {record?.Status === ETransportationOrder.ChoDuyet &&
              (RoleID === 1 || RoleID === 3 || RoleID === 7) && (
                <ActionButton
                  onClick={() =>
                    Modal.confirm({
                      title: "Xác nhận duyệt đơn này?",
                      onOk: () =>
                        _onPress({
                          ...record,
                          Status: ETransportationOrder.DonMoi,
                        }),
                    })
                  }
                  icon="fas fa-check-circle"
                  title="Duyệt"
                  isButton
                  isButtonClassName="bg-blue !text-white"
                />
              )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        {...{
          columns,
          data,
          loading,
          bordered: true,
          scroll: { y: 700, x: 1200 },
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
