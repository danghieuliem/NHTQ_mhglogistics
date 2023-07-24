import { useCallback, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { transportationOrder } from "~/api";
import { UserDepositListTable, UserLayout } from "~/components";
import { breadcrumb } from "~/configs";
import { orderMoneyOfOrdersData, transportStatus } from "~/configs/appConfigs";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";
import { _format } from "~/utils";

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurretnInfo
  );

  // useEffect(() => {
  //   setFilter({ ...filter, UID: userCurrentInfo?.Id });
  // }, [userCurrentInfo?.Id]);

  const [filter, setFilter] = useState({
    PageIndex: 1,
    PageSize: 20,
    TotalItems: null,
    TypeSearch: null,
    SearchContent: null,
    Status: null,
    FromDate: null,
    ToDate: null,
    UID: userCurrentInfo?.Id,
    OrderBy: "Id desc",
  });

  const [ids, setIds] = useState<number[]>([]);
  const isAll = useRef(false);
  const item = useRef<TUserDeposit>();
  const [modal, setModal] = useState(false);
  const [moneyOfOrders, setMoneyOfOrders] = useState(orderMoneyOfOrdersData);

  const handleFilter = useCallback((newFilter) => {
    setFilter({ ...filter, ...newFilter });
  }, []);

  const { isFetching, data } = useQuery(
    [
      "userDepositList",
      [
        filter.PageIndex,
        filter.TypeSearch,
        filter.Status,
        filter.FromDate,
        filter.ToDate,
        filter.SearchContent,
      ],
    ],
    () => transportationOrder.getList(filter).then((res) => res.Data),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: 5000,
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
      enabled: !!userCurrentInfo?.Id,
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
      toast.error((error as any)?.response?.data?.ResultMessage);
    },
    retry: false,
    enabled: !!userCurrentInfo?.Id,
    refetchOnWindowFocus: false,
  });

  useQuery(
    ["deposit-infor-list"],
    () =>
      transportationOrder.getAmountInfo({
        UID: userCurrentInfo?.Id,
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
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
      retry: false,
      enabled: !!userCurrentInfo?.Id,
      refetchOnWindowFocus: false,
    }
  );

  return (
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
  );
};

Index.displayName = SEOHomeConfigs.consignmentShipping.listOderDeposit;
Index.Layout = UserLayout;
Index.breadcrumb = breadcrumb.deposit.depositList.main;

export default Index;
