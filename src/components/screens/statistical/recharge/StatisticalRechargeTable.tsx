import React from 'react'
import { ActionButton, DataTable, IconButton } from '~/components'
import { TColumnsType } from '~/types/table'
import { _format } from '~/utils'
import TagStatus from '../../status/TagStatus'
import { useScreen } from '~/hooks'

export const StatisticalRechargeTable = ({
  data,
  loading,
  pagination,
  handlePagination,
  handleExportExcelRecharge,
}) => {
  const { isWidthSM, isWidthMD } = useScreen()
  const columns: TColumnsType<TStatisticalRechargeList> = [
    {
      dataIndex: 'Id',
      title: 'ID',
      width: 70,
      fixed: 'left',
      responsive: ['lg'],
    },
    {
      dataIndex: 'CreatedBy',
      title: 'Người tạo',
    },
    {
      dataIndex: 'UserName',
      title: 'Username',
      responsive: ['sm'],
    },
    {
      dataIndex: 'Amount',
      title: (
        <>
          Số tiền
          <br />
          (VNĐ)
        </>
      ),
      align: 'right',
      responsive: ['sm'],
      render: (money) => _format.getVND(money, ''),
    },
    {
      dataIndex: 'BankName',
      title: 'Ngân hàng',
      responsive: ['md'],
    },
    {
      dataIndex: 'Created',
      title: 'Ngày tạo',
      responsive: ['lg'],
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: 'Status',
      title: 'Trạng thái',
      width: 100,
      fixed: isWidthSM ? null : 'right',
      render: () => <TagStatus color='green' statusName='Đã duyệt' />,
    },
  ]

  return (
    <DataTable
      {...{
        columns,
        data,
        bordered: true,
        loading,
        pagination,
        title: 'Danh sách nạp tiền',
        scroll: isWidthMD ? { x: true } : { y: 700, x: 1200 },
        onChange: handlePagination,
        extraElement: (
          <ActionButton
            onClick={() => handleExportExcelRecharge()}
            icon='fas fa-file-export'
            title='Xuất'
            isButton
            isButtonClassName='bg-green !text-white'
          />
        ),
      }}
    />
  )
}
