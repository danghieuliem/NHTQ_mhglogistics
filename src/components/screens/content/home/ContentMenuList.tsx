import { Modal, Popconfirm, Popover, Space, Tooltip } from 'antd'
import React, { useCallback, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { menu, pageType } from '~/api'
import {
  ActionButton,
  AddChildContentFormMemo,
  AddNewContentFormMemo,
  DataTable,
  EditContentFormMemo,
  toast,
} from '~/components'
import { IconButton } from '~/components/globals/button/IconButton'
import { TColumnsType, TTable } from '~/types/table'
import TagStatus from '../../status/TagStatus'

export const ContentMenuList: React.FC<TTable<any>> = ({ data }) => {
  const [addNewModal, setAddNewModal] = useState(false)
  const [edit, setEdit] = useState(0)
  const [child, setChild] = useState(0)

  const queryClient = useQueryClient()
  const mutationDelete = useMutation((id: any) => menu.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('menuData')
      toast.success('Xoá thành công')
    },
    onError: toast.error,
  })

  const _onRemove = async (id: any) => {
    try {
      await mutationDelete.mutateAsync(id)
    } catch (error) {}
  }

  const columns: TColumnsType<any> = [
    {
      dataIndex: 'Position',
      title: 'Vị trí',
      render: (_, __, index) => ++index,
      width: 60,
    },
    {
      dataIndex: 'Name',
      title: 'Tên menu',
      width: 100,
    },
    {
      dataIndex: 'Active',
      title: 'Trạng thái',
      render: (_, record) => (
        <TagStatus
          color={record?.Active ? 'green' : 'red'}
          statusName={record?.Active ? 'Hiện' : 'Ẩn'}
        />
      ),
      width: 100,
    },
    {
      dataIndex: 'action',
      title: 'Thao tác',
      render: (_, record) => (
        <Popover
          trigger={'hover'}
          placement='right'
          content={
            <div className='grid grid-cols-1 gap-2 p-2'>
              <ActionButton
                icon='fas fa-edit'
                onClick={() => setEdit(record?.Id)}
                title='Chỉnh sửa'
                isButton
                isButtonClassName='bg-blue !text-white'
              />
              <ActionButton
                icon='fas fa-plus-circle'
                onClick={() => setChild(record?.Id)}
                title='Thêm menu con'
                isButtonClassName='bg-green !text-white'
                isButton
              />
              <ActionButton
                icon='fas fa-trash-alt'
                title='Xoá menu'
                isButton
                isButtonClassName='bg-red !text-white'
                onClick={() =>
                  Modal.confirm({
                    title: 'Bạn muốn xoá menu này?',
                    onOk: () => _onRemove(record?.Id),
                  })
                }
              />
            </div>
          }
        >
          <ActionButton title='Thao tác' icon='!mr-0' isButton />
        </Popover>
      ),
      width: 120,
    },
  ]

  const { data: categogyList, isFetching } = useQuery(
    [
      'pageType',
      {
        PageIndex: 1,
        PageSize: 1000,
        OrderBy: 'Id desc',
      },
    ],
    () =>
      pageType
        .getList({
          PageIndex: 1,
          PageSize: 1000,
          OrderBy: 'Id desc',
        })
        .then((res) => {
          return res?.Data
        }),
    {
      onSuccess: (data) => data?.Items,
      onError: toast.error,
    },
  )

  const handleCloseEditModal = useCallback(() => setEdit(0), [])

  return (
    <React.Fragment>
      <DataTable
        {...{
          data: data,
          columns,
          title: 'Danh sách menu',
          scroll: { x: 100, y: 400 },
          isExpand: false,
          extraElement: (
            <IconButton
              onClick={() => setAddNewModal(true)}
              title='Thêm'
              icon='fas fa-plus-circle'
              showLoading
              toolip='Thêm menu'
              btnClass='!bg-green mt-[-10px]'
            />
          ),
        }}
      />
      <AddNewContentFormMemo
        visible={addNewModal}
        onCancel={() => setAddNewModal(false)}
        categogyList={categogyList?.Items}
      />
      <EditContentFormMemo
        edit={data?.find((x) => x.Id === edit) || edit}
        onCancel={handleCloseEditModal}
        categogyList={categogyList?.Items}
      />
      <AddChildContentFormMemo
        child={child}
        categogyList={categogyList?.Items}
        onCancel={() => setChild(0)}
      />
    </React.Fragment>
  )
}
