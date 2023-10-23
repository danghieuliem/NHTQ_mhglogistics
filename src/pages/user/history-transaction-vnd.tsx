import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { historyPayWallet } from "~/api";
import {
  HistoryTransactionVNDFilter,
  HistoryTransactionVNDTable,
  UserLayout,
} from "~/components";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";
import { _format } from "~/utils";

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo
  );
  const [filter, setFilter] = useState({
    PageIndex: 1,
    PageSize: 20,
    TotalItems: null,
    OrderBy: "Id desc",
    FromDate: null,
    Status: null,
    ToDate: null,
    UID: userCurrentInfo?.Id,
  });

  useEffect(() => {
    setFilter({ ...filter, UID: userCurrentInfo?.Id });
  }, [userCurrentInfo?.Id]);

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
  };

  const { data, isFetching } = useQuery(
    [
      "historyPayWallet",
      [filter.PageIndex, filter.FromDate, filter.ToDate, filter.Status],
    ],
    () => historyPayWallet.getList(filter).then((res) => res.Data),
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
    }
  );

  return (
    <React.Fragment>
      <div className="flex flex-col flex-wrap justify-between md:flex-row mb-2 mt-6">
        <div className="flex flex-wrap w-full md:w-fit gap-2">
          <div className="cardTopTable shadow-md !py-2 w-full md:w-fit">
            <div className="text-right sm:ml-4">
              <p className="font-bold">Tổng tiền đã nạp: </p>
              <span className="text-main font-bold text-md">
                {_format.getVND(data?.Items?.[0]?.TotalAmount4)}
              </span>
            </div>
          </div>

          <div className="cardTopTable shadow-md !py-2 w-full md:w-fit">
            <div className="text-right sm:ml-4">
              <p className="font-bold">Số dư hiện tại: </p>
              <span className="text-main font-bold text-md">
                {_format.getVND(data?.Items?.[0]?.Wallet)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <HistoryTransactionVNDFilter handleFilter={handleFilter} />
        </div>
      </div>
      <HistoryTransactionVNDTable
        data={data?.Items}
        filter={filter}
        handleFilter={handleFilter}
        loading={isFetching}
      />
    </React.Fragment>
  );
};

Index.displayName = SEOHomeConfigs.financialManagement.listTransactionVND;
Index.Layout = UserLayout;
Index.breadcrumb = "Lịch sử giao dịch";

export default Index;
