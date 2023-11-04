import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { mainOrder, payHelp, transportationOrder } from '~/api'
import {
  UserAnotherOrder,
  UserLayout,
  UserOrder,
  UserPayment,
  UserStatistic,
  UserTransfer,
} from '~/components'
import { breadcrumb } from '~/configs'
import { SEOHomeConfigs } from '~/configs/SEOConfigs'
import { EParamQ } from '~/enums'
import { RootState } from '~/store'
import { TNextPageWithLayout } from '~/types/layout'
const dataBoxItem = [
  {
    key: 'mainOrderTotal',
    label: 'Mua hàng hộ',
    path: '/user/order-list',
    icon: 'fas fa-shopping-basket',
    color: '#1582F5',
    bgColor: '#EBF4FE',
    value: null,
  },
  {
    key: 'mainOrderOtherTotal',
    label: 'Mua hàng hộ khác',
    path: `/user/order-list?q=${EParamQ.otherOrder}`,
    icon: 'fas fa-cubes',
    color: '#009000',
    bgColor: '#E5FFE5',
    value: null,
  },
  {
    key: 'transportTotal',
    label: 'Ký gửi',
    path: '/user/deposit-list',
    icon: 'fas fa-dolly',
    color: '#FF7A00',
    bgColor: '#FFF4EA',
    value: null,
  },
  {
    key: 'paymentTotal',
    label: 'Thanh toán hộ',
    path: '/user/request-list',
    icon: 'fas fa-credit-card',
    color: '#F00',
    bgColor: '#FFF1F1',
    value: null,
  },
]

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo,
  )

  const [total, setTotal] = useState(dataBoxItem)

  const {
    data: orderData,
    isFetching: isFetchingOrder,
    isLoading: isLoadingOrder,
  } = useQuery(
    [
      'userOrderListMainOrder',
      {
        PageIndex: 1,
        PageSize: 10,
        OrderBy: 'Created desc',
        UID: userCurrentInfo?.Id,
        OrderType: 1,
      },
    ],
    () =>
      mainOrder
        .getList({
          PageIndex: 1,
          PageSize: 10,
          OrderBy: 'Created desc',
          UID: userCurrentInfo?.Id,
          OrderType: 1,
        })
        .then((res) => {
          dataBoxItem[0].value = res.Data.TotalItem
          return res.Data
        }),
    {
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage)
      },
      enabled: !!userCurrentInfo?.Id,
      staleTime: 5000,
    },
  )

  const {
    data: otherOrderData,
    isFetching: isFetchingOtherOrder,
    isLoading: isLoadingOtherOrder,
  } = useQuery(
    [
      'userOrderOtherList',
      {
        PageIndex: 1,
        PageSize: 10,
        OrderBy: 'Created desc',
        OrderType: 3,
        UID: userCurrentInfo?.Id,
      },
    ],
    () =>
      mainOrder
        .getList({
          PageIndex: 1,
          PageSize: 10,
          OrderBy: 'Created desc',
          UID: userCurrentInfo?.Id,
          OrderType: 3,
        })
        .then((res) => {
          dataBoxItem[1].value = res.Data.TotalItem
          return res.Data
        }),
    {
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage)
      },
      enabled: !!userCurrentInfo?.Id,
      staleTime: 5000,
    },
  )

  const {
    isFetching: isFetchingPayment,
    data: paymentData,
    isLoading: isLoadingPayment,
  } = useQuery(
    [
      'requestPaymentData',
      {
        PageCurrent: 1,
        PageSize: 10,
        OrderBy: 'Created desc',
        UID: userCurrentInfo?.Id,
      },
    ],
    () =>
      payHelp
        .getList({
          PageIndex: 1,
          PageSize: 10,
          OrderBy: 'Created desc',
          UID: userCurrentInfo?.Id,
        })
        .then((res) => {
          dataBoxItem[3].value = res.Data.TotalItem
          return res.Data
        }),
    {
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage)
      },
      staleTime: 5000,
      enabled: !!userCurrentInfo?.Id,
    },
  )

  const {
    isFetching: isFetchingTransport,
    data: transportData,
    isLoading: isLoadingTransport,
  } = useQuery(
    [
      'deliveryOrder',
      {
        Current: 1,
        PageSize: 10,
        UID: userCurrentInfo?.Id,
      },
    ],
    () =>
      transportationOrder
        .getList({
          PageIndex: 1,
          PageSize: 10,
          OrderBy: 'Created desc',
          UID: userCurrentInfo?.Id,
        })
        .then((res) => {
          dataBoxItem[2].value = res.Data.TotalItem
          return res.Data
        }),
    {
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage)
      },
      enabled: !!userCurrentInfo?.Id,
      staleTime: 5000,
    },
  )

  useEffect(() => {
    setTotal(dataBoxItem)
  }, [transportData, paymentData, orderData, otherOrderData])

  useEffect(() => {
    setTotal(dataBoxItem)
  }, [orderData])

  return (
    <div className='grid grid-cols-4 gap-4'>
      <div className='col-span-4'>
        <UserStatistic total={total} />
      </div>
      <div className={'col-span-4'}>
        <UserOrder
          {...{
            data: orderData,
            isLoading: isLoadingOrder,
            isFetching: isFetchingOrder,
          }}
        />
      </div>
      <div className={'col-span-4'}>
        <UserAnotherOrder
          {...{
            data: otherOrderData,
            isFetching: isFetchingOtherOrder,
            isLoading: isLoadingOtherOrder,
          }}
        />
      </div>
      <div className={'col-span-4'}>
        <UserTransfer
          {...{
            data: transportData,
            isFetching: isFetchingTransport,
            isLoading: isLoadingTransport,
          }}
        />
      </div>
      <div className={'col-span-4'}>
        <UserPayment
          {...{
            data: paymentData,
            isLoading: isLoadingPayment,
            isFetching: isFetchingPayment,
          }}
        />
      </div>
    </div>
  )
}

Index.displayName = SEOHomeConfigs.dashboard
Index.breadcrumb = breadcrumb.dashboard
Index.Layout = UserLayout

export default Index
