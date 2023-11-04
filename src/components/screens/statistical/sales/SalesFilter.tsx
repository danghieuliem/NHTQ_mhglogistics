import React, { useRef } from 'react'
import { ActionButton, FilterRangeDate } from '~/components'

type TProps = {
  handleFilter: (fromDate: string, toDate: string) => void
  handleType: () => void
  type: 'sum' | 'detail'
  resetPagination: () => void
}

export const SalesFilter: React.FC<TProps> = ({
  handleFilter,
  type,
  handleType,
  resetPagination,
}) => {
  const fromDate = useRef<string>(null)
  const toDate = useRef<string>(null)

  return (
    <div className='mb-4 flex flex-col gap-2 lg:flex-row lg:items-end'>
      <FilterRangeDate
        format='DD/MM/YYYY'
        placeholder='Từ ngày/đến ngày'
        handleDate={(val: string[]) => {
          fromDate.current = val[0]
          toDate.current = val[1]
        }}
      />
      <ActionButton
        title='Thống kê theo ngày lọc'
        icon='fas fa-info-square'
        onClick={() => {
          handleFilter(fromDate.current, toDate.current)
          resetPagination()
        }}
        isButton
        isButtonClassName='bg-green !text-white'
      />
      <ActionButton
        onClick={handleType}
        icon='fas fa-info-square'
        title={type === 'detail' ? 'Xem biểu đồ tổng' : 'Xem biểu đồ chi tiết'}
        isButton
        isButtonClassName='bg-sec !text-white'
      />
    </div>
  )
}
