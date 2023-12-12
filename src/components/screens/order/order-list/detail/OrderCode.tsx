import { Modal } from 'antd'
import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { mainOrderCode } from '~/api'
import { ActionButton, FormInput } from '~/components'
import { AddOrderCode } from './AddOrderCode'
import { EOrderStatus } from '~/configs'

type TProps = {
  data: TOrder
  loading: boolean
  refetch?: any
  isAdmin?: boolean
  RoleID: number
}

export const OrderCode: React.FC<TProps> = ({
  data,
  loading,
  refetch,
  RoleID,
}) => {
  const { control, getValues } = useFormContext<TOrder>()
  const queryClient = useQueryClient()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'MainOrderCodes',
  })

  return (
    <React.Fragment>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className='mb-4 flex items-center'>
            <FormInput
              control={control}
              name={`MainOrderCodes.${index}.Code` as const}
              placeholder=''
              disabled
            />
            {(RoleID === 1 ||
              RoleID === 3 ||
              RoleID === 4 ||
              RoleID === 8 ||
              RoleID === 6) && (
              <ActionButton
                title='Xoá'
                icon='fas fa-trash-alt'
                isButton
                isButtonClassName='bg-red !text-white ml-4'
                disabled={RoleID === 4 && data?.Status === EOrderStatus.DonHuy}
                onClick={() =>
                  Modal.confirm({
                    title: 'Bạn có muốn xoá mã đơn hàng này?',
                    onOk: () => {
                      const id = toast.loading('Đang xử lý ...')
                      mainOrderCode
                        .delete(field.Id)
                        .then(() => {
                          remove(index)
                          queryClient.invalidateQueries('history-order')
                          toast.update(id, {
                            render: 'Xoá mã vận đơn thành công!',
                            type: 'error',
                            isLoading: false,
                            autoClose: 1000,
                          })
                          toast.success('Xoá mã vận đơn thành công')
                          refetch()
                        })
                        .catch((error) => {
                          toast.update(id, {
                            render: (error as any)?.response?.data
                              ?.ResultMessage,
                            autoClose: 1000,
                            type: 'error',
                            isLoading: false,
                          })
                        })
                    },
                  })
                }
              />
            )}
          </div>
        )
      })}
      {(RoleID === 1 ||
        RoleID === 3 ||
        RoleID === 4 ||
        RoleID === 8 ||
        RoleID === 6) && (
        <AddOrderCode
          roleID={RoleID}
          statusData={data?.Status}
          add={async (Code: string) => {
            if (
              !fields.find((x) => x.Code.toLowerCase() === Code.toLowerCase())
            ) {
              await mainOrderCode
                .create({ MainOrderId: data?.Id, Code })
                .then((res) => {
                  append(res?.Data)
                  queryClient.invalidateQueries('history-order')
                })
                .catch(toast.error)
            } else {
              toast.warning('Đã trùng mã đơn hàng')
            }
          }}
        />
      )}
    </React.Fragment>
  )
}
