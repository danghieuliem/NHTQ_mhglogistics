import { ActionButton, DataTable } from '~/components'
import { TColumnsType } from '~/types/table'
import { _format } from '~/utils'
import TagStatus from '../../status/TagStatus'
import { useScreen } from '~/hooks'

export const StatisticalWithdrawTable = ({
  data,
  loading,
  handlePagination,
  pagination,
  handleExportExcelWithDraw,
}) => {
  const { isWidthSM, isWidthMD } = useScreen()
  const columns: TColumnsType<TStatisticalWithdrawList> = [
    {
      dataIndex: 'Id',
      title: 'ID',
      width: 70,
      responsive: ['lg'],
    },
    {
      dataIndex: 'CreatedBy',
      title: 'Người duyệt',
      responsive: ['sm'],
    },
    {
      dataIndex: 'UserName',
      title: 'Username',
    },
    {
      dataIndex: 'Amount',
      title: (
        <>
          Số tiền <br />
          (VNĐ)
        </>
      ),
      align: 'right',
      responsive: ['sm'],
      render: (money) => _format.getVND(money, ''),
    },
    {
      dataIndex: 'Created',
      title: 'Ngày tạo',
      width: 200,
      responsive: ['lg'],
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: 'Status',
      title: 'Trạng thái',
      fixed: isWidthSM ? null : 'right',
      width: 100,
      render: () => <TagStatus color='green' statusName='Thành công' />,
    },
  ]

  return (
    <DataTable
      {...{
        columns,
        data,
        bordered: true,
        loading,
        pagination,
        title: 'Danh sách rút tiền',
        onChange: handlePagination,
        scroll: isWidthMD ? { x: true } : { y: 700, x: 1200 },
        extraElement: (
          <ActionButton
            onClick={() => handleExportExcelWithDraw()}
            icon='fas fa-file-export'
            title='Xuất'
            isButton
            isButtonClassName='bg-green !text-white'
          />
        ),
      }}
    />
  )
}
