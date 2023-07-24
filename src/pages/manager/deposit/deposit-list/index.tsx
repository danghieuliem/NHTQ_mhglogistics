import router from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { transportationOrder } from "~/api";
import { DepositListFilter, DepositListTable, Layout } from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { transportStatus } from "~/configs/appConfigs";
import { useCatalogue } from "~/hooks";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurretnInfo
  );

  const { userSale } = useCatalogue({
    userSaleEnabled: true,
  });

  const [filter, setFilter] = useState({
    TypeSearch: null,
    SearchContent: null,
    FromDate: null,
    ToDate: null,
    Status: null,
    TotalItems: null,
    PageIndex: 1,
    PageSize: 20,
    UID: userCurrentInfo?.Id,
    RoleID: userCurrentInfo?.UserGroupId,
    SalerID: null,
    OrderBy: "Id desc",
  });

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
  };

  const { isFetching, data, isLoading, refetch } = useQuery(
    [
      "depositList",
      [
        filter.TypeSearch,
        filter.FromDate,
        filter.ToDate,
        filter.SearchContent,
        filter.Status,
        filter.UID,
        filter.PageIndex,
        filter.SalerID
      ],
    ],
    () => transportationOrder.getList(filter).then((res) => res.Data),
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
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  const handleExporTExcel = async () => {
    transportationOrder
      .exportExcel({
        ...filter,
        PageSize: 99999,
      })
      .then((res) => {
        router.push(`${res.Data}`);
      })
      .catch((error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      });
  };

  useQuery(
    ["deposit-infor-list"],
    () =>
      transportationOrder.getAmountInfo({
        UID: userCurrentInfo?.Id,
        RoleID: userCurrentInfo?.UserGroupId,
      }),
    {
      onSuccess: (res) => {
        const data = res.Data;
        data?.forEach((x) => {
          const target = transportStatus.find((i) => i.id === x?.Status);
          if (target) {
            target.value = x?.Quantity;
          }
        });
      },
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
      retry: false,
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  return (
    <div className="">
      <DepositListFilter
        userSale={userSale}
        numberOfOrder={transportStatus}
        handleFilter={(newFilter) => handleFilter(newFilter)}
        handleExporTExcel={handleExporTExcel}
      />
      <DepositListTable
        userSale={userSale}
        refetch={refetch}
        data={data?.Items}
        loading={isFetching}
        filter={filter}
        handleFilter={handleFilter}
        RoleID={userCurrentInfo?.UserGroupId}
      />
    </div>
  );
};

Index.displayName = SEOConfigs.deposit.listDeposit;
Index.breadcrumb = breadcrumb.deposit.depositList.main;
Index.Layout = Layout;

export default Index;
