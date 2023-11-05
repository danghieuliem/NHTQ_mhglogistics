import router, { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { historyPayWallet, user } from '~/api'
import {
  ClientTransactionHistoryFilter,
  ClientTransactionHistoryTable,
  Layout,
  toast,
} from '~/components'
import { breadcrumb } from '~/configs'
import { SEOConfigs } from '~/configs/SEOConfigs'
import { TNextPageWithLayout } from '~/types/layout'
import { _format } from '~/utils'

const Index: TNextPageWithLayout = () => {
  const { query } = useRouter()

  const { data: userData } = useQuery(
    ['clientData', +query?.id],
    () => user.getByID(+query?.id),
    {
      select: (data) => data.Data,
      retry: false,
      enabled: !!query?.id,
    },
  )

  const [filter, setFilter] = useState({
    PageIndex: 1,
    PageSize: 20,
    TotalItems: null,
    OrderBy: 'Id desc',
    UID: null,
    FromDate: null,
    ToDate: null,
    Status: null,
  })

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter })
  }

  const { data: userTransactionData, isFetching } = useQuery(
    ['clientTransactionrData', { ...filter, UID: userData?.Id }],
    () =>
      historyPayWallet
        .getList({ ...filter, UID: userData?.Id })
        .then((res) => res.Data),
    {
      keepPreviousData: true,
      onSuccess: (data) =>
        setFilter({
          ...filter,
          TotalItems: data?.TotalItem,
          PageIndex: data?.PageIndex,
          PageSize: data?.PageSize,
        }),
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage)
      },
      enabled: !!query?.id && !!userData,
    },
  )

  const handleExportExcel = async () => {
    try {
      historyPayWallet
        .getExportExcel({
          UID: +query?.id,
        })
        .then((res) => router.push(res?.Data))
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <>
      <div className='flex items-end justify-between'>
        <div className='tableBox '>
          <div className='font-bold text-main'>
            <i className='fas fa-user mr-2'></i>
            <span>{userData?.UserName}</span>
          </div>
          <div className='font-bold text-sec'>
            <i className='fas fa-usd-circle  mr-2'></i>
            <span>{_format.getVND(userData?.Wallet)}</span>
          </div>
        </div>

        <ClientTransactionHistoryFilter
          handleFilter={handleFilter}
          handleExportExcel={handleExportExcel}
        />
      </div>

      <ClientTransactionHistoryTable
        data={userTransactionData?.Items}
        loading={isFetching}
        filter={filter}
        handleFilter={handleFilter}
      />
    </>
  )
}

Index.displayName = SEOConfigs.moneyManagement.historyTransaction
Index.breadcrumb = breadcrumb.client.transactionHistory.detail
Index.Layout = Layout

export default Index
