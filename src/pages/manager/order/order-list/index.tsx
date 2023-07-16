import { Pagination } from "antd";
import router, { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { mainOrder } from "~/api";
import { Layout, OrderListFilter, OrderListTable } from "~/components";
import { orderStatus } from "~/configs/appConfigs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { useCatalogue } from "~/hooks/useCatalogue";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurretnInfo
  );
  const { query } = useRouter();
  const [numberOfOrder, setNumberOfOrder] = useState(orderStatus);
  const [filter, setFilter] = useState({
    TypeSearch: null,
    SearchContent: null,
    Status: null,
    FromPrice: null,
    ToPrice: null,
    FromDate: null,
    ToDate: null,
    IsNotMainOrderCode: false,
    sorter: null,
    TotalItems: null,
    OrderType: query?.q === "3" ? 3 : 1,
    PageIndex: 1,
    PageSize: 20,
    OrderBy: "Id desc",
    UID: userCurrentInfo?.Id,
    RoleID:
      userCurrentInfo?.UserGroupId === 8 || userCurrentInfo?.UserGroupId === 6
        ? 3
        : userCurrentInfo?.UserGroupId,
  });

  useEffect(() => {
    setFilter({
      TypeSearch: null,
      SearchContent: null,
      Status: null,
      FromPrice: null,
      ToPrice: null,
      FromDate: null,
      ToDate: null,
      IsNotMainOrderCode: false,
      sorter: null,
      TotalItems: null,
      OrderType: query?.q === "3" ? 3 : 1,
      PageIndex: 1,
      PageSize: 20,
      OrderBy: "Id desc",
      UID: userCurrentInfo?.Id,
      RoleID:
        userCurrentInfo?.UserGroupId === 8 ? 3 : userCurrentInfo?.UserGroupId,
    });
    setNumberOfOrder(orderStatus);
  }, [query?.q]);

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
  };

  const { data, isFetching, isLoading, refetch } = useQuery(
    [
      "orderList",
      [
        filter.TypeSearch,
        filter.FromDate,
        filter.ToDate,
        filter.FromPrice,
        filter.ToPrice,
        filter.IsNotMainOrderCode,
        filter.SearchContent,
        filter.Status,
        filter.UID,
      ],
    ],
    () => mainOrder.getList(filter).then((res) => res.Data),
    {
      onSuccess: (data) => {
        setFilter({
          ...filter,
          TotalItems: data?.TotalItem,
          PageIndex: data?.PageIndex,
          PageSize: data?.PageSize,
        });
      },
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
      keepPreviousData: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      staleTime: 5000,
    }
  );

  const { userOrder, userSale } = useCatalogue({
    userOrderEnabled: true,
    userSaleEnabled: true,
  });

  const handleExportExcel = async () => {
    mainOrder
      .exportExcel({ ...filter, PageSize: 99999 })
      .then((res) => {
        router.push(res?.Data);
      })
      .catch((error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      });
  };

  useQuery(
    [
      "number-of-order",
      {
        UID: userCurrentInfo?.Id,
        RoleID:
          userCurrentInfo?.UserGroupId === 8 ||
          userCurrentInfo?.UserGroupId === 6
            ? 3
            : userCurrentInfo?.UserGroupId,
        orderType: query?.q === "3" ? 3 : 1,
      },
    ],
    () =>
      mainOrder.getNumberOfOrder({
        UID: userCurrentInfo?.Id,
        RoleID:
          userCurrentInfo?.UserGroupId === 8 ||
          userCurrentInfo?.UserGroupId === 6
            ? 3
            : userCurrentInfo?.UserGroupId,
        orderType: query?.q === "3" ? 3 : 1,
      }),
    {
      onSuccess(res) {
        const data = res.Data;
        data?.forEach((d) => {
          const target = orderStatus.find((x) => x.id === d?.Status);
          if (target) {
            target.value = d?.Quantity;
          }
        });
      },
      onError(error) {
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  return (
    <Fragment>
      <div className="breadcrumb">
        {query?.q === "3" ? "Đơn hàng mua hộ khác" : "Đơn hàng mua hộ"}
      </div>
      <OrderListFilter
        numberOfOrder={numberOfOrder}
        handleFilter={handleFilter}
        handleExportExcel={handleExportExcel}
        newUser={userCurrentInfo}
      />
      <OrderListTable
        {...{
          loading: isFetching,
          data: data?.Items,
          userOrder,
          userSale,
          RoleID: userCurrentInfo?.UserGroupId,
          refetch,
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
    </Fragment>
  );
};

Index.displayName = SEOConfigs.oder.orderMain;
Index.Layout = Layout;

export default Index;
