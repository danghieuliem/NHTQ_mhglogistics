import Link from 'next/link'
import React from 'react'
import { toast } from 'react-toastify'
import { payHelp } from '~/api'
import { ActionButton, DataTable } from '~/components'
import { TColumnsType, TTable } from '~/types/table'
import { _format } from '~/utils'
import TagStatus from '../../status/TagStatus'
import { Modal } from 'antd'
import { EPayHelp, payHelpStatus } from '~/configs'
import clsx from 'clsx'
import { useScreen } from '~/hooks'

type TProps = {
  filter
  handleFilter: (newFilter) => void
  userSale
  refetch: () => void
}

export const RequestPaymentTable: React.FC<
  TTable<TRequestPaymentOrder> & TProps
> = ({ data, filter, handleFilter, loading, userSale, refetch }) => {
  const { isWidthMD } = useScreen()

  const columns: TColumnsType<TRequestPaymentOrder> = [
    {
      dataIndex: 'Id',
      title: 'ID',
      width: 50,
      fixed: 'left',
      responsive: ['lg'],
    },
    {
      dataIndex: 'UserName',
      title: 'Username',
      fixed: isWidthMD ? null : 'left',
      width: 120,
    },
    {
      dataIndex: 'SalerID',
      responsive: ['md'],
      title: (
        <>
          Nhân viên <br /> kinh doanh
        </>
      ),
      render: (_, record) => {
        const salerName = userSale?.find((x) => x.Id === record?.SalerID)
          ?.UserName
        return <>{salerName || '-'}</>
      },
      width: 120,
    },
    {
      dataIndex: 'TotalPrice',
      title: (
        <>
          Tổng tiền
          <br />
          (¥)
        </>
      ),
      align: 'right',
      responsive: ['md'],
      render: (money) => _format.getYuan(money, ''),
      width: 120,
    },
    {
      dataIndex: 'TotalPriceVND',
      title: (
        <>
          Tổng tiền
          <br />
          (VNĐ)
        </>
      ),
      align: 'right',
      responsive: ['sm'],
      render: (money) => _format.getVND(money, ''),
      width: 140,
    },
    {
      dataIndex: 'Currency',
      title: (
        <>
          Tỷ giá <br />
          (VNĐ)
        </>
      ),
      align: 'right',
      responsive: ['sm'],
      render: (currency) => _format.getVND(currency, ''),
      width: 120,
    },
    {
      dataIndex: 'Note',
      title: (
        <>
          Ghi chú <br />
          khách hàng
        </>
      ),
      width: 200,
      responsive: ['lg'],
    },
    {
      dataIndex: 'Status',
      title: 'Trạng thái',
      render: (status) => {
        const color = payHelpStatus?.find((x) => x.id === status)
        return <TagStatus color={color?.color} statusName={color?.name} />
      },
      width: 120,
    },
    {
      dataIndex: 'Created',
      title: 'TimeLine',
      responsive: ['lg'],
      render: (_, record) => (
        <React.Fragment>
          {record.Created && (
            <p
              className={clsx(
                record?.Status === EPayHelp.ChoDuyet && 'text-red',
                'flex justify-between px-2',
              )}
            >
              <span>Đơn mới: </span>
              <span>
                {_format.getVNDate(record.Created, 'HH:mm')} -
                {_format.getVNDate(record.Created, 'DD/MM/YYYY')}
              </span>
            </p>
          )}
          {record.ConfirmDate && (
            <p
              className={clsx(
                record?.Status === EPayHelp.DaDuyet && 'text-red',
                'flex justify-between px-2',
              )}
            >
              <span>Đã duyệt:</span>
              <span>
                {_format.getVNDate(record.ConfirmDate, 'HH:mm')} -
                {_format.getVNDate(record.ConfirmDate, 'DD/MM/YYYY')}
              </span>
            </p>
          )}
          {record.PaidDate && (
            <p
              className={clsx(
                record?.Status === EPayHelp.DaThanhToan && 'text-red',
                'flex justify-between px-2',
              )}
            >
              <span>Thanh toán:</span>
              <span>
                {_format.getVNDate(record.PaidDate, 'HH:mm')} -
                {_format.getVNDate(record.PaidDate, 'DD/MM/YYYY')}
              </span>
            </p>
          )}
          {record.CompleteDate && (
            <p
              className={clsx(
                record?.Status === EPayHelp.DaHoanThanh && 'text-red',
                'flex justify-between px-2',
              )}
            >
              <span>Hoàn thành:</span>
              <span>
                {_format.getVNDate(record.CompleteDate, 'HH:mm')} -
                {_format.getVNDate(record.CompleteDate, 'DD/MM/YYYY')}
              </span>
            </p>
          )}
          {record.CancelDate && (
            <p
              className={clsx(
                record?.Status === EPayHelp.DonHuy && 'text-red',
                'flex justify-between px-2',
              )}
            >
              <span>Huỷ đơn:</span>
              <span>
                {_format.getVNDate(record.CancelDate, 'HH:mm')} -
                {_format.getVNDate(record.CancelDate, 'DD/MM/YYYY')}
              </span>
            </p>
          )}
        </React.Fragment>
      ),
      width: 280,
    },
    {
      dataIndex: 'action',
      key: 'action',
      title: 'Thao tác',
      fixed: 'right',
      width: 120,
      responsive: ['sm'],
      render: (_, record) => (
        <div className='grid grid-cols-1 gap-2'>
          <Link
            href={`/manager/order/request-payment/detail/?id=${record?.Id}`}
          >
            <a target='_blank'>
              <ActionButton
                icon='fas fa-info-square'
                title='Chi tiết'
                isButton
              />
            </a>
          </Link>
          {record?.Status === EPayHelp.ChoDuyet && (
            <ActionButton
              onClick={() =>
                Modal.confirm({
                  title: 'Xác nhận duyệt đơn này?',
                  onOk: () => {
                    const id = toast.loading('Đang xử lý ...')
                    payHelp
                      .confirm(record?.Id)
                      .then(() => {
                        toast.update(id, {
                          render: 'Duyệt thành công!',
                          type: 'success',
                          isLoading: false,
                          autoClose: 500,
                        })
                        refetch()
                      })
                      .catch((error) => {
                        toast.update(id, {
                          render: (error as any)?.response?.data?.ResultMessage,
                          type: 'error',
                          isLoading: false,
                          autoClose: 1000,
                        })
                      })
                  },
                })
              }
              icon='fas fa-check-circle'
              title='Duyệt'
              isButton
              isButtonClassName='bg-blue !text-white'
            />
          )}
        </div>
      ),
    },
  ]

  return (
    <>
      <DataTable
        {...{
          loading,
          columns,
          data,
          bordered: true,
          scroll: isWidthMD ? { x: true } : { x: 1200, y: 700 },
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
