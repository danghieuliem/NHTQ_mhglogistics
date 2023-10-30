import router from "next/router";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { smallPackage } from "~/api";
import {
  Layout,
  TransactionCodeManagementFilterMemo,
  TransactionCodeManagementTable,
} from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo
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
    [
      "smallPackageList",
      [
        filter.SearchContent,
        filter.SearchType,
        filter.Status,
        filter.FromDate,
        filter.ToDate,
        filter.PageIndex,
      ],
    ],
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

  const handleExporTExcel = useCallback(async () => {
    const id = toast.loading("Đang xử lý ...");
    let newFilter = { ...filter };

    if (
      filter.SearchContent ||
      filter.SearchType ||
      filter.Status ||
      filter.FromDate ||
      filter.ToDate
    ) {
      newFilter = {
        ...filter,
        PageSize: 9999,
      };
    }
    try {
      const res = await smallPackage.exportExcel(newFilter);
      router.push(`${res.Data}`);
    } catch (error) {
      toast.update(id, {
        isLoading: false,
        autoClose: 1,
        type: "error",
        render: (error as any)?.response?.data?.ResultMessage,
      });
    } finally {
      toast.update(id, {
        isLoading: false,
        autoClose: 1,
        type: "default",
      });
    }
  }, [
    filter.SearchContent,
    filter.SearchType,
    filter.Status,
    filter.FromDate,
    filter.ToDate,
  ]);

  return (
    <>
      <TransactionCodeManagementFilterMemo
        handleFilter={handleFilter}
        handleExporTExcel={handleExporTExcel}
      />

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
