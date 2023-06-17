import { TablePaginationConfig } from "antd";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { notificationSetting } from "~/api";
import {
  Layout,
  NotificationsForm,
  NotificationsTable,
  toast,
} from "~/components";
import { breadcrumb, defaultPagination } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { selectUser, useAppSelector } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const { user } = useAppSelector(selectUser);

  const [pagination, setPagination] =
    useState<TablePaginationConfig>(defaultPagination);

  const { isFetching, data, refetch, isLoading } = useQuery(
    [
      "bankList",
      { Current: pagination.current, PageSize: pagination.pageSize },
    ],
    () =>
      notificationSetting
        .getList({
          PageIndex: pagination.current,
          PageSize: pagination.pageSize,
        })
        .then((res) => res.Data),
    {
      keepPreviousData: true,
      onSuccess: (data) =>
        setPagination({ ...pagination, total: data?.TotalItem }),
      onError: toast.error,
      enabled: user?.UserGroupId === 1,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const [modal, setModal] = useState(false);
  const item = useRef<TNotification>();
  const handleModal = (itemSelected) => {
    item.current = itemSelected;
    setModal(!modal);
  };

  return (
    <div className="bg-white rounded-t-xl">
      <div className="tableBox py-2">
        <p className="text-red italic text-[18px] py-4">
          * Chỉ kích hoạt thông báo đến các nhân viên khi thực sự cần thiết để
          tránh tình trạng chậm, lag!
        </p>
        <NotificationsTable
          handleModal={handleModal}
          data={data?.Items}
          loading={isFetching}
          handlePagination={(pagination) => setPagination(pagination)}
        />
      </div>
      <NotificationsForm
        {...{
          onCancel: () => setModal(false),
          defaultValues: item.current,
          visible: modal,
          refetch: refetch,
        }}
      />
    </div>
  );
};
Index.displayName = SEOConfigs?.settings?.notification;
Index.breadcrumb = breadcrumb.settings.notification;
Index.Layout = Layout;

export default Index;
