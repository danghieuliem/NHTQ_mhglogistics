import { Pagination } from "antd";
import router from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { reportMainOrder } from "~/api";
import {
  Layout,
  PurchaseProfiltFilter,
  PurchaseProfitChart,
  PurchaseProfitTable,
  showToast,
} from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { selectUser, useAppSelector } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const { user: userStore } = useAppSelector(selectUser);
  if (!userStore) return null;

  const [filter, setFilter] = useState({
    TotalItems: null,
    PageSize: 10,
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

  const { data, isFetching } = useQuery(
    ["clientPurchaseReportData", { ...filter }],
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
        showToast({
          title: "Đã xảy ra lỗi!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        });
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
        showToast({
          title: "Đã xảy ra lỗi!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        });
      });
  };

  return (
    <div className="tableBox">
      <PurchaseProfiltFilter handleFilter={handleFilter} />
      <PurchaseProfitChart dataChart={chartData} />
      <div className="mt-10 border-t border-[#b9b9b9] mt-4 pt-4">
        <PurchaseProfitTable
          {...{
            data: data?.Items,
            // pagination,
            // handlePagination: (pagination) => setPagination(pagination),
            loading: isFetching,
            handleExportExcel: handleExportExcel,
          }}
        />
        <div className="mt-4 text-right">
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
    </div>
  );
};

Index.displayName = SEOConfigs.statistical.profitBuyFor;
Index.breadcrumb = breadcrumb.statistical.purchaseProfit;
Index.Layout = Layout;

export default Index;
