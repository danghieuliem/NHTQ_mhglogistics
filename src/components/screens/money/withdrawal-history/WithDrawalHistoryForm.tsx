import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { withdraw } from '~/api'
import {
  Button,
  FormCard,
  FormInput,
  FormInputNumber,
  FormSelect,
  FormTextarea,
  Modal,
} from '~/components'
import { EPaymentStatusData, paymentStatusData } from '~/configs'
import { TForm } from '~/types/table'

export const WithDrawalHistoryForm: React.FC<TForm<TWithDraw>> = ({
  onCancel,
  visible,
  defaultValues,
}) => {
  const { handleSubmit, reset, control } = useForm<TWithDraw>({
    mode: 'onBlur',
  })

  const { data, isLoading } = useQuery(
    ['clientWithdrawData', defaultValues?.Id],
    () => withdraw.getByID(defaultValues?.Id),
    {
      enabled: !!defaultValues?.Id,
      refetchOnWindowFocus: false,
      onSuccess: (data) => reset(data?.Data),
    },
  )

  const queryClient = useQueryClient()
  const mutationUpdate = useMutation(withdraw.update, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['clientWithdrawData', defaultValues?.Id],
        data.Data,
      )
      queryClient.invalidateQueries(['clientWithdrawData'])
    },
  })

  const _onPress = (data: TWithDraw) => {
    onCancel()
    const id = toast.loading('Đang xử lý ...')

    const { Updated, UpdatedBy, ...props } = data
    mutationUpdate
      .mutateAsync(props)
      .then(() => {
        toast.update(id, {
          render: 'Cập nhật thành công!',
          type: 'success',
          autoClose: 500,
          isLoading: false,
        })
      })
      .catch(() => {
        toast.update(id, {
          render: 'Cập nhật thất bại!',
          type: 'error',
          autoClose: 1000,
          isLoading: false,
        })
      })
  }

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <FormCard loading={isLoading}>
        <FormCard.Header onCancel={onCancel}>
          <div className='w-full'>
            <p>Thông tin rút tiền #{defaultValues?.Id}</p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className='grid gap-4 xs:grid-cols-3'>
            <FormInput
              control={control}
              name='UserName'
              label='Username'
              placeholder=''
              disabled
              rules={{
                required: 'This is required field',
              }}
            />
            <FormInputNumber
              control={control}
              name='Amount'
              label='Số tiền rút'
              placeholder=''
              suffix=' VNĐ'
              rules={{
                required: 'This is required field',
              }}
              disabled={defaultValues?.Status === 2}
            />
            <FormSelect
              control={control}
              name='Status'
              data={paymentStatusData.slice(1)}
              disabled={defaultValues?.Status !== EPaymentStatusData.Unapproved}
              defaultValue={paymentStatusData.find(
                (x) => x.id === defaultValues?.Status,
              )}
              label='Trạng thái'
              placeholder=''
              rules={{
                required: 'This is required field',
              }}
            />
            <div className='col-span-full'>
              <FormTextarea
                control={control}
                name='Note'
                label='Nội dung'
                placeholder=''
                required={false}
                rows={2}
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
          <Button title='Hủy' btnClass='!bg-red' onClick={onCancel} />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  )
}
