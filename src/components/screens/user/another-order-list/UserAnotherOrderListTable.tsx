import { Divider, Modal, Popover } from "antd";
import { TableRowSelection } from "antd/lib/table/interface";
import clsx from "clsx";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { mainOrder, orderShopTemp } from "~/api";
import {
  ActionButton,
  DataTable,
  ReportContentMemo,
  UserAnotherOrderListFilterMemo,
} from "~/components";

import { EOrderStatus, orderStatus } from "~/configs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";
import { EParamQ } from "~/enums";
import { RootState } from "~/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export const UserAnotherOrderListTable: React.FC<
  TTable<TOrder> & {
    type;
    q;
    moneyOfOrders;
    filter;
    handleFilter;
  }
> = ({ data, loading, q, moneyOfOrders, filter, handleFilter }) => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo
  );
  const { query } = useRouter();
  const queryClient = useQueryClient();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [listStatus, setListStatus] = useState([...orderStatus]);

  const handleDeleteProd = async (id: number) => {
    const idToast = toast.loading("Đang xử lý");
    try {
      await mainOrder.delete(id);
      toast.update(idToast, {
        render: `Hủy đơn hàng #${id} thành công!`,
        type: "success",
        autoClose: 500,
        isLoading: false,
      });
      queryClient.invalidateQueries("orderList");
    } catch (error) {
      toast.update(idToast, {
        render: (error as any)?.response?.data?.ResultMessage,
        type: "error",
        autoClose: 1000,
        isLoading: false,
      });
    }
  };

  const handleAddSameOrder = useCallback((Id: number) => {
    const id = toast.loading("Đang thêm ...");
    orderShopTemp
      .addSame({ Id: Id })
      .then(() => {
        toast.update(id, {
          render: "Thêm đơn thành công, vui lòng kiểm tra giỏ hàng!",
          type: "success",
          autoClose: 500,
          isLoading: false,
        });
      })
      .catch(() => {
        toast.update(id, {
          render: "Thêm đơn thất bại!",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      });
  }, []);

  const mutationUpdateDeposit = useMutation((data: TOrder[]) =>
    mainOrder.updateOrder(data?.map((item) => item.Id), { Status: 2 })
  );

  const mutationUpdatePayment = useMutation((data: TOrder[]) =>
    mainOrder.updateOrder(data?.map((item) => item?.Id), { Status: 7 })
  );

  const handleDeposit = useCallback((data: TOrder[]) => {
    const id = toast.loading("Đang xử lý ...");
    mutationUpdateDeposit
      .mutateAsync(data)
      .then(() => {
        queryClient.invalidateQueries("orderList");
        queryClient.invalidateQueries("clientData");
        queryClient.invalidateQueries({ queryKey: "menuData" });
        setSelectedRowKeys([]);
        toast.update(id, {
          render: "Đặt cọc thành công.",
          isLoading: false,
          type: "success",
          autoClose: 500,
        });
      })
      .catch((error) => {
        toast.update(id, {
          render: (error as any)?.response?.data?.ResultMessage,
          isLoading: false,
          type: "error",
          autoClose: 1000,
        });
      });
  }, []);

  const handlePayment = useCallback((data: TOrder[]) => {
    const id = toast.loading("Đang xử lý ...");
    mutationUpdatePayment
      .mutateAsync(data)
      .then(() => {
        queryClient.invalidateQueries("orderList");
        queryClient.invalidateQueries("clientData");
        setSelectedRowKeys([]);
        toast.update(id, {
          render: "Đặt cọc thành công.",
          isLoading: false,
          autoClose: 500,
          type: "success",
        });
      })
      .catch((error) => {
        toast.update(id, {
          render: (error as any)?.response?.data?.ResultMessage,
          isLoading: false,
          type: "error",
          autoClose: 1000,
        });
      });
  }, []);

  useQuery(
    [
      "number-of-order",
      {
        UID: userCurrentInfo?.Id,
        orderType: query?.q === EParamQ.otherOrder ? 3 : 1,
      },
    ],
    () =>
      mainOrder.getNumberOfOrder({
        UID: userCurrentInfo?.Id,
        orderType: query?.q === EParamQ.otherOrder ? 3 : 1,
      }),
    {
      onSuccess(res) {
        const data = res.Data;
        const newListStatus = [...listStatus];
        data?.forEach((x) => {
          const index = newListStatus.findIndex((i) => i.id === x?.Status);
          if (index !== -1) {
            newListStatus[index].value = x?.Quantity;
          }
        });
        setListStatus(newListStatus);
      },
      onError(error) {
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
      enabled: !!userCurrentInfo?.Id,
      keepPreviousData: true,
      staleTime: 5000,
      refetchOnWindowFocus: true,
    }
  );

  const columns: TColumnsType<TOrder> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 60,
      responsive: ["lg"],
      render: (value) => {
        return (
          <Link href={`/user/order-list/detail/?id=${value}`}>
            <a target="_blank">{value}</a>
          </Link>
        );
      },
    },
    {
      dataIndex: "ImageOrigin",
      title: "Ảnh",
      align: "center",
      render: (img) => {
        return (
          <div className="flex justify-center m-auto w-20 h-20">
            <img
              src={img ? img.replaceAll(" ", "") : "/default/pro-empty.jpg"}
              alt="image"
              width={75}
              height={75}
              style={{ borderRadius: "4px", objectFit: "contain" }}
            />
          </div>
        );
      },
      width: 90,
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
      responsive: ["sm"],
      render: (price) => _format.getVND(price, ""),
      width: 120,
    },
    {
      dataIndex: "AmountDeposit",
      title: (
        <>
          Số tiền phải cọc
          <br />
          (VNĐ)
        </>
      ),
      align: "right",
      width: 120,
      responsive: ["md"],
      render: (price) => _format.getVND(price, ""),
    },
    {
      dataIndex: "Deposit",
      title: (
        <>
          Số tiền đã cọc
          <br />
          (VNĐ)
        </>
      ),
      width: 120,
      align: "right",
      responsive: ["md"],
      render: (price) => _format.getVND(price, ""),
    },
    {
      dataIndex: "DepositDate",
      title: "TimeLine",
      width: 240,
      render: (_, record) => (
        <React.Fragment>
          {record.Created && (
            <p
              className={clsx(
                (record?.Status === EOrderStatus.ChoBaoGia ||
                  record?.Status === EOrderStatus.DonMoi) &&
                  "text-red",
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
          {record.DepositDate && (
            <p
              className={clsx(
                record?.Status === EOrderStatus.DaCoc && "text-red",
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
                record?.Status === EOrderStatus.DaMuaHang && "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Đã mua hàng:</span>
              <span>
                {_format.getVNDate(record.DateBuy, "HH:mm")} -
                {_format.getVNDate(record.DateBuy, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.DateSendGoods && (
            <p
              className={clsx(
                record?.Status === EOrderStatus.ShopPhatHang && "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Shop phát hàng:</span>
              <span>
                {_format.getVNDate(record.DateSendGoods, "HH:mm")} -
                {_format.getVNDate(record.DateSendGoods, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.DateTQ && (
            <p
              className={clsx(
                record?.Status === EOrderStatus.VeTQ && "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Về kho TQ:</span>
              <span>
                {_format.getVNDate(record.DateTQ, "HH:mm")} -
                {_format.getVNDate(record.DateTQ, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.DateComingVN && (
            <p
              className={clsx(
                record?.Status === EOrderStatus.DangVeVN && "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Đang về VN:</span>
              <span>
                {_format.getVNDate(record.DateComingVN, "HH:mm")} -
                {_format.getVNDate(record.DateComingVN, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.DateVN && (
            <p
              className={clsx(
                record?.Status === EOrderStatus.VeVN && "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Về kho VN:</span>
              <span>
                {_format.getVNDate(record.DateVN, "HH:mm")} -
                {_format.getVNDate(record.DateVN, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.PayDate && (
            <p
              className={clsx(
                record?.Status === EOrderStatus.DaThanhToan && "text-red",
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
            <p
              className={clsx(
                record?.Status === EOrderStatus.HoanThanh && "text-red",
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
                record?.Status === EOrderStatus.KhieuNai && "text-red",
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
        </React.Fragment>
      ),
      responsive: ["xl"],
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status) => {
        const color = orderStatus.find((x) => x.id === status);
        return <TagStatus color={color?.color} statusName={color?.name} />;
      },
      width: 140,
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      render: (_, record) => {
        return (
          <div className="flex gap-1 flex-wrap">
            <Link href={`/user/order-list/detail/?id=${record?.Id}`}>
              <a target="_blank">
                <ActionButton
                  isButton={true}
                  icon="fas fa-info-square"
                  title="Chi tiết"
                />
              </a>
            </Link>
            {query?.q !== EParamQ.otherOrder && (
              <ActionButton
                onClick={() =>
                  Modal.confirm({
                    title: "Xác nhận muốn mua lại đơn hàng này?",
                    onOk: () => handleAddSameOrder(record?.Id),
                  })
                }
                isButton={true}
                icon="fas fa-cart-arrow-down"
                title="Mua lại"
                isButtonClassName=""
              />
            )}
            {record?.Status === EOrderStatus.DonMoi && (
              <ActionButton
                onClick={() =>
                  Modal.confirm({
                    title: "Xác nhận đặt cọc đơn này",
                    onOk: () => handleDeposit([record]),
                  })
                }
                icon="far fa-dollar-sign"
                title="Đặt cọc"
                isButton={true}
                isButtonClassName="bg-green !text-white"
              />
            )}
            {record?.Status === EOrderStatus.VeVN && (
              <ActionButton
                onClick={() =>
                  Modal.confirm({
                    title: "Xác nhận thanh toán đơn này",
                    onOk: () => handlePayment([record]),
                  })
                }
                icon="fas fa-credit-card"
                title="Thanh toán"
                isButtonClassName="bg-blue !text-white"
                isButton={true}
              />
            )}
            {(record?.Status === EOrderStatus.DonMoi ||
              record?.Status === EOrderStatus.ChoBaoGia) && (
              <ActionButton
                onClick={() =>
                  Modal.confirm({
                    title: "Xác nhận xóa đơn hàng?",
                    onOk: () => handleDeleteProd(record?.Id),
                  })
                }
                icon="fas fa-trash"
                isButtonClassName="!bg-red !text-white"
                title="Hủy"
                btnYellow
                isButton={true}
              />
            )}
            {record?.Status === EOrderStatus.HoanThanh && (
              <Popover
                trigger={"click"}
                placement="left"
                content={<ReportContentMemo defaultValue={record} />}
              >
                <ActionButton
                  icon="fas fa-balance-scale-right"
                  title="Khiếu nại"
                  btnRed
                  isButton={true}
                  isButtonClassName="bg-red !text-white"
                />
              </Popover>
            )}
          </div>
        );
      },
      responsive: ["xl"],
      width: 130,
      fixed: "right",
    },
  ];

  const rowSelection: TableRowSelection<TOrder> = {
    selectedRowKeys: selectedRowKeys?.map((item) => item.Id),
    getCheckboxProps: (record) => {
      return [
        EOrderStatus.DonMoi,
        EOrderStatus.VeTQ,
        EOrderStatus.VeVN,
      ].includes(record.Status)
        ? { name: record.Id.toString(), disabled: false }
        : { name: record.Id.toString(), disabled: true, className: "!hidden" };
    },
    onChange: (_, selectedRows: TOrder[]) => {
      setSelectedRowKeys(selectedRows);
    },
  };

  return (
    <div>
      <DataTable
        {...{
          columns,
          data,
          rowSelection,
          loading,
          scroll: { y: 640 },
          mediaWidth: 1200,
          extraElementClassName:
            "flex items-center !justify-between !w-full flex-wrap flex-col gap-2 relative",
          extraElement: (
            <>
              <UserAnotherOrderListFilterMemo
                selectedRowKeys={selectedRowKeys}
                handleDeposit={handleDeposit}
                handlePayment={handlePayment}
                moneyOfOrders={moneyOfOrders}
                numberOfOrder={listStatus}
                handleFilter={handleFilter}
              />
            </>
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
    </div>
  );
};
