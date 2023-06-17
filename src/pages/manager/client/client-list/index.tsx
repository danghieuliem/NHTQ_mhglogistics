import router from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
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
import { useAppSelector } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const { current: newUser } = useAppSelector((state) => state.user);
  if (!newUser) return null;
  const [modal, setModal] = useState(false);

  const [filter, setFilter] = useState({
    PageIndex: 1,
    PageSize: 20,
    TotalItems: null,
    OrderBy: "Id desc",
    Id: null,
    UserName: null,
    UID: newUser?.UserId,
    RoleID: newUser?.UserGroupId,
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
    userGroupEnabled: !!newUser,
    userLevelEnabled: !!newUser,
    userOrderEnabled: !!newUser,
    userSaleEnabled: !!newUser,
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
      refetchOnWindowFocus: true,
      onError: (error) =>
        showToast({
          title: (error as any)?.response?.data?.ResultCode,
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        }),
      enabled: !!newUser,
    }
  );

  const { data: dathangList } = useQuery(
    ["dathang"],
    () => user.getList({ UserGroupId: 4, IsEmployee: 1 }),
    {
      onSuccess: (res) => res?.Data?.Items,
      enabled: !!newUser,
    }
  );

  const { data: saleList } = useQuery(
    ["sale"],
    () => user.getList({ UserGroupId: 7, IsEmployee: 1 }),
    {
      onSuccess: (res) => res?.Data?.Items,
      enabled: !!newUser,
    }
  );

  const _onExportExcel = async () => {
    try {
      const res = await user.exportExcel({
        ...filter,
        UID: newUser.UserId,
        RoleID: newUser.UserGroupId,
        UserGroupId: 2,
        PageSize: 99999,
      });
      router.push(`${res.Data}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="tableBox py-2">
      <div className="grid xl:grid-cols-4 gap-4 mb-4">
        <div className="col-span-3 xl:mb-0 mb-2">
          <ClientListFilter
            handleFilter={handleFilter}
            dathangList={dathangList}
            saleList={saleList}
            roleID={newUser?.UserGroupId}
          />
        </div>
        <div className="md:col-span-4 xl:col-span-1 flex justify-end items-end">
          <IconButton
            onClick={() => setModal(true)}
            icon="fas fa-plus"
            title="Thêm "
            btnClass="mr-4 btnGreen"
            btnIconClass="!mr-2"
            showLoading
            toolip="Thêm khách hàng"
            green
          />

          <IconButton
            onClick={() => _onExportExcel()}
            icon="fas fa-file-export "
            title="Xuất"
            btnIconClass="!mr-2"
            showLoading
            toolip="Xuất Thống Kê"
            green
          />
        </div>
      </div>

      <ClientListTable
        refetch={refetch}
        data={data?.Items}
        loading={isFetching}
        filter={filter}
        handleFilter={handleFilter}
        RoleID={newUser?.UserGroupId}
        dathangList={dathangList}
        saleList={saleList}
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
          RoleID: newUser?.UserGroupId,
        }}
      />
    </div>
  );
};

Index.displayName = SEOConfigs.listCustomer;
Index.breadcrumb = breadcrumb.client.clientList.main;
Index.Layout = Layout;

export default Index;
