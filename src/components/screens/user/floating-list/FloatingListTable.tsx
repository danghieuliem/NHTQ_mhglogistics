import { Space, Tag, Tooltip } from 'antd'
import React, { useRef, useState } from 'react'
import { ActionButton, DataTable, FloatingListForm } from '~/components'
import {
  smallPackageStatusConfirm,
  smallPackageStatusData,
} from '~/configs/appConfigs'
import { TColumnsType, TTable } from '~/types/table'
import { _format } from '~/utils'

export const FloatingListTable: React.FC<TTable<TSmallPackage>> = ({
  data,
  loading,
  pagination,
}) => {
  const columns: TColumnsType<TSmallPackage> = [
    {
      dataIndex: 'Id',
      align: 'center',
      title: 'ID',
    },
    {
      dataIndex: 'OrderTransactionCode',
      align: 'center',
      title: 'Mã vận đơn',
    },
    {
      dataIndex: 'Status',
      align: 'center',
      title: 'Trạng thái',
      render: (status, record) => (
        <Tag
          color={
            smallPackageStatusData.find((x) => x.id === record?.Status)?.color
          }
        >
          {record.StatusName}
        </Tag>
      ),

      responsive: ['sm'],
    },
    {
      dataIndex: 'FloatingUserName',
      align: 'center',
      title: 'Người nhận',
      responsive: ['md'],
    },
    {
      dataIndex: 'FloatingStatus',
      align: 'center',
      title: 'Trạng thái xác nhận',
      render: (status, record) => (
        <Tag
          color={
            smallPackageStatusConfirm.find(
              (x) => x.id === record?.FloatingStatus,
            )?.color
          }
        >
          {record.FloatingStatusName == ''
            ? 'Chưa xác nhận'
            : record.FloatingStatusName}
        </Tag>
      ),
      responsive: ['lg'],
    },
    {
      dataIndex: 'Created',
      align: 'center',
      title: 'Ngày tạo',
      render: (date) => _format.getShortVNDate(date),
      responsive: ['xl'],
    },
    {
      dataIndex: 'action',
      align: 'center',
      title: 'Thao tác',
      render: (_, record) => (
        <Space>
          <Tooltip title='Xác nhận'>
            <ActionButton
              onClick={() => handleModal(record)}
              icon='fas fa-box-check'
              title='Xác nhận'
              btnYellow
            />
          </Tooltip>
        </Space>
      ),
      responsive: ['xl'],
    },
  ]

  const item = useRef<TSmallPackage>()
  const [modal, setModal] = useState(false)
  const handleModal = (itemSelected: TSmallPackage) => {
    item.current = itemSelected
    setModal(true)
  }

  return (
    <>
      <div className=''>
        <DataTable
          {...{
            columns,
            data,
            loading,
            pagination,
          }}
        />
      </div>
      <div className=''>
        <FloatingListForm
          defaultValues={item?.current}
          visible={modal}
          onCancel={() => setModal(false)}
        />
      </div>
    </>
  )
}
