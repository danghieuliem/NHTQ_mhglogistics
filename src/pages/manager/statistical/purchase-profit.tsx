import { Pagination } from "antd";
import router from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { reportMainOrder } from "~/api";
import {
  Layout,
  PurchaseProfiltFilter,
  PurchaseProfitChart,
  PurchaseProfitTable,
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
    FromDate: null,
    ToDate: null,
  });

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
  };

  const [chartData, setChartData] = useState<Record<string, number>>(null);

  const { data, isFetching } = useQuery(
    [
      "clientPurchaseReportData",
      [filter.PageIndex, filter.FromDate, filter.ToDate],
    ],
    () => reportMainOrder.getList(filter).then((res) => res.Data),
    {
      onSuccess: (data) => {
        setFilter({
          ...filter,
          TotalItems: data?.TotalItem,
          PageIndex: data?.PageIndex,
          PageSize: data?.PageSize,
        });
        setChartData({
          MaxTotalPriceVND: data?.Items[0]?.MaxTotalPriceVND,
          MaxTotalPriceReal: data?.Items[0]?.MaxTotalPriceReal,
          MaxProfit: data?.Items[0]?.MaxProfit,
          MaxPriceVND: data?.Items[0]?.MaxPriceVND,
          MaxFeeShipCN: data?.Items[0]?.MaxFeeShipCN,
          MaxFeeWeight: data?.Items[0]?.MaxFeeWeight,
          MaxFeeBuyPro: data?.Items[0]?.MaxFeeBuyPro,
          MaxIsPackedPrice: data?.Items[0]?.MaxIsPackedPrice,
          MaxIsCheckProductPrice: data?.Items[0]?.MaxIsCheckProductPrice,
          MaxFeeInWareHouse: data?.Items[0]?.MaxFeeInWareHouse,
        });
      },
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
    }
  );

  const handleExportExcel = () => {
    reportMainOrder
      .exportExcel({ Status: 5, ...filter, PageSize: 99999 })
      .then((res) => {
        router.push(res?.Data);
      })
      .catch((error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      });
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="tableBox col-span-1">
        <PurchaseProfiltFilter handleFilter={handleFilter} />
        <PurchaseProfitChart dataChart={chartData} />
      </div>
      <div className="cols-span-1">
        <PurchaseProfitTable
          {...{
            data: data?.Items,
            // pagination,
            // handlePagination: (pagination) => setPagination(pagination),
            loading: isFetching,
            handleExportExcel: handleExportExcel,
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

Index.displayName = SEOConfigs.statistical.profitBuyFor;
Index.breadcrumb = breadcrumb.statistical.purchaseProfit;
Index.Layout = Layout;

export default Index;
