import moment from 'moment'
import { FC, useRef } from 'react'
import { toast } from 'react-toastify'
import { getAllNewNotify } from '~/api'
import { ActionButton, FilterRangeDate, IconButton } from '~/components'

type TProps = {
  handleFilter: (newFilter) => void
  isFetching?: boolean
  onMarkRead?: () => void
  isShowMarkRead?: boolean
}

export const NotificationFilter: FC<TProps> = ({
  handleFilter,
  isFetching,
  onMarkRead,
  isShowMarkRead = false,
}) => {
  const FromDate = useRef<string>(null)
  const ToDate = useRef<string>(null)

  async function handleTransformDate(isToday: boolean = false) {
    if (!handleFilter) return
    if (!isToday) {
      handleFilter({
        FromDate: FromDate.current,
        ToDate: ToDate.current,
      })
      return
    }

    const now = moment().format('YYYY-MM-DD')
    handleFilter({
      FromDate: now,
      ToDate: now,
    })
  }

  return (
    <div className='w-full items-end xl:flex'>
      <div className='mr-4 mb-4 xs:w-max xl:mb-0'>
        <FilterRangeDate
          disabled={isFetching}
          format='DD/MM/YYYY'
          placeholder='Từ ngày / đến ngày'
          handleDate={(val: string[]) => {
            FromDate.current = val[0]
            ToDate.current = val[1]
          }}
        />
      </div>
      <div className='flex items-center justify-between gap-2'>
        <div>
          <IconButton
            icon='fas fa-search'
            title='Lọc'
            onClick={handleTransformDate}
            showLoading
            toolip=''
            disabled={isFetching}
          />
        </div>
        {isShowMarkRead && (
          <ActionButton
            title='Đánh dấu đã đọc'
            icon='!mr-0'
            isButton
            isButtonClassName='h-fit bg-blue !text-white'
            onClick={onMarkRead}
          />
        )}
      </div>
    </div>
  )
}

export default NotificationFilter
