import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { smallPackage } from '~/api'
import {
  Button,
  FormCard,
  FormInput,
  FormUpload,
  Modal,
  toast,
} from '~/components'
import { TForm } from '~/types/table'

export const FloatingListForm: React.FC<TForm<TSmallPackage>> = ({
  onCancel,
  visible,
  defaultValues,
}) => {
  const { control, reset, handleSubmit, getValues } = useForm<TSmallPackage>({
    mode: 'onBlur',
  })

  const { isFetching } = useQuery(
    ['smallPackage', defaultValues?.Id],
    () => smallPackage.getByID(defaultValues?.Id).then((res) => res.Data),
    {
      enabled: !!defaultValues?.Id,
      refetchOnWindowFocus: false,
      onSuccess: (data) => reset(data),
      onError: toast.error,
    },
  )

  const mutationConfirm = useMutation(
    (data: {
      Id: number
      FloatingUserPhone: number
      UserNote: string
      IMG: string
    }) =>
      smallPackage.confirm({
        id: data.Id,
        phone: data.FloatingUserPhone,
        note: data.UserNote,
        image: data.IMG,
      }),
    {
      onSuccess: () => {
        mutationConfirm.reset()
        toast.success('Xác nhận thành công')
        onCancel()
      },
      onError: toast.error,
    },
  )

  const handelConfirm = async (data: any) => {
    try {
      await mutationConfirm.mutateAsync(data)
    } catch (error) {}
  }

  return (
    <Modal onCancel={onCancel} visible={visible} width={1000}>
      <FormCard>
        <FormCard.Header onCancel={onCancel}>
          <div className='w-full'>
            <p>Xác nhận kiện trôi nổi</p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2'>
              <FormInput
                control={control}
                name='OrderTransactionCode'
                rules={{ required: 'Không bỏ trống mã vận đơn' }}
                label='Mã vận đơn'
                placeholder=''
              />
            </div>
            <div className='col-span-2'>
              <FormInput
                control={control}
                name='FloatingUserPhone'
                required={true}
                label='Số điện thoại xác nhận'
                placeholder=''
              />
            </div>
            <div className='col-span-2'>
              <FormInput
                control={control}
                name='UserNote'
                required={false}
                label='Ghi chú xác nhận'
                placeholder=''
              />
            </div>
            <div className='col-span-2'>
              <FormUpload
                control={control}
                name='IMG'
                label='Hình ảnh'
                required={false}
              />
            </div>
          </div>
        </FormCard.Body>
        <FormCard.Footer>
          <Button
            title='Cập nhật'
            btnClass='!bg-main'
            onClick={handleSubmit(handelConfirm)}
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
