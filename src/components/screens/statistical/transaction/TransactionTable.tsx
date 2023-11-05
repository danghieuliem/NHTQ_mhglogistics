import { FC } from 'react'
import { DataTable } from '~/components'
import { useScreen } from '~/hooks'
import { TColumnsType, TTable } from '~/types/table'
import { _format } from '~/utils'

const TransactionTable: FC<
  TTable<TStatisticalTransaction> & { filter; handleFilter }
> = ({ data, loading, filter, handleFilter }) => {
  const { isWidthMD } = useScreen()

  const columns: TColumnsType<TStatisticalTransaction> = [
    {
      dataIndex: 'Id',
      title: 'STT',
      responsive: ['lg'],
      render: (_, __, index) => <>{++index}</>,
      width: 50,
    },
    {
      dataIndex: 'Content',
      key: 'Content',
      title: 'Nội dung',
      responsive: ['lg'],
      width: 300,
    },
    {
      dataIndex: 'TradeTypeName',
      key: 'TradeTypeName',
      title: 'Loại giao dịch',
      sorter: (a, b) => a?.TradeType - b?.TradeType,
      render: (record) => <>{record}</>,
      width: 140,
    },
    {
      dataIndex: 'Amount',
      key: 'Amount',
      title: (
        <>
          Số tiền
          <br />
          (VNĐ)
        </>
      ),
      align: 'right',
      render: (money) => _format.getVND(money, ''),
      width: 160,
    },
    {
      dataIndex: 'MoneyLeft',
      key: 'MoneyLeft',
      title: (
        <>
          Số dư
          <br />
          (VNĐ)
        </>
      ),
      align: 'right',
      responsive: ['sm'],
      render: (money) => _format.getVND(money, ''),
      width: 160,
    },
    {
      dataIndex: 'Created',
      key: 'Created',
      title: 'Ngày giờ',
      responsive: ['lg'],
      render: (date) => _format.getVNDate(date),
      width: 140,
    },
  ]

  return (
    <DataTable
      {...{
        columns,
        data,
        bordered: true,
        loading,
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

export { TransactionTable }
