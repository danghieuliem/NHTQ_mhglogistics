import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { transportationOrder } from "~/api";
import {
  showToast,
  UserDepositListTable,
  UserLayout
} from "~/components";
import { orderMoneyOfOrdersData, transportStatus } from "~/configs/appConfigs";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { selectUser, useAppSelector } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";
import { _format } from "~/utils";

const Index: TNextPageWithLayout = () => {
  const { user } = useAppSelector(selectUser);

  useEffect(() => {
    setFilter({ ...filter, UID: user?.UserId });
  }, [user]);

  const [filter, setFilter] = useState({
    PageIndex: 1,
    PageSize: 20,
    TotalItems: null,
    TypeSearch: null,
    SearchContent: null,
    Status: null,
    FromDate: null,
    ToDate: null,
    UID: user?.UserId,
    OrderBy: "Id desc",
  });

  const [ids, setIds] = useState<number[]>([]);
  const isAll = useRef(false);
  const item = useRef<TUserDeposit>();
  const [modal, setModal] = useState(false);
  const [moneyOfOrders, setMoneyOfOrders] = useState(orderMoneyOfOrdersData);

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
  };

  const { isFetching, data } = useQuery(
    ["userDepositList", { ...filter }],
    () => transportationOrder.getList(filter).then((res) => res.Data),
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
      enabled: !!user,
    }
  );

  // modal delete
  const handleModal = (itemSelected: TUserDeposit = undefined) => {
    item.current = itemSelected;
    setModal(!modal);
  };

  const handleSelectIds = (item: TUserDeposit) => {
    if (!!ids.find((x) => x === item.Id)) {
      setIds(ids.filter((x) => x !== item.Id));
    } else {
      setIds([...ids, item.Id]);
    }
    isAll.current = false;
  };

  useQuery(["deposit-amount-list"], () => transportationOrder.getAmountList(), {
    onSuccess: (res) => {
      const data = res.Data;
      for (let key in data) {
        moneyOfOrders.forEach((item) => {
          if (item.key === key) {
            item.value = _format.getVND(data[key], " ");
          }
        });
      }
      setMoneyOfOrders(moneyOfOrders);
    },
    onError: (error) => {
      showToast({
        title: "Đã xảy ra lỗi!",
        message: (error as any)?.response?.data?.ResultMessage,
        type: "error",
      });
    },
    retry: false,
    enabled: !!user,
  });

  useQuery(
    ["deposit-infor-list"],
    () =>
      transportationOrder.getAmountInfo({
        UID: user?.UserId,
      }),
    {
      onSuccess: (res) => {
        const data = res.Data;
        data?.forEach((x) => {
          const target = transportStatus.find((i) => i.id === x?.Status);
          if (target) {
            target.value = x?.Quantity;
          }
        });
      },
      onError: (error) => {
        showToast({
          title: "Đã xảy ra lỗi!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        });
      },
      retry: false,
      enabled: !!user,
    }
  );

  return (
    <div className="tableBox mt-6">
      <UserDepositListTable
        {...{
          loading: isFetching,
          data: data?.Items,
          handleModal,
          handleSelectIds,
          filter,
          handleFilter,
          moneyOfOrders,
          ids: !!ids.length,
        }}
      />
    </div>
  );
};

Index.displayName = SEOHomeConfigs.consignmentShipping.listOderDeposit;
Index.Layout = UserLayout;

export default Index;
