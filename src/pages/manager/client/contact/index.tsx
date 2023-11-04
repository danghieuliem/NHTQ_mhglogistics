import { useState } from 'react'
import { useQuery } from 'react-query'
import { ContactUs } from '~/api/contact-us'
import { DataTable, IconButton, Layout, toast } from '~/components'
import TagStatus from '~/components/screens/status/TagStatus'
import { TNextPageWithLayout } from '~/types/layout'
import { TColumnsType } from '~/types/table'
import { _format } from '~/utils'

const Index: TNextPageWithLayout = () => {
  const [idContact, setIdContact] = useState([])
  const [dataContact, setDataContact] = useState([])

  const { refetch, isFetching, isLoading } = useQuery(
    ['contact-us'],
    () =>
      ContactUs.getList({
        PageIndex: 1,
        PageSize: 99999,
        OrderBy: 'Id desc',
      }).then((res) => setDataContact(res?.Data?.Items)),
    {
      refetchOnWindowFocus: true,
      staleTime: 5000,
    },
  )

  const handleContact = () => {
    ContactUs.update(idContact)
      .then((res) => {
        refetch()
        toast.success('Đã check liên hệ!')
      })
      .catch((error) => {
        toast.error('Đã xảy ra lỗi!')
      })
  }

  const columns: TColumnsType<any> = [
    {
      dataIndex: 'Id',
      title: 'STT',
      responsive: ['lg'],
      render: (_, __, index) => index + 1,
      width: 50,
    },
    {
      dataIndex: 'FullName',
      title: 'Họ tên',
    },
    {
      dataIndex: 'Email',
      title: 'Email',
      responsive: ['md'],
    },
    {
      dataIndex: 'Phone',
      title: 'Số điện thoại',
      responsive: ['sm'],
    },
    {
      dataIndex: 'Content',
      title: 'Khách ghi chú',
      responsive: ['lg'],
    },
    {
      dataIndex: 'Status',
      title: 'Trạng thái',
      sorter: (a, b) => a.Status - b.Status,
      render(value, record, index) {
        return (
          <TagStatus
            color={record?.Status ? 'green' : 'red'}
            statusName={record?.Status ? 'Đã liên hệ' : 'Chưa liên hệ'}
          />
        )
      },
    },
    {
      dataIndex: 'Created',
      title: 'Ngày khách liên hệ',
      responsive: ['lg'],
      render: (_, record) => {
        return <>{_format.getVNDate(record?.Created)}</>
      },
    },
  ]

  return (
    <>
      <IconButton
        onClick={() => handleContact()}
        title='Xác nhận đã liên hệ'
        icon='fas fa-user-check'
        btnClass='mb-4'
        btnIconClass='mr-3'
        disabled={idContact.length > 0 || isLoading ? false : true}
      />
      <DataTable
        {...{
          data: dataContact,
          columns,
          rowSelection: {
            type: 'checkbox',
            onChange: (val) => setIdContact(val),
            getCheckboxProps(record: any) {
              return {
                disabled: record?.Status,
              }
            },
          },
        }}
      />
    </>
  )
}

Index.displayName = 'Danh sách khách hàng liên hệ'
Index.breadcrumb = 'Danh sách khách hàng cần liên hệ'
Index.Layout = Layout

export default Index
