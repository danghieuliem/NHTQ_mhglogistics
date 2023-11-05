import React from 'react'
import { DataTable } from '~/components'
import { TColumnsType, TTable } from '~/types/table'
import { _format } from '~/utils'

export const HistoryTransactionVNDTable: React.FC<
  TTable<TUserHistoryTransactionVND> & { filter; handleFilter }
> = ({ data, filter, handleFilter, loading }) => {
  const columns: TColumnsType<TUserHistoryTransactionVND> = [
    {
      dataIndex: 'Id',
      title: 'ID giao dịch',
      width: 90,
      responsive: ['sm'],
    },
    {
      dataIndex: 'Created',
      title: 'Ngày giờ',
      render: (date) => <>{_format.getVNDate(date)}</>,
      responsive: ['lg'],
    },
    {
      dataIndex: 'Content',
      title: 'Nội dung',
      responsive: ['md'],
    },
    {
      dataIndex: 'TradeTypeName',
      title: 'Loại giao dịch',
    },
    {
      dataIndex: 'Amount',
      title: (
        <>
          Số tiền <br />
          (VNĐ)
        </>
      ),
      align: 'right',
      render: (_, record) => {
        return (
          <>{`${record?.Amount > 0 ? (record?.Type === 1 ? '-' : '+') : ''} ${
            record?.Amount && _format.getVND(record?.Amount, '')
          }`}</>
        )
      },
    },
    {
      dataIndex: 'MoneyLeft',
      responsive: ['lg'],
      title: (
        <>
          Số dư <br />
          (VNĐ)
        </>
      ),
      align: 'right',
      render: (money) => _format.getVND(money, ''),
    },
  ]

  return (
    <>
      <DataTable
        {...{
          columns,
          data,
          loading,
          bordered: true,

          scroll: { y: 620 },
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
