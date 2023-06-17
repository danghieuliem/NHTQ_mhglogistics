import { Pagination } from "antd";
import router, { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { mainOrder } from "~/api";
import {
  Layout,
  OrderListFilter,
  OrderListTable,
  showToast,
} from "~/components";
import { orderStatus } from "~/configs/appConfigs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { useCatalogue } from "~/hooks/useCatalogue";
import { useAppSelector } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const { current: newUser } = useAppSelector((state) => state.user);
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
    UID: newUser?.UserId,
    RoleID:
      newUser?.UserGroupId === 8 || newUser?.UserGroupId === 6
        ? 3
        : newUser?.UserGroupId,
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
      UID: newUser?.UserId,
      RoleID: newUser?.UserGroupId === 8 ? 3 : newUser?.UserGroupId,
    });
    setNumberOfOrder(orderStatus);
  }, [query?.q]);

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter });    
  };  

  const { data, isFetching, isLoading, refetch } = useQuery(
    ["orderList", { ...filter }],
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
      onError: () => {
        showToast({
          title: "Lỗi!",
          message: "Đường truyền kết nối server bị lỗi! Vui lòng thử lại!",
          type: "error",
        });
      },
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    }
  );

  const { userOrder, userSale } = useCatalogue({
    userOrderEnabled: !!newUser,
    userSaleEnabled: !!newUser,
  });

  const handleExportExcel = async () => {
    mainOrder
      .exportExcel({ ...filter, PageSize: 99999 })
      .then((res) => {
        router.push(res?.Data);
      })
      .catch((error) => {
        showToast({
          title: "Đã xảy ra lỗi!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        });
      });
  };

  useQuery(
    [
      "number-of-order",
      {
        UID: newUser?.UserId,
        RoleID:
          newUser?.UserGroupId === 8 || newUser?.UserGroupId === 6
            ? 3
            : newUser?.UserGroupId,
        orderType: query?.q === "3" ? 3 : 1,
      },
    ],
    () =>
      mainOrder.getNumberOfOrder({
        UID: newUser?.UserId,
        RoleID:
          newUser?.UserGroupId === 8 || newUser?.UserGroupId === 6
            ? 3
            : newUser?.UserGroupId,
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
        showToast({
          title: "Đã xảy ra lỗi!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        });
      },
    }
  );

  return (
    <Fragment>
      <div className="breadcrumb-2">
        {query?.q === "3" ? "Đơn hàng mua hộ khác" : "Đơn hàng mua hộ"}
      </div>
      <div id="special" className="">
        <div className="mb-4">
          <OrderListFilter
            numberOfOrder={numberOfOrder}
            handleFilter={handleFilter}
            handleExportExcel={handleExportExcel}
            newUser={newUser}
          />
        </div>
        <div className="tableBox">
          <OrderListTable
            {...{
              loading: isFetching,
              data: data?.Items,
              userOrder,
              userSale,
              RoleID: newUser?.UserGroupId,
              refetch,
            }}
          />
          <div className="mt-4 text-right">
            <Pagination
              total={filter?.TotalItems}
              current={filter?.PageIndex}
              pageSize={filter?.PageSize}
              onChange={(page, pageSize) =>
                handleFilter({ ...filter, PageIndex: page, PageSize: pageSize })
              }
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Index.displayName = SEOConfigs.oder.orderMain;
Index.Layout = Layout;

export default Index;
