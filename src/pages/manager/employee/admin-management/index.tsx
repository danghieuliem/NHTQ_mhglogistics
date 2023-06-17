import router from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { user } from "~/api";
import {
  EmployeeManagementFilter,
  EmployeeManagementForm,
  EmployeeManagementTable,
  Layout,
  toast,
} from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { useCatalogue } from "~/hooks/useCatalogue";
import { useAppSelector } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const { current: newUser } = useAppSelector((state) => state.user);
  const [modal, setModal] = useState(false);

  const [filter, setFilter] = useState({
    OrderBy: "Id desc",
    PageIndex: 1,
    PageSize: 20,
    TotalItems: null,
    UserName: null,
    RoleID: newUser?.UserGroupId,
    IsEmployee: 2,
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

  const { isFetching, data, refetch } = useQuery(
    ["employeeData", filter],
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
      onError: toast.error,
      refetchOnWindowFocus: false,
      enabled: !!newUser,
    }
  );

  const userDataCatalog = userGroup?.map((item) => {
    const userGroupData = {
      text: item?.Description,
      value: item?.Description,
    };
    return userGroupData;
  });

  const _onExportExcel = async () => {
    try {
      const res = await user.exportExcel({
        RoleID: newUser?.UserGroupId,
        UID: newUser?.UserId,
        IsEmployee: 1,
        PageSize: 99999,
      });
      router.push(`${res.Data}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="tableBox">
      <div className="">
        <EmployeeManagementFilter
          handleFilter={(newFilter) => handleFilter(newFilter)}
          userGroupCatalogue={userGroup}
          handleAddStaff={() => setModal(true)}
          onExportExcel={_onExportExcel}
        />
      </div>
      <EmployeeManagementTable
        {...{
          refetch: refetch,
          loading: isFetching,
          data: data?.Items,
          userGroupCatalogue: userDataCatalog,
          filter,
          handleFilter,
          UserGroupId: newUser?.UserGroupId,
        }}
      />
      <EmployeeManagementForm
        {...{
          visible: modal,
          onCancel: () => setModal(false),
          userLevelCatalogue: userLevel,
          userGroupCatalogue: userGroup,
          userOrderCatalogue: userOrder,
          userSaleCatalogue: userSale,
        }}
      />
    </div>
  );
};

Index.displayName = SEOConfigs?.staff?.adminManagement;
Index.breadcrumb = breadcrumb.employee.adminManagement;
Index.Layout = Layout;

export default Index;
