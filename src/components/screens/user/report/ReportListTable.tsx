import React from 'react'
import { DataTable } from '~/components'
import { complainStatus } from '~/configs'
import { TColumnsType, TTable } from '~/types/table'
import { _format } from '~/utils'
import TagStatus from '../../status/TagStatus'

export const ReportListTable: React.FC<TTable<TReport>> = ({
  data,
  loading,
  pagination,
  handlePagination,
}) => {
  const columns: TColumnsType<TReport> = [
    {
      dataIndex: 'MainOrderId',
      title: 'ID đơn hàng',
      width: 100,
      align: 'right',
      responsive: ['sm'],
    },
    {
      dataIndex: 'Created',
      title: 'Ngày tạo',
      responsive: ['lg'],
      width: 200,
      render: (date) => <div>{_format.getVNDate(date)}</div>,
    },
    {
      dataIndex: 'ComplainText',
      title: 'Nội dung',
      responsive: ['md'],
      render: (_) => <>{_ ? _ : '--'}</>,
    },
    {
      dataIndex: 'Amount',
      align: 'right',
      width: 200,
      title: (
        <>
          Tiền bồi thường <br />
          (VNĐ)
        </>
      ),
      render: (money) => _format.getVND(money, ''),
    },
    {
      dataIndex: 'UpdatedBy',
      title: 'Nhân viên xử lý',
      width: 140,
      responsive: ['xl'],
    },
    {
      dataIndex: 'Updated',
      title: 'Ngày xử lý',
      responsive: ['xl'],
      render: (date) => <div>{_format.getVNDate(date)}</div>,
      width: 200,
    },
    {
      dataIndex: 'Status',
      title: 'Trạng thái',
      width: 120,
      render: (status, record) => (
        <TagStatus
          color={complainStatus.find((x) => x.id === status).color}
          statusName={complainStatus.find((x) => x.id === status).name}
        />
      ),
    },
  ]

  return (
    <DataTable
      {...{
        columns,
        data,
        loading,
        pagination,
        onChange: handlePagination,
        scroll: { y: 660 },
        mediaWidth: 1200,
      }}
    />
  )
}
