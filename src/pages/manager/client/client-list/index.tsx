import router from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { user } from "~/api";
import {
  ClientListFilter,
  ClientListForm,
  ClientListTable,
  IconButton,
  Layout,
  showToast,
  toast,
} from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { useCatalogue } from "~/hooks/useCatalogue";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurretnInfo
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

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
  };

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
      {
        ...filter,
      },
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
      onError: (error) =>
        showToast({
          title: (error as any)?.response?.data?.ResultCode,
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        }),
    }
  );

  const _onExportExcel = async () => {
    try {
      const res = await user.exportExcel({
        ...filter,
        UID: userCurrentInfo.Id,
        RoleID: userCurrentInfo.UserGroupId,
        UserGroupId: 2,
        PageSize: 99999,
      });
      router.push(`${res.Data}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="w-fit ml-auto flex">
        <ClientListFilter
          handleFilter={handleFilter}
          dathangList={userOrder}
          saleList={userSale}
          roleID={userCurrentInfo?.UserGroupId}
        />
        <IconButton
          onClick={() => setModal(true)}
          icon="fas fa-plus"
          title="Thêm "
          btnClass="mr-2 btnGreen"
          showLoading
          toolip="Thêm khách hàng"
          green
        />
        <IconButton
          onClick={() => _onExportExcel()}
          icon="fas fa-file-export "
          title="Xuất"
          showLoading
          toolip="Xuất Thống Kê"
          blue
        />
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

      <ClientListForm
        {...{
          onCancel: () => setModal(false),
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
