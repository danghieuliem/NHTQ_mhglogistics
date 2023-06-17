import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { notification } from "~/api";
import { Layout, toast } from "~/components";
import NotificationFilter from "~/components/screens/notification/NotificationFilter";
import NotificationTable from "~/components/screens/notification/NotificationTable";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { useAppSelector } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = ({ connection }) => {
  const userNew = useAppSelector((state) => state.user.current);

  const [filter, setFilter] = useState({
    TotalItems: null,
    PageIndex: 1,
    PageSize: 20,
    FromDate: null,
    ToDate: null,
    OrderBy: "Id desc",
    UID: userNew?.UserId,
    OfEmployee: true,
    IsRead: 0,
  });

  const { isFetching, data } = useQuery(
    ["menuData", filter],
    () =>
      notification.getList(filter).then((res) => {
        setFilter({
          ...filter,
          TotalItems: res?.Data?.TotalItem,
          PageIndex: res?.Data?.PageIndex,
          PageSize: res?.Data?.PageSize,
        });
        if (data?.Items?.length <= 0) {
          toast.info("Không có thông báo trong khoảng thời gian này!");
        }
        return res?.Data;
      }),
    {
      retry: false,
      enabled: !!userNew,
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

  const handleFilter = (newFitler) => {
    setFilter({ ...filter, ...newFitler });
  };

  return (
    <>
      <div className="tableBox">
        <div>
          <NotificationFilter
            handleFilter={handleFilter}
            isFetching={isFetching}
          />
        </div>
        <div className="mt-4">
          <NotificationTable
            data={data?.Items}
            loading={isFetching}
            handleFilter={handleFilter}
            filter={filter}
          />
        </div>
      </div>
    </>
  );
};

Index.displayName = SEOConfigs.notification;
Index.breadcrumb = breadcrumb.notification;
Index.Layout = Layout;

export default Index;
