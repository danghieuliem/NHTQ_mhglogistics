import router from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { smallPackage } from "~/api";
import {
  showToast,
  toast,
  TransactionCodeManagementTable,
  UserLayout
} from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { selectUser, useAppSelector } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const { user: userStore } = useAppSelector(selectUser);
  if (!userStore) return null;

  const [filter, setFilter] = useState({
    SearchType: null,
    SearchContent: null,
    Status: null,
    FromDate: null,
    ToDate: null,
    OrderBy: "Id desc",
    TotalItems: null,
    PageSize: 20,
    PageIndex: 1,
    Menu: 2,
    UID: userStore.UserId,
  });

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
  };

  const { data, isFetching, isLoading } = useQuery(
    ["smallPackageList", { ...filter }],
    () => smallPackage.getList(filter).then((res) => res.Data),
    {
      keepPreviousData: true,
      onSuccess: (data) =>
        setFilter({
          ...filter,
          TotalItems: data?.TotalItem,
          PageIndex: data?.PageIndex,
          PageSize: data?.PageSize,
        }),
      onError: toast.error,
      enabled: !!userStore,
    }
  );

  const handleExporTExcel = () => {
    smallPackage
      .exportExcel({ ...filter, PageSize: 99999 })
      .then((res) => {
        router.push(`${res.Data}`);
      })
      .catch((error) => {
        showToast({
          title: "Đã xảy ra lỗi!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        });
      });
  };

  return (
    <>
      <div className="tableBox mt-6">
        <TransactionCodeManagementTable
          handleExporTExcel={handleExporTExcel}
          data={data?.Items}
          loading={isFetching}
          filter={filter}
          handleFilter={handleFilter}
        />
      </div>
    </>
  );
};

Index.displayName = SEOConfigs.parcelManagement.billCodeManager;
Index.breadcrumb = breadcrumb.warehouse.transactionCodeManagement;
Index.Layout = UserLayout;

export default Index;
