// import { TablePaginationConfig } from "antd";
// import { useRef, useState } from "react";
// import { useQuery } from "react-query";
// import { useSelector } from "react-redux";
// import { notificationSetting } from "~/api";
// import {
//   Layout,
//   NotificationsForm,
//   NotificationsTable,
//   toast,
// } from "~/components";
// import { breadcrumb, defaultPagination } from "~/configs";
// import { SEOConfigs } from "~/configs/SEOConfigs";
// import { RootState } from "~/store";
// import { TNextPageWithLayout } from "~/types/layout";

// const Index: TNextPageWithLayout = () => {
//   const userCurrentInfo: TUser = useSelector(
//     (state: RootState) => state.userCurrentInfo
//   );

//   const [pagination, setPagination] =
//     useState<TablePaginationConfig>(defaultPagination);

//   const { isFetching, data, refetch, isLoading } = useQuery(
//     [
//       "bankList",
//       { Current: pagination.current, PageSize: pagination.pageSize },
//     ],
//     () =>
//       notificationSetting
//         .getList({
//           PageIndex: pagination.current,
//           PageSize: pagination.pageSize,
//         })
//         .then((res) => res.Data),
//     {
//       keepPreviousData: true,
//       onSuccess: (data) =>
//         setPagination({ ...pagination, total: data?.TotalItem }),
//       onError: toast.error,
//       enabled: userCurrentInfo?.UserGroupId === 1,
//       refetchOnReconnect: false,
//       refetchOnWindowFocus: false,
//     }
//   );

//   const [modal, setModal] = useState(false);
//   const item = useRef<TNotification>();
//   const handleModal = (itemSelected) => {
//     item.current = itemSelected;
//     setModal(!modal);
//   };

//   return (
//     <>
//       <p className="text-red italic text-[18px]">
//         * Chỉ kích hoạt thông báo đến các nhân viên khi thực sự cần thiết để
//         tránh tình trạng chậm, lag!
//       </p>

//       <NotificationsTable
//         handleModal={handleModal}
//         data={data?.Items}
//         loading={isFetching}
//         handlePagination={(pagination) => setPagination(pagination)}
//       />
//       <NotificationsForm
//         {...{
//           onCancel: () => setModal(false),
//           defaultValues: item.current,
//           visible: modal,
//           refetch: refetch,
//         }}
//       />
//     </>
//   );
// };
// Index.displayName = SEOConfigs?.settings?.notification;
// Index.breadcrumb = breadcrumb.settings.notification;
// Index.Layout = Layout;

// export default Index;

import React from "react";
import { BlankLayout, NotFound } from "~/components";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  return <NotFound />;
};

Index.Layout = BlankLayout;

export default Index;
