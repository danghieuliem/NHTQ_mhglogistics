import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { bigPackage } from "~/api";
import {
  Layout,
  PackageManagementFilter,
  PackageManagementTable,
} from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const [filter, setFilter] = useState({
    PageIndex: 1,
    PageSize: 20,
    OrderBy: "Id desc",
    SearchContent: null,
    TotalItems: null,
  });

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
  };
  const { data, isFetching, isLoading } = useQuery(
    ["bigPackageList", { ...filter }],
    () => bigPackage.getList(filter).then((res) => res.Data),
    {
      keepPreviousData: true,
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
      staleTime: 5000,
    }
  );

  if (!data) return null;

  return (
    <>
      <PackageManagementFilter handleFilter={handleFilter} />
      <PackageManagementTable
        filter={filter}
        handleFilter={handleFilter}
        data={data?.Items}
        loading={isFetching}
      />
    </>
  );
};

Index.displayName = SEOConfigs.parcelManagement.packageManagement;
Index.breadcrumb = breadcrumb.warehouse.packageManagement.detail;
Index.Layout = Layout;

export default Index;
