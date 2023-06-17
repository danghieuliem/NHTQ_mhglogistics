import { Space, Tag } from "antd";
import clsx from "clsx";
import Link from "next/link";
import router from "next/router";
import React, { Fragment } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { mainOrder } from "~/api";
import { ActionButton, DataTable } from "~/components";
import { FilterSelect } from "~/components/globals/filterBase";
import { orderStatus } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

export const OrderListTable: React.FC<
  TTable<TOrder> & {
    userOrder: TUserCatalogue[];
    userSale: TUserCatalogue[];
    RoleID: number;
    refetch: () => void;
  }
> = ({
  data,
  handlePagination,
  pagination,
  loading,
  userOrder,
  userSale,
  RoleID,
  refetch,
}) => {
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
      title: "ID Đơn",
      width: 80,
      fixed: "left",
    },
    {
      dataIndex: "UserName",
      title: "Username",
      responsive: ["md"],
      width: 120,
      fixed: "left",
    },
    {
      dataIndex: "ImageOrigin",
      title: "Ảnh",
      align: "center",
      render: (img) => (
        <div className="flex items-center justify-center">
          <img
            src={img ? img : "/default/pro-empty.jpg"}
            alt="image"
            width={100}
            height={100}
            style={{ borderRadius: 10 }}
          />
        </div>
      ),
      width: 100,
    },
    {
      dataIndex: "CurrentCNYVN",
      title: "Thông tin",
      width: 250,
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
                menuPortalTarget={document.querySelector(
                  "div.ant-table-wrapper"
                )}
                styles={{
                  menuPortal: (base) => {
                    return {
                      ...base,
                      // left: (base?.["left"] as number) - 64,
                      // top: (base?.["top"] as number) - 68,
                      zIndex: 800,
                      marginBottom: "10px",
                    };
                  },
                }}
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
                menuPortalTarget={document.querySelector(
                  "div.ant-table-wrapper"
                )}
                styles={{
                  menuPortal: (base) => {
                    return {
                      ...base,
                      // left: (base?.["left"] as number) - 64,
                      // top: (base?.["top"] as number) - 68,
                      zIndex: 800,
                    };
                  },
                }}
              />
            )}
          </Fragment>
        );
      },
      width: 200,
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
        // if (record?.Status === 1) {
        //   return (
        //     <div className="flex flex-col">
        //       <span>{_format.getVNDate(record?.CancelDate)}</span>
        //       <Tag color="#000" className="w-fit">
        //         {record?.StatusName}
        //       </Tag>
        //     </div>
        //   );
        // } else {
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
      responsive: ["xl"],
    },
    {
      dataIndex: "Status",
      title: "Trạng thái hiện tại",
      render: (status, record) => {
        const color = orderStatus.find((x) => x.id === status);
        return <Tag color={color?.color}>{record?.StatusName}</Tag>;
      },
      responsive: ["xl"],
      width: 160,
    },
    {
      dataIndex: "action",
      key: "action",
      title: "Thao tác",
      align: "right",
      render: (_, record) => (
        <Space>
          {(RoleID === 1 || RoleID === 3) &&
            record?.Status !== 101 &&
            record?.Status !== 100 &&
            record.Status !== 10 &&
            record?.Status !== 9 &&
            record?.Status !== 6 &&
            record?.Status !== 1 && (
              <ActionButton
                onClick={() => {
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
                        render: (error as any)?.response?.data?.ResultMessage,
                        autoClose: 0,
                        isLoading: false,
                        type: "error",
                      });
                    });
                }}
                icon="fas fa-wallet"
                title={record?.Status === 0 ? "Đặt cọc" : "Thanh toán"}
                btnBlue
              />
            )}
          <Link href={`/manager/order/order-list/detail/?id=${record?.Id}`}>
            <a target="_blank">
              <ActionButton
                onClick={() => undefined}
                icon="fas fa-edit"
                title="Cập nhật"
              />
            </a>
          </Link>
        </Space>
      ),
      fixed: "right",
      width: 100,
      responsive: ["xl"],
    },
  ];

  const expandable = {
    expandedRowRender: (record) => (
      <ul className="px-2 text-xs">
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Trạng thái: </span>
          <Tag color={orderStatus.find((x) => x.id === record?.Status)?.color}>
            {record?.StatusName}
          </Tag>
        </li>
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Mã đơn hàng- mã vận đơn:</span>
          {!record?.IsCheckNotiPrice && record?.OrderType === 3 ? (
            <Tag color="#D32F2F">Đơn chưa báo giá</Tag>
          ) : (
            <React.Fragment>
              <span className="flex flex-col w-[50%]">
                {record?.MainOrderTransactionCodeDetails?.map(
                  (item: any, itemIndex) =>
                    item?.OrderTransactionCode?.map((code, codeIndex) => (
                      <div
                        key={`${code}--${codeIndex}`}
                        className={clsx("flex", {
                          "mt-2": !(itemIndex === 0 && codeIndex === 0),
                        })}
                      >
                        <div className="w-1/2 text-black text-center bg-[#0000000a] outline-none text-xs mr-2 px-2 py-1">
                          {item.MainOrderCode}
                        </div>
                        <div className="w-1/2 text-black text-center bg-[#0000000a] outline-none text-xs px-2 py-1">
                          {code}
                        </div>
                      </div>
                    ))
                )}
                {record.IsDoneSmallPackage && (
                  <Tag
                    color="#2196F3"
                    className="!mt-2 !mr-0 w-fit self-center"
                  >
                    Đã đủ MVĐ
                  </Tag>
                )}
              </span>
            </React.Fragment>
          )}
        </li>
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Trạng thái:</span>
          {record?.Status === 1 ? (
            <div className="flex flex-col">
              <span>{_format.getVNDate(record?.CancelDate)}</span>
              <Tag color="#000" className="w-fit">
                {record?.StatusName}
              </Tag>
            </div>
          ) : (
            <div className="text-left min-w-[50%]">
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
                  <span>Lên đơn:</span>{" "}
                  <span>
                    {" "}
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
                  <span>Đặt cọc:</span>{" "}
                  <span>
                    {" "}
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
                    {" "}
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
                  <span>Đã về kho TQ:</span>{" "}
                  <span>
                    {" "}
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
                    {" "}
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
                    {" "}
                    {_format.getVNDate(record.PayDate, "HH:mm")} -
                    {_format.getVNDate(record.PayDate, "DD/MM/YYYY")}
                  </span>
                </p>
              )}
              {record.CompleteDate && (
                <p className=" text-warning flex justify-between px-2">
                  <span>Hoàn thành:</span>{" "}
                  <span>
                    {" "}
                    {_format.getVNDate(record.CompleteDate, "HH:mm")} -
                    {_format.getVNDate(record.CompleteDate, "DD/MM/YYYY")}
                  </span>
                </p>
              )}
            </div>
          )}
        </li>
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Thao tác:</span>
          <Space>
            <ActionButton
              onClick={() =>
                router.push({
                  pathname: "/manager/order/order-list/detail",
                  query: { id: record?.Id },
                })
              }
              icon="fas fa-edit"
              title="Cập nhật"
            />

            {(RoleID === 1 || RoleID === 3) && (
              <ActionButton
                onClick={() =>
                  router.push({
                    pathname: "/manager/order/payment",
                    query: { id: record?.Id },
                  })
                }
                icon="fas fa-wallet"
                title="Thanh toán"
              />
            )}
          </Space>
        </li>
      </ul>
    ),
  };

  return (
    <DataTable
      {...{
        loading,
        columns,
        data,
        bordered: true,
        // pagination: pagination,
        // onChange: handlePagination,
        expandable: expandable,
        scroll: { y: 600 },
      }}
    />
  );
};
