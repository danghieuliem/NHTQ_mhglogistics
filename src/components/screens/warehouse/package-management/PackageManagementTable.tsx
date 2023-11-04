import Link from 'next/link'
import router from 'next/router'
import React from 'react'
import { bigPackage } from '~/api'
import { ActionButton, DataTable, toast } from '~/components'
import { bigPackageStatus } from '~/configs'
import { TColumnsType, TTable } from '~/types/table'
import { _format } from '~/utils'
import TagStatus from '../../status/TagStatus'
import { useScreen } from '~/hooks'
type TProps = {
  filter
  handleFilter: (newFilter) => void
}
export const PackageManagementTable: React.FC<TTable<TPackage> & TProps> = ({
  data,
  loading,
  filter,
  handleFilter,
}) => {
  //Export data excel
  const _onExportExcel = async (Id: any) => {
    try {
      bigPackage.exportExcel({ Id }).then((res) => {
        router.push(`${res.Data}`)
      })
    } catch (error) {
      toast.error(error)
    }
  }

  const { isWidthSM } = useScreen()

  const columns: TColumnsType<TPackage> = [
    {
      dataIndex: 'Id',
      title: 'ID',
      width: 50,
      fixed: isWidthSM ? null : 'left',
      render: (value) => {
        return (
          <Link
            passHref
            href={`/manager/warehouse/package-management/detail/?id=${value}`}
          >
            <a target='_blank'>{value}</a>
          </Link>
        )
      },
    },
    {
      dataIndex: 'Created',
      title: 'Ngày tạo',
      width: 200,
      responsive: ['lg'],
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: 'Code',
      title: 'Mã bao hàng',
      width: 120,
      responsive: ['sm'],
    },
    {
      dataIndex: 'Total',
      title: 'Tổng kiện',
      align: 'right',
      width: 100,
      responsive: ['sm'],
    },
    {
      dataIndex: 'Weight',
      title: 'Cân nặng (Kg)',
      align: 'right',
      width: 100,
      responsive: ['sm'],
    },
    {
      dataIndex: 'Volume',
      title: 'Khối (m3)',
      align: 'right',
      width: 100,
      responsive: ['sm'],
    },
    {
      dataIndex: 'Status',
      title: 'Trạng thái',
      width: 180,
      render: (status) => {
        const color = bigPackageStatus.find((x) => x.id === status)
        return <TagStatus color={color?.color} statusName={color?.name} />
      },
    },
    {
      dataIndex: 'action',
      title: 'Thao tác',
      width: 100,
      fixed: 'right',
      responsive: ['sm'],
      render: (_, record) => (
        <div className='flex flex-wrap gap-2'>
          <Link
            passHref
            href={`/manager/warehouse/package-management/detail/?id=${record?.Id}`}
          >
            <a target='_blank'>
              <ActionButton
                icon='fas fa-info-square'
                title='Chi tiết'
                isButton
              />
            </a>
          </Link>

          <ActionButton
            onClick={() => {
              toast.info('Đang xử lý, vui lòng chờ ...')
              return _onExportExcel(record.Id)
            }}
            icon='fas fa-download'
            title='Xuất excel'
            isButton
          />
        </div>
      ),
    },
  ]

  return (
    <>
      <DataTable
        {...{
          loading: loading,
          columns,
          data,
          bordered: true,
          //
          scroll: isWidthSM ? { x: true } : { y: 700, x: 1200 },
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
