import React from 'react'
import { toast } from 'react-toastify'
import {
  ActionButton,
  DataTable,
  FormInput,
  FormInputNumber,
  FormUpload,
} from '~/components'
import { TControl } from '~/types/field'
import { TColumnsType, TTable } from '~/types/table'
import { _format } from '~/utils'

export const CreateOrderTable: React.FC<
  TControl<TUserCreateOrder> & TTable<TUserCreateOrderProduct>
> = ({ control, data, remove }) => {
  const columns: TColumnsType<TUserCreateOrderProduct> = [
    {
      dataIndex: 'Id',
      title: 'STT',
      align: 'right',
      render: (_, __, index) => ++index,
      width: 50,
      responsive: ['sm'],
    },
    {
      dataIndex: 'ImageProduct',
      title: 'Hình ảnh',
      align: 'center',
      render: (_, __, index) => (
        <FormUpload
          image
          control={control}
          name={`Products.${index}.ImageProduct` as const}
        />
      ),
      width: 100,
      responsive: ['lg'],
    },
    {
      dataIndex: 'LinkProduct',
      title: 'Link sản phẩm',
      width: 120,
      render: (_, __, index) => (
        <FormInput
          control={control}
          name={`Products.${index}.LinkProduct` as const}
          placeholder=''
          hideError
          rules={{ required: 'This field is required' }}
        />
      ),
      responsive: ['lg'],
    },
    {
      dataIndex: 'NameProduct',
      title: 'Tên sản phẩm',
      width: 120,
      render: (_, __, index) => (
        <FormInput
          control={control}
          name={`Products.${index}.NameProduct` as const}
          placeholder=''
          hideError
          rules={{ required: 'This field is required' }}
        />
      ),
    },
    {
      dataIndex: 'PropertyProduct',
      title: 'Thuộc tính',
      width: 120,
      render: (_, __, index) => (
        <FormInput
          control={control}
          name={`Products.${index}.PropertyProduct` as const}
          placeholder=''
          hideError
          rules={{ required: 'This field is required' }}
        />
      ),
      responsive: ['lg'],
    },
    {
      dataIndex: 'PriceProduct',
      title: <>Giá (¥)</>,
      width: 100,
      align: 'right',
      render: (_, __, index) => (
        <FormInputNumber
          prefix='¥ '
          control={control}
          name={`Products.${index}.PriceProduct` as const}
          placeholder=''
          hideError
          rules={{ required: 'This field is required' }}
        />
      ),
      responsive: ['md'],
    },
    {
      dataIndex: 'QuantityProduct',
      responsive: ['md'],
      title: 'Số lượng',
      align: 'right',
      render: (_, __, index) => (
        <FormInputNumber
          control={control}
          name={`Products.${index}.QuantityProduct` as const}
          placeholder=''
          hideError
          rules={{ required: 'This field is required' }}
        />
      ),
      width: 80,
    },
    {
      dataIndex: 'NoteProduct',
      title: 'Ghi chú',
      render: (_, __, index) => (
        <FormInput
          control={control}
          name={`Products.${index}.NoteProduct` as const}
          placeholder=''
        />
      ),
      responsive: ['lg'],
      width: 120,
    },
    {
      dataIndex: 'action',
      title: 'Thao tác',
      align: 'right',
      width: 80,
      render: (_, __, index) => (
        <div>
          <ActionButton
            title='Xoá'
            isButton
            isButtonClassName='bg-red !text-white w-fit m-auto'
            icon='!mr-0'
            onClick={() => {
              if (data.length > 1) {
                remove(index)
              } else {
                toast.warning('Phải có ít nhất 1 đơn hàng')
              }
            }}
          />
        </div>
      ),
    },
  ]

  return (
    <DataTable
      {...{
        columns,
        data,
      }}
    />
  )
}
