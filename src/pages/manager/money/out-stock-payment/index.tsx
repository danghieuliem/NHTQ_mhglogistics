import { useState } from 'react'
import { useQuery } from 'react-query'
import { outStockSession } from '~/api'
import {
  Layout,
  NotFound,
  OutStockPaymentFilter,
  OutStockPaymentTable,
  toast,
} from '~/components'
import { breadcrumb } from '~/configs'
import { SEOConfigs } from '~/configs/SEOConfigs'
import { TNextPageWithLayout } from '~/types/layout'

const Index: TNextPageWithLayout = () => {
  const [filter, setFilter] = useState({
    OrderTransactionCode: null,
    SearchContent: null,
    Status: null,
    FromDate: null,
    ToDate: null,
    TotalItems: null,
    PageIndex: 1,
    PageSize: 20,
  })

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter })
  }

  const {
    data: userOutstockData,
    isFetching,
    isError,
  } = useQuery(
    [
      'clientWithdrawData',
      [
        filter.OrderTransactionCode,
        filter.SearchContent,
        filter.Status,
        filter.FromDate,
        filter.ToDate,
        filter.PageIndex,
      ],
    ],
    () => outStockSession.getList(filter).then((res) => res.Data),
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
    },
  )
  if (isError) return <NotFound />

  return (
    <>
      <OutStockPaymentFilter handleFilter={handleFilter} />

      <OutStockPaymentTable
        data={userOutstockData?.Items}
        loading={isFetching}
        filter={filter}
        handleFilter={handleFilter}
      />
    </>
  )
}

Index.displayName = SEOConfigs.moneyManagement.payExport
Index.breadcrumb = breadcrumb.money.outstockPayment.main
Index.Layout = Layout

export default Index
