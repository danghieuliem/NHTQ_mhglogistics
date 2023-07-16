import { TablePaginationConfig } from "antd";
import router from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { reportAdminSendUserWallet, reportWithdraw } from "~/api";
import {
  Layout,
  StatisticalRechargeChart,
  StatisticalRechargeFilter,
  StatisticalRechargeTable,
  StatisticalWithdrawTable,
} from "~/components";
import { breadcrumb, defaultPagination } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const [username, setUsername] = useState<string>(null);
  const [bankId, setBankId] = useState<number>(null);
  const [fromDate, setFromDate] = useState<string>(null);
  const [toDate, setToDate] = useState<string>(null);
  const [totalRecharge, setTotalRecharge] = useState<number>(null);
  const [totalWithdraw, setTotalWithdraw] = useState<number>(null);

  const handleFilter = (
    username: string,
    bankId: number,
    fromDate: string,
    toDate: string
  ) => {
    setUsername(username);
    setBankId(bankId);
    setFromDate(fromDate);
    setToDate(toDate);
  };
  const [rechargePagination, setRechargePagination] =
    useState<TablePaginationConfig>(defaultPagination);
  const [withdrawPagination, setWithdrawPagination] =
    useState<TablePaginationConfig>(defaultPagination);

  const { data: usertRechargeReportData, isFetching: isFetchingRecharge } =
    useQuery(
      [
        "clientRechargeReportData",
        {
          Current: rechargePagination.current,
          PageSize: rechargePagination.pageSize,
          username,
          bankId,
          fromDate,
          toDate,
        },
      ],
      () =>
        reportAdminSendUserWallet
          .getList({
            PageIndex: rechargePagination.current,
            PageSize: rechargePagination.pageSize,
            OrderBy: "Id desc",
            FromDate: fromDate,
            ToDate: toDate,
            SearchContent: username,
            BankId: bankId,
          })
          .then((res) => res.Data),
      {
        onSuccess: (data) => {
          setRechargePagination({
            ...rechargePagination,
            total: data?.TotalItem,
          });
          setTotalRecharge(data?.Items[0]?.TotalAmount);
        },
        onError: (error) =>
          toast.error((error as any)?.response?.data?.ResultMessage),
      }
    );

  const { data: userWithDrawReportData, isFetching: isFetchingWithdraw } =
    useQuery(
      [
        "clientWithDrawReportData",
        {
          Current: withdrawPagination.current,
          PageSize: withdrawPagination.pageSize,
          fromDate,
          toDate,
        },
      ],
      () =>
        reportWithdraw
          .getList({
            PageIndex: withdrawPagination.current,
            PageSize: withdrawPagination.pageSize,
            OrderBy: "Id desc",
            FromDate: fromDate,
            ToDate: toDate,
            SearchContent: username,
          })
          .then((res) => res.Data),
      {
        onSuccess: (data) => {
          setWithdrawPagination({
            ...withdrawPagination,
            total: data?.TotalItem,
          });
          setTotalWithdraw(data?.Items[0]?.TotalAmount);
        },
        onError: (error) =>
          toast.error((error as any)?.response?.data?.ResultMessage),
      }
    );

  const handleExportExcelRecharge = () => {
    reportAdminSendUserWallet
      .exportExcel({
        PageIndex: rechargePagination.current,
        PageSize: 99999,
        OrderBy: "Id desc",
        FromDate: fromDate,
        ToDate: toDate,
        SearchContent: username,
        BankId: bankId,
      })
      .then((res) => {
        router.push(`${res.Data}`);
      })
      .catch((error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      });
  };

  const handleExportExcelWithDraw = () => {
    reportWithdraw
      .exportExcel({
        PageIndex: withdrawPagination.current,
        PageSize: 99999,
        OrderBy: "Id desc",
        FromDate: fromDate,
        ToDate: toDate,
        SearchContent: username,
      })
      .then((res) => {
        router.push(`${res.Data}`);
      })
      .catch((error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      });
  };

  return (
    <div className="">
      <div className="tableBox grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-3 h-fit">
          <StatisticalRechargeFilter handleFilter={handleFilter} />
        </div>
        <div className="col-span-9">
          <StatisticalRechargeChart
            dataChart={{ totalRecharge, totalWithdraw }}
          />
        </div>
      </div>
      <div className="mb-4">
        <StatisticalRechargeTable
          data={usertRechargeReportData?.Items}
          loading={isFetchingRecharge}
          pagination={rechargePagination}
          handlePagination={setRechargePagination}
          handleExportExcelRecharge={handleExportExcelRecharge}
        />
      </div>

      <div className="mb-4">
        <StatisticalWithdrawTable
          data={userWithDrawReportData?.Items}
          loading={isFetchingWithdraw}
          pagination={withdrawPagination}
          handlePagination={setWithdrawPagination}
          handleExportExcelWithDraw={handleExportExcelWithDraw}
        />
      </div>
    </div>
  );
};

Index.displayName = SEOConfigs.statistical.depositMoney;
Index.breadcrumb = breadcrumb.statistical.recharge;
Index.Layout = Layout;

export default Index;
