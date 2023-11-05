import { FormInput } from '~/components'
import { TControl } from '~/types/field'

type TProps = TControl<TUserPayment>

export const StaticUserForm: React.FC<TProps> = ({ control }) => {
  return (
    <div className='tableBox mb-4 grid grid-cols-2 gap-4'>
      <h2 className='col-span-2 !mb-0 font-semibold text-[#141046]'>
        Người đặt hàng
      </h2>
      <FormInput
        disabled
        name='ReceiverFullName'
        placeholder=''
        control={control}
        inputContainerClassName=''
        inputClassName='!bg-gray'
        label='Họ và tên'
        required={false}
      />
      <FormInput
        disabled
        name='ReceiverPhone'
        placeholder=''
        control={control}
        inputContainerClassName=''
        inputClassName='!bg-gray'
        label='Số điện thoại'
        required={false}
      />
      <FormInput
        disabled
        name='ReceiverEmail'
        placeholder=''
        control={control}
        inputContainerClassName=''
        inputClassName='!bg-gray'
        label='Email'
        required={false}
      />
      <FormInput
        disabled
        name='ReceiverAddress'
        placeholder=''
        control={control}
        inputContainerClassName=''
        inputClassName='!bg-gray'
        label='Địa chỉ'
        required={false}
      />
    </div>
  )
}
