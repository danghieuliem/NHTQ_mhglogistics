import { Popconfirm, Space, Tag } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React from 'react'
import { ActionButton, DataTable } from '~/components'
import { IconButton } from '~/components/globals/button/IconButton'
import {
  EExportStatusData,
  EPaymentData,
  exportStatusData,
  paymentData,
} from '~/configs/appConfigs'
import { TColumnsType, TTable } from '~/types/table'
import { _format } from '~/utils'
import { DepositStatisticNote } from './DepositStatisticNote'

export const DepositStatisticTable: React.FC<
  TTable<TUserStatisticalDeposit> & {
    onPayment: (data: TUserStatisticalDepositUpdateStatus) => Promise<unknown>
    onUpdateNote: (data: TUserStatisticalDepositUpdateNote) => Promise<unknown>
  }
> = ({
  data,
  handlePagination,
  pagination,
  loading,
  onPayment,
  onUpdateNote,
}) => {
  const columns: TColumnsType<TUserStatisticalDeposit> = [
    {
      dataIndex: 'Id',
      title: 'ID',
      align: 'center',
      responsive: ['sm'],
    },
    {
      dataIndex: 'UserName',
      title: 'Tên tài khoản',
      align: 'center',
    },
    {
      dataIndex: 'Created',
      title: 'Ngày YCXK',
      align: 'center',
      responsive: ['sm'],
      render: (date) => date && _format.getVNDate(date),
    },
    {
      dataIndex: 'BarCodeAndDateOuts',
      title: () => <div className='text-center'>Ngày XK</div>,
      render: (record) =>
        record.map((item) => (
          <div className='mb-2 flex'>
            {item?.OrderTransactionCode !== '' && (
              <div className='w-[140px]'>
                <p className='text-xs font-medium text-[#777676]'>mã vận đơn</p>
                <div className='mr-2 rounded-md bg-[#0000000a] p-1 text-xs text-[#777676]'>
                  {item?.OrderTransactionCode}
                </div>
              </div>
            )}
            {item?.DateOutWarehouse !== '' && (
              <div className='w-[140px]'>
                <p className='text-xs font-medium text-[#777676]'>ngày xk</p>
                <div className='mr-2 rounded-md bg-[#0000000a] p-1 text-xs text-[#777676]'>
                  {_format.getShortVNDate(item?.DateOutWarehouse)}
                </div>
              </div>
            )}
          </div>
        )),
      responsive: ['md'],
    },
    {
      dataIndex: 'TotalPackage',
      title: (
        <>
          Tổng số
          <br />
          kiện
        </>
      ),
      align: 'center',
      responsive: ['lg'],
    },
    {
      dataIndex: 'TotalWeight',
      title: 'Tổng số KG',
      align: 'center',
      responsive: ['lg'],
    },
    {
      dataIndex: 'TotalPriceVND',
      title: (
        <>
          Tổng cước
          <br />
          (VNĐ)
        </>
      ),
      align: 'center',
      responsive: ['xl'],
    },
    {
      dataIndex: 'ShippingTypeInVNName',
      title: 'HTVC',
      align: 'center',
      responsive: ['xl'],
    },
    {
      dataIndex: 'StatusExport',
      title: (
        <>
          Trạng thái
          <br />
          thanh toán
        </>
      ),
      align: 'center',
      render: (_, record) => {
        return (
          <Tag color={paymentData?.[record.Status]?.color}>
            {record.StatusName}
          </Tag>
        )
      },
      responsive: ['xl'],
    },
    {
      dataIndex: 'StatusExport',
      title: 'Trạng thái',
      align: 'center',
      render: (status, record) => {
        return (
          <Tag color={exportStatusData?.[record.StatusExport - 1]?.color}>
            {record.StatusExportName}
          </Tag>
        )
      },
      responsive: ['xl'],
    },
    {
      dataIndex: 'StaffNote',
      title: 'Ghi chú',
      align: 'center',
      render: (note, { Id, StaffNote }) => (
        <DepositStatisticNote
          name={Id.toString()}
          defaultValue={StaffNote}
          onClick={(StaffNote: string) => onUpdateNote({ Id, StaffNote })}
        />
      ),
      responsive: ['xl'],
    },
    {
      dataIndex: 'action',
      title: 'Thao tác',
      align: 'right',
      render: (_, record) => (
        <Space>
          {record.Status === EPaymentData.Unpaid &&
          record.StatusExport === EExportStatusData.Unexport ? (
            <React.Fragment>
              <Popconfirm
                title='Bạn có muốn thanh toán bằng ví?'
                placement='leftBottom'
                onConfirm={() =>
                  onPayment({
                    Id: record.Id,
                    IsPaymentWallet: true,
                    Status: 2,
                  })
                }
              >
                <ActionButton
                  icon='fal fa-credit-card'
                  title='Thanh toán bằng ví'
                />
              </Popconfirm>
              <Popconfirm
                placement='leftBottom'
                title='Bạn có muốn thanh toán trực tiếp?'
                onConfirm={() =>
                  onPayment({
                    Id: record.Id,
                    IsPaymentWallet: false,
                    Status: 2,
                  })
                }
              >
                <ActionButton
                  icon='fas fa-money-bill-wave'
                  title='Thanh toán trực tiếp'
                />
              </Popconfirm>
              <Popconfirm
                placement='leftBottom'
                title='Bạn có muốn huỷ thống kê?'
                onConfirm={() =>
                  onPayment({
                    Id: record.Id,
                    IsPaymentWallet: false,
                    Status: 3,
                  })
                }
              >
                <ActionButton icon='fas fa-trash' title='Hủy thống kê' />
              </Popconfirm>
            </React.Fragment>
          ) : (
            <ActionButton
              onClick={undefined}
              icon='fad fa-shredder'
              title='In phiếu'
            />
          )}
        </Space>
      ),
      responsive: ['xl'],
    },
  ]

  return (
    <DataTable
      {...{
        loading,
        columns,
        data,
        bordered: true,
        pagination,
        onChange: handlePagination,
      }}
    />
  )
}
