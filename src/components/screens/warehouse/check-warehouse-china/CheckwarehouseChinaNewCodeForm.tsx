import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { smallPackage } from '~/api'
import { Button, FormCard, FormInput, Modal } from '~/components'
import { TForm } from '~/types/table'

export const CheckWarehouseChinaNewCodeForm: React.FC<
  TForm<TCreateCode> & {
    newOrderTransactionCode: string
    handleData: (newData: TWarehouseCN[], key: string) => void
  }
> = ({ onCancel, visible, newOrderTransactionCode, handleData }) => {
  const { handleSubmit, control, getValues, reset } = useForm<TWarehouseCN>({
    mode: 'onBlur',
  })

  React.useEffect(() => {
    if (newOrderTransactionCode) {
      reset({ OrderTransactionCode: newOrderTransactionCode })
    } else {
      reset({})
    }
  }, [newOrderTransactionCode])

  const mutationCreate = useMutation(smallPackage.create, {
    onSuccess: async (res) => {
      try {
        // set data scope
        // ===== begin =====
        handleData(res.Data, res.Data[0].UserName + res.Data[0].Phone)
        toast.success('Thêm mới kiện hàng thành công')
      } catch (error) {
        toast.error((error as any)?.response?.data?.ResultMessage)
      }
    },
    onError: (error) => {
      toast.error((error as any)?.response?.data?.ResultMessage)
    },
  })

  const _onPress = (data: TWarehouseCN) => {
    mutationCreate.mutateAsync({ ...data, IsWarehouseTQ: true })
    onCancel()
  }

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <FormCard>
        <FormCard.Header onCancel={onCancel}>
          <div className='w-full'>
            <p>Thêm mã kiện mới</p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className='grid grid-cols-1 gap-4'>
            <div className='col-span-1'>
              <FormInput
                control={control}
                name='OrderTransactionCode'
                label='Mã kiện'
                placeholder=''
                rules={{ required: 'This field is required' }}
              />
            </div>
            <div className='col-span-1'>
              <FormInput
                control={control}
                name='Description'
                label='Ghi chú'
                placeholder=''
                required={false}
              />
            </div>
          </div>
        </FormCard.Body>
        <FormCard.Footer>
          <Button
            title='Thêm'
            onClick={handleSubmit(_onPress)}
            btnClass='!bg-main mr-2'
          />
          <Button title='Huỷ' onClick={onCancel} btnClass='!bg-red' />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  )
}
