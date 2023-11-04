import router from 'next/router'
import { useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { payHelp } from '~/api'
import { Layout, RequestPaymentFilter, RequestPaymentTable } from '~/components'
import { breadcrumb } from '~/configs'
import { SEOConfigs } from '~/configs/SEOConfigs'
import { useCatalogue } from '~/hooks'
import { TNextPageWithLayout } from '~/types/layout'

const Index: TNextPageWithLayout = () => {
  const { userSale } = useCatalogue({
    userSaleEnabled: true,
  })

  const [filter, setFilter] = useState({
    SearchContent: null,
    FromDate: null,
    ToDate: null,
    Status: null,
    OrderBy: 'Id desc',
    TotalItems: null,
    PageSize: 20,
    PageIndex: 1,
    SalerId: null,
  })

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter })
  }

  const { isFetching, data, isLoading, refetch } = useQuery(
    [
      'requestPaymentData',
      [
        filter.SearchContent,
        filter.FromDate,
        filter.ToDate,
        filter.Status,
        filter.PageIndex,
        filter.SalerId,
      ],
    ],
    () => payHelp.getList(filter).then((res) => res.Data),
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
      staleTime: 5000,
      refetchOnWindowFocus: true,
    },
  )

  const handleExporTExcel = useCallback(async () => {
    const id = toast.loading('Đang xử lý ...')
    let newFilter = { ...filter }

    if (
      filter.SearchContent ||
      filter.FromDate ||
      filter.ToDate ||
      filter.Status ||
      filter.PageIndex ||
      filter.SalerId
    ) {
      newFilter = {
        ...filter,
        PageSize: 9999,
      }
    }

    try {
      const res = await payHelp.exportExcel({ ...filter, PageSize: 99999 })
      router.push(`${res.Data}`)
    } catch (error) {
      toast.update(id, {
        isLoading: false,
        autoClose: 3000,
        type: 'error',
        render: (error as any)?.response?.data?.ResultMessage,
      })
    } finally {
      toast.update(id, {
        isLoading: false,
        autoClose: 1,
        type: 'default',
      })
    }
  }, [
    filter.SearchContent,
    filter.FromDate,
    filter.ToDate,
    filter.Status,
    filter.PageIndex,
    filter.SalerId,
  ])

  return (
    <>
      <RequestPaymentFilter
        userSale={userSale}
        handleFilter={handleFilter}
        handleExporTExcel={handleExporTExcel}
      />

      <RequestPaymentTable
        userSale={userSale}
        loading={isFetching}
        data={data?.Items}
        filter={filter}
        handleFilter={handleFilter}
        refetch={refetch}
      />
    </>
  )
}

Index.displayName = SEOConfigs.oder.payFor
Index.breadcrumb = breadcrumb.order.requestPayment.main
Index.Layout = Layout

export default Index
