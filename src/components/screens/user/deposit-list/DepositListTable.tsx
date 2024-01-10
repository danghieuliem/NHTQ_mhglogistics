import { Modal, Popover, Tabs } from 'antd'
import 'antd/dist/antd.css'
import clsx from 'clsx'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { transportationOrder } from '~/api'
import {
  ActionButton,
  DataTable,
  FormInput,
  ReportContentMemo,
  UserDepositListFilterMemo,
  toast,
} from '~/components'
import { ETransportationOrder, transportationStatus } from '~/configs'
import { TColumnsType, TTable } from '~/types/table'
import { _format } from '~/utils'
import TagStatus from '../../status/TagStatus'
import { DetailInfoMemo } from './components/DetailInfoMemo'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { toast as reactToast } from 'react-toastify'
import { TableRowSelection } from 'antd/lib/table/interface'

const TimelineRender = (props: { record: TUserDeposit }) => {
  const { record } = props

  const data = [
    record.Created && {
      isActive: record?.Status === ETransportationOrder.ChoDuyet,
      title: 'Tạo đơn:',
      display: (
        <>
          {_format.getVNDate(record.Created, 'HH:mm')} -{' '}
          {_format.getVNDate(record.Created, 'DD/MM/YYYY')}
        </>
      ),
    },

    record.ConfirmDate && {
      isActive: record?.Status === ETransportationOrder.DonMoi,
      title: 'Đơn mới:',
      display: (
        <>
          {_format.getVNDate(record.ConfirmDate, 'HH:mm')} -{' '}
          {_format.getVNDate(record.ConfirmDate, 'DD/MM/YYYY')}
        </>
      ),
    },

    record.TQDate && {
      isActive: record?.Status === ETransportationOrder.VeKhoTQ,
      title: 'Về kho TQ:',
      display: (
        <>
          {_format.getVNDate(record.TQDate, 'HH:mm')} -{' '}
          {_format.getVNDate(record.TQDate, 'DD/MM/YYYY')}
        </>
      ),
    },

    record.ComingVNDate && {
      isActive: record?.Status === ETransportationOrder.DangVeVN,
      title: 'Đang về VN:',
      display: (
        <>
          {_format.getVNDate(record.ComingVNDate, 'HH:mm')} -{' '}
          {_format.getVNDate(record.ComingVNDate, 'DD/MM/YYYY')}
        </>
      ),
    },

    record.VNDate && {
      isActive: record?.Status === ETransportationOrder.VeKhoVN,
      title: 'Về kho VN:',
      display: (
        <>
          {_format.getVNDate(record.VNDate, 'HH:mm')} -{' '}
          {_format.getVNDate(record.VNDate, 'DD/MM/YYYY')}
        </>
      ),
    },

    record.PaidDate && {
      isActive: record?.Status === ETransportationOrder.DaThanhToan,
      title: 'Thanh toán:',
      display: (
        <>
          {_format.getVNDate(record.PaidDate, 'HH:mm')} -{' '}
          {_format.getVNDate(record.PaidDate, 'DD/MM/YYYY')}
        </>
      ),
    },

    record.CompleteDate && {
      isActive: record?.Status === ETransportationOrder.DaHoanThanh,
      title: 'Hoàn thành:',
      display: (
        <>
          {_format.getVNDate(record.CompleteDate, 'HH:mm')} -{' '}
          {_format.getVNDate(record.CompleteDate, 'DD/MM/YYYY')}
        </>
      ),
    },

    record.ComplainDate && {
      isActive: record?.Status === ETransportationOrder.DaKhieuNai,
      title: 'Khiếu nại:',
      display: (
        <>
          {_format.getVNDate(record.ComplainDate, 'HH:mm')} -{' '}
          {_format.getVNDate(record.ComplainDate, 'DD/MM/YYYY')}
        </>
      ),
    },

    record.CancelDate && {
      isActive: record?.Status === ETransportationOrder.Huy,
      title: 'Huỷ đơn:',
      display: (
        <>
          {_format.getVNDate(record.CancelDate, 'HH:mm')} -{' '}
          {_format.getVNDate(record.CancelDate, 'DD/MM/YYYY')}
        </>
      ),
    },
  ]

  return (
    <div className='display flex w-full flex-col gap-1 xs:gap-0'>
      {data.map(
        (item) =>
          item && (
            <p
              className={clsx(
                item.isActive && 'text-red',
                'grid grid-cols-7 items-center justify-between gap-1 rounded-md border px-2 xs:border-none',
              )}
            >
              <span className='title col-span-3'>{item.title}</span>
              <span className='display col-span-4'>{item.display}</span>
            </p>
          ),
      )}
    </div>
  )
}

