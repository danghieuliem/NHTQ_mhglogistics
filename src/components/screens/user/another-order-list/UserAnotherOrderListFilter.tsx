import { Divider, Modal, Popover } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import {
  ActionButton,
  FilterInput,
  FilterRangeDate,
  FilterSelect,
} from '~/components'
import { EOrderStatus, orderStatus } from '~/configs'
import {
  ECreatedOrderStatusData,
  ESearchData,
  search2Data,
} from '~/configs/appConfigs'
import { EParamQ } from '~/enums'
import { _format } from '~/utils'

// const inputProps = {
//   id: "id",
//   name: "id",
//   placeholder: "Nhập nội dung tìm kiếm",
//   label: "ID đơn hàng / tên shop / tên website",
// };

const filterBox = `py-2 px-[12px] font-bold uppercase text-[12px] rounded-[4px] leading-[initial]
flex items-center justify-center border border-[#e8e8e8] shadow-lg 
cursor-pointer hover:shadow-sm transition-all duration-500 hover:!bg-main hover:!text-white`

type TProps = {
  handleFilter: (newFilter) => void
  numberOfOrder: any
  moneyOfOrders: any
  selectedRowKeys: any
  handleDeposit: (data: TOrder[]) => void
  handlePayment: (data: TOrder[]) => void
}

