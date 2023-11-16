import { Table } from 'antd'
import Text from 'antd/lib/typography/Text'
import React from 'react'
import { DataTable } from '~/components'
import { TColumnsType, TTable } from '~/types/table'
import { _format } from '~/utils'
import TagStatus from '../../status/TagStatus'
import Link from 'next/link'

export const OutStockFormTableDetail: React.FC<
  TTable<TOutStockSessionPackages> & { totalMustPay; dataAll }
> = ({ data, loading, totalMustPay, dataAll }) => {
  const columns: TColumnsType<TOutStockSessionPackages> = [
    {
      dataIndex: 'MainOrderID',
      title: 'ID đơn',
      width: 100,
      render: (_, record) => {
        return (
          <Link
            href={
              Number(record?.MainOrderID)
                ? `/manager/order/order-list/detail/?id=${Number(
                    record?.MainOrderID,
                  )}`
                : `/manager/deposit/deposit-list/detail/?id=${Number(
                    record?.TransportationID,
                  )}`
            }
            passHref
          >
            <a target='_blank'>
              {Number(record?.MainOrderID)
                ? record?.MainOrderID
                : record?.TransportationID}
            </a>
          </Link>
        )
      },
    },
    {
      dataIndex: 'SmallPackage',
      title: 'Loại đơn hàng',
      render(value) {
        return (
          <TagStatus
            color={['', 'Orange', 'green', 'blue'][value?.OrderType]}
            statusName={value?.OrderTypeName}
          />
        )
      },
      width: 140,
    },
    {
      dataIndex: 'SmallPackage',
      title: 'Mã kiện',
      render: (record) => record.OrderTransactionCode,
      width: 200,
    },
    {
      dataIndex: 'SmallPackage',
      title: (
        <>
          Cân nặng
          <br />
          (kg)
        </>
      ),
      align: 'right',
      width: 120,
      render: (smallpackage: TSmallPackage) => smallpackage.Weight,
    },
    {
      dataIndex: 'SmallPackage',
      title: (
        <>
          Số khối
          <br />
          (m3)
        </>
      ),
      align: 'right',
      width: 120,
      render: (smallpackage: TSmallPackage) => smallpackage.VolumePayment,
    },
    {
      dataIndex: 'SmallPackage',
      align: 'right',
      width: 200,
      title: (
        <>
          Kích thước
          <br />
          (D x R x C)
          <br />
          (cm)
        </>
      ),
      render: (_, record, index) => {
        return `${record.SmallPackage.Length ?? 0} x ${
          record.SmallPackage.Width ?? 0
        } x ${record.SmallPackage.Height ?? 0}`
      },
    },
    // {
    //   dataIndex: "SmallPackage",
    //   align: "right",
    //   title: () => (
    //     <React.Fragment>
    //       Cân quy
    //       <br />
    //       đổi (kg)
    //     </React.Fragment>
    //   ),
    //   render: (_, record, index) => {
    //     return record.SmallPackage.Volume;
    //   },
    // },
    {
      dataIndex: 'SmallPackage',
      align: 'right',
      title: () => (
        <React.Fragment>
          Cước phí
          <br />
          vận chuyển
          <br />
          (VNĐ)
        </React.Fragment>
      ),
      render: (_, record, index) =>
        _format.getVND(record.SmallPackage.TotalPrice, ''),
    },
    {
      dataIndex: 'IsPayment',
      title: (
        <>
          Trạng thái <br />
          thanh toán
        </>
      ),
      render: (val) => {
        return (
          <TagStatus
            color={val ? '#1965e0' : '#f52525'}
            statusName={val ? 'Đã thanh toán' : 'Chưa thanh toán'}
          />
        )
      },
    },
  ]

  const summary = (data: TOutStockSessionPackages[]) => {
    return (
      <>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={7}>
            <b>Tổng số kiện</b>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1} colSpan={1} align='right'>
            {data.length} kiện
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={7}>
            <b>Tổng số khối</b>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1} colSpan={1} align='right'>
            {_format.getVolume(
              data.reduce(
                (prev, cur) => prev + cur?.SmallPackage?.VolumePayment,
                0,
              ),
            ) + ' m3'}
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={7}>
            <b>Tổng cân nặng</b>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1} colSpan={1} align='right'>
            {_format.getWeight(
              data.reduce(
                (prev, cur) => prev + cur?.SmallPackage?.PayableWeight,
                0,
              ),
            ) + ' kg'}
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={7}>
            <b>Số dư tài khoản khách</b>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1} colSpan={1} align='right'>
            {_format.getVND(dataAll?.UserWallet)}
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={7}>
            <b>Tổng tiền cần thanh toán</b>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1} colSpan={1} align='right'>
            <Text type='danger'>
              <b>{_format.getVND(dataAll?.TotalPay)}</b>
            </Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </>
    )
  }

  return (
    <DataTable
      {...{
        isExpand: false,
        data: data,
        columns: columns,
        loading: loading,
        summary: !!data?.length ? summary : undefined,
        scroll: { x: 1200, y: 600 },
      }}
    />
  )
}
