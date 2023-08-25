import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { notification } from "~/api";
import { UserLayout, toast } from "~/components";
import NotificationTable from "~/components/screens/notification/NotificationTable";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = ({ connection }) => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurretnInfo
  );
  const [filter, setFilter] = useState({
    TotalItems: null,
    PageIndex: 1,
    PageSize: 20,
    FromDate: null,
    ToDate: null,
    OrderBy: "Id desc",
    UID: userCurrentInfo?.Id,
    OfEmployee: false,
    IsRead: 0,
  });

  const { isFetching, data, refetch } = useQuery(
    [
      "menuData",
      [filter.PageIndex, filter.ToDate, filter.FromDate, filter.UID],
    ],
    () =>
      notification.getList(filter).then((res) => {
        setFilter({
          ...filter,
          TotalItems: res?.Data?.TotalItem,
          // PageIndex: res?.Data?.PageIndex,
          PageSize: res?.Data?.PageSize,
        });
        // if (data?.Items?.length <= 0) {
        //   toast.info("Không có thông báo trong khoảng thời gian này!");
        // }
        return res?.Data;
      }),
    {
      retry: false,
      enabled: !!userCurrentInfo?.Id,
      keepPreviousData: true,
      staleTime: 10000,
      onError: toast.error,
    }
  );

  useEffect(() => {
    if (connection) {
      connection.on("send-notification", (noti) => {
        return data?.Items.unshift(noti);
      });
    }
  }, [connection]);

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
  };

  return (
    <NotificationTable
      isFetching={isFetching}
      refetch={refetch}
      data={data?.Items}
      loading={isFetching}
      handleFilter={handleFilter}
      filter={filter}
    />
  );
};

Index.displayName = SEOConfigs.notification;
Index.breadcrumb = breadcrumb.notification;
Index.Layout = UserLayout;

export default Index;
