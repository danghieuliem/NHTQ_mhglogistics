import { TablePaginationConfig } from "antd";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { withdraw } from "~/api";
import {
  ModalDelete,
  showToast,
  toast,
  UserLayout,
  WithDrawalVNDTable,
} from "~/components";
import { defaultPagination } from "~/configs/appConfigs";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurretnInfo
  );
  const queryClient = useQueryClient();
  const item = React.useRef<TWithDraw>();
  const [modal, setModal] = useState(false);
  const [pagination, setPagination] =
    useState<TablePaginationConfig>(defaultPagination);

  const { isFetching, data, refetch } = useQuery(
    [
      "withdrawList",
      { Current: pagination.current, PageSize: pagination.pageSize },
    ],
    () =>
      withdraw
        .getList({
          PageIndex: pagination.current,
          PageSize: pagination.pageSize,
          OrderBy: "Id desc",
          UID: userCurrentInfo?.Id,
          Type: 2,
        })
        .then((res) => res.Data),
    {
      keepPreviousData: true,
      onSuccess: (data) =>
        setPagination({ ...pagination, total: data?.TotalItem }),
      onError: (error) =>
        showToast({
          title: "Đã xảy ra lỗi!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        }),
    }
  );

  const handleModal = (itemSelected?: TWithDraw) => {
    item.current = itemSelected;
    setModal(!modal);
  };

  const mutationDelete = useMutation(withdraw.updateStatusCancel, {
    onSuccess: () => {
      handleModal(undefined);
      mutationDelete.reset();
      queryClient.invalidateQueries("articleList");
      queryClient.invalidateQueries("clientData");
      refetch();
      toast.success("Yêu cầu hủy thành công!");
    },
    onError: (error) =>
      showToast({
        title: "Đã xảy ra lỗi!",
        message: (error as any)?.response?.data?.ResultMessage,
        type: "error",
      }),
  });

  return (
    <>
      <WithDrawalVNDTable
        {...{
          data: data?.Items,
          loading: isFetching,
          pagination,
          handleModal,
          handlePagination: (pagination) => setPagination(pagination),
        }}
      />
      <ModalDelete
        id={item.current?.Id}
        onCancel={() => handleModal(undefined)}
        onConfirm={() => {
          setModal(false);
          toast.info("Đang xử lý, vui lòng đợi!");
          mutationDelete.mutateAsync({ ...item.current, Status: 3 });
        }}
        visible={modal}
        title="Bạn có chắc muốn huỷ yêu cầu"
      />
    </>
  );
};

Index.displayName = SEOHomeConfigs.financialManagement.withdrawMoneyVND;
Index.breadcrumb = "Tạo yêu cầu rút";
Index.Layout = UserLayout;

export default Index;
