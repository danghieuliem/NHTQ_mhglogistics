import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { adminSendUserWallet } from '~/api'
import {
  Button,
  FormCard,
  FormInput,
  FormInputNumber,
  FormSelect,
  FormTextarea,
  Modal,
} from '~/components'
import { EPaymentStatusData, paymentStatusData } from '~/configs/appConfigs'
import { useDeepEffect } from '~/hooks'
import { TForm } from '~/types/table'

export const RechargeHistoryForm: React.FC<TForm<TUserHistoryRechargeVND>> = ({
  onCancel,
  visible,
  defaultValues,
}) => {
  const { handleSubmit, control, watch, reset } =
    useForm<TUserHistoryRechargeVND>({
      mode: 'onBlur',
    })

  const { data, isLoading } = useQuery(
    ['clientRechargeData', defaultValues?.Id],
    () => adminSendUserWallet.getByID(defaultValues?.Id),
    {
      enabled: !!defaultValues?.Id,
      refetchOnWindowFocus: false,
      onSuccess: (data) => reset(data?.Data),
      onError: toast.error,
    },
  )

  useDeepEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  const queryClient = useQueryClient()
  const mutationUpdate = useMutation(adminSendUserWallet.update, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['clientRechargeData', defaultValues?.Id],
        data.Data,
      )
      queryClient.invalidateQueries(['clientRechargeData'])
      queryClient.invalidateQueries(['clientData'])
    },
  })

  const _onPress = (data: TUserHistoryRechargeVND) => {
    const id = toast.loading('Đang xử lý ...')
    onCancel()
    // mutationUpdate.mutateAsync(data);
    const { Updated, UpdatedBy, ...props } = data
    mutationUpdate
      .mutateAsync(props)
      .then(() => {
        toast.update(id, {
          render: 'Cập nhật nạp tiền thành công!',
          isLoading: false,
          type: 'success',
          autoClose: 500,
        })
      })
      .catch(() => {
        toast.update(id, {
          render: 'Đã xảy ra lỗi!',
          isLoading: false,
          type: 'error',
          autoClose: 1000,
        })
      })
  }

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <FormCard loading={isLoading}>
        <FormCard.Header onCancel={onCancel}>
          <div className='w-full'>
            <p>Thông tin nạp tiền #{defaultValues?.Id}</p>
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
              label='Số tiền nạp (VNĐ)'
              placeholder=''
              disabled
              suffix=' VNĐ'
              rules={{
                required: 'This is required field',
              }}
            />
            <FormSelect
              control={control}
              name='Status'
              disabled={data?.Data?.Status !== EPaymentStatusData.Unapproved}
              data={paymentStatusData.slice(1)}
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
                name='TradeContent'
                label='Nội dung'
                required={false}
                placeholder=''
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
