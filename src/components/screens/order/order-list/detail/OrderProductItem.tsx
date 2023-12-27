import { InputNumber, Tooltip, Image } from 'antd'
import { isEmpty, isInteger } from 'lodash'
import React, { useState } from 'react'
import { ActionButton, toast } from '~/components'
import { _format } from '~/utils'

type TProps = {
  order: TProduct
  index: number
  handleUpdateProduct: any
  loading: boolean
  RoleID: number
  // setCheckUpdate: () => void;
  dataStatus: number
  orderType: number
}

export const OrderProductItem: React.FC<TProps> = ({
  order,
  index,
  handleUpdateProduct,
  loading,
  RoleID,
  dataStatus,
  orderType,
  // setCheckUpdate,
}) => {
  const [changeValue, setChangeValue] = useState(false)
  const [brand, setBrand] = useState(order?.Brand)
  const [quantity, setQuantity] = useState(order?.Quantity)
  const [priceVND, setPriceVND] = useState(order?.UPriceBuyVN)
  const [priceOrigin, setPriceOrigin] = useState(() => {
    if (orderType === 3) {
      return order?.PriceOrigin
    } else {
      return order?.PriceOrigin < order?.PricePromotion
        ? order?.PriceOrigin
        : order?.PricePromotion
    }
  })

  // const [total, setTotal] = useState(order?.PriceVND);
  const [total, setTotal] = useState(order?.UPriceBuyVN * order?.Quantity)

  function onChangeOrderBrand(e: React.ChangeEvent<HTMLInputElement>) {
    setChangeValue(true)
    setBrand(e.target.value)
  }

  function handleQuantity(val: number) {
    if (isInteger(val)) {
      setChangeValue(true)
      setQuantity(val >= 0 ? val : 1)
      const newTotal = priceVND * val
      setTotal(newTotal)
    }
  }

  function handleChangePriceCNY(val: string) {
    setChangeValue(true)
    setPriceOrigin(Number(val))
    const totalPriceVND = Number(val) * order?.CurrentCNYVN
    const newTotal = totalPriceVND * quantity
    setPriceVND(totalPriceVND)
    setTotal(newTotal)
  }

  return (
    <div
      key={order.Id}
      className={`orderProductItem ${changeValue && '!'}border-[red] my-2`}
      style={{
        opacity: loading ? '0.4' : '1',
        pointerEvents: loading ? 'none' : 'all',
        backgroundColor: changeValue && '#f3e6e6',
      }}
    >
      <div className='grid grid-cols-12'>
        {changeValue && (
          <div className='col-span-full flex justify-center'>
            {/* <Tooltip title="Cập nhật đơn hàng này!">
							<Checkbox
								onClick={() => {
									return setCheckUpdate;
								}}
							/>
						</Tooltip> */}
            <span className='ml-4 text-right font-bold italic text-[red]'>
              Giá trị thay đổi! Vui lòng cập nhật sản phẩm!
            </span>
          </div>
        )}

        <div className='borderBottom col-span-full mb-5 flex items-center justify-between px-3'>
          {isEmpty(order?.LinkOrigin) ? (
            <Tooltip title='Không có Link đến sản phẩm'>
              <span className='text-lg font-bold'>{order?.TitleOrigin}</span>
            </Tooltip>
          ) : (
            <Tooltip title='Link đến sản phẩm'>
              <a
                href={order?.LinkOrigin}
                target='_blank'
                className='text-lg font-bold text-blueLight hover:text-main'
              >
                <span className='underline'>{order?.TitleOrigin}</span>
                &nbsp;&nbsp;
                <i className='fas fa-external-link-alt text-sm'></i>
              </a>
            </Tooltip>
          )}
          {(RoleID === 1 ||
            RoleID === 3 ||
            RoleID === 4 ||
            RoleID === 8 ||
            RoleID === 6) && (
            <div className='xl:block'>
              <ActionButton
                iconContainerClassName='border-none'
                title='Cập nhật'
                icon={loading ? 'fas fa-sync fa-spin' : 'fas fa-sync-alt'}
                onClick={() => {
                  handleUpdateProduct(
                    {
                      ...order,
                      Brand: brand,
                      Quantity: quantity,
                      PriceOrigin: priceOrigin,
                      PriceVND: priceVND,
                    },
                    order?.Id,
                  )
                  setChangeValue(false)
                }}
              />
            </div>
          )}
        </div>
        <div className='col-span-full flex flex-col items-center gap-4 py-4 xs:flex-row md:col-span-7 xl:col-span-5'>
          <div className='flex'>
            <div className='flex items-center self-stretch'>
              <Tooltip title='Mã sản phẩm'>
                <p className='p-2 font-bold leading-[initial] text-[red]'>
                  {order?.Id}
                </p>
              </Tooltip>
            </div>
            <div className='ml-4 flex h-[75px] w-[75px] items-center overflow-hidden rounded-xl border border-[#6969691a]'>
              <Image width={'100%'} src={order?.ImageOrigin} />
            </div>
          </div>
          <div className='ml-2 flex-1'>
            <div className='flex flex-wrap items-end'>
              <span className='mr-4 text-sm font-semibold text-[#484747]'>
                * Thuộc tính:
              </span>
              <span>{order?.Property}</span>
            </div>
            <div className='flex flex-wrap items-end'>
              <span className='mr-4 text-sm font-semibold text-[#484747]'>
                * Ghi chú:
              </span>
              <input
                disabled={!(RoleID === 1 || RoleID === 3 || RoleID === 4)}
                type='text'
                className='mr-8 flex-1 !rounded-none border-b border-[#0000003a] bg-[transparent] text-[#000] outline-0'
                value={brand ?? ''}
                onChange={(e) => onChangeOrderBrand(e)}
              />
            </div>
          </div>
        </div>
        <div className='col-span-full grid xs:grid-cols-2 md:col-span-5 xl:col-span-7 xl:flex'>
          <div className='ml-2 grid xs:justify-between'>
            <div className='mb-2 text-sm font-medium text-black'>
              Số lượng (cái)
            </div>
            <div className='text-sm'>
              <InputNumber
                disabled={
                  !(
                    RoleID === 1 ||
                    RoleID === 4 ||
                    RoleID === 3 ||
                    RoleID === 8 ||
                    RoleID === 6
                  )
                }
                className='!w-full !rounded-[6px]'
                min={0}
                max={100000}
                value={quantity}
                onChange={handleQuantity}
              />
            </div>
          </div>
          <div className='ml-2 grid xs:justify-between'>
            <div className='mb-2 text-sm font-medium text-black'>
              Đơn giá (¥)
            </div>
            <div className='text-sm'>
              <InputNumber
                disabled={
                  !(
                    RoleID === 1 ||
                    RoleID === 3 ||
                    RoleID === 4 ||
                    RoleID === 8 ||
                    RoleID === 6
                  )
                }
                className='!w-full !rounded-[6px]'
                value={_format.getYuan(priceOrigin, '')}
                onChange={handleChangePriceCNY}
              />
            </div>
          </div>
          <div className='ml-2 grid xs:justify-between'>
            <div className='mb-2 text-sm font-medium text-black'>
              Đơn giá (VNĐ)
            </div>
            <div className='text-sm'>
              <InputNumber
                className='!w-full !rounded-[6px]'
                value={_format.getVND(priceVND, '')}
                disabled={true}
                // onChange={handleChangePriceCNY}
              />
            </div>
          </div>
          <div className='ml-2 grid xs:justify-between'>
            <div className='mb-2 text-sm font-medium text-black'>
              Thành tiền (VNĐ)
            </div>
            <div className='text-sm'>
              <InputNumber
                className='!w-full !rounded-[6px]'
                value={_format.getVND(total, '')}
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