type TProps = {
  handleSelectIds: (item: TUserDeposit) => void
  filter
  handleFilter: (newFilter) => void
  moneyOfOrders
  ids
}

export const UserDepositListTable: React.FC<TTable<TUserDeposit> & TProps> = ({
  data,
  loading,
  handleModal, // ToDo: For conform delete
  handleFilter,
  filter,
  moneyOfOrders,
  ids,
}) => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo,
  )

  const { control, getValues, reset } = useForm({
    mode: 'onBlur',
    defaultValues: {
      note: '',
    },
  })

  const queryClient = useQueryClient()
  const mutationUpdate = useMutation(
    (data: Partial<TUserDeposit>) => transportationOrder.cancelOrder(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userDepositList')
        toast.success('Huỷ đơn thành công')
        reset()
      },
      onError: toast.error,
    },
  )

  const columns: TColumnsType<TUserDeposit> = [
    {
      dataIndex: 'Id',
      title: 'ID',
      width: 110,
      align: 'center',
      responsive: ['md'],
    },
    {
      dataIndex: 'OrderTransactionCode',
      title: 'Mã vận đơn',
      width: 200,
    },
    {
      dataIndex: 'TotalPriceVND',
      title: 'Thông tin',
      responsive: ['md'],
      width: 210,
      render: (_, record) => {
        const formatDate = [
          {
            filterColor: '#008000',
            title: 'Tổng tiền:',
            value: _format.getVND(record.TotalPriceVND, ' đ'),
          },
          {
            filterColor: 'var(--main-color)',
            title: 'Cân nặng:',
            value: _format.getWeight(record.PayableWeight) + ' Kg',
          },
          {
            filterColor: '#2196F3',
            title: 'Thể tích:',
            value: _format.getVolume(record.VolumePayment) + ' m3',
          },
        ]
        return (
          <>
            {formatDate.map((e, idx) => {
              return (
                <div
                  key={idx}
                  className='flex justify-between'
                  style={{ color: e.filterColor }}
                >
                  <span>{e.title}</span>
                  <span>{e.value}</span>
                </div>
              )
            })}
          </>
        )
      },
    },
    {
      dataIndex: 'CreateDate',
      title: 'TimeLine',
      responsive: ['lg'],
      render: (_, record) => <TimelineRender record={record} />,
      width: 280,
    },
    {
      dataIndex: 'Status',
      title: 'Trạng thái',
      width: 120,
      render: (status, record) => {
        const color = transportationStatus.find((x) => x.id === status)
        return (
          <div className='flex justify-center'>
            <TagStatus color={color?.color} statusName={record?.StatusName} />
          </div>
        )
      },
    },
    {
      dataIndex: 'action',
      title: 'Thao tác',
      fixed: 'right',
      width: 140,
      render: (_, record) => {
        return (
          <div className='flex flex-col items-center gap-1'>
            <Popover
              trigger={'click'}
              placement='leftBottom'
              content={
                <div className='rounded-md border border-main !bg-[#fdfdfd36] p-4'>
                  <DetailInfoMemo record={record} />
                </div>
              }
            >
              <ActionButton
                icon='fas fa-info-square'
                title='Chi tiết'
                iconContainerClassName='iconRed'
                isButton={true}
              />
            </Popover>
            {record.Status === ETransportationOrder.VeKhoVN &&
              record.TotalPriceVND != 0 && (
                <ActionButton
                  onClick={() =>
                    Modal.confirm({
                      title: `Thanh toán đơn hàng #${record.Id}.`,
                      content: (
                        <b>Tổng tiền: {_format.getVND(record.TotalPriceVND)}</b>
                      ),
                      onOk: () =>
                        transportationOrder
                          .makePayment([record.Id])
                          .then(() => {
                            queryClient.invalidateQueries('userDepositList')
                          })
                          .catch((error) => {
                            toast.error(
                              (error as any)?.response?.data?.ResultMessage,
                            )
                          }),
                    })
                  }
                  icon='fas fa-money-check'
                  title='Thanh toán'
                  isButtonClassName='bg-blue !text-white'
                  isButton={true}
                />
              )}
            {record.Status === ETransportationOrder.ChoDuyet && (
              <ActionButton
                onClick={() =>
                  Modal.confirm({
                    title: `Hủy đơn hàng #${record.Id} ?`,
                    content: (
                      <FormInput
                        control={control}
                        name='note'
                        placeholder='Tại sao lại hủy đơn hàng?'
                        rules={{ required: 'Vui lòng điền lý do hủy' }}
                      />
                    ),
                    onOk: () =>
                      mutationUpdate.mutateAsync({
                        Id: record.Id,
                        Note: getValues('note'),
                      }),
                  })
                }
                icon='far fa-trash-alt'
                title='Hủy'
                isButtonClassName='bg-red !text-white'
                isButton={true}
              />
            )}
            {record?.Status === ETransportationOrder.DaHoanThanh && (
              <Popover
                trigger={'click'}
                placement='left'
                content={<ReportContentMemo defaultValue={record} />}
              >
                <ActionButton
                  icon='fas fa-balance-scale-right'
                  title='Khiếu nại'
                  isButton={true}
                  isButtonClassName='bg-red !text-white'
                />
              </Popover>
            )}
          </div>
        )
      },
      responsive: ['lg'],
    },
  ]

  const [listStatus, setListStatus] = useState([...transportationStatus])

  useQuery(
    ['deposit-infor-list'],
    () =>
      transportationOrder.getAmountInfo({
        UID: userCurrentInfo?.Id,
      }),
    {
      onSuccess: (res) => {
        const data = res.Data
        const newListStatus = [...listStatus]
        data?.forEach((x) => {
          const index = newListStatus.findIndex((i) => i.id === x?.Status)
          if (index !== -1) {
            newListStatus[index].value = x?.Quantity
          }
        })
        setListStatus(newListStatus)
      },
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage)
      },
      retry: false,
      enabled: !!userCurrentInfo?.Id,
      refetchOnWindowFocus: true,
    },
  )

  const [selectedRows, setSelectedRows] = useState<TUserDeposit[]>([])

  const handlePayment = useCallback(() => {
    const listId = selectedRows.map((row) => row.Id)

    let sumTotalPriceVND: number = 0
    selectedRows.forEach((row) => {
      sumTotalPriceVND += row.TotalPriceVND
    })

    Modal.confirm({
      title: `Thanh toán các đơn hàng.`,
      content: (
        <b>
          <p>{listId.join(' - ')}</p>
          Tổng tiền: {_format.getVND(sumTotalPriceVND)}
        </b>
      ),
      onOk: () => {
        const id = reactToast.loading('Đang xử lý ...')

        transportationOrder
          .makePayment(listId)
          .then(() => {
            queryClient.invalidateQueries('userDepositList')
            return reactToast.update(id, {
              render: 'Thanh toán thành công.',
              isLoading: false,
              type: 'success',
              autoClose: 500,
            })
          })
          .then(() => {
            setSelectedRows([])
          })
          .catch((error) => {
            reactToast.update(id, {
              render: (error as any)?.response?.data?.ResultMessage,
              isLoading: false,
              type: 'error',
              autoClose: 500,
            })
          })
      },
    })
  }, [selectedRows])

  const rowSelection: TableRowSelection<TUserDeposit> = {
    selectedRowKeys: selectedRows?.map((item) => item.Id),
    getCheckboxProps: (record) => {
      return record.Status === ETransportationOrder.VeKhoVN &&
        record.TotalPriceVND != 0
        ? { name: record.Id.toString(), disabled: false }
        : {
            name: record.Id.toString(),
            disabled: true,
            className: '!hidden',
          }
    },
    onChange: (_, selectedRows: TUserDeposit[]) => {
      setSelectedRows([...selectedRows])
    },
  }

  return (
    <>
      <DataTable
        {...{
          loading,
          columns,
          rowSelection,
          data,
          bordered: true,
          scroll: { y: 640, x: 460 },
          extraElementClassName: '!w-full',
          extraElement: (
            <UserDepositListFilterMemo
              numberOfOrder={listStatus}
              moneyOfOrders={moneyOfOrders}
              handleFilter={handleFilter}
              isSelectSomeItems={!!ids.length}
              selectedRows={selectedRows}
              handlePayment={handlePayment}
            />
          ),
          pagination: {
            current: filter.PageIndex,
            total: filter.TotalItems,
            pageSize: filter.PageSize,
          },
          onChange: (page) => {
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
