import { TablePaginationConfig } from "antd";
import { useCallback, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { userLevel } from "~/api";
import {
  Layout,
  TariffUserFormMemo,
  TariffUserTable,
  toast,
} from "~/components";
import { breadcrumb } from "~/configs";
import { defaultPagination } from "~/configs/appConfigs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo
  );
  const [pagination, setPagination] =
    useState<TablePaginationConfig>(defaultPagination);

  const { isFetching, isError, error, data, isLoading } = useQuery(
    ["userLevelData", { Current: pagination.current }],
    () =>
      userLevel
        .getList({
          PageIndex: pagination.current,
          PageSize: pagination.pageSize,
          OrderBy: "Id desc",
        })
        .then((res) => res.Data),
    {
      keepPreviousData: true,
      onSuccess: (data) =>
        setPagination({ ...pagination, total: data.TotalItem }),
      onError: toast.error,
      enabled: userCurrentInfo?.UserGroupId === 1,
    }
  );

  const [modal, setModal] = useState(false);
  const item = useRef<TTariffUser>();
  const handleModal = (itemSelected) => {
    item.current = itemSelected;
    setModal(!modal);
  };

  const handleCloseModal = useCallback(() => setModal(false), []);

  return (
    <>
      <TariffUserTable
        {...{
          loading: isFetching,
          data: data?.Items,
          handleModal,
          pagination,
          handlePagination: (pagination) => setPagination(pagination),
        }}
      />

      <TariffUserFormMemo
        {...{
          onCancel: handleCloseModal,
          defaultValues: item.current,
          visible: modal,
        }}
      />
    </>
  );
};
Index.displayName = SEOConfigs?.settings?.feeUser;
Index.breadcrumb = breadcrumb.settings.tariffUser;
Index.Layout = Layout;

export default Index;
