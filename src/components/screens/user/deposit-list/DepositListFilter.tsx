import { Popover } from 'antd'
import clsx from 'clsx'
import React, { useRef, useState } from 'react'
import {
  ActionButton,
  FilterInput,
  FilterRangeDate,
  FilterSelect,
} from '~/components'
import { IconButton } from '~/components/globals/button/IconButton'
import { transportationStatus } from '~/configs'
import { EOrderStatusData, ESearchData, searchData } from '~/configs/appConfigs'
import { _format } from '~/utils'

const inputProps = {
  id: 'id',
  name: 'id',
  placeholder: 'Nhập nội dung tìm kiếm',
  label: 'Nhập ID / mã vận đơn',
}

const filterBox = `py-2 px-2 leading-[initial] font-bold uppercase text-[12px] border-[#e8e8e8] rounded-[4px]
flex items-center justify-center border shadow-lg 
cursor-pointer hover:shadow-sm transition-all duration-500 hover:!bg-main hover:!text-white`

type TProps = {
  handleFilter: (newFilter) => void
  // handleModalRequestExportPackages: (type: 'all' | 'some') => void;
  isSelectSomeItems: boolean
  numberOfOrder: any
  moneyOfOrders: any

  handlePayment: () => void
  selectedRows: Array<any>
}

const NumberOfOrderComp = ({ numberOfOrder }) => {
  return (
    <div className='min-w-[300px] p-4'>
      {numberOfOrder?.map((item, index) => (
        <div
          className='my-1 grid grid-cols-3 gap-2 py-1'
          key={`${item.name}-${index}`}
        >
          <div className='col-span-2 font-bold'>{item.name}</div>
          <div className='col-span-1 text-right font-bold text-main'>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  )
}

const MoneyOfOrdersComp = ({ moneyOfOrders }) => {
  return (
    <div className='w-fit p-4'>
      {moneyOfOrders?.map((item, index) => (
        <div
          className='my-1 grid grid-cols-2 gap-2 py-1 md:grid-cols-3'
          key={`${item.label}-${index}`}
        >
          <div className='col-span-1 font-bold md:col-span-2'>{item.label}</div>
          <div className='col-span-1 text-right font-bold text-main'>
            {_format.getVND(item.value)}
          </div>
        </div>
      ))}
    </div>
  )
}

const UserDepositListFilter: React.FC<TProps> = ({
  handleFilter,
  numberOfOrder,
  moneyOfOrders,
  handlePayment,
  selectedRows,
}) => {
  const [isShow, setIsShow] = useState(false)
  const TypeSearch = useRef<ESearchData>(ESearchData.All)
  const SearchContent = useRef<string>(null)
  const Status = useRef<EOrderStatusData>(-1)
  const FromDate = useRef<string>(null)
  const ToDate = useRef<string>(null)

  return (
    <div className='flex w-full flex-col justify-between gap-2'>
      <div className='flex flex-wrap items-end justify-between gap-2'>
        <div className='flex flex-wrap gap-2'>
          <ActionButton
            disabled={!selectedRows?.length}
            title='Thanh toán đơn đã chọn'
            icon='fas fa-money-check-alt'
            isButton
            isButtonClassName='bg-blue !text-white hover:bg-sec'
            onClick={handlePayment}
          />
          <Popover
            trigger='click'
            placement='bottomRight'
            content={<NumberOfOrderComp numberOfOrder={numberOfOrder} />}
          >
            <ActionButton
              title='Thông tin đơn hàng'
              icon=''
              isButton
              isButtonClassName='bg-blue !text-white hover:bg-sec'
            />
          </Popover>
          <Popover
            trigger={'click'}
            placement='bottomRight'
            content={<MoneyOfOrdersComp moneyOfOrders={moneyOfOrders} />}
          >
            <ActionButton
              title='Thông tin tiền hàng'
              icon=''
              isButton
              isButtonClassName='bg-green !text-white hover:bg-sec'
            />
          </Popover>
        </div>
        <Popover
          trigger={'click'}
          placement='bottomLeft'
          content={
            <div className='grid grid-cols-1 gap-4 p-4'>
              <FilterSelect
                data={searchData.slice(0, 3)}
                label='Tìm kiếm theo'
                placeholder='Nội dung tìm kiếm'
                handleSearch={(val: ESearchData) => {
                  TypeSearch.current = val
                }}
              />
              <FilterInput
                {...{
                  ...inputProps,
                  handleSearch: (val: string) =>
                    (SearchContent.current = val.trim()),
                }}
              />
              <FilterSelect
                data={transportationStatus}
                placeholder='Chọn trạng thái'
                label='Trạng thái'
                handleSearch={(val: number) => {
                  Status.current = val
                }}
              />
              <FilterRangeDate
                placeholder='Từ ngày / đến ngày'
                format='DD/MM/YYYY'
                handleDate={(val: string[]) => {
                  FromDate.current = val[0]
                  ToDate.current = val[1]
                }}
              />
              <div className='col-span-1 ml-auto'>
                <IconButton
                  onClick={() => {
                    setIsShow(!isShow)
                    handleFilter({
                      TypeSearch: TypeSearch.current,
                      SearchContent: SearchContent.current,
                      Status: Status.current,
                      FromDate: FromDate.current,
                      ToDate: ToDate.current,
                      PageIndex: 1,
                    })
                  }}
                  icon='far fa-search'
                  title='Tìm kiếm'
                  showLoading
                  toolip=''
                />
              </div>
            </div>
          }
        >
          <ActionButton
            title='Bộ lọc'
            icon='fas fa-filter'
            isButton
            onClick={() => setIsShow(!isShow)}
            isButtonClassName='bg-main !text-white ml-2'
          />
        </Popover>
      </div>

      <div className='flex flex-wrap items-end justify-end gap-2'>
        {numberOfOrder?.map((item) => {
          // const len = (1 / numberOfOrder?.length) * 100;
          return (
            <div
              key={item?.name}
              className={clsx(
                `col-span-${item.col}`,
                item?.id === Status.current ? '!bg-sec !text-white' : '',
                filterBox,
              )}
              // style={{
              //   width: `calc(${len}% - 6px)`
              // }}
              onClick={() => {
                Status.current = item.id
                setIsShow(!isShow)
                handleFilter({
                  TypeSearch: TypeSearch.current,
                  SearchContent: SearchContent.current,
                  Status: Status.current,
                  FromDate: FromDate.current,
                  ToDate: ToDate.current,
                  PageIndex: 1,
                })
              }}
            >
              <div className='mx-1'>{item.name}</div>
              <div className='mx-1'>({item.value})</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const UserDepositListFilterMemo = React.memo(UserDepositListFilter)
