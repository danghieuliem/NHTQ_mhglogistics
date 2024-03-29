import { useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { payHelp } from '~/api'
import { UserLayout, UserRequestListTable } from '~/components'
import { SEOHomeConfigs } from '~/configs/SEOConfigs'
import { RootState } from '~/store'
import { TNextPageWithLayout } from '~/types/layout'

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo,
  )

  const [filter, setFilter] = useState({
    PageIndex: 1,
    PageSize: 20,
    TotalItems: null,
    OrderBy: 'Id desc',
    UID: userCurrentInfo?.Id,
    Status: null,
    FromDate: null,
    ToDate: null,
  })

  const handleFilter = useCallback((newFilter) => {
    setFilter({ ...filter, ...newFilter })
  }, [])

  const { isFetching, data, refetch } = useQuery(
    [
      'requestList',
      [filter.PageIndex, filter.Status, filter.FromDate, filter.ToDate],
    ],
    async () => await payHelp.getList(filter).then((res) => res.Data),
    {
      keepPreviousData: true,
      staleTime: 5000,
      // refetchOnWindowFocus: false,
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
    },
  )

  return (
    <UserRequestListTable
      data={data?.Items}
      filter={filter}
      handleFilter={handleFilter}
      loading={isFetching}
      refetch={refetch}
    />
  )
}

Index.displayName = SEOHomeConfigs.payFor.listRequest
Index.Layout = UserLayout
Index.breadcrumb = 'Danh sách đơn thanh toán hộ'

export default Index
