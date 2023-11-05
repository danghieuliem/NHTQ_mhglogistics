import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { DataTable } from '~/components'
import { smallPackageStatus } from '~/configs'
import { TColumnsType, TTable } from '~/types/table'
import { _format } from '~/utils'
import TagStatus from '../../status/TagStatus'
import { useScreen } from '~/hooks'
type TProps = {
  filter
  handleFilter: (newFilter) => void
  handleExporTExcel
  isSelect?: any
  handleOnChangeKey?: any
}
export const TransactionCodeManagementTable: React.FC<
  TTable<TSmallPackage> & TProps
> = ({
  data,
  loading,
  filter,
  handleFilter,
  handleExporTExcel,
  isSelect,
  handleOnChangeKey,
}) => {
  const router = useRouter()
  const { isWidthSM } = useScreen()

  const columnsUser: TColumnsType<TSmallPackage> = [
    {
      dataIndex: 'MainOrderCode',
      title: 'Mã đơn hàng',
      render: (_, record) => {
        return (
          <TagStatus
            color={record?.OrderType === 1 ? 'red' : 'blue'}
            statusName={_}
          />
        )
      },
      width: 100,
    },
    {
      dataIndex: 'Created',
      title: 'Ngày tạo',
      width: 140,
      responsive: ['xl'],
      render: (date) => {
        return (
          <>
            <div>{_format.getVNDate(date)}</div>
          </>
        )
      },
    },
    {
      dataIndex: 'Code',
      width: 200,
      title: 'Bao hàng/Mã vận đơn',
      responsive: ['sm'],
      // render: (_) => <></>,
      render: (_, record) => {
        return (
          <div>
            <div className='flex justify-between'>
              <span>Bao hàng: </span>
              <span>{_ === '' ? '--' : _}</span>
            </div>
            <div className='flex justify-between'>
              <span>Mã vận đơn: </span>
              <span>
                {record?.OrderTransactionCode === ''
                  ? '--'
                  : record?.OrderTransactionCode}
              </span>
            </div>
          </div>
        )
      },
    },
    {
      dataIndex: 'PayableWeight',
      title: 'Thông tin kiện',
      align: 'right',
      render: (_, record) => {
        return (
          <div>
            <div className='flex justify-between'>
              <span className='font-semibold'>Cân nặng (kg): </span>
              <span>{record?.PayableWeight}</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-semibold'>Số khối (m3): </span>
              <span>{_format.getVolume(record?.VolumePayment)}</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-semibold'>DxRxC: </span>
              <span>
                {`${record.Length} x ${record.Width} x ${record.Height}`}
              </span>
            </div>
          </div>
        )
      },
      responsive: ['md'],
      width: 200,
    },
    // {
    //   dataIndex: "Description",
    //   title: "Ghi chú",
    //   width: 140,
    //   responsive: ["xl"],
    // },
    {
      dataIndex: 'Status',
      title: 'Trạng thái',
      render: (status, record) => {
        const color = smallPackageStatus.find((x) => x.id === status)
        return <TagStatus color={color?.color} statusName={color?.name} />
      },
      width: 100,
    },
  ]

  const columnsAmin: TColumnsType<TSmallPackage> = [
    {
      dataIndex: 'Id',
      title: 'Id đơn',
      width: 80,
      render: (_, __) => {
        return (
          <>
            {__.OrderType === 3 ? (
              <span>{_}</span>
            ) : (
              <Link
                href={
                  __.OrderType === 2
                    ? `/manager/deposit/deposit-list/detail/?id=${__?.TransportationOrderId}`
                    : `/manager/order/order-list/detail/?id=${__?.MainOrderId}`
                }
              >
                <a target='_blank'>
                  {__.OrderType === 2
                    ? __.TransportationOrderId
                    : __?.MainOrderId}
                </a>
              </Link>
            )}
          </>
        )
      },
    },
    {
      dataIndex: 'MainOrderCode',
      title: 'Loại đơn',
      render: (_, record) => {
        return (
          <TagStatus
            color={
              record?.OrderType === 3
                ? 'red'
                : record?.OrderType === 2
                ? 'green'
                : 'blue'
            }
            statusName={
              record?.OrderType === 3
                ? 'Trôi nổi'
                : record?.OrderType === 2
                ? 'Ký gửi'
                : 'Mua hộ'
            }
          />
        )
      },
      width: 100,
    },
    {
      dataIndex: 'UserName',
      title: 'Username',
      width: 120,
    },
    {
      dataIndex: 'ProductType',
      title: 'Loại hàng',
      width: 120,
      responsive: ['md'],
    },
    {
      dataIndex: 'Code',
      width: 250,
      title: 'Bao hàng/Mã vận đơn',
      responsive: ['sm'],
      render: (_, record) => {
        return (
          <div>
            <div className='flex justify-between'>
              <span className='font-semibold'>Bao hàng: </span>
              <span>{_ === '' ? '--' : _}</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-semibold'>Mã vận đơn: </span>
              <span>
                {record?.OrderTransactionCode === ''
                  ? '--'
                  : record?.OrderTransactionCode}
              </span>
            </div>
          </div>
        )
      },
    },
    {
      dataIndex: 'PayableWeight',
      title: 'Thông tin kiện',
      align: 'right',
      render: (_, record) => {
        return (
          <div>
            <div className='flex justify-between'>
              <span className='font-semibold'>Cân nặng (kg): </span>
              <span>{record?.PayableWeight}</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-semibold'>Số khối (m3): </span>
              <span>{_format.getVolume(record?.VolumePayment)}</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-semibold'>DxRxC: </span>
              <span>
                {`${record.Length} x ${record.Width} x ${record.Height}`}
              </span>
            </div>
          </div>
        )
      },
      responsive: ['md'],
      width: 200,
    },
    // {
    //   dataIndex: "Description",
    //   title: "Ghi chú",
    //   width: 120,
    // },
    {
      dataIndex: 'Created',
      title: 'Ngày tạo',
      render: (date) => {
        return (
          <>
            <div>{_format.getVNDate(date)}</div>
          </>
        )
      },
      width: 200,
      responsive: ['lg'],
    },
    {
      dataIndex: 'Status',
      title: 'Trạng thái',
      fixed: 'right',
      render: (status, record) => {
        const color = smallPackageStatus.find((x) => x.id === status)
        return <TagStatus color={color?.color} statusName={color?.name} />
      },
      width: 120,
    },
  ]

  return (
    <>
      <DataTable
        {...{
          columns: !router?.asPath.includes('/user/')
            ? columnsAmin
            : columnsUser,
          data,
          bordered: true,

          mediaWidth: 1200,
          loading: loading,
          scroll: isWidthSM ? { x: true } : { y: 700 },
          rowSelection: isSelect
            ? {
                type: 'checkbox',
                onChange: (value) => handleOnChangeKey(value),
                selectedRowKeys: isSelect,
              }
            : null,
          pagination: {
            current: filter.PageIndex,
            total: filter.TotalItems,
            pageSize: filter.PageSize,
          },
          onChange: (page, pageSize) => {
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
