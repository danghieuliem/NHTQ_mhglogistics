import { Pagination, Popover } from 'antd'
import router from 'next/router'
import React from 'react'
import { ActionButton, DataTable, Menu } from '~/components'
import { activeData, getLevelId } from '~/configs/appConfigs'
import { useCatalogue } from '~/hooks'
import { TColumnsType, TTable } from '~/types/table'
import { _format } from '~/utils'
import TagStatus from '../../status/TagStatus'

type TProps = {
  refetch: () => void
  RoleID: number
  dathangList?: any
  saleList?: any
  filter
  handleFilter: (newFilter) => void
}

export const ClientListTable: React.FC<TTable<TClient | any> & TProps> = ({
  data,
  filter,
  handleFilter,
  loading,
  refetch,
  RoleID,
  dathangList,
  saleList,
}) => {
  const { warehouseVN, warehouseTQ, shippingTypeToWarehouse } = useCatalogue({
    warehouseVNEnabled: true,
    warehouseTQEnabled: true,
    shippingTypeToWarehouseEnabled: true,
  })

  const columns: TColumnsType<TClient> = [
    {
      dataIndex: 'Id',
      title: 'ID',
      width: 60,
      align: 'right',
      responsive: ['lg'],
    },
    {
      dataIndex: 'UserName',
      title: 'Thông tin hệ thống',
      responsive: ['lg'],
      render: (_, record) => {
        return (
          <div className='flex flex-col gap-[4px]'>
            <div className='font-bold'>
              <i className='fas fa-user mr-1'></i>
              {record?.UserName}
            </div>
            <div className='flex items-center'>
              <TagStatus
                color={activeData[record?.Status].color}
                statusName={activeData[record?.Status].name}
              />
              <span
                className={`${
                  record?.LevelId > 3 ? 'text-[#8a64e3]' : 'text-orange'
                } ml-1 text-xs font-semibold`}
              >
                {' - '}
                {getLevelId[record?.LevelId]?.Name}
              </span>
            </div>
            <div className='text-xs font-bold text-sec'>
              <i className='fas fa-coins mr-1'></i>
              {_format.getVND(record?.Wallet)}
            </div>
          </div>
        )
      },
    },
    {
      dataIndex: 'FullName',
      title: 'Thông tin cá nhân',
      width: 300,
      render: (_, record) => {
        return (
          <div className='flex flex-col'>
            <span className='font-bold'>
              <i className='fas fa-user mr-1'></i>
              {record?.FullName}
            </span>
            <span className='text-green'>
              <i className='fas fa-phone mr-1'></i>
              {record?.Phone}
            </span>
            <span>
              <i className='fas fa-at mr-1'></i>
              {record?.Email}
            </span>
          </div>
        )
      },
    },
    {
      dataIndex: 'DatHangId',
      title: 'Nhân viên',
      responsive: ['md'],
      render: (_, record) => {
        const orderEm = dathangList?.filter(
          (item) => item.Id === record?.DatHangId,
        )[0]
        const salerEm = saleList?.filter(
          (item) => item.Id === record?.SaleId,
        )[0]
        return (
          <div className='flex flex-col'>
            <span className='flex justify-between'>
              Đặt hàng:
              <span>{orderEm?.UserName ?? '--'}</span>
            </span>
            <span className='flex justify-between'>
              Kinh doanh:
              <span>{salerEm?.UserName ?? '--'}</span>
            </span>
          </div>
        )
      },
    },
    {
      dataIndex: 'WarehouseFrom',
      title: 'Thông tin kho',
      responsive: ['md'],
      render: (_, record) => {
        return (
          <div className='flex flex-col'>
            <div className='flex flex-col'>
              <span className='flex justify-between'>
                Kho TQ:
                <span>
                  {
                    warehouseTQ?.find(
                      (x) => x.Id === Number(record?.WarehouseFrom),
                    )?.Name
                  }
                </span>
              </span>
              <span className='flex justify-between'>
                Kho VN:
                <span>
                  {
                    warehouseVN?.find(
                      (x) => x.Id === Number(record?.WarehouseTo),
                    )?.Name
                  }
                </span>
              </span>
              <span className='flex justify-between'>
                PPTC:
                <span>
                  {
                    shippingTypeToWarehouse?.find(
                      (x) => x.Id === Number(record?.ShippingType),
                    )?.Name
                  }
                </span>
              </span>
            </div>
          </div>
        )
      },
    },
    {
      dataIndex: 'Created',
      title: 'Ngày tạo',
      responsive: ['lg'],
      render: (_, record) => {
        return (
          <>
            <div className='text-left'>{_format.getVNDate(record.Created)}</div>
            <div className='text-left'>{record.CreatedBy}</div>
          </>
        )
      },
    },
    {
      dataIndex: 'action',
      title: 'Thao tác',
      align: 'right',
      responsive: ['lg'],
      render: (_, record) => (
        <>
          <Popover
            placement='left'
            content={
              <Menu
                data={[
                  {
                    title: 'Cập nhật',
                    onClick: () => {
                      router.push({
                        pathname: '/manager/client/client-list/detail',
                        query: { id: record?.Id },
                      })
                    },
                    target: '_blank',
                    className: 'font-bold',
                    isHidden: RoleID !== 1 ? false : true,
                  },
                  {
                    title: 'Nạp tiền',
                    target: '_blank',
                    isHidden: true,
                    className: 'font-bold',
                    onClick: () => {
                      router.push({
                        pathname: '/manager/money/vietnam-recharge',
                        query: { id: record?.Id },
                      })
                    },
                  },
                  {
                    title: 'Rút tiền',
                    className: 'font-bold',
                    isHidden: true,
                    onClick: () => {
                      router.push({
                        pathname: '/manager/money/vietnam-withdrawal',
                        query: { id: record?.Id },
                      })
                    },
                  },
                  {
                    title: 'Danh sách đơn hàng',
                    className: 'font-bold',
                    target: '_blank',
                    isHidden: true,
                    onClick: () => {
                      router.push({
                        pathname: '/manager/client/order-list/detail',
                        query: { id: record?.Id },
                      })
                    },
                  },
                  {
                    title: 'Tạo đơn hàng khác',
                    className: 'font-bold',
                    target: '_blank',
                    isHidden: true,
                    onClick: () => {
                      router.push({
                        pathname: '/manager/client/create-order',
                        query: { id: record?.Id },
                      })
                    },
                  },
                  {
                    title: 'Lịch sử giao dịch',
                    className: 'font-bold',
                    target: '_blank',
                    isHidden: true,
                    onClick: () => {
                      router.push({
                        pathname: '/manager/client/transaction-history',
                        query: { id: record?.Id },
                      })
                    },
                  },
                ]}
              />
            }
          >
            <ActionButton
              icon='fas fa-info-square'
              title='Thao tác'
              disabled={RoleID !== 1 && RoleID !== 3}
              isButton
              isButtonClassName='bg-main !text-white'
            />
          </Popover>
        </>
      ),
      width: 120,
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
        }}
      />
      <div className='mt-4 text-right'>
        <Pagination
          total={filter?.TotalItems}
          current={filter?.PageIndex}
          pageSize={filter?.PageSize}
          onChange={(val) => handleFilter({ ...filter, PageIndex: val })}
        />
      </div>
    </>
  )
}
