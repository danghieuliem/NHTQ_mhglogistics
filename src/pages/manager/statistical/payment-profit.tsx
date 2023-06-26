import { Pagination } from "antd";
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
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const [filter, setFilter] = useState({
    TotalItems: null,
    PageSize: 20,
    PageIndex: 1,
    OrderBy: "Id desc",
    Status: 5,
    fromDate: null,
    toDate: null,
  });

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
  };

  const [chartData, setChartData] = useState<Record<string, number>>(null);

  const { data, isFetching: isFetchingWithdraw } = useQuery(
    ["clientPurchaseReportData", { ...filter }],
    () => reportPayHelp.getList({ ...filter }).then((res) => res.Data),
    {
      onSuccess: (data) => {
        setFilter({
          ...filter,
          TotalItems: data?.TotalItem,
          PageIndex: data?.PageIndex,
          PageSize: data?.PageSize,
        });
        setChartData({
          MaxTotalPrice: data?.Items[0]?.MaxTotalPrice,
          MaxTotalPriceVNDGiaGoc: data?.Items[0]?.MaxTotalPriceVNDGiaGoc,
          MaxTotalPriceVND: data?.Items[0]?.MaxTotalPriceVND,
          MaxProfit: data?.Items[0]?.MaxProfit,
        });
      },
      onError: toast.error,
      staleTime: 5000,
    }
  );

  return (
    <div>
      <PaymentProfitFilter handleFilter={handleFilter} />
      <PaymentProfitChart dataChart={chartData} />
      <div className="mt-10">
        <PaymentProfitTable
          {...{
            data: data?.Items,
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
      </div>
    </div>
  );
};

Index.displayName = SEOConfigs.statistical.profitPayFor;
Index.breadcrumb = breadcrumb.statistical.paymentProfit;
Index.Layout = Layout;

export default Index;
