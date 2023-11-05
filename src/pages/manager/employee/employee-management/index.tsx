import router from 'next/router'
import { useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { user } from '~/api'
import {
  EmployeeManagementFilterMemo,
  EmployeeManagementFormMemo,
  EmployeeManagementTable,
  Layout,
  toast,
} from '~/components'
import { breadcrumb } from '~/configs'
import { SEOConfigs } from '~/configs/SEOConfigs'
import { useCatalogue } from '~/hooks/useCatalogue'
import { RootState } from '~/store'
import { TNextPageWithLayout } from '~/types/layout'

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo,
  )
  const [modal, setModal] = useState(false)

  const [filter, setFilter] = useState({
    OrderBy: 'Id desc',
    PageIndex: 1,
    PageSize: 20,
    TotalItems: null,
    UserName: null,
    RoleID: userCurrentInfo?.UserGroupId,
    IsEmployee: 1,
    UserGroupId: null,
  })

  const handleFilter = useCallback((newFilter) => {
    setFilter({ ...filter, ...newFilter })
  }, [])

  // useCatalogue scope
  // ===== BEGIN =====
  const { userGroup, userLevel, userOrder, userSale } = useCatalogue({
    userGroupEnabled: true,
    userLevelEnabled: true,
    userOrderEnabled: true,
    userSaleEnabled: true,
  })
  // ===== END =====

  const { isFetching, data, refetch } = useQuery(
    ['employeeData', [filter.PageIndex, filter.UserGroupId, filter.UserName]],
    () => user.getList(filter).then((res) => res.Data),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        setFilter({
          ...filter,
          TotalItems: data?.TotalItem,
          PageIndex: data?.PageIndex,
          PageSize: data?.PageSize,
        })
      },
      onError: toast.error,
      refetchOnWindowFocus: true,
      staleTime: 5000,
    },
  )
  const userDataCatalog = userGroup?.map((item) => {
    const userGroupData = {
      text: item?.Description,
      value: item?.Description,
    }
    return userGroupData
  })

  const _onExportExcel = useCallback(async () => {
    try {
      const res = await user.exportExcel({ ...filter, PageSize: 99999 })
      router.push(`${res.Data}`)
    } catch (error) {
      toast.error(error)
    }
  }, [])

  const handleCloseModal = useCallback(() => setModal(false), [])
  const handleOpenAddStaff = useCallback(() => setModal(true), [])

  return (
    <>
      <EmployeeManagementFilterMemo
        handleFilter={handleFilter}
        userGroupCatalogue={userGroup?.filter((x) => x.Id !== 1)}
        handleAddStaff={handleOpenAddStaff}
        onExportExcel={_onExportExcel}
      />
      <EmployeeManagementTable
        {...{
          refetch: refetch,
          loading: isFetching,
          data: data?.Items,
          userGroupCatalogue: userDataCatalog,
          filter,
          handleFilter,
          UserGroupId: userCurrentInfo?.UserGroupId,
        }}
      />

      <EmployeeManagementFormMemo
        {...{
          visible: modal,
          onCancel: handleCloseModal,
          userLevelCatalogue: userLevel,
          userGroupCatalogue: userGroup,
          userOrderCatalogue: userOrder,
          userSaleCatalogue: userSale,
        }}
      />
    </>
  )
}

Index.displayName = SEOConfigs?.staff?.employeeManager
Index.breadcrumb = breadcrumb.employee.employeeManagement.main
Index.Layout = Layout

export default Index
