import { Popover } from 'antd'
import { FC, useRef } from 'react'
import { FilterRangeDate, FilterSelect } from '~/components'
import { IconButton } from '~/components/globals/button/IconButton'
import { categoryPaymentData } from '~/configs/appConfigs'

type TProps = {
  handleFilter: (newFilter) => void
  handleExportExcel: () => void
}

export const ClientTransactionHistoryFilter: FC<TProps> = ({
  handleFilter,
  handleExportExcel,
}) => {
  const fromDate = useRef<string>(null)
  const toDate = useRef<string>(null)
  const transactionId = useRef<number>(null)

  return (
    <div>
      <Popover
        trigger={'click'}
        placement='bottomRight'
        content={
          <div className='grid grid-cols-1 gap-2 p-2'>
            <div className='col-span-1'>
              <FilterRangeDate
                handleDate={(val: string[]) => {
                  fromDate.current = val[0]
                  toDate.current = val[1]
                }}
                placeholder='Từ ngày / đến ngày'
                format='DD/MM/YYYY'
              />
            </div>
            <div className='col-span-1'>
              <FilterSelect
                data={categoryPaymentData}
                placeholder='Chọn loại giao dịch'
                label='Loại giao dịch'
                handleSearch={(val: number) => (transactionId.current = val)}
              />
            </div>
            <div>
              <IconButton
                onClick={() =>
                  handleFilter({
                    fromDate: fromDate.current,
                    toDate: toDate.current,
                    status: transactionId.current,
                  })
                }
                icon='fas fa-filter'
                title='Lọc'
                showLoading
                toolip='Lọc'
              />
            </div>
          </div>
        }
      >
        <IconButton icon='fas fa-filter' title='Bộ lọc' btnClass='mr-2' />
      </Popover>

      <IconButton
        onClick={handleExportExcel}
        icon='fas fa-file-export'
        title='Xuất'
        showLoading
        toolip='Xuất Thống Kê'
      />
    </div>
  )
}
