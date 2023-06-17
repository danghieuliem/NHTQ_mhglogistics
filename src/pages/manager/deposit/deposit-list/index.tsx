import router from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { transportationOrder } from "~/api";
import { breadcrumb } from "~/configs";
import {
  DepositListFilter,
  DepositListTable,
  Layout,
  showToast,
} from "~/components";
import { transportStatus } from "~/configs/appConfigs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { selectUser, useAppSelector } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";
import { useCatalogue } from "~/hooks";

const Index: TNextPageWithLayout = () => {
  const { user } = useAppSelector(selectUser);
  if (!user) return null;

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
    UID: user?.UserId,
    RoleID: user?.UserGroupId,
    SalerID: null,
  });

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
  };

  const { isFetching, data, isLoading, refetch } = useQuery(
    ["depositList", { ...filter }],
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
        showToast({
          title: "Lỗi!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        });
      },
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
        showToast({
          title: "Lỗi!",
          message: "Đường truyền kết nối server bị lỗi! Vui lòng thử lại!",
          type: "error",
        });
      });
  };

  useQuery(
    ["deposit-infor-list"],
    () =>
      transportationOrder.getAmountInfo({
        UID: user?.UserId,
        RoleID: user?.UserGroupId,
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
        showToast({
          title: "Lỗi kết nối máy chủ!",
          message: "Vui lòng tải lại trang!",
          type: "error",
        });
      },
      retry: false,
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
      <div className="tableBox">
        <DepositListTable
          userSale={userSale}
          refetch={refetch}
          data={data?.Items}
          loading={isFetching}
          filter={filter}
          handleFilter={handleFilter}
          RoleID={user?.UserGroupId}
        />
      </div>
    </div>
  );
};

Index.displayName = SEOConfigs.deposit.listDeposit;
Index.breadcrumb = breadcrumb.deposit.depositList.main;
Index.Layout = Layout;

export default Index;
