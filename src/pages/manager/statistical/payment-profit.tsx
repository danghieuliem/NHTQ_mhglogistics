import { TablePaginationConfig } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { reportPayHelp } from "~/api";
import {
  Layout,
  PaymentProfitChart,
  PaymentProfitFilter,
  PaymentProfitTable,
  toast,
} from "~/components";
import { breadcrumb, defaultPagination } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { selectUser, useAppSelector } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const { user: userStore } = useAppSelector(selectUser);
  if (!userStore) return null;

  const [fromDate, setFromDate] = useState<string>(null);
  const [toDate, setToDate] = useState<string>(null);
  const handleFilter = (fromDate: string, toDate: string) => {
    setFromDate(fromDate);
    setToDate(toDate);
  };

  const [pagination, setPagination] =
    useState<TablePaginationConfig>(defaultPagination);
  const [chartData, setChartData] = useState<Record<string, number>>(null);

  const { data, isFetching: isFetchingWithdraw } = useQuery(
    [
      "clientPurchaseReportData",
      {
        Current: pagination.current,
        PageSize: pagination.pageSize,
      },
    ],
    () =>
      reportPayHelp
        .getList({
          PageIndex: pagination.current,
          PageSize: pagination.pageSize,
          OrderBy: "Id desc",
        })
        .then((res) => res.Data),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data?.TotalItem });
        setChartData({
          MaxTotalPrice: data?.Items[0]?.MaxTotalPrice,
          MaxTotalPriceVNDGiaGoc: data?.Items[0]?.MaxTotalPriceVNDGiaGoc,
          MaxTotalPriceVND: data?.Items[0]?.MaxTotalPriceVND,
          MaxProfit: data?.Items[0]?.MaxProfit,
        });
      },
      onError: toast.error,
      enabled: !!userStore,
    }
  );

  return (
    <div className="tableBox">
      <PaymentProfitFilter handleFilter={handleFilter} />
      <PaymentProfitChart dataChart={chartData} />
      <div className="mt-10">
        <PaymentProfitTable
          {...{
            data: data?.Items,
            pagination,
            handlePagination: (pagination) => setPagination(pagination),
          }}
        />
      </div>
    </div>
  );
};

Index.displayName = SEOConfigs.statistical.profitPayFor;
Index.breadcrumb = breadcrumb.statistical.paymentProfit;
Index.Layout = Layout;

export default Index;
