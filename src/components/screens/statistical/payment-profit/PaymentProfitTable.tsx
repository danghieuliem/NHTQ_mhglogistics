import React, { FC } from 'react'
import { DataTable } from '~/components'
import { useScreen } from '~/hooks'
import { TColumnsType, TTable } from '~/types/table'
import { _format } from '~/utils'

const PaymentProfitTable: FC<
  TTable<TStatisticalPaymentProfit> & { filter; handleFilter }
> = ({ data, filter, handleFilter }) => {
  const { isWidthMD } = useScreen()

  const columns: TColumnsType<TStatisticalPaymentProfit> = [
    {
      dataIndex: 'Id',
      title: 'ID',
      width: 50,
      align: 'right',
      fixed: 'left',
      responsive: ['lg'],
    },
    {
      dataIndex: 'Created',
      title: 'Ngày đặt',
      render: (date) => _format.getVNDate(date),
      width: 120,
      fixed: 'left',
      responsive: ['lg'],
    },
    {
      dataIndex: 'UserName',
      title: 'Username',
      fixed: !isWidthMD ? 'left' : null,
      width: 100,
    },
    {
      dataIndex: 'TotalPrice',
      title: (
        <>
          Số tiền
          <br />
          (¥)
        </>
      ),
      align: 'right',
      width: 120,
      responsive: ['md'],
      render: (money) => _format.getYuan(money, ''),
    },
    {
      dataIndex: 'TotalPriceVNDGiaGoc',
      title: (
        <>
          Tiền gốc <br />
          (VNĐ)
        </>
      ),
      align: 'right',
      responsive: ['sm'],
      render: (money) => _format.getVND(money, ''),
      width: 120,
    },
    {
      dataIndex: 'TotalPriceVND',
      title: (
        <>
          Tiền thu <br />
          (VNĐ)
        </>
      ),
      align: 'right',
      responsive: ['sm'],
      render: (money) => _format.getVND(money, ''),
      width: 120,
    },
    {
      dataIndex: 'Profit',
      title: (
        <>
          Lợi nhuận <br />
          (VNĐ)
        </>
      ),
      align: 'right',
      render: (money) => _format.getVND(money, ''),
      width: 120,
    },
  ]

  return (
    <DataTable
      {...{
        columns,
        data,
        bordered: true,
        scroll: isWidthMD ? { x: true } : { y: 700, x: 1200 },
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
  )
}

export { PaymentProfitTable }
