import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { customerBenefits } from '~/api'
import {
  Button,
  FormCard,
  FormInput,
  FormInputNumber,
  FormSelect,
  FormSwitch,
  FormTextarea,
  FormUpload,
  Modal,
} from '~/components'
import { benefitData } from '~/configs/appConfigs'
import { useDeepEffect } from '~/hooks'
import { TForm } from '~/types/table'

export const ClientBenefitForm: React.FC<
  TForm<TCustomerBenefit> & { refetchcustomerBenefits }
> = ({ onCancel, visible, defaultValues, refetchcustomerBenefits }) => {
  const { control, reset, handleSubmit, getValues } = useForm<TCustomerBenefit>(
    {
      mode: 'onBlur',
    },
  )

  useDeepEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  const _onPress = (data: TEmployee & { UserGroupId: number }) => {
    const id = toast.loading('Đang xử lý ...')
    customerBenefits
      .update(data)
      .then(() => {
        refetchcustomerBenefits()
        toast.update(id, {
          render: 'Cập nhật thành công!',
          type: 'success',
          isLoading: false,
          autoClose: 500,
        })
      })
      .catch((error) => {
        toast.update(id, {
          render: 'Cập nhật thất bại!',
          type: 'error',
          isLoading: false,
          autoClose: 1000,
        })
      })
      .finally(() => onCancel())
  }

  return (
    <Modal onCancel={onCancel} visible={visible} width={1000}>
      <FormCard>
        <FormCard.Header onCancel={onCancel}>
          <div className='w-full'>
            <p>Cập nhật quyền lợi khách hàng</p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className='grid gap-4 xs:grid-cols-2'>
            <div className='col-span-1'>
              <FormInput
                control={control}
                name='Name'
                rules={{ required: 'This field is required' }}
                label='Tên quyền lợi'
                placeholder=''
              />
            </div>
            <div className='col-span-1'>
              <FormInputNumber
                control={control}
                name='Position'
                rules={{ required: 'This field is required' }}
                label='Vị trí'
                placeholder=''
              />
            </div>
            <div className='col-span-1'>
              <FormInput
                control={control}
                name='Link'
                required={false}
                label='Link'
                placeholder=''
              />
            </div>
            <div className='col-span-1'>
              <FormSelect
                control={control}
                name='ItemType'
                data={benefitData}
                label='Quyền lợi'
                placeholder=''
                defaultValue={{
                  id: getValues('ItemType'),
                  name: getValues('ItemTypeName'),
                }}
              />
            </div>
            <div className='xs:col-span-2'>
              <FormUpload
                control={control}
                name='IMG'
                label='Hình ảnh'
                required={false}
              />
            </div>
            <div className='xs:col-span-2'>
              <FormTextarea
                control={control}
                name='Description'
                label='Mô tả ngắn'
                placeholder=''
                required={false}
              />
            </div>
            <div className='xs:col-span-2'>
              <FormSwitch
                control={control}
                name='Active'
                label='Trạng thái:'
                required={false}
              />
            </div>
          </div>
        </FormCard.Body>
        <FormCard.Footer>
          <Button
            title='Cập nhật'
            btnClass='!bg-main mr-2'
            onClick={handleSubmit(_onPress)}
          />
          <Button
            title='Hủy'
            btnClass='!bg-red'
            onClick={() => {
              onCancel()
            }}
          />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  )
}
