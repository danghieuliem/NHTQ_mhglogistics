import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { user } from '~/api'
import { Layout } from '~/components'
import { breadcrumb } from '~/configs'
import { SEOHomeConfigs } from '~/configs/SEOConfigs'
import { TNextPageWithLayout } from '~/types/layout'
import { _format } from '~/utils'
import Order from './order'

const titleName = 'text-[#9b9a99] text-xs !mb-2 block'
const styleValue = ' text-[#646463]'

const Index: TNextPageWithLayout = () => {
  const { query } = useRouter()

  const { data: dataUser } = useQuery(
    ['clientData', +query?.id],
    () => user.getByID(+query?.id),
    {
      onSuccess: (data) => data.Data,

      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: !!query?.id,
    },
  )

  return (
    <>
      <div className='my-6'>
        <div className='flex text-center lg:w-[100%]'>
          <div className='m-auto flex w-full max-w-[900px] grid-cols-2 flex-col justify-center gap-4 xs:grid md:grid-cols-4'>
            <div className='tableBox'>
              <div className='m-auto mb-2 h-12 w-12 rounded-3xl border-[0.5px] text-[#f5aa8c]'>
                <i className='fal fa-user p-3 text-xl'></i>
              </div>
              <p className={titleName}>Tài khoản khách hàng</p>
              <b className={styleValue}>{dataUser?.Data?.UserName}</b>
            </div>
            <div className='tableBox'>
              <div className='m-auto mb-2 h-12 w-12 rounded-3xl border-[0.5px] text-[#f5aa8c]'>
                <i className='fal fa-sack-dollar p-3 text-xl'></i>
              </div>
              <p className={titleName}>Tổng tiền đơn hàng</p>
              <b className={clsx(styleValue, 'text-[#268ef0]')}>
                {_format.getVND(dataUser?.Data?.TotalOrderPrice)}
              </b>
            </div>
            <div className='tableBox'>
              <div className='m-auto mb-2 h-12 w-12 rounded-3xl border-[0.5px] text-[#f5aa8c]'>
                <i className='fal fa-sack-dollar p-3 text-xl'></i>
              </div>
              <p className={titleName}>Tổng tiền đã thanh toán</p>
              <b className={clsx(styleValue, 'text-green')}>
                {_format.getVND(dataUser?.Data?.TotalPaidPrice)}
              </b>
            </div>
            <div className='tableBox'>
              <div className='m-auto mb-2 h-12 w-12 rounded-3xl border-[0.5px] text-[#f5aa8c]'>
                <i className='fal fa-sack-dollar p-3 text-xl'></i>
              </div>
              <p className={titleName}>Tổng tiền chưa thanh toán</p>
              <b className={clsx(styleValue, 'text-[#f12626]')}>
                {_format.getVND(dataUser?.Data?.TotalUnPaidPrice)}
              </b>
            </div>
          </div>
        </div>
      </div>
      <div className='tableBox'>
        <Order />
      </div>
    </>
  )
}

Index.displayName = SEOHomeConfigs.buyGroceries.listOder
Index.breadcrumb = breadcrumb.client.orderList.detail
Index.Layout = Layout
export default Index
