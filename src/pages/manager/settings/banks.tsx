import { TablePaginationConfig } from "antd";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { bank } from "~/api/bank";
import { ActionButton, BanksForm, BanksTable, Layout, toast } from "~/components";
import { breadcrumb } from "~/configs";
import { defaultPagination } from "~/configs/appConfigs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";
import { TModalType } from "~/types/table";

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurretnInfo
  );

  const [pagination, setPagination] =
    useState<TablePaginationConfig>(defaultPagination);

  const { isFetching, data, isLoading } = useQuery(
    [
      "bankList",
      { Current: pagination.current, PageSize: pagination.pageSize },
    ],
    () =>
      bank
        .getList({
          PageIndex: pagination.current,
          PageSize: 99999,
        })
        .then((res) => res.Data),
    {
      keepPreviousData: true,
      onSuccess: (data) =>
        setPagination({ ...pagination, total: data?.TotalItem }),
      onError: toast.error,
      enabled: userCurrentInfo?.UserGroupId === 1,
      refetchOnWindowFocus: false
    }
  );

  // delete item
  const queryClient = useQueryClient();
  const mutationDelete = useMutation((data: TBank) => bank.delete(data.Id), {
    // refresh item + table data after updating successfully
    onSuccess: () => {
      setModal(false);
      queryClient.invalidateQueries("bankList");
      toast.success("Xoá thành công");
    },
    onError: toast.error,
  });

  const [modal, setModal] = useState(false);
  const type = useRef<TModalType>("add");
  const item = useRef<TBank>();
  const handleModal = (
    itemSelected?: TBank,
    typeSelected: TModalType = "add"
  ) => {
    item.current = itemSelected;
    type.current = typeSelected;
    setModal(!modal);
  };

  return (
    <>
      <div>
				<div className="w-fit ml-auto">
					<ActionButton
						onClick={() => handleModal()}
						icon="fas fa-plus-circle"
						title="Thêm ngân hàng"
            isButton
            isButtonClassName="bg-green !text-white"
					/>
				</div>
        <BanksTable
          {...{
            loading: isFetching || mutationDelete.isLoading,
            data: data?.Items,
            handleModal,
            handleDelete: (data) => mutationDelete.mutate(data),
            pagination,
            handlePagination: (pagination) => setPagination(pagination),
            handleConfirm: () => mutationDelete.mutate(item.current),
          }}
        />
      </div>
      <BanksForm
        {...{
          onCancel: () => setModal(false),
          defaultValues: item.current,
          visible: modal && type.current !== "delete",
          title: type.current === "add" && "Thêm ngân hàng",
          btnAddTitle: type.current === "add" ? "Thêm mới" : "Cập nhật",
        }}
      />
    </>
  );
};

Index.displayName = SEOConfigs?.settings?.listBank;
Index.breadcrumb = breadcrumb.settings.bank;
Index.Layout = Layout;

export default Index;
