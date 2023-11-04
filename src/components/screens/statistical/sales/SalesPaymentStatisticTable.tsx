import React from 'react'

import { DataTable } from '~/components'
import { IconButton } from '~/components/globals/button/IconButton'
import { TColumnsType } from '~/types/table'
import { _format } from '~/utils/index'

export const SalesPaymentStatisticTable = ({
  loading,
  pagination,
  handlePagination,
  data,
  exportExcel,
  RoleID,
}) => {
  const columns: TColumnsType<TStatisticalPayment> = [
    {
      dataIndex: 'MainOrderId',
      title: 'ID',
    },
    {
      dataIndex: 'Created',
      title: 'Ngày tạo',
      render: (date) => _format.getVNDate(date),
      responsive: ['lg'],
    },
    {
      dataIndex: 'UserName',
      title: 'Username',
      render: (_, record) => <>{record?.UserName ?? '--'}</>,
    },
    {
      dataIndex: 'CreatedBy',
      title: 'Người tạo',
      responsive: ['xl'],
    },
    {
      dataIndex: 'Amount',
      title: (
        <>
          Số tiền <br /> (VNĐ)
        </>
      ),
      align: 'right',
      render: (money) => _format.getVND(money, ''),
      responsive: ['md'],
    },
    {
      dataIndex: 'StatusName',
      title: 'Loại thanh toán',
      responsive: ['sm'],
    },
  ]

  return (
    <React.Fragment>
      <div className='mb-4 items-end justify-between lg:flex'>
        <h2 className='py-2 text-base font-bold uppercase'>
          Thống kê thanh toán
        </h2>
        {(RoleID === 1 || RoleID === 3) && (
          <IconButton
            title='Xuất Thống Kê'
            btnIconClass='!mr-2'
            onClick={exportExcel}
            btnClass={'lg:mx-4'}
            icon='fas fa-file-export'
            showLoading
          />
        )}
      </div>
      <DataTable
        {...{
          columns,
          data,
          bordered: true,
          pagination,
          onChange: (pagination) => handlePagination(pagination),
          loading,
          scroll: { y: 600 },
        }}
      />
    </React.Fragment>
  )
}
