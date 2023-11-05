import { Space } from 'antd'
import { ActionButton, DataTable } from '~/components'
import { orderStatus } from '~/configs'
import { TColumnsType } from '~/types/table'
import { _format } from '~/utils'
import TagStatus from '../../status/TagStatus'
import Link from 'next/link'

export const UserOrder = ({ data, isFetching }) => {
  const columns: TColumnsType<TNewOrders> = [
    {
      title: 'ID',
      dataIndex: 'Id',
      responsive: ['md'],
      render: (_) => {
        return (
          <Link href={`/user/order-list/detail/?id=${_}`} passHref>
            <a target='_blank' rel='noopener noreferrer'>
              {_}
            </a>
          </Link>
        )
      },
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'Created',
      responsive: ['md'],
      render: (record) => _format.getVNDate(record),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'TotalOrderAmount',
      align: 'right',
      render: (record) => _format.getVND(record, ''),
    },
    {
      title: 'Số tiền phải cọc',
      dataIndex: 'AmountDeposit',
      responsive: ['lg'],
      align: 'right',
      className: '',
      render: (record) => _format.getVND(record, ''),
    },
    {
      title: 'Số tiền đã cọc',
      dataIndex: 'Deposit',
      responsive: ['lg'],
      align: 'right',
      render: (record) => _format.getVND(record, ''),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'Status',
      render: (status) => {
        const color = orderStatus.find((x) => x.id === status)
        return <TagStatus color={color?.color} statusName={color?.name} />
      },
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      align: 'right',
      // width: 140,
      responsive: ['lg'],
      render: (_, record) => (
        <Space>
          <Link href={`/user/order-list/detail/?id=${record?.Id}`} passHref>
            <a target='_blank' rel='noopener noreferrer'>
              <ActionButton
                icon='fas fa-info-square'
                title='Chi tiết'
                isButton={true}
              />
            </a>
          </Link>
        </Space>
      ),
    },
  ]

  return (
    <DataTable
      {...{
        columns,
        data: data?.Items,
        bordered: true,
        loading: isFetching,
        title: 'Đơn hàng mua hộ',
        bgHeaderType: 'orderTable',
      }}
    />
  )
}
