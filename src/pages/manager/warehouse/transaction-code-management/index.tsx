import router from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { smallPackage } from "~/api";
import {
  Layout,
  toast,
  TransactionCodeManagementFilter,
  TransactionCodeManagementTable,
} from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurretnInfo
  );
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
    UID: userCurrentInfo?.Id,
    RoleID: userCurrentInfo?.UserGroupId,
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
    }
  );

  const handleExporTExcel = () => {
    smallPackage
      .exportExcel({ ...filter, PageSize: 99999 })
      .then((res) => {
        router.push(`${res.Data}`);
      })
      .catch((error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      });
  };

  return (
    <>
      <div className="">
        <TransactionCodeManagementFilter
          handleFilter={handleFilter}
          handleExporTExcel={handleExporTExcel}
        />
      </div>
      <TransactionCodeManagementTable
        handleExporTExcel={handleExporTExcel}
        data={data?.Items}
        loading={isFetching}
        filter={filter}
        handleFilter={handleFilter}
      />
    </>
  );
};

Index.displayName = SEOConfigs.parcelManagement.billCodeManager;
Index.breadcrumb = breadcrumb.warehouse.transactionCodeManagement;
Index.Layout = Layout;

export default Index;
