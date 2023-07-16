import { Pagination } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { mainOrder } from "~/api";
import { UserAnotherOrderListTable, UserLayout } from "~/components";
import { createdMoneyOfOrdersData, orderStatus } from "~/configs/appConfigs";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurretnInfo
  );
  const { query } = useRouter();
  const [items, setItems] = useState<TOrder[]>([]);
  const type = useRef<"deposit" | "payment">("deposit");
  const queryClient = useQueryClient();

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
    OrderType: query?.q === "3" ? 3 : 1,
  });

  // const [depositType, setDepositType] = useState<TDepositType>("one");
  // const [modal, setModal] = useState(false);
  const [moneyOfOrders, setMoneyOfOrders] = useState(createdMoneyOfOrdersData);

  const handleFilter = (newFilter) => {
    const newFilterSet = { ...newFilter };
    delete newFilterSet.TotalItems;
    setFilter({ ...filter, ...newFilterSet });
  };

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
      OrderType: query?.q === "3" ? 3 : 1,
      TotalItems: null,
    });
    setMoneyOfOrders(createdMoneyOfOrdersData);
  }, [query?.q, userCurrentInfo?.Id]);

  const { data, isFetching, refetch } = useQuery(
    ["orderList", filter],
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

  // const handleModal = (
  //   itemsSelected?: TOrder[],
  //   currentModalType?: TModalType,
  //   currentDepositType?: TDepositType
  // ) => {
  //   setItems(itemsSelected);
  //   setDepositType(currentDepositType);
  //   if (!!itemsSelected?.length) {
  //     setModal(true);
  //   } else {
  //     setModal(false);
  //   }
  // };

  useQuery(
    ["main-order-amount", { OrderType: query?.q === "3" ? 3 : 1 }],
    () =>
      mainOrder.getMainOrderAmount({
        orderType: query?.q === "3" ? 3 : 1,
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
    }
  );

  useQuery(
    [
      "number-of-order",
      { UID: userCurrentInfo?.Id, orderType: query?.q === "3" ? 3 : 1 },
    ],
    () =>
      mainOrder.getNumberOfOrder({
        UID: userCurrentInfo?.Id,
        orderType: query?.q === "3" ? 3 : 1,
      }),
    {
      onSuccess(res) {
        const data = res.Data;
        data?.forEach((d) => {
          const target = orderStatus.find((x) => x?.id === d?.Status);
          if (target) {
            target.value = d?.Quantity;
          }
        });
      },
      onError(error) {
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
      enabled: !!userCurrentInfo?.Id,
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
          // handleModal,
          type,
          q: query?.q,
        }}
      />
      <Pagination
        total={filter?.TotalItems}
        current={filter?.PageIndex}
        pageSize={filter?.PageSize}
        onChange={(page, pageSize) =>
          handleFilter({ ...filter, PageIndex: page, PageSize: pageSize })
        }
      />
    </React.Fragment>
  );
};

Index.displayName = SEOHomeConfigs.buyGroceries.listOder;
Index.breadcrumb = "Đơn hàng";
Index.Layout = UserLayout;

export default Index;
