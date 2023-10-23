import { TablePaginationConfig } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { complain } from "~/api";
import { ReportListTable, UserLayout } from "~/components";
import { defaultPagination } from "~/configs/appConfigs";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo
  );

  const [pagination, setPagination] =
    useState<TablePaginationConfig>(defaultPagination);

  const { isFetching, data } = useQuery(
    [
      "reportList",
      {
        Current: pagination.current,
        PageSize: pagination.pageSize,
        UID: userCurrentInfo?.Id,
      },
    ],
    () =>
      complain
        .getList({
          UID: userCurrentInfo?.Id,
          PageIndex: pagination.current,
          PageSize: pagination.pageSize,
          OrderBy: "Id desc",
        })
        .then((res) => res.Data),
    {
      keepPreviousData: true,
      onSuccess: (data) =>
        setPagination({ ...pagination, total: data?.TotalItem }),
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
    }
  );

  return (
    <ReportListTable
      {...{
        data: data?.Items,
        pagination,
        handlePagination: (pagination) => setPagination(pagination),
        loading: isFetching,
      }}
    />
  );
};

Index.displayName = SEOHomeConfigs.complain;
Index.breadcrumb = "Danh sách khiếu nại";
Index.Layout = UserLayout;

export default Index;
