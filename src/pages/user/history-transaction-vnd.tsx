import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { historyPayWallet } from "~/api";
import {
  HistoryTransactionVNDFilter,
  HistoryTransactionVNDTable,
  UserLayout,
  showToast,
} from "~/components";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { useAppSelector } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";
import { _format } from "~/utils";

const Index: TNextPageWithLayout = () => {
  const { current: newUser } = useAppSelector((state) => state.user);

  const [filter, setFilter] = useState({
    PageIndex: 1,
    PageSize: 20,
    TotalItems: null,
    OrderBy: "Id desc",
    FromDate: null,
    Status: null,
    ToDate: null,
    UID: newUser?.UserId,
  });

  useEffect(() => {
    setFilter({ ...filter, UID: newUser?.UserId });
  }, [newUser]);

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
  };

  const { data, isFetching } = useQuery(
    ["historyPayWallet", { ...filter }],
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
        showToast({
          title: "Đã xảy ra lỗi!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        });
      },
      enabled: !!newUser,
    }
  );

  return (
    <React.Fragment>
      <div className="flex flex-col flex-wrap justify-between md:flex-row mb-2 mt-6">
        <div className="flex flex-wrap w-full md:w-fit gap-2">
          <div className="cardTopTable !py-2 w-full md:w-fit">
            <div className="text-right sm:ml-4">
              <p className="font-bold">Tổng tiền đã nạp: </p>
              <span className="text-main font-bold text-md">
                {_format.getVND(data?.Items?.[0]?.TotalAmount4)}
              </span>
            </div>
          </div>

          <div className="cardTopTable !py-2 w-full md:w-fit">
            <div className="text-right sm:ml-4">
              <p className="font-bold">Số dư hiện tại: </p>
              <span className="text-main font-bold text-md">
                {_format.getVND(data?.Items?.[0]?.Wallet)}
              </span>
            </div>
          </div>
        </div>

        <div className="">
          <HistoryTransactionVNDFilter handleFilter={handleFilter} />
        </div>
      </div>
      <div className="tableBox">
        <HistoryTransactionVNDTable
          data={data?.Items}
          filter={filter}
          handleFilter={handleFilter}
          loading={isFetching}
        />
      </div>
    </React.Fragment>
  );
};

Index.displayName = SEOHomeConfigs.financialManagement.listTransactionVND;
Index.Layout = UserLayout;

export default Index;
