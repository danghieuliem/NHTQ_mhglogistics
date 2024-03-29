import { Pagination, Space } from 'antd'
import Link from 'next/link'
import { FC } from 'react'
import { ActionButton, DataTable } from '~/components'
import { useCatalogue } from '~/hooks/useCatalogue'
import { TColumnsType, TTable } from '~/types/table'
import { _format } from '~/utils'
import TagStatus from '../../status/TagStatus'
type TProps = {
  filter: {
    TotalItems: number
    PageIndex: number
    PageSize: number
  }
  handleFilter: (newFilter) => void
}
export const ArticleListTable: FC<TTable<TPage> & TProps> = ({
  data,
  loading,
  filter,
  handleFilter,
}) => {
  const { pageType } = useCatalogue({ pageTypeEnabled: true })

  const columns: TColumnsType<TPage> = [
    {
      dataIndex: 'Id',
      title: 'ID',
      width: 50,
      align: 'left',
      responsive: ['lg'],
    },
    {
      dataIndex: 'Title',
      title: 'Tiêu đề bài viết',
      width: 240,
    },
    {
      dataIndex: 'PageTypeId',
      title: 'Chuyên mục',
      width: 120,
      responsive: ['lg'],
      render: (_, record) => {
        const Categories = pageType?.find((x) => x?.Id === record?.PageTypeId)
        return <span className='font-bold'>{Categories?.Name}</span>
      },
    },
    {
      dataIndex: 'Code',
      title: 'Link bài viết',
      width: 300,
      responsive: ['lg'],
    },
    {
      dataIndex: 'Active',
      title: 'Trạng thái',
      responsive: ['md'],
      width: 100,
      render: (_, record) => (
        <TagStatus
          color={!record.Active ? 'red' : 'green'}
          statusName={!record.Active ? 'Ẩn' : 'Hiện'}
        />
      ),
    },
    {
      dataIndex: 'SideBar',
      title: 'Sibebar',
      width: 100,
      responsive: ['md'],
      render: (_, record) => (
        <TagStatus
          color={!record.SideBar ? 'red' : 'green'}
          statusName={!record.SideBar ? 'Ẩn' : 'Hiện'}
        />
      ),
    },
    {
      dataIndex: 'Created',
      title: 'Ngày tạo',
      width: 200,
      responsive: ['md'],
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: 'action',
      title: 'Thao tác',
      width: 140,
      render: (_, record) => (
        <Space>
          <Link href={`/manager/article/article-list/detail/?id=${record.Id}`}>
            <a target='_blank'>
              <ActionButton icon='fad fa-edit' title='Cập nhật' isButton />
            </a>
          </Link>
        </Space>
      ),
    },
  ]

  return (
    <>
      <DataTable
        {...{
          columns,
          data,
          loading,
          pagination: {
            current: filter.PageIndex,
            total: filter.TotalItems,
            pageSize: filter.PageSize,
          },
          onChange: (page, pageSize) => {
            handleFilter({
              ...filter,
              PageIndex: page.current,
              PageSize: page.pageSize,
            })
          },
        }}
      />
    </>
  )
}
