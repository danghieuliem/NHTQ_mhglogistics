import { Space } from 'antd'
import React from 'react'
import { ActionButton, DataTable } from '~/components'
import { smallPackageStatus } from '~/configs'
import { TColumnsType, TTable } from '~/types/table'
import { _format } from '~/utils'
import TagStatus from '../../status/TagStatus'
import { useScreen } from '~/hooks'
type TProps = {
  filter
  handleFilter: (newFilter) => void
  refetch: () => void
  handleAssign
}
export const FloatingPackageTable: React.FC<TTable<TSmallPackage> & TProps> = ({
  data,
  loading,
  filter,
  handleFilter,
  refetch,
  handleAssign,
}) => {
  const { isWidthMD, isWidthSM } = useScreen()
  const columns: TColumnsType<TSmallPackage> = [
    {
      dataIndex: 'Id',
      title: 'ID',
      responsive: ['lg'],
    },
    {
      dataIndex: 'Code',
      title: 'Bao hàng',
      responsive: ['lg'],
    },
    {
      dataIndex: 'OrderTransactionCode',
      title: 'Mã vận đơn',
    },
    // {
    // 	dataIndex: "MainOrderCode",
    // 	title: "Mã đơn hàng",
    // 	responsive: ["md"],
    // },
    // {
    //   dataIndex: "ProductType",
    //   title: "Loại hàng",
    //   responsive: ["xl"],
    // },
    // {
    //   dataIndex: "FeeShip",
    //   title: "Phí ship tệ",
    //   align: "right",
    // },
    {
      dataIndex: 'Weight',
      title: 'Cân kg',
      align: 'right',
      responsive: ['sm'],
    },
    {
      dataIndex: 'VolumePayment',
      title: 'Khối m3',
      align: 'right',
      responsive: ['sm'],
    },
    {
      dataIndex: 'Status',
      title: 'Trạng thái kiện',
      render: (status, record) => (
        <TagStatus
          color={smallPackageStatus.find((x) => x.id === record.Status)?.color}
          statusName={
            smallPackageStatus.find((x) => x.id === record.Status)?.name
          }
        />
      ),
    },
    // {
    //   dataIndex: "FloatingUserName",
    //   title: "Người nhận hàng",
    //   responsive: ["xl"],
    // },
    {
      dataIndex: 'Created',
      title: 'Ngày tạo',
      render: (date) => date && _format.getVNDate(date),
      responsive: ['lg'],
      width: 200,
    },
    {
      dataIndex: 'action',
      align: 'right',
      width: 190,
      fixed: isWidthSM ? null : 'right',
      title: 'Gán kiện',
      responsive: ['md'],
      render: (_, record) => (
        <Space>
          {/* <ActionButton
						onClick={() => handleModalUpdate(record)}
						onClick={() => alert("update")}
						icon="fas fa-edit"
						title="Cập nhật"
					/> */}
          <ActionButton
            icon='fas fa-plus-circle'
            onClick={() => handleAssign(record, 'assign1')}
            title='Mua hộ'
            isButton
            isButtonClassName='bg-blue !text-white'
          />
          <ActionButton
            icon='fas fa-plus-circle'
            onClick={() => handleAssign(record, 'assign2')}
            title='Ký gửi'
            isButton
            isButtonClassName='bg-green !text-white'
          />
        </Space>
      ),
    },
  ]

  return (
    <>
      <div>
        <DataTable
          {...{
            columns,
            data,
            loading,
            bordered: true,
            scroll: isWidthMD ? { x: true } : { y: 700, x: 700 },
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
      </div>
    </>
  )
}
