import { Divider, Space } from 'antd'
import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import { feeSupport } from '~/api'
import {
  ActionButton,
  DataTable,
  FormInput,
  FormInputNumber,
} from '~/components'
import { IconButton } from '~/components/globals/button/IconButton'
import { useScreen } from '~/hooks'
import { TColumnsType } from '~/types/table'

type TProps = {
  data: TOrder
  loading: boolean
  handleUpdate: (data: TOrder) => Promise<void>
  RoleID: number
}

export const OrderSurChargeList: React.FC<TProps> = ({
  data,
  loading,
  handleUpdate,
  RoleID,
}) => {
  const { isWidthSM } = useScreen()
  const FeeSupports = data?.FeeSupports
  const { control, reset, handleSubmit } = useFormContext<TOrder>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'FeeSupports',
  })

  const columns: TColumnsType<TFeeSupport> = [
    {
      dataIndex: 'SupportName',
      title: 'Tên phụ phí',
      align: 'center',
      render: (_, __, index) => (
        <FormInput
          control={control}
          name={`FeeSupports.${index}.SupportName` as const}
          placeholder=''
          hideError
          rules={{ required: 'This field is required ' }}
        />
      ),
    },
    {
      dataIndex: 'SupportInfoVND',
      title: 'Số tiền (VNĐ)',
      align: 'center',
      responsive: ['sm'],
      render: (_, __, index) => (
        <FormInputNumber
          suffix=' VNĐ'
          control={control}
          name={`FeeSupports.${index}.SupportInfoVND` as const}
          placeholder=''
          hideError
          rules={{ required: 'This field is required ' }}
        />
      ),
      // responsive: ["lg"],
    },
    {
      dataIndex: 'action',
      title: 'Thao tác',
      align: 'right',
      className: `${
        RoleID === 1 || RoleID === 3 || RoleID === 8 || RoleID === 6
          ? ''
          : 'hidden'
      }`,
      render: (_, record: any, index) => {
        return (
          <Space>
            <ActionButton
              icon='fas fa-minus-circle'
              title='Xóa'
              onClick={() => {
                const id = toast.loading('Đang xử lý ...')
                const item: any = FeeSupports?.find(
                  (x: any) => x?.Id === record?.Id,
                )
                if (!!item) {
                  feeSupport
                    .delete(item.Id)
                    .then(() => {
                      remove(index)
                      toast.success('Xoá phụ phí thành công')
                      toast.update(id, {
                        render: 'Xoá phụ phí thành công!',
                        autoClose: 500,
                        isLoading: false,
                        type: 'success',
                      })
                      handleSubmit(handleUpdate)()
                      // const newFeeSupports = FeeSupports.filter(itemx => itemx.Id !== item.Id)

                      // const newData = {
                      // 	...data,
                      // 	FeeSupports: newFeeSupports,
                      // };

                      // mutationUpdate.mutateAsync(newData);
                    })
                    .catch((error) => {
                      toast.update(id, {
                        render: (error as any)?.response?.data?.ResultMessage,
                        autoClose: 1000,
                        isLoading: false,
                        type: 'error',
                      })
                    })
                } else {
                  remove(index)
                  toast.update(id, {
                    render: 'Xoá phụ phí thành công!',
                    autoClose: 500,
                    isLoading: false,
                    type: 'success',
                  })
                }
              }}
            />
          </Space>
        )
      },
      // responsive: ["xl"],
      width: 90,
    },
  ]

  return (
    <>
      <div className='flex items-end justify-between border-b py-2 uppercase'>
        <span className='border-main text-base font-bold'>
          Danh sách phụ phí
        </span>
        {(RoleID === 1 ||
          RoleID === 3 ||
          (RoleID === 4 && data?.Status !== 5) ||
          RoleID === 8 ||
          RoleID === 6) && (
          <IconButton
            icon='fas fa-plus-circle'
            title='Tạo'
            onClick={() =>
              append({
                SupportInfoVND: 0,
                MainOrderId: 0,
                Id: 0,
                SupportName: '',
              })
            }
            showLoading
            toolip=''
          />
        )}
      </div>
      <DataTable
        isExpand={isWidthSM}
        rowKey={'id' as any}
        columns={columns}
        data={fields}
        style='detailOrder'
      />
      <Divider />
    </>
  )
}
