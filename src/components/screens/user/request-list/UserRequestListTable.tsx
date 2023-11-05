import { Modal } from 'antd'
import Link from 'next/link'
import router from 'next/router'
import React, { useRef } from 'react'
import { toast } from 'react-toastify'
import { payHelp } from '~/api'
import {
  ActionButton,
  DataTable,
  FilterRangeDate,
  FilterSelect,
  IconButton,
} from '~/components'
import { EPayHelp, payHelpStatus } from '~/configs'
import { TColumnsType, TTable } from '~/types/table'
import { _format } from '~/utils'
import TagStatus from '../../status/TagStatus'
import clsx from 'clsx'

type TProps = {
  filter
  handleFilter: (newFilter) => void
  refetch: () => void
}

const UserRequestListFilter = ({ handleFilter }) => {
  const Status = useRef<number>(-1)
  const FromDate = useRef<string>(null)
  const ToDate = useRef<string>(null)

  return (
    <div className='grid grid-cols-5 gap-4'>
      <div className='col-span-full sm:col-span-2'>
        <FilterSelect
          data={payHelpStatus}
          placeholder={'Trạng thái'}
          label='Trạng thái'
          select={{ label: 'name', value: 'id' }}
          handleSearch={(val: number) => {
            Status.current = val
          }}
          isClearable
        />
      </div>
      <div className='col-span-full sm:col-span-2'>
        <FilterRangeDate
          placeholder='Từ ngày / đến ngày'
          format='DD/MM/YYYY'
          handleDate={(val: string[]) => {
            FromDate.current = val[0]
            ToDate.current = val[1]
          }}
        />
      </div>
      <div className='col-span-full flex items-end sm:col-span-1'>
        <IconButton
          onClick={() => {
            handleFilter({
              Status: Status.current,
              FromDate: FromDate.current,
              ToDate: ToDate.current,
              PageIndex: 1,
            })
          }}
          icon='far fa-search'
          title='Tìm kiếm'
          showLoading
          toolip=''
        />
      </div>
    </div>
  )
}

const UserRequestListFilterMemo = React.memo(UserRequestListFilter)

const TimelineRender = (props: { record: TRequestPaymentOrder }) => {
  const { record } = props

  const data = [
    record.Created && {
      isActive: record?.Status === EPayHelp.ChoDuyet,
      title: 'Đơn mới:',
      display: (
        <>
          {_format.getVNDate(record.Created, 'HH:mm')} -{' '}
          {_format.getVNDate(record.Created, 'DD/MM/YYYY')}
        </>
      ),
    },

    record.ConfirmDate && {
      isActive: record?.Status === EPayHelp.DaDuyet,
      title: 'Đã duyệt:',
      display: (
        <>
          {_format.getVNDate(record.ConfirmDate, 'HH:mm')} -{' '}
          {_format.getVNDate(record.ConfirmDate, 'DD/MM/YYYY')}
        </>
      ),
    },

    record.PaidDate && {
      isActive: record?.Status === EPayHelp.DaThanhToan,
      title: 'Thanh toán:',
      display: (
        <>
          {_format.getVNDate(record.PaidDate, 'HH:mm')} -{' '}
          {_format.getVNDate(record.PaidDate, 'DD/MM/YYYY')}
        </>
      ),
    },

    record.CompleteDate && {
      isActive: record?.Status === EPayHelp.DaHoanThanh,
      title: 'Hoàn thành:',
      display: (
        <>
          {_format.getVNDate(record.CompleteDate, 'HH:mm')} -{' '}
          {_format.getVNDate(record.CompleteDate, 'DD/MM/YYYY')}
        </>
      ),
    },

    record.CancelDate && {
      isActive: record?.Status === EPayHelp.DonHuy,
      title: 'Huỷ đơn:',
      display: (
        <>
          {_format.getVNDate(record.CompleteDate, 'HH:mm')} -{' '}
          {_format.getVNDate(record.CompleteDate, 'DD/MM/YYYY')}
        </>
      ),
    },
  ]

  return (
    <div className='display flex w-full flex-col gap-1 xs:gap-0'>
      {data.map(
        (item) =>
          item && (
            <p
              className={clsx(
                item.isActive && 'text-red',
                'grid grid-cols-7 items-center justify-between gap-1 rounded-md border px-2 xs:border-none',
              )}
            >
              <span className='title col-span-3'>{item.title}</span>
              <span className='display col-span-4'>{item.display}</span>
            </p>
          ),
      )}
    </div>
  )
}

