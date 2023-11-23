import { Popover } from 'antd'
import React, { useRef } from 'react'
import {
  ActionButton,
  FilterInput,
  FilterRangeDate,
  FilterSelect,
} from '~/components'
import { IconButton } from '~/components/globals/button/IconButton'
import { outstockStatusData, searchData } from '~/configs/appConfigs'

const transportCodeProps = {
  placeholder: 'Nhập mã vận đơn',
  label: 'Mã vận đơn',
  id: 'transportCode',
  name: 'transportCode',
}

const usernameProps = {
  placeholder: 'Nhập username',
  label: 'Username',
  id: 'UserName',
  name: 'UserName',
}

type TProps = {
  handleFilter: (newFilter) => void
}

export const OutStockPaymentFilter: React.FC<TProps> = ({ handleFilter }) => {
  const OrderTransactionCode = useRef<string>(null)
  const SearchContent = useRef<string>(null)
  const Status = useRef<number>(null)
  const FromDate = useRef<string>(null)
  const ToDate = useRef<string>(null)

  return (
    <div className='flex items-end gap-2'>
      <Popover
        trigger={'click'}
        placement='bottomLeft'
        content={
          <div className='grid grid-cols-1 gap-2 p-2'>
            <FilterInput
              {...transportCodeProps}
              handleSearch={(val: string) =>
                (OrderTransactionCode.current = val.trim())
              }
            />

            <FilterInput
              {...usernameProps}
              handleSearch={(val: string) =>
                (SearchContent.current = val.trim())
              }
            />

            <FilterRangeDate
              format='DD/MM/YYYY'
              placeholder='Từ ngày/đến ngày'
              handleDate={(val: string[]) => {
                FromDate.current = val[0]
                ToDate.current = val[1]
              }}
            />

            <div className='col-span-full ml-auto'>
              <IconButton
                onClick={() =>
                  handleFilter({
                    OrderTransactionCode: OrderTransactionCode.current,
                    SearchContent: SearchContent.current,
                    Status: Status.current,
                    FromDate: FromDate.current,
                    ToDate: ToDate.current,
                    PageIndex: 1,
                  })
                }
                icon='mr-0'
                title='Tìm kiếm'
                showLoading
                toolip='Lọc'
              />
            </div>
          </div>
        }
      >
        <ActionButton
          icon='fas fa-filter'
          title='Lọc'
          isButton
          isButtonClassName='bg-main !text-white'
        />
      </Popover>
      <div className='w-[200px]'>
        <FilterSelect
          data={outstockStatusData}
          placeholder='Chọn trạng thái'
          label='Trạng thái'
          handleSearch={(val: number) => {
            handleFilter({
              SearchContent: SearchContent.current,
              Status: val,
              FromDate: FromDate.current,
              ToDate: ToDate.current,
              PageIndex: 1,
            })
          }}
          isClearable={true}
        />
      </div>
    </div>
  )
}
