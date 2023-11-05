import router from 'next/router'
import { useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { user } from '~/api'
import {
  EmployeeManagementFilterMemo,
  EmployeeManagementFormMemo,
  EmployeeManagementTable,
  Layout,
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
    IsEmployee: 2,
  })

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter })
  }

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
    ['employeeData', [filter.PageIndex, filter.UserName]],
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
    const id = toast.loading('Đang xử lý ...')

    let newFilter = { ...filter }

    if (filter.UserName) {
      newFilter = {
        ...filter,
        PageSize: 9999,
      }
    }
    try {
      const res = await user.exportExcel(newFilter)
      router.push(`${res.Data}`)
    } catch (error) {
      toast.error(error)
    } finally {
      toast.update(id, {
        isLoading: false,
        autoClose: 1,
        type: 'default',
      })
    }
  }, [filter.UserName])

  const handleCloseModal = useCallback(() => setModal(false), [])

  return (
    <>
      <EmployeeManagementFilterMemo
        handleFilter={(newFilter) => handleFilter(newFilter)}
        userGroupCatalogue={userGroup}
        handleAddStaff={() => setModal(true)}
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

Index.displayName = SEOConfigs?.staff?.adminManagement
Index.breadcrumb = breadcrumb.employee.adminManagement
Index.Layout = Layout

export default Index
