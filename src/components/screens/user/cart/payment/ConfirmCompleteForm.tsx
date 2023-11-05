import { ActionButton } from '~/components/globals/button/ActionButton'
import { FormCheckbox } from '~/components/globals/formBase'
import { TControl } from '~/types/field'
import { _format } from '~/utils'
import { ReceiveInfoForm } from './ReceiveInfoForm'

type TProps = TControl<TUserPayment> & {
  onPress: () => void
  totalPrice: number | null
  loadingPayment?: boolean
  warehouseTQ?: TBaseReponseParams[]
  warehouseVN?: TBaseReponseParams[]
  shippingTypeToWarehouse?: TBaseReponseParams[]
  userPayment: any
}

export const ConfirmCompleteForm: React.FC<TProps> = ({
  control,
  onPress,
  totalPrice,
  loadingPayment,
  warehouseTQ,
  warehouseVN,
  shippingTypeToWarehouse,
  userPayment,
}) => {
  if (!totalPrice) return null

  return (
    <div className='grid grid-cols-3 gap-2 p-4'>
      <div className='col-span-full grid lg:col-span-2'>
        <ReceiveInfoForm
          control={control}
          warehouseVN={warehouseVN}
          shippingTypeToWarehouse={shippingTypeToWarehouse}
          warehouseTQ={warehouseTQ}
          userPayment={userPayment}
        />
      </div>
      <div className='col-span-full flex items-center justify-start xs:justify-end lg:col-span-1'>
        <div className='grid h-fit grid-cols-1 gap-2'>
          <div className='flex flex-col justify-start gap-4 xs:flex-row xs:items-center xs:justify-end'>
            <span className='text-[20px] font-bold uppercase leading-[initial] !text-label'>
              Tổng tiền:
            </span>
            <span className='text-[22px] font-bold text-orange'>
              {totalPrice && _format.getVND(totalPrice)}
            </span>
          </div>
          <FormCheckbox
            label='Tôi đồng ý với các điều khoản'
            control={control}
            name='IsAgreement'
            checkBoxClassName='xs:justify-end !text-[#6A6A6A]'
            // rules={{ required: 'Vui lòng xác nhận trước khi thanh toán' }}
          />
          <div className='!text-[16px] text-main xs:text-right'>
            Vui lòng xác nhận trước khi hoàn tất.
          </div>

          <div className='flex xs:justify-end'>
            <ActionButton
              icon='fas fa-hand-point-right'
              title='Hoàn thành'
              isButton
              onClick={onPress}
              isButtonClassName='bg-blue !text-white text-[16px] !px-4 !py-2 rounded-[4px]'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
