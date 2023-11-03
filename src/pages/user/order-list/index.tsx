import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { mainOrder } from "~/api";
import { UserAnotherOrderListTable, UserLayout } from "~/components";
import { orderStatus } from "~/configs";
import { createdMoneyOfOrdersData } from "~/configs/appConfigs";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { EParamQ } from "~/enums";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo
  );
  const { query } = useRouter();
  const type = useRef<"deposit" | "payment">("deposit");

  const [filter, setFilter] = useState({
    TypeSearch: null,
    SearchContent: null,
    TotalItems: null,
    PageIndex: 1,
    PageSize: 20,

    Status: null,
    FromDate: null,
    ToDate: null,
    UID: userCurrentInfo?.Id,
    OrderType: query?.q === EParamQ.otherOrder ? 3 : 1,
  });

  const [moneyOfOrders, setMoneyOfOrders] = useState(createdMoneyOfOrdersData);

  const handleFilter = useCallback(
    (newFilter) => {
      setFilter({ ...filter, ...newFilter });
    },
    [filter]
  );

  useEffect(() => {
    setFilter({
      TypeSearch: null,
      SearchContent: null,
      Status: null,
      FromDate: null,
      ToDate: null,
      PageIndex: 1,
      PageSize: 20,
      UID: userCurrentInfo?.Id,
      OrderType: query?.q === EParamQ.otherOrder ? 3 : 1,
      TotalItems: null,
    });
    setMoneyOfOrders(createdMoneyOfOrdersData);
  }, [query?.q, userCurrentInfo?.Id]);

  const { data, isFetching } = useQuery(
    [
      "orderList",
      [
        filter.ToDate,
        filter.FromDate,
        filter.OrderType,
        filter.PageIndex,
        filter.SearchContent,
        filter.Status,
        filter.UID,
        filter.PageIndex,
      ],
    ],
    () => mainOrder.getList(filter).then((res) => res.Data),
    {
      onSuccess: (data) =>
        setFilter({
          ...filter,
          TotalItems: data?.TotalItem,
          PageIndex: data?.PageIndex,
          PageSize: data?.PageSize,
        }),
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
      retry: true,
      enabled: !!userCurrentInfo?.Id,
      keepPreviousData: true,
      staleTime: 5000,
      refetchOnWindowFocus: true,
    }
  );

  useQuery(
    [
      "main-order-amount",
      { OrderType: query?.q === EParamQ.otherOrder ? 3 : 1 },
    ],
    () =>
      mainOrder.getMainOrderAmount({
        orderType: query?.q === EParamQ.otherOrder ? 3 : 1,
      }),
    {
      onSuccess: (res) => {
        const data = res.Data;
        for (let key in data) {
          moneyOfOrders.forEach((item) => {
            if (item.key === key) {
              item.value = data[key];
            }
          });
        }
        setMoneyOfOrders(moneyOfOrders);
      },
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
      enabled: !!userCurrentInfo?.Id,
      staleTime: 5000,
      keepPreviousData: true,
      refetchOnWindowFocus: true,
    }
  );

  return (
    <React.Fragment>
      <UserAnotherOrderListTable
        {...{
          data: data?.Items,
          handleFilter,
          moneyOfOrders,
          loading: isFetching,
          type,
          q: query?.q,
          filter,
        }}
      />
    </React.Fragment>
  );
};

Index.displayName = SEOHomeConfigs.buyGroceries.listOder;
Index.breadcrumb = "Đơn hàng";
Index.Layout = UserLayout;

export default Index;