const NumberOfOrderComp = (props: { numberOfOrder: any; q: EParamQ }) => {
  const { numberOfOrder, q } = props
  return (
    <div className='min-w-[300px] p-4'>
      {(q !== EParamQ.otherOrder
        ? numberOfOrder.filter((x) => x.id !== EOrderStatus.ChoBaoGia)
        : numberOfOrder
      )?.map((item, index) => (
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

const CountComponent = ({ numberOfOrder, moneyOfOrders }) => {
  const { query } = useRouter()
  return (
    <>
      <Popover
        trigger='click'
        placement='bottomRight'
        content={
          <NumberOfOrderComp
            numberOfOrder={numberOfOrder}
            q={query?.q as EParamQ}
          />
        }
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
    </>
  )
}

const PaymentComponent = ({
  handleDeposit,
  handlePayment,
  selectedRowKeys,
}) => {
  const paymentData = selectedRowKeys?.filter(
    (item) => item?.Status === EOrderStatus.VeVN,
  )
  const noDepositData = selectedRowKeys?.filter(
    (item) => item?.Status === EOrderStatus.DonMoi,
  )
  const [show, setShow] = useState(false)

  return (
    <div>
      <ActionButton
        isButton
        isButtonClassName='bg-sec !text-white hover:!bg-main'
        title='Đặt cọc/thanh toán'
        icon='fad fa-money-check !mr-2'
        disabled={selectedRowKeys.length <= 0}
        onClick={() => setShow(!show)}
      />
      <Modal
        footer={false}
        visible={show}
        closable={false}
        onCancel={() => setShow(!show)}
      >
        <div className='p-4'>
          {noDepositData?.length > 0 && (
            <div className='flex items-center justify-between'>
              <span className='col-span-2 flex flex-col'>
                <span className='font-bold'>Tổng tiền đặt cọc: </span>
                <span className='text-lg font-semibold text-main'>
                  {_format.getVND(
                    noDepositData?.reduce(
                      (acc, cur) => acc + cur?.AmountDeposit,
                      0,
                    ) || 0,
                  )}
                </span>
              </span>
              <ActionButton
                icon='!mr-0'
                title='Đặt cọc'
                isButton
                isButtonClassName='bg-blue h-fit !text-white'
                onClick={() => {
                  handleDeposit(noDepositData)
                  setShow(!show)
                }}
              />
            </div>
          )}
          {noDepositData?.length > 0 && paymentData.length > 0 && (
            <Divider className='!my-2' />
          )}
          {paymentData?.length > 0 && (
            <>
              <div className='flex items-center justify-between'>
                <span className='col-span-2 flex flex-col'>
                  <span className='font-bold'>Tổng tiền thanh toán: </span>
                  <span className='text-lg font-semibold text-main'>
                    {_format.getVND(
                      paymentData?.reduce(
                        (prev, cur) => prev + cur?.RemainingAmount,
                        0,
                      ),
                    )}
                  </span>
                </span>
                <ActionButton
                  icon='!mr-0'
                  title='Thanh toán'
                  isButton
                  isButtonClassName='bg-blue h-fit !text-white'
                  onClick={() => {
                    handlePayment(paymentData)
                    setShow(!show)
                  }}
                />
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}

const PaymentComponentMemo = React.memo(PaymentComponent)

export const CountComponentMemo = React.memo(CountComponent)

const UserAnotherOrderListFilter: React.FC<TProps> = ({
  handleFilter,
  numberOfOrder,
  moneyOfOrders,
  selectedRowKeys,
  handleDeposit,
  handlePayment,
}) => {
  const [isShow, setIsShow] = useState(false)
  const { query } = useRouter()
  const TypeSearch = useRef<ESearchData>(null)
  const SearchContent = useRef<string>(null)
  const Status = useRef<ECreatedOrderStatusData>(-1)
  const FromDate = useRef<string>(null)
  const ToDate = useRef<string>(null)

  const [currentQ, setCurrentQ] = useState<EParamQ>(query?.q as EParamQ)
  const [isFirstChangeQ, setIsFirstChangeQ] = useState<boolean>(true)

  useEffect(() => {
    if (currentQ !== query?.q) {
      setIsFirstChangeQ(true)
    }
    setCurrentQ(query?.q as EParamQ)
  }, [query?.q])

  return (
    <div className='flex w-full flex-wrap items-end justify-between gap-4'>
      <div className='flex flex-col gap-2 sm:ml-auto sm:flex-row'>
        <PaymentComponentMemo
          selectedRowKeys={selectedRowKeys}
          handleDeposit={handleDeposit}
          handlePayment={handlePayment}
        />
        <CountComponentMemo
          moneyOfOrders={moneyOfOrders}
          numberOfOrder={numberOfOrder}
        />
        <Popover
          trigger={'click'}
          placement='bottomRight'
          content={
            <div className='grid grid-cols-1 gap-4 p-4'>
              <div className='col-span-1'>
                <FilterSelect
                  isClearable={true}
                  label='Tìm kiếm theo'
                  data={search2Data}
                  placeholder='Nội dung tìm kiếm'
                  handleSearch={(val: number) => (TypeSearch.current = val)}
                />
              </div>
              {/* <div className="col-span-1">
                <FilterInput
                  {...{
                    ...inputProps,
                    handleSearch: (val: string) =>
                      (SearchContent.current = val),
                  }}
                />
              </div> */}
              <div className='col-span-1'>
                <FilterSelect
                  isClearable={true}
                  data={
                    query?.q !== EParamQ.otherOrder
                      ? orderStatus.filter(
                          (x) => x.id !== EOrderStatus.ChoBaoGia,
                        )
                      : orderStatus
                  }
                  placeholder='Chọn trạng thái'
                  label='Trạng thái'
                  handleSearch={(val: number) => (Status.current = val)}
                />
              </div>
              <div className='col-span-1'>
                <FilterRangeDate
                  format='DD/MM/YYYY'
                  placeholder='Từ ngày / đến ngày'
                  handleDate={(val: string[]) => {
                    FromDate.current = val[0]
                    ToDate.current = val[1]
                  }}
                />
              </div>
              <div className='col-span-full ml-auto'>
                <ActionButton
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
                  title='Tìm kiếm'
                  icon='!mr-0'
                  isButton
                  isButtonClassName='bg-sec !text-white'
                />
              </div>
            </div>
          }
        >
          <ActionButton
            title='Bộ lọc'
            icon='fas fa-filter'
            isButton
            isButtonClassName='bg-main !text-white'
          />
        </Popover>
      </div>
      <div className='flex w-full flex-wrap items-end gap-2'>
        {(query?.q !== EParamQ.otherOrder
          ? numberOfOrder.filter((x) => x.id !== EOrderStatus.ChoBaoGia)
          : numberOfOrder
        )?.map((item) => {
          const len =
            (1 /
              (query?.q !== EParamQ.otherOrder
                ? numberOfOrder?.filter((x) => x.id !== EOrderStatus.ChoBaoGia)
                    .length
                : numberOfOrder?.length)) *
            100
          return (
            <div
              key={item?.name}
              className={`col-span-${item.col} ${filterBox} ${
                isFirstChangeQ
                  ? item?.id === EOrderStatus.TatCa && '!bg-sec !text-white'
                  : item?.id === Status.current && '!bg-sec !text-white'
              }`}
              style={{
                minWidth: `calc(${len}% - 8px)`,
              }}
              onClick={() => {
                setIsFirstChangeQ(false)
                setIsShow(!isShow)
                Status.current = item.id
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

export const UserAnotherOrderListFilterMemo = React.memo(
  UserAnotherOrderListFilter,
)
