import { Pagination } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { reportHistoryPayWallet } from "~/api";
import {
  Layout,
  TransactionChart,
  TransactionFilter,
  TransactionTable,
} from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";
import { _format } from "~/utils";

const Index: TNextPageWithLayout = () => {
  const [filter, setFilter] = useState({
    TotalItems: null,
    PageIndex: 1,
    PageSize: 20,
    OrderBy: "Id desc",
    FromDate: null,
    ToDate: null,
  });

  const [chartData, setChartData] = useState<Record<string, number>>(null);
  const handleFilter = (newFilter) => setFilter({ ...filter, ...newFilter });

  const { data, isFetching, isLoading } = useQuery(
    [
      "clientTransactionReportData",
      [filter.PageIndex, filter.FromDate, filter.ToDate],
    ],
    () => reportHistoryPayWallet.getList(filter).then((res) => res.Data),
    {
      onSuccess: (data) => {
        setFilter({
          ...filter,
          TotalItems: data?.TotalItem,
          // PageIndex: data?.PageIndex,
          PageSize: data?.PageSize,
        });
        setChartData({
          TotalAmount: data?.Items[0]?.TotalAmount,
          TotalDeposit: data?.Items[0]?.TotalDeposit,
          TotalReciveDeposit: data?.Items[0]?.TotalReciveDeposit,
          TotalPaymentBill: data?.Items[0]?.TotalPaymentBill,
          TotalAdminSend: data?.Items[0]?.TotalAdminSend,
          TotalWithDraw: data?.Items[0]?.TotalWithDraw,
          TotalCancelWithDraw: data?.Items[0]?.TotalCancelWithDraw,
          TotalComplain: data?.Items[0]?.TotalComplain,
          TotalPaymentTransport: data?.Items[0]?.TotalPaymentTransport,
          TotalPaymentHo: data?.Items[0]?.TotalPaymentHo,
          TotalPaymentSaveWare: data?.Items[0]?.TotalPaymentSaveWare,
          TotalRecivePaymentTransport:
            data?.Items[0]?.TotalRecivePaymentTransport,
        });
      },
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
    }
  );

  return (
    <div className="">
      <div className="flex  gap-4">
        <TransactionFilter handleFilter={handleFilter} />
        <div className="tableBox text-lg text-[#333] flex items-center gap-4 w-fit">
          Tổng số tiền giao dịch:{" "}
          <span className="font-bold text-main">
            {_format.getVND(data?.Items[0]?.TotalAmount)}
          </span>
        </div>
      </div>
      <TransactionChart dataChart={chartData} />
      <div className="mt-6">
        <TransactionTable
          {...{
            data: data?.Items,
            loading: isFetching,
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

Index.displayName = SEOConfigs.statistical.transaction;
Index.breadcrumb = breadcrumb.statistical.transaction;
Index.Layout = Layout;

export default Index;
