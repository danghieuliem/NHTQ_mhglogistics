import { Modal } from 'antd'
import { FC } from 'react'
import { toast } from 'react-toastify'
import { feeVolume } from '~/api'
import { ActionButton, DataTable } from '~/components'
import { TColumnsType, TTable } from '~/types/table'
import { _format } from '~/utils'
import TagStatus from '../../status/TagStatus'
type TProps = {
  refetch: () => void
  handleUpdate: () => void
  handleGetID: (id: number) => void
  filter: {
    TotalItems: number
    PageIndex: number
    PageSize: number
  }
  handleFilter: (newFiter) => void
}

export const VolumeFeeTable: FC<TTable<TVolumeFee | any> & TProps> = ({
  data,
  loading,
  refetch,
  handleUpdate,
  handleGetID,
}) => {
  const columns: TColumnsType<TVolumeFee> = [
    {
      dataIndex: 'Id',
      title: 'Thứ tự',
      width: 80,
      align: 'center',
      responsive: ['lg'],
    },
    {
      dataIndex: 'HelpMovingName',
      title: 'Loại đơn',
      render: (_, record) => {
        return (
          <TagStatus
            color={record.IsHelpMoving ? '#097aeb' : '#b31717'}
            statusName={record.HelpMovingName}
          />
        )
      },
      sorter: (a, b) => +a?.IsHelpMoving - +b?.IsHelpMoving,
      width: 140,
    },
    {
      dataIndex: 'WareHouseFromName',
      title: 'Từ kho',
      responsive: ['md'],
    },
    {
      dataIndex: 'WareHouseToName',
      title: 'Đến kho',
      responsive: ['md'],
    },
    {
      dataIndex: 'VolumeFrom',
      title: (
        <>
          Thể tích từ
          <br />
          (m3)
        </>
      ),
      align: 'right',
      responsive: ['md'],
      render: (_, record) => _format.getVND(record?.VolumeFrom, ''),
    },
    {
      dataIndex: 'VolumeTo',
      title: (
        <>
          Thể tích đến
          <br />
          (m3)
        </>
      ),
      align: 'right',
      responsive: ['md'],
      render: (_, record) => _format.getVND(record?.VolumeTo, ''),
    },
    {
      dataIndex: 'Price',
      title: (
        <>
          Giá
          <br />
          (VNĐ)
        </>
      ),
      align: 'right',
      responsive: ['md'],
      render: (_, record) => _format.getVND(record?.Price, ''),
    },
    {
      dataIndex: 'ShippingTypeToWareHouseName',
      title: (
        <>
          Hình thức
          <br />
          vận chuyển
        </>
      ),
      responsive: ['md'],
    },
    {
      dataIndex: 'action',
      title: 'Thao tác',
      align: 'right',
      render: (_, record) => {
        return (
          <>
            <ActionButton
              onClick={() => {
                handleGetID(record?.Id)
                handleUpdate()
              }}
              icon='fas fa-edit'
              title='Cập nhật'
            />

            <ActionButton
              onClick={() =>
                Modal.confirm({
                  title: 'Xác nhận xóa cấu hình này?',
                  onOk: () => {
                    feeVolume.delete(record.Id)
                    toast.success('Xóa thành công!')
                    refetch()
                  },
                })
              }
              icon='fas fa-trash'
              title='Xóa'
            />
          </>
        )
      },
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
          scroll: { y: 700 },
        }}
      />
    </>
  )
}
