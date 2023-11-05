import { Checkbox, Tooltip } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { orderShopTemp } from '~/api'
import { Button } from '~/components'
import { IconButton } from '~/components/globals/button/IconButton'
import { toast } from '~/components/toast'
import { setSelectedShopIds, useAppDispatch } from '~/store'
import { _format } from '~/utils'
import { OrderTempItem } from './OrderTempItem'
import { CheckboxCustom } from './block'

type TProps = {
  cart: TUserCartOrderShopTemp
  toggleShopId: (shopId: number) => void
  checked: boolean
  note: string
  handleNote: (key: number, value: string) => void
  refetchCart: () => void
  isFetching
}

const TopContainer = ({
  checked,
  toggleShopId,
  cart,
  onHandleShop,
  loading,
  disabled,
}) => {
  return (
    <div className='bg-main p-[8px]'>
      <div className='top flex items-center justify-between'>
        <Tooltip title='Chọn đặt đơn hàng này'>
          <Checkbox
            onChange={() => toggleShopId(cart?.Id)}
            checked={checked}
            className='mr-2'
          ></Checkbox>
          <span className='ml-2 text-white '>
            <span className='mr-2'>Tên shop:</span>{' '}
            <span className='text-lg'>{cart?.ShopName || cart?.ShopId}</span>
          </span>
        </Tooltip>
        <IconButton
          onClick={() => onHandleShop(cart?.Id)}
          icon={loading ? 'fas fa-sync fa-spin' : 'fas fa-trash-alt'}
          title=''
          showLoading
          toolip='Xóa cửa hàng'
          btnClass='!text-white hover:!bg-red text-[18px]'
          btnIconClass='!mr-0'
          disabled={disabled}
        />
      </div>
    </div>
  )
}

const TopContainerMemo = React.memo(TopContainer)

export const CartOrderItem: React.FC<TProps> = ({
  cart,
  note,
  handleNote,
  toggleShopId,
  checked,
  refetchCart,
  isFetching,
}) => {
  const [loading, setLoading] = useState(false)
  const [loadingPayment, setLoadingPayment] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { getValues, setValue } = useForm<{
    IsPacked: boolean
    IsFastDelivery: boolean
    IsInsurance: boolean
    IsCheckProduct: boolean
  }>({
    mode: 'onBlur',
    defaultValues: {
      IsPacked: cart?.IsPacked,
      IsFastDelivery: cart?.IsFastDelivery,
      IsInsurance: cart?.IsInsurance,
      IsCheckProduct: cart?.IsCheckProduct,
    },
  })

  const mutationDeleteShop = useMutation(orderShopTemp.delete, {
    onSuccess: (_, id) => {
      toast.success('Xoá cửa hàng thành công')
      refetchCart()
      setLoading(true)
    },
    onError: (error) => {
      setLoading(true)
      toast.error
    },
  })

  const onPayment = (isPush = false) => {
    localStorage.removeItem(`${cart.Id}`)
    setLoadingPayment(true)
    orderShopTemp
      .updateField({
        ...cart,
        IsPacked: getValues('IsPacked'),
        IsFastDelivery: getValues('IsFastDelivery'),
        IsInsurance: getValues('IsInsurance'),
        IsCheckProduct: getValues('IsCheckProduct'),
      })
      .then(() => {
        if (isPush) {
          dispatch(setSelectedShopIds([cart?.Id]))
          router.push('/user/cart/payment')
        }
      })
      .finally(() => {
        setLoadingPayment(false)
      })
  }

  const onChangeCheckbox = async (
    e: CheckboxChangeEvent,
    type: 'IsPacked' | 'IsFastDelivery' | 'IsInsurance' | 'IsCheckProduct',
  ) => {
    setValue(type, e.target.checked)
    onPayment()
  }

  const onHandleShop = useCallback(async (id: number) => {
    setLoading(true)
    mutationDeleteShop.mutateAsync(id)
  }, [])

  return (
    <>
      <div className='col-span-12'>
        <TopContainerMemo
          checked={checked}
          toggleShopId={toggleShopId}
          cart={cart}
          onHandleShop={onHandleShop}
          loading={loading}
          disabled={loadingPayment}
        />
      </div>
      <div className='col-span-12 bg-[#FFF1E4] md:col-span-9 lg:col-span-9'>
        <OrderTempItem
          data={cart?.OrderTemps}
          refetchCart={refetchCart}
          // onHandleProduct={onHandleProduct}
        />
      </div>
      <div className='col-span-12 bg-[#EBF4FE] p-1 md:col-span-3 lg:col-span-3 lg:p-4'>
        <div className='grid grid-cols-4 gap-4 md:grid-cols-1 lg:gap-6'>
          <div className='col-span-4 sm:col-span-2 md:col-span-1'>
            <div className=' cartNewWrapper-orders-items-label'>
              Dịch vụ tuỳ chọn
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <div className='col-span-1 md:col-span-2 lg:col-span-1'>
                <CheckboxCustom
                  defaultChecked={cart?.IsFastDelivery}
                  onChange={(e) => onChangeCheckbox(e, 'IsFastDelivery')}
                  label='Giao tận nhà'
                />
              </div>
              <div className='col-span-1 md:col-span-2 lg:col-span-1'>
                <CheckboxCustom
                  defaultChecked={cart?.IsCheckProduct}
                  onChange={(e) => onChangeCheckbox(e, 'IsCheckProduct')}
                  label='Kiểm hàng'
                />
              </div>
              <div className='col-span-1 md:col-span-2 lg:col-span-1'>
                <CheckboxCustom
                  defaultChecked={cart?.IsPacked}
                  onChange={(e) => onChangeCheckbox(e, 'IsPacked')}
                  label='Đóng gỗ'
                />
              </div>
              <div className='col-span-1 md:col-span-2 lg:col-span-1'>
                <CheckboxCustom
                  defaultChecked={cart?.IsInsurance}
                  onChange={(e) => onChangeCheckbox(e, 'IsInsurance')}
                  label='Bảo hiểm'
                />
              </div>
            </div>
          </div>
          <div className='col-span-2 sm:col-span-1'>
            <div className='cartNewWrapper-orders-items-label'>
              Tổng tiền đơn hàng
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <span className='hidden lg:block'>Tiền hàng:</span>
              <span className='col-span-2 font-bold text-red lg:col-span-1'>
                {_format.getVND(cart?.PriceVND, ' đ')}
              </span>
            </div>
          </div>
          <div className='col-span-2 flex items-end justify-end text-center sm:col-span-1 md:block md:justify-center'>
            <Button
              onClick={() => onPayment(true)}
              // icon="!mr-0"
              disabled={isFetching || loadingPayment}
              title='Tiếp tục đặt hàng'
              btnClass='ml-2 !text-[12px] md:!text-[14px] !text-white sm:w-fit lg:w-[180px]'
              // loading={loadingPayment}
            />
          </div>
        </div>
      </div>
    </>
  )
}
