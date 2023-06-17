import { TablePaginationConfig } from "antd";
import router from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { reportMainOrder, reportPayOrderHistory } from "~/api";
import {
  Layout,
  SalesFilter,
  SalesMoneyStatisticChart,
  SalesMoneyStatisticTable,
  SalesOrderStatisticTable,
  showToast,
  toast,
} from "~/components";
import { breadcrumb, defaultPagination } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { useAppSelector } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const styleBorder = `tableBox mb-4`;

const Index: TNextPageWithLayout = () => {
  const { current: newUser } = useAppSelector((state) => state.user);

  if (!newUser) return null;


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
        UID: newUser?.UserId,
        RoleID: newUser?.UserGroupId,
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
          UID: newUser?.UserId,
          RoleID: newUser?.UserGroupId,
          Status: 2,
        })
        .then((res) => res.Data),
    {
      onSuccess: (data) => {
        setOrderPagination({ ...orderPagination, total: data?.TotalItem });
      },
      onError: (error) =>
        showToast({
          title: (error as any)?.response?.data?.ResultCode,
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        }),
    }
  );

  const { data: totalOverviewData } = useQuery(
    [
      "get-total-overview",
      {
        fromDate,
        toDate,
        UID: newUser?.UserId,
        RoleID: newUser?.UserGroupId,
      },
    ],
    () =>
      reportMainOrder.getTotalOverview({
        FromDate: fromDate,
        ToDate: toDate,
        UID: newUser?.UserId,
        RoleID: newUser?.UserGroupId,
      }),
    {
      onError: () => {
        showToast({
          title: "Lỗi!",
          message: "Đường truyền kết nối server bị lỗi! Vui lòng thử lại!",
          type: "error",
        });
      },
    }
  );

  const handleExportExcelPayment = async () => {
    try {
      const res = await reportPayOrderHistory.export({
        UID: newUser?.UserId,
        RoleID: newUser?.UserGroupId,
      });
      router.push(`${res.Data}`);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleExportExcelOrder = async () => {
    try {
      const res = await reportMainOrder.export({
        UID: newUser?.UserId,
        RoleID: newUser?.UserGroupId,
      });
      router.push(`${res.Data}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="">
      <div className={`${styleBorder}`}>
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
      <div className={`${styleBorder} p-4`}>
        {/* <p className="mb-4 text-base font-bold py-2 uppercase">Chi tiết</p> */}
        <SalesMoneyStatisticTable data={totalOverviewData?.Data} />
      </div>
      <div className={`${styleBorder}`}>
        <SalesOrderStatisticTable
          pagination={orderPagination}
          handlePagination={setOrderPagination}
          loading={isFetchingOrder}
          data={userOrderReportData?.Items}
          exportExcel={handleExportExcelOrder}
          RoleID={newUser?.UserGroupId}
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
