import { useState } from 'react'
import { useQuery } from 'react-query'
import { user } from '~/api'
import {
  ClientListFilterMemo,
  Layout,
  PersonalRechargeTable,
  toast,
} from '~/components'
import { breadcrumb } from '~/configs'
import { SEOConfigs } from '~/configs/SEOConfigs'
import { TNextPageWithLayout } from '~/types/layout'

const Index: TNextPageWithLayout = () => {
  const [filter, setFilter] = useState({
    PageIndex: 1,
    PageSize: 20,
    TotalItems: null,
    OrderBy: 'Id desc',
    Id: null,
    UserGroupId: 2,
    UserName: null,
    Phone: null,
    SearchContent: null,
    SalerID: null,
    OrdererID: null,
  })

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter })
  }

  const { isFetching, data } = useQuery(
    [
      'clientData',
      [
        filter.PageIndex,
        filter.UserName,
        filter.Phone,
        filter.SearchContent,
        filter.SalerID,
        filter.OrdererID,
      ],
    ],
    () => user.getList(filter).then((res) => res.Data),
    {
      keepPreviousData: true,
      onSuccess: (data) =>
        setFilter({
          ...filter,
          TotalItems: data?.TotalItem,
          PageIndex: data?.PageIndex,
          PageSize: data?.PageSize,
        }),
      onError: toast.error,
      staleTime: 5000,
    },
  )

  return (
    <>
      <ClientListFilterMemo handleFilter={handleFilter} isShow={false} />

      <PersonalRechargeTable
        data={data?.Items}
        filter={filter}
        handleFilter={handleFilter}
        loading={isFetching}
      />
    </>
  )
}

Index.displayName = SEOConfigs.moneyManagement.personalRecharge
Index.breadcrumb = breadcrumb.money.personalRecharge
Index.Layout = Layout

export default Index
