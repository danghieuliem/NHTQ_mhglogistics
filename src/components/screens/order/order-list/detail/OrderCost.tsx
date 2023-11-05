import { Tooltip } from 'antd'
import React, { useCallback, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import { FormInputNumber } from '~/components'
import { FormCheckbox } from '~/components/globals/formBase'
type TProps = {
  loading: boolean
  data:
    | TOrder
    | (TOrder[] & {
        FeeBuyProCK: number
        FeeWeightCK: number
        HH: number
        HHCNY
        Id: number
        TotalPriceVND: number
        Status: number
      })
  RoleID: number
}

const box = 'flex flex-col sm:flex-row xs:items-center'
const costTitle = 'w-full text-sm font-semibold flex justify-between'
const costBox = 'w-full grid xs:grid-cols-2 gap-4'

const ChangeChargeComponent = ({ control, data, RoleID }) => {
  return (
    <>
      <div className={box}>
        <div className={costTitle}>
          <span>Cân nặng - thể tích</span>
          {(RoleID === 1 || RoleID === 3) && (
            <Tooltip title='Check nếu muốn thay đổi cân nặng-thể tích!'>
              <FormCheckbox
                control={control}
                name='IsChangeTQVNWeight'
                label=''
                checkBoxClassName='large'
              />
            </Tooltip>
          )}
        </div>
        <div className={costBox}>
          <div className='col-span-1 flex items-center'>
            <FormInputNumber
              suffix=' KG'
              control={control}
              name='TQVNWeight'
              placeholder=''
              disabled={!(RoleID === 1 || RoleID === 3)}
              allowNegative={false}
            />
          </div>
          <div className='col-span-1'>
            <FormInputNumber
              suffix=' &#x33A5;'
              control={control}
              name='TQVNVolume'
              placeholder=''
              disabled
              allowNegative={false}
            />
          </div>
        </div>
      </div>
      <div className={box}>
        <div className={costTitle}>
          <span>Phí vc TQ-VN (CK: {data?.FeeWeightCK ?? 0}%)</span>
          {(RoleID === 1 || RoleID === 3) && (
            <Tooltip title='Check nếu muốn thay đổi phí vận chuyển TQ-VN!'>
              <FormCheckbox
                control={control}
                name='IsChangeFeeWeight'
                label=''
                checkBoxClassName='large'
              />
            </Tooltip>
          )}
        </div>
        <div className={costBox}>
          <div className='col-span-2 flex items-center'>
            <FormInputNumber
              suffix=' VNĐ'
              control={control}
              name='FeeWeight'
              placeholder=''
              disabled={!(RoleID === 1 || RoleID === 3)}
              allowNegative={false}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export const OrderCost: React.FC<TProps> = ({ loading, data, RoleID }) => {
  const { control, watch, setValue, reset, getValues } =
    useFormContext<TOrder>()

  const all = watch()

  const formValue = useMemo(() => watch(), [watch() as TOrder])
  const handleSetValue = useCallback(
    (key: keyof TOrder, value: any) => setValue(key, value),
    [],
  )

  React.useEffect(() => {
    reset(data)
  }, [data])

  return (
    <React.Fragment>
      <div className='grid grid-cols-1 justify-between gap-2'>
        <div className='mb-4 border-b py-2 uppercase'>
          <span className='text-base font-bold'>Phí cố định</span>
        </div>
        <div className={box}>
          <div className={costTitle}>Tỷ giá</div>
          <div className={costBox}>
            <div className='col-span-2'>
              <FormInputNumber
                suffix=' VNĐ'
                control={control}
                name='CurrentCNYVN'
                placeholder=''
                allowNegative={false}
                disabled
              />
            </div>
          </div>
        </div>
        <div className={box}>
          <div className={costTitle}>Tiền hàng trên web</div>
          <div className={costBox}>
            <div className='col-span-1'>
              <FormInputNumber
                prefix='¥ '
                control={control}
                name='PriceCNY'
                disabled
                placeholder=''
                allowNegative={false}
              />
            </div>
            <div className='col-span-1'>
              <FormInputNumber
                suffix=' VNĐ'
                control={control}
                name='PriceVND'
                disabled
                placeholder=''
                allowNegative={false}
              />
            </div>
          </div>
        </div>
        <div className={box}>
          <div className={costTitle}>Tổng số tiền mua thật</div>
          <div className={costBox}>
            <div className='col-span-1'>
              <FormInputNumber
                prefix='¥ '
                control={control}
                disabled={
                  !(
                    RoleID === 1 ||
                    RoleID === 3 ||
                    (RoleID === 4 && data?.Status < 5) ||
                    RoleID === 8 ||
                    RoleID === 6
                  )
                }
                name='TotalPriceRealCNY'
                placeholder='Tổng số tiền mua thật (¥)'
                allowNegative={false}
                callback={(val) => {
                  if (val !== formValue.TotalPriceRealCNY) {
                    handleSetValue(
                      'TotalPriceReal',
                      Math.ceil(val * formValue.CurrentCNYVN),
                    )
                  }
                }}
              />
            </div>
            <div className='col-span-1'>
              <FormInputNumber
                suffix=' VNĐ'
                control={control}
                name='TotalPriceReal'
                placeholder=''
                disabled={true}
                allowNegative={false}
                callback={(val) => {
                  if (val !== formValue.TotalPriceReal) {
                    handleSetValue(
                      'TotalPriceRealCNY',
                      val / formValue.CurrentCNYVN,
                    )
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className={box}>
          <div className={costTitle}>Phí ship Trung Quốc</div>
          <div className={costBox}>
            <div className='col-span-1'>
              <FormInputNumber
                prefix='¥ '
                control={control}
                name='FeeShipCNCNY'
                disabled={
                  !(
                    RoleID === 1 ||
                    RoleID === 3 ||
                    (RoleID === 4 && !(data?.Status === 5)) ||
                    RoleID === 8 ||
                    RoleID === 6
                  )
                }
                placeholder='Phí ship TQ (¥)'
                allowNegative={false}
                callback={(val) => {
                  if (val !== formValue.FeeShipCNCNY) {
                    handleSetValue(
                      'FeeShipCN',
                      Math.ceil(val * formValue.CurrentCNYVN),
                    )
                  }
                }}
              />
            </div>
            <div className='col-span-1'>
              <FormInputNumber
                suffix=' VNĐ'
                control={control}
                name='FeeShipCN'
                placeholder=''
                disabled={true}
                allowNegative={false}
                callback={(val) => {
                  if (val !== formValue.FeeShipCN) {
                    handleSetValue('FeeShipCNCNY', val / formValue.CurrentCNYVN)
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className={box}>
          <div className={costTitle}>Phí ship Trung Quốc thật</div>
          <div className={costBox}>
            <div className='col-span-1'>
              <FormInputNumber
                prefix='¥ '
                control={control}
                name='FeeShipCNRealCNY'
                disabled={
                  !(
                    RoleID === 1 ||
                    RoleID === 3 ||
                    (RoleID === 4 && data?.Status <= 5) ||
                    RoleID === 8 ||
                    RoleID === 6
                  )
                }
                placeholder='Phí ship TQ thật (¥)'
                allowNegative={false}
                callback={(val) => {
                  if (val !== formValue.FeeShipCNRealCNY) {
                    handleSetValue(
                      'FeeShipCNReal',
                      Math.ceil(val * formValue.CurrentCNYVN),
                    )
                  }
                }}
              />
            </div>
            <div className='col-span-1'>
              <FormInputNumber
                suffix=' VNĐ'
                control={control}
                name='FeeShipCNReal'
                placeholder=''
                disabled={true}
                allowNegative={false}
                callback={(val) => {
                  if (val !== formValue.FeeShipCNReal) {
                    handleSetValue(
                      'FeeShipCNRealCNY',
                      val / formValue.CurrentCNYVN,
                    )
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className={box}>
          <div className={costTitle}>Tiền hoa hồng</div>
          <div className={costBox}>
            <div className='col-span-1'>
              <FormInputNumber
                prefix={`¥ ${data?.HHCNY < 0 ? '-' : ''}`}
                allowNegative={false}
                control={control}
                name='HHCNY'
                placeholder=''
                disabled
              />
            </div>
            <div className='col-span-1'>
              <FormInputNumber
                prefix={`${data?.HH < 0 ? '- ' : ''}`}
                suffix=' VNĐ'
                control={control}
                allowNegative={false}
                name='HH'
                placeholder=''
                disabled
              />
            </div>
          </div>
        </div>
        <div className={box}>
          <div className={costTitle}>
            Phí mua hàng (CK: {data?.FeeBuyProCK ?? 0}%)
          </div>
          <div className={costBox}>
            <div className='col-span-1'>
              <FormInputNumber
                prefix='¥ '
                control={control}
                name='CKFeeBuyPro'
                placeholder=''
                disabled
                allowNegative={false}
              />
            </div>
            <div className='col-span-1'>
              <FormInputNumber
                suffix=' VNĐ'
                control={control}
                name='FeeBuyPro'
                placeholder=''
                disabled={!(RoleID === 1 || RoleID === 3)}
                allowNegative={false}
                callback={(val) => {
                  if (val !== formValue.FeeBuyPro) {
                    handleSetValue(
                      'CKFeeBuyPro',
                      Math.ceil(val / formValue.CurrentCNYVN),
                    )
                  }
                }}
              />
            </div>
          </div>
        </div>
        <ChangeChargeComponent control={control} data={data} RoleID={RoleID} />
      </div>

      {/*  4 serve */}
      <div className='my-4 border-b py-2 uppercase'>
        <span className='text-base font-bold'>Phí tùy chọn</span>
      </div>
      <div className='mt-4 grid items-center xs:grid-cols-4'>
        <div className='col-span-2 flex items-center justify-between font-semibold sm:col-span-1'>
          Kiểm đếm
          <FormCheckbox
            control={control}
            name='IsCheckProduct'
            label=''
            disabled={
              !(
                RoleID === 1 ||
                RoleID === 3 ||
                (RoleID === 4 && data?.Status < 5) ||
                RoleID === 8 ||
                RoleID === 6
              )
            }
            checkBoxClassName='large'
            // defaultChecked={data?.IsCheckProduct}
          />
        </div>
        <div className={costBox + ' col-span-2 sm:col-span-3'}>
          <div className='col-span-1'>
            <FormInputNumber
              prefix='¥ '
              control={control}
              name='IsCheckProductPriceCNY'
              placeholder=''
              allowNegative={false}
              callback={(val) => {
                handleSetValue(
                  'IsCheckProduct',
                  all.IsCheckProduct
                    ? all.IsCheckProduct
                    : val > 0
                    ? true
                    : false,
                )
                if (val !== formValue.IsCheckProductPriceCNY) {
                  handleSetValue(
                    'IsCheckProductPrice',
                    Math.ceil(val * formValue.CurrentCNYVN),
                  )
                }
              }}
              disabled={!(RoleID === 1 || RoleID === 3)}
            />
          </div>
          <div className='col-span-1'>
            <FormInputNumber
              suffix=' VNĐ'
              control={control}
              name='IsCheckProductPrice'
              placeholder=''
              allowNegative={false}
              callback={(val) => {
                if (val !== formValue.IsCheckProductPrice) {
                  handleSetValue(
                    'IsCheckProductPriceCNY',
                    val / formValue.CurrentCNYVN,
                  )
                }
              }}
              disabled
            />
          </div>
        </div>
      </div>
      <div className='mt-4 grid items-center xs:grid-cols-4'>
        <div className='col-span-2 flex items-center justify-between font-semibold sm:col-span-1'>
          Đóng gỗ
          <FormCheckbox
            control={control}
            name='IsPacked'
            label={``}
            checkBoxClassName='large'
            disabled={
              !(
                RoleID === 1 ||
                RoleID === 3 ||
                (RoleID === 4 && data?.Status < 5) ||
                RoleID === 8 ||
                RoleID === 6
              )
            }
            // defaultChecked={getValues("IsPacked")}
            // defaultChecked={data?.IsPacked}
          />
        </div>
        <div className={costBox + ' col-span-2 sm:col-span-3'}>
          <div className='col-span-1'>
            <FormInputNumber
              prefix='¥ '
              control={control}
              name='IsPackedPriceCNY'
              rules={{ required: 'Vui lòng nhập!' }}
              placeholder='Nhập phí đóng gỗ (¥)'
              allowNegative={false}
              callback={(val) => {
                handleSetValue(
                  'IsPacked',
                  all.IsPacked ? all.IsPacked : val > 0 ? true : false,
                )
                if (val !== formValue.IsPackedPriceCNY) {
                  handleSetValue(
                    'IsPackedPrice',
                    Math.ceil(val * formValue.CurrentCNYVN),
                  )
                }
              }}
              disabled={
                !(
                  RoleID === 1 ||
                  RoleID === 3 ||
                  (RoleID === 4 && data?.Status < 5) ||
                  RoleID === 8 ||
                  RoleID === 6
                )
              }
            />
          </div>
          <div className='col-span-1'>
            <FormInputNumber
              suffix=' VNĐ'
              control={control}
              name='IsPackedPrice'
              placeholder=''
              allowNegative={false}
              callback={(val) => {
                if (val !== formValue.IsPackedPrice) {
                  handleSetValue(
                    'IsPackedPriceCNY',
                    val / formValue.CurrentCNYVN,
                  )
                }
              }}
              disabled={
                !(
                  RoleID === 1 ||
                  RoleID === 3 ||
                  (RoleID === 4 && data?.Status <= 5) ||
                  RoleID === 8 ||
                  RoleID === 6
                )
              }
            />
          </div>
        </div>
      </div>
      <div className='mt-4 grid items-center xs:grid-cols-4'>
        <div className='col-span-2 flex items-center justify-between font-semibold sm:col-span-1'>
          Bảo hiểm
          <FormCheckbox
            control={control}
            name='IsInsurance'
            label=''
            checkBoxClassName='large'
            disabled={
              !(
                RoleID === 1 ||
                RoleID === 3 ||
                (RoleID === 4 && data?.Status < 5) ||
                RoleID === 8 ||
                RoleID === 6
              )
            }
            // defaultChecked={data?.IsInsurance}
            // defaultChecked={getValues("IsInsurance")}
          />
        </div>
        <div className={costBox + ' col-span-2 sm:col-span-3'}>
          <div className='col-span-2'>
            <FormInputNumber
              suffix=' VNĐ'
              control={control}
              name='InsuranceMoney'
              placeholder=''
              allowNegative={false}
              disabled
            />
          </div>
        </div>
      </div>
      <div className='mt-4 grid items-center xs:grid-cols-4'>
        <div className='col-span-2 flex items-center justify-between font-semibold sm:col-span-1'>
          Giao hàng tại nhà
          <FormCheckbox
            control={control}
            name='IsFastDelivery'
            label=''
            checkBoxClassName='large'
            disabled={
              !(
                RoleID === 1 ||
                RoleID === 3 ||
                (RoleID === 4 && data?.Status < 5) ||
                RoleID === 8 ||
                RoleID === 6
              )
            }
            // defaultChecked={data?.IsFastDelivery}
          />
        </div>
        <div className={costBox + ' col-span-2 sm:col-span-3'}>
          <div className='col-span-2'>
            <FormInputNumber
              suffix=' VNĐ'
              control={control}
              name='IsFastDeliveryPrice'
              placeholder='Nhập phí giao hàng (VNĐ)'
              allowNegative={false}
              callback={(val) => {
                handleSetValue(
                  'IsFastDelivery',
                  all.IsFastDelivery
                    ? all.IsFastDelivery
                    : val > 0
                    ? true
                    : false,
                )
              }}
              disabled={
                !(
                  RoleID === 1 ||
                  RoleID === 3 ||
                  (RoleID === 4 && data?.Status < 5) ||
                  RoleID === 8 ||
                  RoleID === 6
                )
              }
            />
          </div>
        </div>
      </div>

      {/* Payment charge */}
      <div className='my-4 border-b py-2 uppercase'>
        <span className='text-base font-bold'>Thanh toán</span>
      </div>
      <div className='mt-4 grid items-center xs:grid-cols-4'>
        <div className='col-span-2 flex items-center justify-between text-sm font-semibold sm:col-span-1'>
          Số tiền phải cọc
        </div>
        <div className={costBox + ' col-span-2 sm:col-span-3'}>
          <div className='col-span-2'>
            <FormInputNumber
              suffix=' VNĐ'
              control={control}
              name='AmountDeposit'
              placeholder=''
              allowNegative={false}
              disabled={
                (!(
                  RoleID === 1 ||
                  RoleID === 3 ||
                  RoleID === 8 ||
                  RoleID === 6
                ) &&
                  RoleID === 4) ||
                RoleID === 7
              }
              callback={(val) => {
                if (val > data?.TotalPriceVND) {
                  toast.error(
                    'Số tiền phải cọc không lớn hơn tổng tiền đơn hàng!',
                  )
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className='mt-4 grid items-center xs:grid-cols-4'>
        <div className='col-span-2 flex items-center justify-between text-sm font-semibold sm:col-span-1'>
          Số tiền đã trả
        </div>
        <div className={costBox + ' col-span-2 sm:col-span-3'}>
          <div className='col-span-2'>
            <FormInputNumber
              suffix=' VNĐ'
              control={control}
              name='Deposit'
              placeholder=''
              allowNegative={false}
              disabled={
                !(RoleID === 1 || RoleID === 3 || RoleID === 8 || RoleID === 6)
              }
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
