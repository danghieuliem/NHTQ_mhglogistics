import { DataTable } from '~/components/globals/table'
import { TColumnsType } from '~/types/table'
import { _format } from '~/utils'

export const SalesMoneyStatisticTable = ({ data }) => {
  const columns: TColumnsType<TStatisticalMoney> = [
    {
      title: 'STT',
      dataIndex: 'Name',
      render: (_, __, index) => index + 1,
      responsive: ['lg'],
    },
    {
      dataIndex: 'Name',
      title: 'Mục',
      render: (title) => <div className='font-medium text-[#000]'>{title}</div>,
    },
    {
      dataIndex: 'Total',
      title: 'Tổng tiền (VNĐ)',
      align: 'right',
      render: (money: number) => {
        return (
          money !== null && (
            <div className=''>
              <span>{_format.getVND(money, ' ')}</span>
            </div>
          )
        )
      },
    },
  ]

  return (
    <DataTable
      {...{
        columns,
        data,
        // bordered: true,
        rowKey: 'Name',
      }}
    />
  )
}
