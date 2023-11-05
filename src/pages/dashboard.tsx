import {
  Layout,
  NewDeliveryOrders,
  NewOrders,
  NewPaymentOrders,
  NewRecharges,
  OrdersPerWeek,
  TheMostBalance,
  TheMostOrders,
} from '~/components'
import { breadcrumb } from '~/configs'
import { SEOConfigs } from '~/configs/SEOConfigs'
import { TNextPageWithLayout } from '~/types/layout'

const Index: TNextPageWithLayout = () => {
  return (
    <div className='mb-4 w-full xl:grid xl:grid-cols-4 xl:gap-4'>
      <div className='mb-4 xl:col-span-4 xl:mb-0'>
        <OrdersPerWeek />
      </div>
      <div className='col-span-2 mb-4 lg:col-span-2 xl:mb-0'>
        <TheMostOrders />
      </div>
      <div className='col-span-2 mb-4 lg:col-span-2 xl:mb-0'>
        <NewOrders />
      </div>
      <div className='col-span-2 mb-4 lg:col-span-2 xl:mb-0'>
        <NewDeliveryOrders />
      </div>
      <div className='col-span-2 mb-4 lg:col-span-2 xl:mb-0'>
        <NewPaymentOrders />
      </div>
      <div className='col-span-2 mb-4 lg:col-span-2 xl:mb-0'>
        <NewRecharges />
      </div>
      <div className='col-span-2 mb-4 lg:col-span-2 xl:mb-0'>
        <TheMostBalance />
      </div>
    </div>
  )
}

Index.displayName = SEOConfigs.dasboard
Index.breadcrumb = breadcrumb.dashboard
Index.Layout = Layout

export default Index
