import { Spin } from 'antd'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import { transportationOrder } from '~/api'
import { DepositListForm, Layout, NotFound, toast } from '~/components'
import { breadcrumb } from '~/configs'
import { useCatalogue } from '~/hooks/useCatalogue'
import { RootState } from '~/store'
import { TNextPageWithLayout } from '~/types/layout'

const Index: TNextPageWithLayout = ({ connection }) => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo,
  )

  const { query } = useRouter()
  // realtime
  // ===== begin =====
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  // thêm CODFee /transportOrder/id PUT

  useEffect(() => {
    let timeout = null

    if (connection) {
      connection.on('change', async (_, transportation: TUserDeposit[]) => {
        if (!!transportation.length) {
          const item = transportation.find((x) => x.Id === +query?.id)
          if (item) {
            setLoading(true)
            queryClient.setQueryData(['depositList', +query?.id], {
              // ...queryClient.getQueryData(['depositList', +query?.id]),
              Data: item,
            })
            timeout = setTimeout(() => setLoading(false), 2000)
          }
        }
      })
    }

    return () => clearTimeout(timeout)
  }, [connection])

  // ===== end =====
  const { data, isError, isLoading, refetch } = useQuery(
    ['depositList', +query?.id],
    () => transportationOrder.getByID(+query?.id),
    {
      onError: toast.error,
      refetchOnWindowFocus: true,
      retry: false,
      enabled: !!query?.id,
    },
  )

  const { shippingTypeToWarehouse } = useCatalogue({
    shippingTypeToWarehouseEnabled: true,
  })

  if (isError) return <NotFound />

  return (
    <>
      {!isEmpty(data) && (
        <Spin spinning={loading}>
          <DepositListForm
            defaultValues={data?.Data}
            shippingTypeToWarehouseCatalogue={shippingTypeToWarehouse}
            loading={isLoading}
            refetch={refetch}
            RoleID={userCurrentInfo?.UserGroupId}
          />
        </Spin>
      )}
    </>
  )
}

Index.breadcrumb = breadcrumb.deposit.depositList.detail
Index.displayName = breadcrumb.deposit.depositList.detail
Index.Layout = Layout

export default Index
