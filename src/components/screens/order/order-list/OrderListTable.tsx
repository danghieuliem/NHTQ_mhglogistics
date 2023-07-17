import { Modal, Tag } from "antd";
import clsx from "clsx";
import Link from "next/link";
import React, { Fragment } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { mainOrder } from "~/api";
import { ActionButton, DataTable } from "~/components";
import { FilterSelect } from "~/components/globals/filterBase";
import { EOrderStatus, orderStatus } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

export const OrderListTable: React.FC<
  TTable<TOrder> & {
    userOrder: TUserCatalogue[];
    userSale: TUserCatalogue[];
    RoleID: number;
    refetch: () => void;
  }
> = ({ data, loading, userOrder, userSale, RoleID, refetch }) => {
  // update
  const queryClient = useQueryClient();
  const mutationUpdate = useMutation(
    (data: { order: TOrder; userId: number; type: 1 | 2 }) =>
      mainOrder.updateStaff({
        Id: data.order.Id,
        StaffId: data.userId,
        Type: data.type,
      })
  );

  const columns: TColumnsType<TOrder> = [
    {
      dataIndex: "Id",
      title: "ID",
      fixed: "left",
      align: "right",
      width: 70,
    },
    {
      dataIndex: "UserName",
      title: "Username",
      fixed: "left",
      width: 120,
    },
    {
      dataIndex: "ImageOrigin",
      title: "Ảnh",
      align: "center",
      width: 100,
      render: (img) => (
        <div className="flex items-center justify-center">
          <img
            src={img ? img : "/default/pro-empty.jpg"}
            alt="image"
            width={100}
            height={100}
            style={{ borderRadius: 10, objectFit: "cover" }}
          />
        </div>
      ),
    },
    {
      dataIndex: "CurrentCNYVN",
      title: "Thông tin",
      width: 200,
      render: (_, record) => (
        <div className="text-[12px]">
          <div className="flex items-end justify-between">
            <p className="mr-1">Tỷ giá:</p>
            <p>
              {record?.CurrentCNYVN &&
                _format.getVND(record?.CurrentCNYVN, " Đ")}
            </p>
          </div>
          <div className="flex items-end justify-between">
            <p className="mr-1">Tiền hàng (¥):</p>
            <p>
              {/* {record?.PriceVND &&
								record?.CurrentCNYVN &&
								_format.getVND(record?.PriceVND / record?.CurrentCNYVN, ' ¥')} */}
              {_format.getVND(record?.PriceCNY, " ¥")}
            </p>
          </div>
          <div className="flex items-end justify-between">
            <p className="mr-1">Tổng tiền:</p>
            <p>
              {record?.TotalPriceVND &&
                _format.getVND(record?.TotalPriceVND, " Đ")}
            </p>
          </div>
          <div className="flex items-end justify-between font-bold text-[#008000]">
            <p className="mr-1">Tiền phải cọc:</p>
            <p>
              {record?.AmountDeposit &&
                _format.getVND(record?.AmountDeposit, " Đ")}
            </p>
          </div>
          <div className="flex items-end justify-between font-bold text-[#2196F3]">
            <p className="mr-1">Đã trả:</p>
            <p>{record?.Deposit && _format.getVND(record?.Deposit, " Đ")}</p>
          </div>
          <div className="flex items-end justify-between font-bold text-[#F44336]">
            <p className="mr-1">Còn lại:</p>
            <p>
              {record?.RemainingAmount &&
                _format.getVND(record?.RemainingAmount, " Đ")}
            </p>
          </div>
        </div>
      ),
    },
    {
      dataIndex: "SalerId",
      title:
        RoleID === 1 || RoleID === 3 || RoleID === 8 || RoleID === 6
          ? "Nhân viên"
          : RoleID === 7
          ? "Nhân viên đặt hàng"
          : "Nhân viên bán hàng",
      render: (_, record) => {
        return (
          <Fragment>
            {RoleID !== 4 && (
              <FilterSelect
                placeholder="Đặt hàng"
                data={userOrder}
                select={{ label: "UserName", value: "Id" }}
                defaultValue={
                  record.DatHangId &&
                  record.OrdererUserName && {
                    Id: record.DatHangId,
                    UserName: record.OrdererUserName,
                  }
                }
                disabled={!(RoleID === 1 || RoleID === 3)}
                callback={async (value) => {
                  const id = toast.loading("Đang xử lý ...");
                  mutationUpdate
                    .mutateAsync({
                      order: record,
                      userId: value,
                      type: 1,
                    })
                    .then(() => {
                      queryClient.invalidateQueries("orderList");
                      mutationUpdate.reset();
                      toast.update(id, {
                        render: "Cập nhật thành công",
                        isLoading: false,
                        autoClose: 0,
                        type: "success",
                      });
                    })
                    .catch((error) => {
                      toast.update(id, {
                        render: (error as any)?.response?.data?.ResultMessage,
                        isLoading: false,
                        autoClose: 0,
                        type: "error",
                      });
                    });
                }}
                handleSearch={(val) => val}
              />
            )}
            {(RoleID === 1 ||
              RoleID === 3 ||
              RoleID === 4 ||
              RoleID === 8 ||
              RoleID === 6) && (
              <FilterSelect
                placeholder="Kinh doanh"
                data={userSale}
                select={{ label: "UserName", value: "Id" }}
                defaultValue={
                  !!record.SalerId &&
                  !!record.SalerUserName && {
                    Id: record.SalerId,
                    UserName: record.SalerUserName,
                  }
                }
                disabled={!(RoleID === 1 || RoleID === 3)}
                callback={async (value) => {
                  const id = toast.loading("Đang xử lý ...");

                  mutationUpdate
                    .mutateAsync({
                      order: record,
                      userId: value,
                      type: 2,
                    })
                    .then(() => {
                      queryClient.invalidateQueries("orderList");
                      mutationUpdate.reset();
                      toast.update(id, {
                        render: "Cập nhật thành công",
                        isLoading: false,
                        autoClose: 0,
                        type: "success",
                      });
                    })
                    .catch((error) => {
                      toast.update(id, {
                        render: (error as any)?.response?.data?.ResultMessage,
                        isLoading: false,
                        autoClose: 0,
                        type: "error",
                      });
                    });
                }}
                handleSearch={(val) => val}
              />
            )}
          </Fragment>
        );
      },
      width: 160,
    },
    {
      dataIndex: "MainOrderTransactionCodeDetails",
      align: "center",
      title: () => <p>Mã đơn hàng - mã vận đơn</p>,
      width: 300,
      render: (data: TOrder["MainOrderTransactionCodeDetails"], record) => {
        return (
          <React.Fragment>
            {data.map((item, itemIndex) =>
              item.OrderTransactionCode.map((code, codeIndex) => (
                <div
                  key={`${code}--${codeIndex}`}
                  className={clsx("flex", {
                    "mt-2": !(itemIndex === 0 && codeIndex === 0),
                  })}
                >
                  <div className="w-1/2 text-black bg-[#0000000a] outline-none text-xs mr-2 px-2 py-1">
                    {item.MainOrderCode}
                  </div>
                  <div className="w-1/2 text-black bg-[#0000000a] outline-none text-xs px-2 py-1">
                    {code}
                  </div>
                </div>
              ))
            )}
            {record.IsDoneSmallPackage && (
              <Tag color="#2196F3" className="!mt-2 !mr-0">
                Đã đủ MVĐ
              </Tag>
            )}
          </React.Fragment>
        );
      },
      responsive: ["xl"],
    },
    {
      dataIndex: "DepositDate",
      title: "TimeLine",
      render: (_, record) => {
        return (
          <div className="text-left">
            {record.Created && (
              <p
                className={clsx(
                  !record.DepositDate &&
                    !record.DateBuy &&
                    !record.DateTQ &&
                    !record.DateVN &&
                    !record.PayDate &&
                    !record.CompleteDate &&
                    " text-warning ",
                  "flex justify-between px-2"
                )}
              >
                <span>Lên đơn:</span>
                <span>
                  {_format.getVNDate(record.Created, "HH:mm")} -
                  {_format.getVNDate(record.Created, "DD/MM/YYYY")}
                </span>
              </p>
            )}
            {record.DepositDate && (
              <p
                className={clsx(
                  !record.DateBuy &&
                    !record.DateTQ &&
                    !record.DateVN &&
                    !record.PayDate &&
                    !record.CompleteDate &&
                    " text-warning ",
                  "flex justify-between px-2"
                )}
              >
                <span>Đặt cọc:</span>
                <span>
                  {_format.getVNDate(record.DepositDate, "HH:mm")} -
                  {_format.getVNDate(record.DepositDate, "DD/MM/YYYY")}
                </span>
              </p>
            )}
            {record.DateBuy && (
              <p
                className={clsx(
                  !record.DateTQ &&
                    !record.DateVN &&
                    !record.PayDate &&
                    !record.CompleteDate &&
                    " text-warning ",
                  "flex justify-between px-2"
                )}
              >
                <span>Đặt hàng:</span>
                <span>
                  {_format.getVNDate(record.DateBuy, "HH:mm")} -
                  {_format.getVNDate(record.DateBuy, "DD/MM/YYYY")}
                </span>
              </p>
            )}
            {record.DateTQ && (
              <p
                className={clsx(
                  !record.DateVN &&
                    !record.PayDate &&
                    !record.CompleteDate &&
                    " text-warning ",
                  "flex justify-between px-2"
                )}
              >
                <span>Đã về kho TQ:</span>
                <span>
                  {_format.getVNDate(record.DateTQ, "HH:mm")} -
                  {_format.getVNDate(record.DateTQ, "DD/MM/YYYY")}
                </span>
              </p>
            )}
            {record.DateVN && (
              <p
                className={clsx(
                  !record.PayDate && !record.CompleteDate && "text-warning",
                  "flex justify-between px-2 "
                )}
              >
                <span>Đã về kho VN:</span>
                <span>
                  {_format.getVNDate(record.DateVN, "HH:mm")} -
                  {_format.getVNDate(record.DateVN, "DD/MM/YYYY")}
                </span>
              </p>
            )}
            {record.PayDate && (
              <p
                className={clsx(
                  !record.CompleteDate && "text-warning ",
                  "flex justify-between px-2"
                )}
              >
                <span>Thanh toán:</span>
                <span>
                  {_format.getVNDate(record.PayDate, "HH:mm")} -
                  {_format.getVNDate(record.PayDate, "DD/MM/YYYY")}
                </span>
              </p>
            )}
            {record.CompleteDate && (
              <p className=" text-warning flex justify-between px-2">
                <span>Hoàn thành:</span>
                <span>
                  {_format.getVNDate(record.CompleteDate, "HH:mm")} -
                  {_format.getVNDate(record.CompleteDate, "DD/MM/YYYY")}
                </span>
              </p>
            )}
            {record.CancelDate && (
              <p className="text-warning font-bold flex justify-between px-2">
                <span>Huỷ:</span>
                <span>
                  {_format.getVNDate(record.CancelDate, "HH:mm")} -
                  {_format.getVNDate(record.CancelDate, "DD/MM/YYYY")}
                </span>
              </p>
            )}
          </div>
        );
        // }
      },
      width: 280,
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status, record) => {
        const color = orderStatus.find((x) => x.id === status);
        return (
          <TagStatus color={color?.color} statusName={record?.StatusName} />
        );
      },
      width: 120,
    },
    {
      dataIndex: "action",
      key: "action",
      title: "Thao tác",
      align: "right",
      width: 120,
      render: (_, record) => (
        <div className="grid grid-cols-1 gap-2">
          <Link href={`/manager/order/order-list/detail/?id=${record?.Id}`}>
            <a target="_blank">
              <ActionButton
                icon="!mr-0"
                title="Chi tiết"
                isButton
                isButtonClassName="bg-main !text-white"
              />
            </a>
          </Link>
          {(RoleID === 1 || RoleID === 3) &&
            (record?.Status === EOrderStatus.InVietnamWarehoue ||
              record?.Status === EOrderStatus.NoDeposit) && (
              <ActionButton
                onClick={() =>
                  Modal.confirm({
                    title: "Xác nhận thanh toán đơn này!",
                    onOk: () => {
                      const id = toast.loading("Đang xử lý ...");
                      mainOrder
                        .payment({
                          Id: record?.Id,
                          Note: undefined,
                          PaymentMethod: 2,
                          PaymentType: record?.Status === 0 ? 1 : 2,
                          Amount:
                            record?.Status === 0
                              ? record?.AmountDeposit
                              : record?.RemainingAmount,
                        })
                        .then(() => {
                          refetch();
                          toast.update(id, {
                            render: `${
                              record?.Status === 0
                                ? "Đặt cọc thành công!"
                                : "Thanh toán thành công!"
                            }`,
                            autoClose: 0,
                            isLoading: false,
                            type: "success",
                          });
                        })
                        .catch((error) => {
                          toast.update(id, {
                            render: (error as any)?.response?.data
                              ?.ResultMessage,
                            autoClose: 0,
                            isLoading: false,
                            type: "error",
                          });
                        });
                    },
                  })
                }
                icon="!mr-0"
                title={
                  record?.Status === EOrderStatus.NoDeposit
                    ? "Đặt cọc"
                    : "Thanh toán"
                }
                isButton
                isButtonClassName={
                  record?.Status === EOrderStatus.NoDeposit
                    ? "bg-[brown] !text-white"
                    : "bg-blue !text-white"
                }
              />
            )}
        </div>
      ),
      fixed: "right",
    },
  ];

  return (
    <DataTable
      {...{
        loading,
        columns,
        data,
        bordered: true,
        scroll: { y: 700, x: 1200 },
      }}
    />
  );
};
