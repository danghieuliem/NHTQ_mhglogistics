import { Input } from 'antd'
import React from 'react'
import { useFieldArray } from 'react-hook-form'
import {
  ActionButton,
  DataTable,
  FormInputNumber,
  FormTextarea,
  FormUpload,
} from '~/components'
import { IconButton } from '~/components/globals/button/IconButton'
import { FormSelect } from '~/components/globals/formBase'
import { smallPackageStatusData } from '~/configs/appConfigs'
import { TControl } from '~/types/field'
import { TColumnsType, TTable } from '~/types/table'
import { _format } from '~/utils'

export const AddPackageCustomerTable: React.FC<
  TTable<TWarehouseVN> &
    TControl<{ [key: string]: TWarehouseVN[] }> & {
      name: string
      onPress: (data: TWarehouseVN[]) => void
      onHide: (data: TWarehouseVN[]) => void
    }
> = ({ data, onPress, onHide, handleSubmit, name, control }) => {
  const {} = useFieldArray({ name, control, keyName: 'Id' })

  const columns: TColumnsType<TWarehouseVN> = [
    {
      dataIndex: 'IsCheckProduct',
      align: 'center',
      title: 'Đơn hàng',
      render: (_, record) => (
        <div className='flex flex-col justify-center'>
          <div className='mx-1 flex items-center justify-between'>
            <p className='mr-1 font-medium'>KĐ</p>
            {record.IsCheckProduct ? (
              <i className='fas fa-check-circle text-xl text-success'></i>
            ) : (
              <i className='fas fa-times-circle text-xl text-warning'></i>
            )}
          </div>
          <div className='mx-1 flex items-center justify-between'>
            <p className='mr-1 font-medium'>ĐG</p>
            {record.IsPackged ? (
              <i className='fas fa-check-circle text-xl text-success'></i>
            ) : (
              <i className='fas fa-times-circle text-xl text-warning'></i>
            )}
          </div>
          <div className='mx-1 flex items-center justify-between'>
            <p className='mr-1 font-medium'>BH</p>
            {record.IsInsurance ? (
              <i className='fas fa-check-circle text-xl text-success'></i>
            ) : (
              <i className='fas fa-times-circle text-xl text-warning'></i>
            )}
          </div>
        </div>
      ),
      responsive: ['sm'],
    },
    {
      dataIndex: 'OrderTransactionCode',
      align: 'center',
      title: 'Mã vận đơn',
    },
    {
      dataIndex: 'Weight',
      align: 'center',
      title: 'Cân nặng (kg)',
      render: (weight, _, index) => {
        return (
          <FormInputNumber
            control={control}
            name={`${name}.${index}.Weight` as any}
            placeholder=''
            inputClassName='max-w-[60px] h-[30px] text-center'
            onEnter={() => onPress([data[index]])}
            defaultValue={weight}
          />
        )
      },
      responsive: ['md'],
    },
    {
      dataIndex: 'Width',
      align: 'center',
      title: 'Kích thước',
      render: (_, __, index) => (
        <React.Fragment>
          <div className='flex items-center'>
            d:
            <FormInputNumber
              control={control}
              name={`${name}.${index}.Length` as any}
              placeholder=''
              inputClassName='max-w-[60px] h-[30px] text-center'
              onEnter={() => onPress([data[index]])}
              defaultValue={0}
            />
          </div>
          <div className='my-2 flex items-center'>
            r:
            <FormInputNumber
              control={control}
              name={`${name}.${index}.Width` as any}
              placeholder=''
              inputClassName='max-w-[60px] h-[30px] text-center'
              onEnter={() => onPress([data[index]])}
              defaultValue={0}
            />
          </div>
          <div className='flex items-center'>
            c:
            <FormInputNumber
              control={control}
              name={`${name}.${index}.Height` as any}
              placeholder=''
              inputClassName='max-w-[60px] h-[30px] text-center'
              onEnter={() => onPress([data[index]])}
              defaultValue={0}
            />
          </div>
        </React.Fragment>
      ),
      responsive: ['md'],
    },
    {
      dataIndex: 'UserNote',
      align: 'center',
      title: 'Ghi chú',
      width: 160,
      render: (_, __, index) => (
        <FormTextarea
          rows={2}
          control={control}
          name={`${name}.${index}.UserNote` as any}
          placeholder=''
        />
      ),
      responsive: ['lg'],
    },
    {
      dataIndex: 'StaffNoteCheck',
      align: 'center',
      title: 'Khách ghi chú',
      width: 160,
      render: (_, __, index) => (
        <FormTextarea
          rows={2}
          control={control}
          name={`${name}.${index}.StaffNoteCheck` as any}
          placeholder=''
        />
      ),
      responsive: ['lg'],
    },
    {
      dataIndex: 'IMG',
      align: 'center',
      title: 'Hình ảnh',
      render: (_, __, index) => (
        <FormUpload
          control={control}
          name={`${name}.${index}.IMG` as any}
          image
        />
      ),
      responsive: ['xl'],
    },
    {
      dataIndex: 'Status',
      title: () => <div className='text-center'>Trạng thái</div>,
      render: (_, __, index) => (
        <FormSelect
          control={control}
          name={`${name}.${index}.Status` as any}
          data={[smallPackageStatusData[1]]}
          defaultValue={smallPackageStatusData[1]}
          placeholder='Chọn trạng thái'
        />
      ),
      responsive: ['xl'],
    },
    {
      dataIndex: 'OrderTransactionCode',
      align: 'center',
      title: 'Thao tác',
      render: (_, __, index) => (
        <React.Fragment>
          <ActionButton
            icon='fas fa-sync-alt'
            onClick={() => onPress([data[index]])}
            title='Cập nhật'
          />
          <ActionButton
            icon='fas fa-eye-slash'
            onClick={() => onHide([data[index]])}
            title='Ẩn đi'
          />
        </React.Fragment>
      ),
      responsive: ['xl'],
    },
  ]

  return (
    <React.Fragment>
      <div className='ms:gap-4 mt-4 flex flex-col justify-between gap-2 xs:flex-row'>
        <div className='flex w-fit items-center rounded-[6px] bg-white px-4 !text-sec shadow-md'>
          Kiện đã quét
          <span className='text-md mx-1 font-bold text-red'>
            ({data.length})
          </span>
        </div>
        <div className='flex flex-col gap-2 xs:flex-row'>
          <IconButton
            onClick={() => onHide(data)}
            title='Ẩn tất cả'
            icon='fas fa-eye-slash'
            toolip=''
          />
          <IconButton
            onClick={() => onPress(data)}
            icon='fas fa-edit'
            title='Cập nhật tất cả'
            toolip=''
          />
        </div>
      </div>

      <DataTable data={data} columns={columns} bordered mediaWidth={1200} />
    </React.Fragment>
  )
}
