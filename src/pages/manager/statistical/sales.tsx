import { TablePaginationConfig } from "antd";
import router from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { reportMainOrder } from "~/api";
import {
  Layout,
  SalesFilter,
  SalesMoneyStatisticChart,
  SalesMoneyStatisticTable,
  SalesOrderStatisticTable,
  toast,
} from "~/components";
import { breadcrumb, defaultPagination } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurretnInfo
  );

  const [type, setType] = useState<"sum" | "detail">("detail");
  const [fromDate, setFromDate] = useState<string>(null);
  const [toDate, setToDate] = useState<string>(null);
  const handleFilter = (fromDate: string, toDate: string) => {
    setFromDate(fromDate);
    setToDate(toDate);
  };

  // const [paymentPagination, setPaymentPagination] =
  //   useState<TablePaginationConfig>(defaultPagination);
  const [orderPagination, setOrderPagination] =
    useState<TablePaginationConfig>(defaultPagination);

  const resetPagination = () => {
    // setPaymentPagination(defaultPagination);
    setOrderPagination(defaultPagination);
  };

  // const {
  //   data: userPaymentReportData,
  //   isFetching: isFetchingPayment,
  //   isLoading: isLoadingPayment,
  // } = useQuery(
  //   [
  //     "clientPaymentReportData",
  //     {
  //       Current: paymentPagination.current,
  //       PageSize: paymentPagination.pageSize,
  //       fromDate,
  //       toDate,
  //       UID: newUser?.UserId,
  //       RoleID: newUser?.UserGroupId,
  //     },
  //   ],
  //   () =>
  //     reportPayOrderHistory
  //       .getList({
  //         PageIndex: paymentPagination.current,
  //         PageSize: paymentPagination.pageSize,
  //         OrderBy: "Id desc",
  //         FromDate: fromDate,
  //         ToDate: toDate,
  //         UID: newUser?.UserId,
  //         RoleID: newUser?.UserGroupId,
  //       })
  //       .then((res) => res.Data),
  //   {
  //     onSuccess: (data) => {
  //       setPaymentPagination({
  //         ...paymentPagination,
  //         total: data?.TotalItem,
  //       });
  //     },
  //     onError: () => {
  //       showToast({
  //         title: "Lỗi!",
  //         message: "Đường truyền kết nối server bị lỗi! Vui lòng thử lại!",
  //         type: "error",
  //       });
  //     },
  //   }
  // );

  const {
    data: userOrderReportData,
    isFetching: isFetchingOrder,
    isLoading: isLoadingOrder,
  } = useQuery(
    [
      "clientOrderReportData",
      {
        Current: orderPagination.current,
        PageSize: orderPagination.pageSize,
        FromDate: fromDate,
        ToDate: toDate,
        UID: userCurrentInfo?.Id,
        RoleID: userCurrentInfo?.UserGroupId,
      },
    ],
    () =>
      reportMainOrder
        .getList({
          PageIndex: orderPagination.current,
          PageSize: orderPagination.pageSize,
          OrderBy: "Id desc",
          FromDate: fromDate,
          ToDate: toDate,
          UID: userCurrentInfo?.Id,
          RoleID: userCurrentInfo?.UserGroupId,
          Status: 2,
        })
        .then((res) => res.Data),
    {
      onSuccess: (data) => {
        setOrderPagination({ ...orderPagination, total: data?.TotalItem });
      },
      onError: (error) =>
        toast.error((error as any)?.response?.data?.ResultMessage),
    }
  );

  const { data: totalOverviewData } = useQuery(
    [
      "get-total-overview",
      {
        fromDate,
        toDate,
        UID: userCurrentInfo?.Id,
        RoleID: userCurrentInfo?.UserGroupId,
      },
    ],
    () =>
      reportMainOrder.getTotalOverview({
        FromDate: fromDate,
        ToDate: toDate,
        UID: userCurrentInfo?.Id,
        RoleID: userCurrentInfo?.UserGroupId,
      }),
    {
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
    }
  );

  // const handleExportExcelPayment = async () => {
  //   try {
  //     const res = await reportPayOrderHistory.export({
  //       UID: userCurrentInfo?.Id,
  //       RoleID: userCurrentInfo?.UserGroupId,
  //     });
  //     router.push(`${res.Data}`);
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };

  const handleExportExcelOrder = async () => {
    try {
      const res = await reportMainOrder.export({
        UID: userCurrentInfo?.Id,
        RoleID: userCurrentInfo?.UserGroupId,
      });
      router.push(`${res.Data}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="tableBox col-span-8 h-fit">
        <SalesFilter
          handleFilter={handleFilter}
          type={type}
          handleType={() =>
            setType((type) => (type === "detail" ? "sum" : "detail"))
          }
          resetPagination={resetPagination}
        />
        <SalesMoneyStatisticChart
          type={type}
          dataChart={totalOverviewData?.Data}
        />
      </div>

      <div className="col-span-4">
        <SalesMoneyStatisticTable data={totalOverviewData?.Data} />
      </div>
      <div className="col-span-12">
        <SalesOrderStatisticTable
          pagination={orderPagination}
          handlePagination={setOrderPagination}
          loading={isFetchingOrder}
          data={userOrderReportData?.Items}
          exportExcel={handleExportExcelOrder}
          RoleID={userCurrentInfo?.UserGroupId}
        />
      </div>

      {/* <div className={`${styleBorder}`}>
				<SalesPaymentStatisticTable
					pagination={paymentPagination}
					handlePagination={setPaymentPagination}
					loading={isFetchingPayment}
					data={userPaymentReportData?.Items}
					exportExcel={handleExportExcelPayment}
					RoleID={newUser?.UserGroupId}
				/>
			</div> */}
    </div>
  );
};

Index.displayName = SEOConfigs.statistical.turnover;
Index.breadcrumb = breadcrumb.statistical.sales;
Index.Layout = Layout;

export default Index;
