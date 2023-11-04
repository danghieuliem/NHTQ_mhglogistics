import { FC } from 'react'
import { ActionButton, DataTable } from '~/components'
import { TColumnsType, TTable } from '~/types/table'
import { _format } from '~/utils'

export const TariffPriceChangeTable: FC<TTable<TTariffPriceChange>> = ({
  handleModal,
  data,
  loading,
}) => {
  const columns: TColumnsType<TTariffPriceChange> = [
    {
      dataIndex: 'Id',
      title: 'ID',
      align: 'center',
    },
    {
      dataIndex: 'PriceFromCNY',
      title: (
        <>
          Giá tệ từ
          <br />
          (¥)
        </>
      ),
      align: 'right',
      render: (priceFromCNY) => _format.getYuan(priceFromCNY, ''),
    },
    {
      dataIndex: 'PriceToCNY',
      title: (
        <>
          Giá tệ đến
          <br />
          (¥)
        </>
      ),
      align: 'right',
      render: (PriceToCNY) => _format.getYuan(PriceToCNY, ''),
    },
    {
      dataIndex: 'Vip0',
      title: 'Vip 0',
      align: 'center',
      responsive: ['sm'],
    },
    {
      dataIndex: 'Vip1',
      title: 'Vip 1',
      align: 'center',
      responsive: ['sm'],
    },
    {
      dataIndex: 'Vip2',
      title: 'VIP 2',
      align: 'center',
      responsive: ['md'],
    },
    {
      dataIndex: 'Vip3',
      title: 'Vip 3',
      align: 'center',
      responsive: ['md'],
    },
    {
      dataIndex: 'Vip4',
      title: 'Vip 4',
      align: 'center',
      responsive: ['md'],
    },
    {
      dataIndex: 'Vip5',
      title: 'Vip 5',
      align: 'center',
      responsive: ['lg'],
    },
    {
      dataIndex: 'Vip6',
      title: 'Vip 6',
      align: 'center',
      responsive: ['lg'],
    },
    {
      dataIndex: 'Vip7',
      title: 'Vip 7',
      align: 'center',
      responsive: ['lg'],
    },
    {
      dataIndex: 'Vip8',
      title: 'Vip 8',
      align: 'center',
      responsive: ['lg'],
    },
    {
      dataIndex: 'action',
      key: 'action',
      title: 'Thao tác',
      align: 'right',
      render: (_, record) => (
        <ActionButton
          onClick={() => handleModal(record)}
          icon='fas fa-edit'
          title='Cập nhật'
        />
      ),
    },
  ]

  return (
    <DataTable
      {...{
        isExpand: false,
        loading,
        columns,
        data,
        bordered: true,
      }}
    />
  )
}
