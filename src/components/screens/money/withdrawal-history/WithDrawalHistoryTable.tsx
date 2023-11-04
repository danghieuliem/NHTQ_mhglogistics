import { Divider, Pagination } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import ReactToPrint, { PrintContextConsumer } from 'react-to-print'
import { toast } from 'react-toastify'
import { withdraw } from '~/api'
import { ActionButton, DataTable } from '~/components'
import { moneyStatus } from '~/configs'
import { RootState } from '~/store'
import { TColumnsType, TTable } from '~/types/table'
import { _format } from '~/utils'
import TagStatus from '../../status/TagStatus'
import { useScreen } from '~/hooks'
type TProps = {
  filter
  handleFilter: (newFilter) => void
}
export const WithDrawalHistoryTable: React.FC<TTable<TWithDraw> & TProps> = ({
  data,
  handleModal,
  filter,
  handleFilter,
  loading,
}) => {
  const [dataEx, setDataEx] = useState<TWithDraw>(null)
  const componentRef = useRef<ReactToPrint>(null)

  const dataGlobal: TConfig = useSelector(
    (state: RootState) => state.dataGlobal,
  )

  const ComponentToPrint = React.forwardRef<{}, {}>((props, ref: any) => {
    return (
      <div className='mb-10 w-full p-4' ref={ref}>
        <div className='text-xs text-black'>
          {_format.getVNDate(new Date())}
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='col-span-1'>
            <div className='my-2 text-xs font-bold uppercase text-black'>
              {dataGlobal?.CompanyLongName}
            </div>
            <div className='text-xs text-black'>
              <span
                dangerouslySetInnerHTML={{
                  __html: dataGlobal?.Address,
                }}
              ></span>
            </div>
            <div className='text-xs text-black'>
              Website: {dataGlobal?.WebsiteName}
            </div>
            <div className='text-xs text-black'>
              Điện thoại: {dataGlobal?.Hotline}
            </div>
          </div>
          <div className='col-span-1'>
            <div className='ml-auto max-w-[270px] text-right'>
              <div className='my-2 text-center text-xs text-black'>
                Mẫu số 01 - TT
              </div>
              <div className='text-center text-xs text-black'>
                (Ban hành theo Thông tư số 133/2016/TT-BTC ngày 26/8/2016 của Bộ
                tài chính)
              </div>
            </div>
          </div>
        </div>
        <div className='my-8 text-center text-2xl font-bold text-black'>
          PHIẾU CHI
          <div className='text-center text-sm font-normal text-black'>
            Thời gian xuất phiếu: {_format.getVNDate(new Date())}
          </div>
        </div>
        <div className='m-auto mb-4 w-[80vw]'>
          <div className='my-3 flex border-b border-dashed border-b-[rgba(0,0,0,.3)] text-sm text-black'>
            Họ và tên người nhận tiền:{' '}
            <p className='ml-3 font-bold'>{dataEx?.Beneficiary}</p>
          </div>
          <div className='my-3 flex border-b border-dashed border-b-[rgba(0,0,0,.3)] text-sm text-black'>
            Địa chỉ:
          </div>
          <div className='my-3 flex border-b border-dashed border-b-[rgba(0,0,0,.3)] text-sm text-black'>
            Lý do chi: <p className='ml-3 font-bold'>{dataEx?.Note}</p>
          </div>
          <div className='my-3 flex border-b border-dashed border-b-[rgba(0,0,0,.3)] text-sm text-black'>
            Số tiền:{' '}
            <p className='ml-3 font-bold'>{_format.getVND(dataEx?.Amount)}</p>
          </div>
          <div className='my-3 flex border-b border-dashed border-b-[rgba(0,0,0,.3)] text-sm text-black'>
            Bằng chữ:{' '}
            <p className='ml-3 font-bold'>
              {_format.toVietnamese(dataEx?.Amount)}
            </p>
          </div>
          <div className='my-3 flex border-b border-dashed border-b-[rgba(0,0,0,.3)] text-sm text-black'>
            Kèm theo:
          </div>
          <div className='my-3 flex border-b border-dashed border-b-[rgba(0,0,0,.3)] text-sm text-black'>
            Chứng từ gốc:
          </div>
        </div>
        <div className='mt-4'>
          <strong>***Lưu ý:</strong>
          <div className='text-sm'>
            * Mọi chính sách được cập nhật tại mục CHÍNH SÁCH trên Website.
          </div>
        </div>
        <div className='mt-4 grid grid-cols-4 gap-4'>
          <div className='col-span-1'>
            <div className='text-center text-base'>Giám đốc</div>
            <div className='text-center text-sm'>(Ký, họ tên, đóng dấu)</div>
          </div>
          <div className='col-span-1'>
            <div className='text-center text-base'>Kế toán trưởng</div>
            <div className='text-center text-sm'>(Ký, họ tên)</div>
          </div>
          <div className='col-span-1'>
            <div className='text-center text-base'>Người nhận tiền</div>
            <div className='text-center text-sm'>(Ký, họ tên)</div>
          </div>
          <div className='col-span-1'>
            <div className='text-center text-base'>Thủ quỹ</div>
            <div className='text-center text-sm'>(Ký, họ tên)</div>
          </div>
        </div>
      </div>
    )
  })

  const { isWidthMD } = useScreen()
  const columns: TColumnsType<TWithDraw> = [
    {
      dataIndex: 'Id',
      title: 'ID',
      fixed: 'left',
      width: 50,
      align: 'right',
      responsive: ['lg'],
    },
    {
      dataIndex: 'UserName',
      title: (
        <>
          Thông tin
          <br />
          tạo GD
        </>
      ),
      width: 230,
      render: (_, record) => {
        return (
          <div>
            <div className='mb-1 flex justify-between'>
              <span className='font-semibold'>Thực hiện GD:</span>
              <span>{record?.UserName}</span>
            </div>
            <div className='mb-1 flex justify-between'>
              <TextArea rows={2} disabled value={record?.Note} />
            </div>
          </div>
        )
      },
    },
    {
      dataIndex: 'Beneficiary',
      title: (
        <>
          Thông tin
          <br />
          nhận GD
        </>
      ),
      width: 230,
      responsive: ['md'],
      render: (_, record) => {
        return (
          <div>
            <div className='mb-1 flex justify-between text-red'>
              <span className='font-semibold'>Số tiền (VNĐ):</span>
              <span>{_format.getVND(record?.Amount, '')}</span>
            </div>
            <Divider className='!my-1' />
            <div className='mb-1 flex justify-between'>
              <span className='font-semibold'>Người nhận:</span>
              <span>{record?.Beneficiary || '--'}</span>
            </div>
            <div className='mb-1 flex justify-between'>
              <span className='font-semibold'>Số TK:</span>
              <span>{record?.BankNumber || '--'}</span>
            </div>
            <div className='mb-1 flex justify-between'>
              <span className='font-semibold'>Ngân hàng:</span>
              <span>{record?.BankAddress || '--'}</span>
            </div>
          </div>
        )
      },
    },
    {
      dataIndex: 'Created',
      title: 'Ngày rút',
      width: 200,
      responsive: ['md'],
      render: (_, record) => {
        return (
          <div>
            <div> {_format.getVNDate(record.Created)}</div>
            <div> {record.CreatedBy ?? '--'}</div>
          </div>
        )
      },
    },
    {
      dataIndex: 'Updated',
      title: 'Ngày duyệt',
      width: 200,
      responsive: ['md'],
      render: (_, record) => {
        return (
          <div>
            <div> {_format.getVNDate(record.Updated)}</div>
            <div> {record.UpdatedBy}</div>
          </div>
        )
      },
    },
    {
      dataIndex: 'Status',
      title: 'Trạng thái',
      width: 120,
      render: (status, record) => {
        const color = moneyStatus.find((x) => x.id === status)
        return <TagStatus color={color?.color} statusName={record.StatusName} />
      },
    },
    {
      dataIndex: 'action',
      key: 'action',
      title: 'Thao tác',
      fixed: 'right',
      width: 100,
      responsive: ['sm'],
      render: (_, record) => (
        <div className='flex flex-wrap gap-2'>
          {record?.Status === 1 && (
            <ActionButton
              onClick={() => handleModal(record)}
              icon='fad fa-edit' // fas fa-sync fa-spin
              title='Cập nhật'
              isButton
              isButtonClassName='bg-blue !text-white'
            />
          )}

          {record?.Status === 2 && (
            <ReactToPrint content={() => componentRef.current}>
              <PrintContextConsumer>
                {({ handlePrint }) => (
                  <ActionButton
                    onClick={() => {
                      toast.info('Đang xử lý. Chờ xíu nhé ...')
                      withdraw.getByID(record.Id).then((res) => {
                        setDataEx(res.Data)
                        handlePrint()
                      })
                    }}
                    icon='fas fa-print'
                    title='In phiếu'
                    isButton
                    isButtonClassName='bg-green !text-white'
                  />
                )}
              </PrintContextConsumer>
            </ReactToPrint>
          )}
        </div>
      ),
    },
  ]

  return (
    <React.Fragment>
      <div className='hidden'>
        <ComponentToPrint ref={componentRef} />
      </div>
      <DataTable
        {...{
          columns,
          data,
          bordered: true,
          loading,
          scroll: isWidthMD ? { x: true } : { y: 700, x: 1200 },
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
    </React.Fragment>
  )
}
