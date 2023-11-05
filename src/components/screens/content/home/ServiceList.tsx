import React, { useRef, useState } from 'react'
import { ActionButton, DataTable } from '~/components'
import { TColumnsType, TTable } from '~/types/table'
import TagStatus from '../../status/TagStatus'
import { ServiceForm } from './ServiceForm'
import { Image } from 'antd'

export const ServiceList: React.FC<TTable<TService> & { refetchService }> = ({
  data,
  refetchService,
}) => {
  const columns: TColumnsType<TService> = [
    {
      dataIndex: 'Id',
      title: 'Vị trí',
      render: (_, __, index) => ++index,
      width: 60,
      align: 'right',
    },
    {
      dataIndex: 'IMG',
      align: 'center',
      title: 'Hình ảnh',
      width: 80,
      render: (_, record) => (
        <Image
          src={record?.IMG ? record.IMG : '/default/pro-empty.jpg'}
          className='!h-[30px] !w-[30px]'
        />
      ),
    },
    {
      dataIndex: 'Name',
      title: 'Tên dịch vụ',
      width: 280,
    },
    {
      dataIndex: 'Active',
      width: 100,
      title: 'Trạng thái',
      render: (_, record) => (
        <TagStatus
          color={record?.Active ? 'green' : 'red'}
          statusName={record?.Active ? 'Hiện' : 'Ẩn'}
        />
      ),
    },
    // {
    //   dataIndex: "Created",
    //   title: "Ngày tạo",
    //   render: (date) => _format.getVNDate(date),
    // },
    {
      dataIndex: 'action',
      align: 'right',
      title: 'Thao tác',
      width: 100,
      render: (_, record) => (
        <ActionButton
          icon='fas fa-edit text-sec'
          onClick={() => handleModal(record)}
          title='Cập nhật'
          isButton
        />
      ),
    },
  ]

  const item = useRef<TService>()
  const [modal, setModal] = useState(false)
  const handleModal = (itemSelected: TService) => {
    item.current = itemSelected
    setModal(true)
  }

  return (
    <React.Fragment>
      <DataTable
        {...{
          columns,
          data,
          isExpand: false,
          title: 'Danh sách dịch vụ',
        }}
      />
      <ServiceForm
        {...{
          onCancel: () => setModal(false),
          visible: modal,
          defaultValues: item.current,
          refetchService: refetchService,
        }}
      />
    </React.Fragment>
  )
}
