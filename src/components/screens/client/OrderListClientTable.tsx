import { Tag } from 'antd'
import React from 'react'
import { DataTable } from '~/components'
import { orderStatus } from '~/configs'
import { TColumnsType, TTable } from '~/types/table'
import { _format } from '~/utils'

export const OrderListClientTable: React.FC<TTable<TOrder>> = ({
  data,
  handlePagination,
  pagination,
}) => {
  const columns: TColumnsType<TOrder> = [
    {
      dataIndex: 'Id',
      title: 'ID',
      align: 'center',
      responsive: ['lg'],
    },
    {
      dataIndex: 'ImageOrigin',
      title: 'Ảnh sản phẩm',
      align: 'center',
      responsive: ['md'],
      render: (img, record) => (
        <div className='flex justify-center'>
          <img
            src={img ? img : '/default/pro-empty.jpg'}
            alt={`Product image ${record.Id}`}
            width={78}
            height={78}
          />
        </div>
      ),
    },
    {
      dataIndex: 'TotalOrderAmount',
      title: (
        <>
          Tổng tiền
          <br />
          (VNĐ)
        </>
      ),
      align: 'center',
      render: (money) => _format.getVND(money, ''),
    },
    {
      dataIndex: 'OrderTypeName',
      title: 'Loại',
      align: 'center',
      responsive: ['md'],
    },
    {
      dataIndex: 'OrdererUserName',
      title: (
        <>
          Nhân viên
          <br />
          đặt hàng
        </>
      ),
      align: 'center',
      responsive: ['md'],
    },
    {
      dataIndex: 'SalerUserName',
      title: (
        <>
          Nhân viên
          <br />
          kinh doanh
        </>
      ),
      align: 'center',
      responsive: ['lg'],
    },
    {
      dataIndex: 'Created',
      title: 'Ngày đặt',
      align: 'center',
      responsive: ['lg'],
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: 'Status',
      title: (
        <>
          Trạng thái
          <br />
          hiện tại
        </>
      ),
      render: (status, record) => {
        const color = orderStatus.find((x) => x.id === status)
        return <Tag color={color?.color}>{record?.StatusName}</Tag>
      },
      width: 160,
    },
  ]

  return (
    <DataTable {...{ pagination, data, onChange: handlePagination, columns }} />
  )
}
