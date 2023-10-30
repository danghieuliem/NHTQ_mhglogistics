import router from "next/router";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { user } from "~/api";
import {
  ActionButton,
  ClientListFilterMemo,
  ClientListFormMemo,
  ClientListTable,
  Layout,
} from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { useCatalogue } from "~/hooks/useCatalogue";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo
  );

  const [modal, setModal] = useState(false);

  const [filter, setFilter] = useState({
    PageIndex: 1,
    PageSize: 20,
    TotalItems: null,
    OrderBy: "Id desc",
    Id: null,
    UserName: null,
    UID: userCurrentInfo?.Id,
    RoleID: userCurrentInfo?.UserGroupId,
    UserGroupId: 2,
    Phone: null,
    SearchContent: null,
    SalerID: null,
    OrdererID: null,
  });

  const handleFilter = useCallback((newFilter) => {
    setFilter({ ...filter, ...newFilter });
  }, []);

  // useCatalogue scope
  // ===== BEGIN =====
  const { userGroup, userLevel, userOrder, userSale } = useCatalogue({
    userGroupEnabled: true,
    userLevelEnabled: true,
    userOrderEnabled: true,
    userSaleEnabled: true,
  });
  // ===== END =====

  const { isFetching, data, isLoading, refetch } = useQuery(
    [
      "clientData",
      [
        filter.PageIndex,
        filter.Id,
        filter.UserName,
        filter.Phone,
        filter.SearchContent,
        filter.SalerID,
        filter.OrdererID,
      ],
      ,
    ],
    () => user.getList(filter).then((res) => res.Data),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        setFilter({
          ...filter,
          TotalItems: data?.TotalItem,
          PageIndex: data?.PageIndex,
          PageSize: data?.PageSize,
        });
      },
      refetchOnWindowFocus: false,
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
    }
  );

  const _onExportExcel = useCallback(async () => {
    const id = toast.loading("Đang xử lý ...");
    let newFilter = { ...filter };

    if (
      filter.OrdererID ||
      filter.Phone ||
      filter.SalerID ||
      filter.SearchContent ||
      filter.UserName
    ) {
      newFilter = {
        ...filter,
        PageSize: 9999,
      };
    }
    try {
      const res = await user.exportExcel(newFilter);
      router.push(`${res.Data}`);
    } catch (error) {
      toast.error(error);
    } finally {
      toast.update(id, {
        isLoading: false,
        autoClose: 1,
        type: "default",
      });
    }
  }, [
    filter.OrdererID,
    filter.Phone,
    filter.SalerID,
    filter.SearchContent,
    filter.UserName,
  ]);

  const handleCloseModal = useCallback(() => setModal(false), []);

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center">
          <ClientListFilterMemo
            handleFilter={handleFilter}
            dathangList={userOrder}
            saleList={userSale}
            roleID={userCurrentInfo?.UserGroupId}
          />
        </div>
        <div className="flex gap-2 items-center">
          <ActionButton
            onClick={() => setModal(true)}
            icon="fas fa-plus-circle"
            isButton
            isButtonClassName="bg-green !text-white"
            title="Thêm"
          />
          <ActionButton
            onClick={() => _onExportExcel()}
            icon="fas fa-file-export "
            isButton
            isButtonClassName="bg-blue !text-white"
            title="Xuất"
          />
        </div>
      </div>

      <ClientListTable
        refetch={refetch}
        data={data?.Items}
        loading={isFetching}
        filter={filter}
        handleFilter={handleFilter}
        RoleID={userCurrentInfo?.UserGroupId}
        dathangList={userOrder}
        saleList={userSale}
      />

      <ClientListFormMemo
        {...{
          onCancel: handleCloseModal,
          visible: modal,
          userGroupCatalogue: userGroup,
          userLevelCatalogue: userLevel,
          userOrderCatalogue: userOrder,
          userSaleCatalogue: userSale,
          refetch,
          RoleID: userCurrentInfo?.UserGroupId,
        }}
      />
    </>
  );
};

Index.displayName = SEOConfigs.listCustomer;
Index.breadcrumb = breadcrumb.client.clientList.main;
Index.Layout = Layout;

export default Index;