export const UserRequestListTable: React.FC<
  TTable<TRequestPaymentOrder> & TProps
> = ({ data, filter, handleFilter, loading, refetch }) => {
  const handleAction = async (
    targetData: TRequestPaymentOrder,
    type: number,
  ) => {
    try {
      await payHelp.updatePayHelp({ id: targetData?.Id, status: type })
      toast.success(type === 2 ? 'Thanh toán thành công!' : 'Hủy thành công!')
      refetch()
    } catch (error) {
      toast.error((error as any)?.response?.data?.ResultMessage)
    }
  }

  const columns: TColumnsType<TRequestPaymentOrder> = [
    {
      dataIndex: 'Id',
      title: 'ID',
      width: 90,
      responsive: ['lg'],
      render: (value) => {
        return (
          <Link passHref href={`/user/request-list/detail/?id=${value}`}>
            <a target='_blank'>{value}</a>
          </Link>
        )
      },
    },
    {
      dataIndex: 'TotalPrice',
      title: (
        <>
          Tổng tiền
          <br />
          (¥)
        </>
      ),
      align: 'right',
      responsive: ['lg'],
      render: (money) => _format.getYuan(money, ''),
    },
    {
      dataIndex: 'TotalPriceVND',
      title: (
        <>
          Tổng tiền
          <br />
          (VNĐ)
        </>
      ),
      align: 'right',
      render: (money) => _format.getVND(money, ''),
    },
    {
      dataIndex: 'Currency',
      title: (
        <>
          Tỷ giá
          <br />
          (VNĐ)
        </>
      ),
      align: 'right',
      render: (excharge) => _format.getVND(excharge, ''),
      responsive: ['lg'],
    },
    {
      dataIndex: 'Created',
      title: 'TimeLine',
      render: (_, record) => <TimelineRender record={record} />,
      width: 280,
      responsive: ['sm'],
    },
    {
      dataIndex: 'Status',
      title: 'Trạng thái',
      render: (status) => {
        const color = payHelpStatus.find((x) => x.id === status)
        return <TagStatus color={color?.color} statusName={color?.name} />
      },
    },
    {
      dataIndex: 'action',
      title: 'Thao tác',
      align: 'right',
      responsive: ['lg'],
      render: (_, record) => {
        return (
          <div className='flex flex-wrap gap-1'>
            <Link passHref href={`/user/request-list/detail/?id=${record?.Id}`}>
              <a target='_blank' rel='noopener noreferrer'>
                <ActionButton
                  icon='fas fa-info-square'
                  title='Chi tiết'
                  isButton={true}
                />
              </a>
            </Link>
            {record?.Status === EPayHelp.ChoDuyet ||
              (record?.Status === EPayHelp.DaDuyet && (
                <ActionButton
                  onClick={() => {
                    Modal.confirm({
                      title: <b>Thanh toán đơn này!</b>,
                      onOk: () => handleAction(record, EPayHelp.DaThanhToan),
                    })
                  }}
                  icon='fas fa-dollar-sign'
                  title='Thanh toán'
                  isButton={true}
                  isButtonClassName='bg-blue !text-white'
                />
              ))}
            {record.Status === EPayHelp.ChoDuyet && (
              <ActionButton
                onClick={() => {
                  Modal.confirm({
                    title: <b>Hủy yêu cầu thanh toán này!</b>,
                    onOk: () => handleAction(record, EPayHelp.DonHuy),
                  })
                }}
                icon='fas fa-trash'
                title='Hủy'
                isButton={true}
                isButtonClassName='bg-red !text-white'
              />
            )}
          </div>
        )
      },
    },
  ]

  return (
    <>
      <DataTable
        {...{
          loading,
          columns,
          data,
          scroll: { y: 700 },
          extraElement: (
            <UserRequestListFilterMemo handleFilter={handleFilter} />
          ),
          pagination: {
            current: filter.PageIndex,
            total: filter.TotalItems,
            pageSize: filter.PageSize,
          },
          onChange: (page) => {
            handleFilter({
              ...filter,
              PageIndex: page.current,
              PageSize: page.pageSize,
            })
          },
        }}
      />
    </>
  )
}
