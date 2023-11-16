import { Switch } from 'antd'
import React, { Children, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { Page, menu } from '~/api'
import {
  AddChildContentFormMemo,
  DataTable,
  EditContentFormMemo,
  FormCard,
  Modal,
} from '~/components'
import { Modal as ModalAntd } from 'antd'
import { IconButton } from '~/components/globals/button/IconButton'
import { useScreen } from '~/hooks'
import { TColumnsType } from '~/types/table'

const EditChildContentForm: React.FC<{
  handleRemove: (val: number) => Promise<void>
  visible: boolean
  menuItem: any
  onCancel: () => void
  categogyList: TPageType[]
}> = ({ visible, menuItem, onCancel, categogyList, handleRemove }) => {
  const { data } = useQuery(
    [
      'Page',
      {
        PageIndex: 1,
        PageSize: 99999,
        OrderBy: 'PageTypeId',
        PageTypeId: menuItem?.PageTypeId,
      },
    ],
    () =>
      Page.getList({
        PageIndex: 1,
        PageSize: 99999,
        OrderBy: 'PageTypeId',
        PageTypeId: menuItem?.PageTypeId,
      }).then((res) => res?.Data),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        return data?.Items
      },
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage)
      },
      refetchOnWindowFocus: false,
      staleTime: 5000,
    },
  )

  const columns: TColumnsType<any> = [
    {
      dataIndex: 'Position',
      title: 'Vị trí',
    },
    {
      dataIndex: 'Name',
      title: 'Tên',
    },
    {
      dataIndex: 'Active',
      title: 'Trạng thái',
      align: 'center',
      render: (val) =>
        val ? (
          <span className='rounded-md bg-sec p-1.5 text-white'>Hiện</span>
        ) : (
          <span className='rounded-md bg-warning p-1.5 text-white'>Ẩn</span>
        ),
    },
    {
      dataIndex: 'PageTypeId',
      title: 'Chuyên mục',
      responsive: ['md'],
      render: (value) => categogyList.find((x) => x.Id === value)?.Name,
    },
    {
      dataIndex: 'PageId',
      title: 'Bài viết',
      responsive: ['md'],
      render: (value) => data?.Items.find((x) => x.Id === value)?.Title,
    },
    {
      dataIndex: 'Link',
      responsive: ['md'],
      title: 'Liên kiết',
    },
    {
      dataIndex: '',
      title: 'Thao tác',
      responsive: ['md'],
      render: (_, record) => (
        <div className='flex items-center justify-center gap-2'>
          <IconButton
            icon='fas fa-trash'
            btnIconClass='!mr-2'
            red
            title='xoá'
            showLoading
            toolip=''
            onClick={() => {
              ModalAntd.confirm({
                title: 'Bạn muốn xoá menu này?',
                onOk: () => {
                  handleRemove(record?.Id)
                },
              })
            }}
          />
          <IconButton
            onClick={() => setEdit(record)}
            icon='fas fa-edit'
            blue
            btnIconClass='!mr-2'
            title='Sửa'
            showLoading
            toolip=''
          />
        </div>
      ),
    },
  ]

  const [edit, setEdit] = useState(null)

  const { isWidthMD, isWidthSM } = useScreen()
  const [isShowCreateModal, setIsShowCreateModal] = useState<boolean>(false)

  return (
    <>
      <Modal visible={visible} width={1000}>
        <FormCard>
          <FormCard.Header onCancel={onCancel}>
            <div className='w-full'>
              <p>Sub menu</p>
            </div>
          </FormCard.Header>
          <FormCard.Body>
            {/* {console.log(menuItem)} */}
            <div className='text-right'>
              <IconButton
                icon='fas fa-plus'
                green
                onClick={() => setIsShowCreateModal(true)}
                btnIconClass='!mr-2'
                title='Thêm mới'
                showLoading
                toolip=''
              />
            </div>
            <DataTable
              columns={columns}
              isExpand={isWidthMD ? true : null}
              scroll={isWidthSM ? { x: 300 } : null}
              data={menuItem?.Children}
            />
          </FormCard.Body>
        </FormCard>
      </Modal>

      <AddChildContentFormMemo
        visible={isShowCreateModal}
        Parent={menuItem?.Id}
        categogyList={categogyList}
        onCancel={() => setIsShowCreateModal(false)}
      />

      <EditContentFormMemo
        edit={edit}
        onCancel={() => setEdit(null)}
        categogyList={categogyList}
      />
    </>
  )
}

export const EditChildContentFormMemo = React.memo(EditChildContentForm)
