import { TablePaginationConfig } from "antd";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { mainOrder, payHelp, transportationOrder } from "~/api";
import {
  showToast,
  UserAnotherOrder,
  UserLayout,
  UserOrder,
  UserPayment,
  UserStatistic,
  UserTransfer,
} from "~/components";
import { defaultPagination } from "~/configs";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { selectUser, useAppSelector } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const title = "titlePageUser";
const boxItem = "col-span-4";

const dataBoxItem = [
  {
    key: "mainOrderTotal",
    label: "Mua hàng hộ",
    path: "/user/order-list",
    icon: "fad fa-shopping-basket",
    color: "#2A8BD5",
    value: null,
  },
  {
    key: "mainOrderOtherTotal",
    label: "Mua hàng hộ khác",
    path: "/user/order-list?q=3",
    icon: "fad fa-shopping-basket",
    color: "#27A689",
    value: null,
  },
  {
    key: "transportTotal",
    label: "Ký gửi",
    path: "/user/deposit-list",
    icon: "fad fa-dolly",
    color: "#F1A934",
    value: null,
  },
  {
    key: "paymentTotal",
    label: "Thanh toán hộ",
    path: "/user/request-list",
    icon: "fad fa-credit-card",
    color: "#E54C36",
    value: null,
  },
];

const Index: TNextPageWithLayout = () => {
  const { user } = useAppSelector(selectUser);
  const [pagination, setPagination] =
    useState<TablePaginationConfig>(defaultPagination);
  const [total, setTotal] = useState(dataBoxItem);

  const {
    data: orderData,
    isFetching: isFetchingOrder,
    isLoading: isLoadingOrder,
  } = useQuery(
    [
      "userOrderListMainOrder",
      {
        PageIndex: 1,
        PageSize: 10,
        OrderBy: "Created desc",
        UID: user?.UserId,
        OrderType: 1,
      },
    ],
    () =>
      mainOrder
        .getList({
          PageIndex: 1,
          PageSize: 10,
          OrderBy: "Created desc",
          UID: user?.UserId,
          OrderType: 1,
        })
        .then((res) => {
          dataBoxItem[0].value = res.Data.TotalItem;
          return res.Data;
        }),
    {
      onError: (error) => {
        showToast({
          // title: (error as any)?.response?.data?.ResultCode,
          title: "Đã xảy ra lỗi!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        });
      },
      enabled: !!user,
      staleTime: 5000,
    }
  );

  const {
    data: otherOrderData,
    isFetching: isFetchingOtherOrder,
    isLoading: isLoadingOtherOrder,
  } = useQuery(
    [
      "userOrderOtherList",
      {
        PageIndex: 1,
        PageSize: 10,
        OrderBy: "Created desc",
        OrderType: 3,
        UID: user?.UserId,
      },
    ],
    () =>
      mainOrder
        .getList({
          PageIndex: 1,
          PageSize: 10,
          OrderBy: "Created desc",
          UID: user?.UserId,
          OrderType: 3,
        })
        .then((res) => {
          dataBoxItem[1].value = res.Data.TotalItem;
          return res.Data;
        }),
    {
      onError: (error) => {
        showToast({
          // title: (error as any)?.response?.data?.ResultCode,
          title: "Đã xảy ra lỗi!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        });
      },
      enabled: !!user,
      staleTime: 5000,
    }
  );

  const {
    isFetching: isFetchingPayment,
    data: paymentData,
    isLoading: isLoadingPayment,
  } = useQuery(
    [
      "requestPaymentData",
      {
        PageCurrent: 1,
        PageSize: 10,
        OrderBy: "Created desc",
        UID: user?.UserId,
      },
    ],
    () =>
      payHelp
        .getList({
          PageIndex: 1,
          PageSize: 10,
          OrderBy: "Created desc",
          UID: user?.UserId,
        })
        .then((res) => {
          dataBoxItem[3].value = res.Data.TotalItem;
          return res.Data;
        }),
    {
      onError: (error) => {
        showToast({
          // title: (error as any)?.response?.data?.ResultCode,
          title: "Đã xảy ra lỗi!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        });
      },
      staleTime: 5000,
      enabled: !!user,
    }
  );

  const {
    isFetching: isFetchingTransport,
    data: transportData,
    isLoading: isLoadingTransport,
  } = useQuery(
    [
      "deliveryOrder",
      {
        Current: 1,
        PageSize: 10,
        UID: user?.UserId,
      },
    ],
    () =>
      transportationOrder
        .getList({
          PageIndex: 1,
          PageSize: 10,
          OrderBy: "Created desc",
          UID: user?.UserId,
        })
        .then((res) => {
          dataBoxItem[2].value = res.Data.TotalItem;
          return res.Data;
        }),
    {
      onError: (error) => {
        showToast({
          // title: (error as any)?.response?.data?.ResultCode,
          title: "Đã xảy ra lỗi!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        });
      },
      enabled: !!user,
      staleTime: 5000,
    }
  );

  useEffect(() => {
    setTotal(dataBoxItem);
  }, [transportData, paymentData, orderData, otherOrderData]);

  useEffect(() => {
    setTotal(dataBoxItem);
  }, [orderData]);

  return (
    <React.Fragment>
      <div className={title}>Dashboard</div>
      <UserStatistic total={total} />
      <div className="grid grid-cols-4 gap-4">
        <div className={clsx(boxItem)}>
          <UserOrder
            {...{
              data: orderData,
              isLoading: isLoadingOrder,
              isFetching: isFetchingOrder,
              pagination: pagination,
            }}
          />
        </div>
        <div className={clsx(boxItem)}>
          <UserAnotherOrder
            {...{
              data: otherOrderData,
              isFetching: isFetchingOtherOrder,
              isLoading: isLoadingOtherOrder,
              pagination: pagination,
            }}
          />
        </div>
        <div className={clsx(boxItem)}>
          <UserTransfer
            {...{
              data: transportData,
              isFetching: isFetchingTransport,
              isLoading: isLoadingTransport,
              pagination: pagination,
            }}
          />
        </div>
        <div className={clsx(boxItem)}>
          <UserPayment
            {...{
              data: paymentData,
              isLoading: isLoadingPayment,
              isFetching: isFetchingPayment,
              pagination: pagination,
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
Index.displayName = SEOHomeConfigs.dashboard;
Index.Layout = UserLayout;

export default Index;
