import { Divider } from 'antd'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Barcode from 'react-barcode'
import ReactToPrint, {
  PrintContextConsumer,
  useReactToPrint,
} from 'react-to-print'
import {
  ActionButton,
  DataTable,
  FormInputNumber,
  FormSelect,
  FormTextarea,
} from '~/components'
import { ESmallPackageStatusData } from '~/configs/appConfigs'
import { useScreen } from '~/hooks'
import { TControl } from '~/types/field'
import { TColumnsType, TTable } from '~/types/table'

export const CheckWarehouseChinaTable: React.FC<
  TTable<TWarehouseCN> &
    TControl<{ [key: string]: TWarehouseVN[] }> & {
      type?: 'china' | 'vietnam'
      name: string
      onPress: (data: (TWarehouseCN | TWarehouseVN)[]) => void
      onHide: (key: string, item: TWarehouseCN | TWarehouseCN[]) => void
      handleAssign?: (
        data?: TWarehouseVN,
        type?: 'assign1' | 'assign2',
        name?: string,
        record?: any,
      ) => void
      onIsLost: (item?: any) => void
      bigPackageList?: TPackage[]
      defaultIdBigPackageSelected?: number
    }
> = ({
  data,
  name,
  control,
  bigPackageList,
  defaultIdBigPackageSelected,
  handleSubmit,
  onPress,
  onHide,
  handleAssign,
  onIsLost,
  type = 'china',
}) => {
  const componentRef = useRef<ReactToPrint>(null)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const [dataPrint, setDataPrint] = useState(null)

  const { isWidthMD, isWidthSM } = useScreen()

  // của trung quốc
  const columns: TColumnsType<TWarehouseCN> = [
    {
      dataIndex: 'MainOrderId',
      title: 'Đơn hàng',
      width: 80,
      render: (_, record) => {
        let url = ''
        if (record?.OrderType === 3) {
          url = '/404'
        } else {
          url =
            record?.OrderType === 1
              ? `/manager/order/order-list/detail/?id=${record?.MainOrderId}`
              : `/manager/deposit/deposit-list/detail/?id=${record?.TransportationOrderId}`
        }
        return (
          <div className='flex flex-col items-center justify-end'>
            <Link href={url}>
              <a target={'_blank'}>
                {record?.MainOrderId
                  ? record?.MainOrderId
                  : record?.TransportationOrderId}
              </a>
            </Link>
            <div className='text-center'>{record?.OrderTypeName}</div>
          </div>
        )
      },
      fixed: isWidthMD ? null : 'left',
    },
    {
      dataIndex: 'IsPackged',
      title: 'Dịch vụ',
      width: 80,
      render: (_, record) => (
        <div className='flex flex-col items-center justify-center'>
          <div className='flex w-full justify-evenly'>
            <p className='font-medium'>KĐ</p>
            {record.IsCheckProduct ? (
              <i className='fas fa-check-circle text-xl text-success'></i>
            ) : (
              <i className='fas fa-times-circle text-xl text-warning'></i>
            )}
          </div>
          <div className='flex w-full justify-evenly'>
            <p className='font-medium'>ĐG</p>
            {record.IsPackged ? (
              <i className='fas fa-check-circle text-xl text-success'></i>
            ) : (
              <i className='fas fa-times-circle text-xl text-warning'></i>
            )}
          </div>
          <div className='flex w-full justify-evenly'>
            <p className='font-medium'>BH</p>
            {record.IsInsurance ? (
              <i className='fas fa-check-circle text-xl text-success'></i>
            ) : (
              <i className='fas fa-times-circle text-xl text-warning'></i>
            )}
          </div>
          <div className='flex w-full justify-evenly'>
            <p className='font-medium'>GH</p>
            {false ? (
              <i className='fas fa-check-circle text-xl text-success'></i>
            ) : (
              <i className='fas fa-times-circle text-xl text-warning'></i>
            )}
          </div>
        </div>
      ),
      fixed: isWidthMD ? null : 'left',
      responsive: ['md'],
    },
    {
      dataIndex: 'OrderTransactionCode',
      title: 'Mã vận đơn',
      fixed: isWidthMD ? null : 'left',
      width: 150,
    },
    {
      dataIndex: 'TotalOrder',
      title: 'Kiểm đếm',
      width: 150,
      responsive: ['md'],
      render: (_, record, index) => {
        return (
          <div className='flex flex-col gap-1'>
            {record?.OrderType === 2 ? (
              <div>
                Loại: <span className='font-bold'>{record?.ProductType}</span>
              </div>
            ) : (
              <div>
                Số loại: <span className='font-bold'>{_}</span>
              </div>
            )}

            <div>
              Số lượng:{' '}
              <span className='font-bold'>{record?.TotalOrderQuantity}</span>
            </div>
            {/* <FormInput
              control={control}
              name={`${name}.${index}.StaffNoteCheck` as any}
              label="Nv kho check"
              placeholder=""
              onEnter={handleSubmit((data) => onPress([data[name][index]]))}
            /> */}
          </div>
        )
      },
    },
    {
      dataIndex: 'Weight',
      title: (
        <>
          Cân nặng
          <br />
          (kg)
        </>
      ),
      width: 100,
      align: 'center',
      responsive: ['md'],
      render: (_, __, index) => (
        <FormInputNumber
          control={control}
          name={`${name}.${index}.Weight` as any}
          placeholder=''
          inputClassName='text-center w-[80px] text-center'
          defaultValue={0}
          onEnter={handleSubmit((data) => onPress([data[name][index]]))}
        />
      ),
    },
    {
      dataIndex: 'Width',
      title: 'Kích thước',
      align: 'center',
      width: 150,
      responsive: ['md'],
      render: (_, __, index) => {
        return (
          <div className='flex flex-col gap-1'>
            <FormInputNumber
              control={control}
              name={`${name}.${index}.Length` as any}
              placeholder=''
              inputClassName='text-center w-[80px] text-center'
              onEnter={handleSubmit((data) => onPress([data[name][index]]))}
              defaultValue={0}
              prefix='D = '
            />
            <FormInputNumber
              control={control}
              name={`${name}.${index}.Width` as any}
              placeholder=''
              inputClassName='text-center w-[80px] text-center'
              onEnter={handleSubmit((data) => onPress([data[name][index]]))}
              defaultValue={0}
              prefix='R = '
            />
            <FormInputNumber
              control={control}
              name={`${name}.${index}.Height` as any}
              placeholder=''
              inputClassName='text-center w-[80px] text-center'
              onEnter={handleSubmit((data) => onPress([data[name][index]]))}
              defaultValue={0}
              prefix='C = '
            />
            <div className='text-center font-bold'>{__?.VolumePayment} m3</div>
          </div>
        )
      },
    },
    {
      dataIndex: 'BigPackageId',
      title: () => <div className='text-center'>Bao lớn</div>,
      width: 250,
      responsive: ['md'],
      render: (_, __, index) => {
        return (
          <FormSelect
            control={control}
            name={`${name}.${index}.BigPackageId` as any}
            data={bigPackageList}
            defaultValue={
              data[index]?.BigPackageId
                ? {
                    Name: bigPackageList?.filter(
                      (x) => x?.Id === data[index]?.BigPackageId,
                    )[0]?.Name,
                    Id: data[index]?.BigPackageId,
                  }
                : {
                    Name: 'Chưa chọn bao lớn!',
                    Id: 0,
                  }
            }
            placeholder=''
            select={{ label: 'Name', value: 'Id' }}
            isClearable
          />
        )
      },
    },
    {
      dataIndex: 'Description',
      title: 'Ghi chú',
      responsive: ['lg'],
      render: (_, __, index) => (
        <FormTextarea
          control={control}
          name={`${name}.${index}.Description` as any}
          placeholder=''
          rows={3}
          onEnter={handleSubmit((data) => onPress([data[name][index]]))}
        />
      ),
    },
    // {
    //   dataIndex: "UserNote",
    //   title: "Khách ghi chú",
    //   render: (_, __, index) => (
    //     <FormTextarea
    //       control={control}
    //       name={`${name}.${index}.UserNote` as any}
    //       placeholder=""
    //       onEnter={handleSubmit((data) => onPress([data[name][index]]))}
    //     />
    //   ),
    // },
    // {
    //   dataIndex: "IMG",
    //   title: "Hình ảnh",
    //   width: 120,
    //   align: "center",
    //   render: (_, __, index) => (
    //     <FormUpload
    //       control={control}
    //       name={`${name}.${index}.IMG` as any}
    //       image
    //     />
    //   ),
    // },
    {
      dataIndex: 'action',
      title: 'Thao tác',
      align: 'right',
      width: 140,
      responsive: ['md'],
      render: (_, record, index) => (
        <div className='flex flex-col gap-2'>
          {record.Status <= ESmallPackageStatusData.ArrivedToChinaWarehouse && (
            <ActionButton
              icon='fas fa-sync-alt'
              onClick={handleSubmit((data) => onPress([data[name][index]]))}
              title='Cập nhật'
              isButton
              // isButtonClassName="bg-main !text-white"
            />
          )}
          <ActionButton
            icon='fas fa-barcode-read'
            onClick={() => {
              setDataPrint(record)
            }}
            title='In barcode'
            isButton
            // isButtonClassName="bg-sec !text-white"
          />
          <ActionButton
            icon='fas fa-eye-slash'
            onClick={() => onHide(name, record)}
            title='Ẩn đi'
            isButton
            // isButtonClassName="bg-red !text-white"
          />
        </div>
      ),
      fixed: isWidthSM ? null : 'right',
    },
  ]

  // của việt nam
  const columnsVN: TColumnsType<TWarehouseVN> = [
    {
      dataIndex: 'MainOrderId',
      title: 'Đơn hàng',
      width: 80,
      render: (_, record) => {
        let url = ''
        if (record?.OrderType === 3) {
          url = '/404'
        } else {
          url =
            record?.OrderType === 1
              ? `/manager/order/order-list/detail/?id=${record?.MainOrderId}`
              : `/manager/deposit/deposit-list/detail/?id=${record?.TransportationOrderId}`
        }
        return (
          <div className='flex flex-col items-center justify-end'>
            <Link href={url}>
              <a target={'_blank'}>
                {record?.MainOrderId
                  ? record?.MainOrderId
                  : record?.TransportationOrderId}
              </a>
            </Link>
            <div className='text-center'>{record?.OrderTypeName}</div>
          </div>
        )
      },
      fixed: isWidthMD ? null : 'left',
    },
    {
      dataIndex: 'IsPackged',
      title: 'Dịch vụ',
      width: 80,
      responsive: ['lg'],
      render: (_, record) => (
        <div className='flex flex-col items-center justify-center'>
          <div className='flex w-full justify-evenly'>
            <p className='font-medium'>KĐ</p>
            {record.IsCheckProduct ? (
              <i className='fas fa-check-circle text-xl text-success'></i>
            ) : (
              <i className='fas fa-times-circle text-xl text-warning'></i>
            )}
          </div>
          <div className='flex w-full justify-evenly'>
            <p className='font-medium'>ĐG</p>
            {record.IsPackged ? (
              <i className='fas fa-check-circle text-xl text-success'></i>
            ) : (
              <i className='fas fa-times-circle text-xl text-warning'></i>
            )}
          </div>
          <div className='flex w-full justify-evenly'>
            <p className='font-medium'>BH</p>
            {record.IsInsurance ? (
              <i className='fas fa-check-circle text-xl text-success'></i>
            ) : (
              <i className='fas fa-times-circle text-xl text-warning'></i>
            )}
          </div>
          <div className='flex w-full justify-evenly'>
            <p className='font-medium'>GH</p>
            {false ? (
              <i className='fas fa-check-circle text-xl text-success'></i>
            ) : (
              <i className='fas fa-times-circle text-xl text-warning'></i>
            )}
          </div>
        </div>
      ),
      fixed: isWidthMD ? null : 'left',
    },
    {
      dataIndex: 'OrderTransactionCode',
      title: 'Mã vận đơn',
      width: 150,
      fixed: isWidthMD ? null : 'left',
    },
    {
      dataIndex: 'TotalOrder',
      title: 'Kiểm đếm',
      width: 150,
      responsive: ['md'],
      render: (value, record) => {
        return (
          <div className='flex flex-col gap-1'>
            {record?.OrderType === 2 ? (
              <div>
                Loại: <span className='font-bold'>{record?.ProductType}</span>
              </div>
            ) : (
              <div>
                Số loại: <span className='font-bold'>{value}</span>
              </div>
            )}
            <div>
              Số lượng:{' '}
              <span className='font-bold'>{record?.TotalOrderQuantity}</span>
            </div>
            {/* <FormInput
              control={control}
              name={`${name}.${index}.StaffNoteCheck` as any}
              label="Nv kho check"
              placeholder=""
              onEnter={handleSubmit((data) => onPress([data[name][index]]))}
            /> */}
          </div>
        )
      },
    },
    {
      dataIndex: 'Weight',
      title: 'Cân nặng (kg)',
      align: 'center',
      responsive: ['md'],
      width: 200,
      render: (_, __, index) => (
        <FormInputNumber
          control={control}
          name={`${name}.${index}.Weight` as any}
          placeholder=''
          inputClassName='text-center w-[80px] text-center'
          onEnter={handleSubmit((data) => onPress([data[name][index]]))}
        />
      ),
    },
    {
      dataIndex: 'Width',
      title: 'Kích thước',
      align: 'center',
      responsive: ['md'],
      width: 200,
      render: (_, __, index) => {
        return (
          <div className='flex flex-col gap-1'>
            <FormInputNumber
              control={control}
              name={`${name}.${index}.Length` as any}
              placeholder=''
              inputClassName='text-center w-[80px] text-center'
              onEnter={handleSubmit((data) => onPress([data[name][index]]))}
              prefix='D = '
            />
            <FormInputNumber
              control={control}
              name={`${name}.${index}.Width` as any}
              placeholder=''
              inputClassName='text-center w-[80px] text-center'
              onEnter={handleSubmit((data) => onPress([data[name][index]]))}
              prefix='R = '
            />
            <FormInputNumber
              control={control}
              name={`${name}.${index}.Height` as any}
              placeholder=''
              inputClassName='text-center w-[80px] text-center'
              onEnter={handleSubmit((data) => onPress([data[name][index]]))}
              prefix='C = '
            />
            <div className='text-center font-bold'>{__?.VolumePayment} m3</div>
          </div>
        )
      },
    },
    {
      dataIndex: 'BigPackageName',
      title: 'Bao lớn',
      width: 200,
      responsive: ['md'],
      render: (value, record) => {
        return <span>{value}</span>
      },
    },
    {
      dataIndex: 'Description',
      title: 'Ghi chú',
      responsive: ['lg'],
      width: 200,
      render: (_, __, index) => (
        <FormTextarea
          control={control}
          name={`${name}.${index}.Description` as any}
          placeholder=''
          rows={3}
          onEnter={handleSubmit((data) => onPress([data[name][index]]))}
        />
      ),
    },
    // {
    //   dataIndex: "UserNote",
    //   title: "Khách ghi chú",
    //   render: (_, __, index) => (
    //     <FormTextarea
    //       control={control}
    //       name={`${name}.${index}.UserNote` as any}
    //       placeholder=""
    //       onEnter={handleSubmit((data) => onPress([data[name][index]]))}
    //     />
    //   ),
    // },
    {
      dataIndex: 'action',
      title: 'Thao tác',
      align: 'right',
      width: 160,
      responsive: ['sm'],
      render: (_, record, index) => (
        <div className='flex flex-col gap-1'>
          <ActionButton
            icon='fas fa-sync-alt'
            onClick={handleSubmit((data) => onPress([data[name][index]]))}
            title='Cập nhật'
            isButton
            // isButtonClassName="bg-main !text-white"
          />
          {/* <ActionButton
						icon="fas fa-map-marker-alt-slash"
						onClick={handleSubmit((data) => onIsLost(data[name]))}
						title="Thất lạc"
					/> */}
          {!record.MainOrderId && !record?.TransportationOrderId && (
            <ActionButton
              icon='fas fa-plus'
              // onClick={handleSubmit((data) => {
              //   handleAssign(data[name][index], "assign1", name, record);
              // })}

              onClick={() => {
                onHide(name, record)
                handleAssign(record, 'assign1', name, record)
              }}
              title='Mua hộ'
              isButton
              // isButtonClassName="bg-green !text-white"
            />
          )}
          {!record?.MainOrderCodeId && !record?.TransportationOrderId && (
            <ActionButton
              icon='fas fa-plus'
              onClick={() => {
                onHide(name, record)
                handleAssign(record, 'assign2', name, record)
              }}
              // onClick={handleSubmit((data) =>
              //   handleAssign(data[name][index], "assign2")
              // )}
              isButton
              title='Ký gửi'
            />
          )}
          {/* <ActionButton
            icon="fas fa-barcode-read"
            onClick={() => {
              JsBarcode("#barcode", record?.OrderTransactionCode, {
                displayValue: false,
                width: 3,
              });
              handlePrint();
            }}
            title="In barcode"
            isButton
          /> */}
          <ReactToPrint content={() => componentRef.current}>
            <PrintContextConsumer>
              {({ handlePrint }) => (
                <ActionButton
                  icon='fas fa-barcode-read'
                  onClick={() => {
                    setDataPrint(record)
                    // setDataPrint(record);
                    // JsBarcode("#barcode", record?.OrderTransactionCode, {
                    //   displayValue: true,
                    //   fontSize: 20,
                    //   width: 6,
                    // });
                  }}
                  title='In barcode'
                  isButton
                />
              )}
            </PrintContextConsumer>
          </ReactToPrint>
          <ActionButton
            icon='fas fa-eye-slash'
            onClick={() => onHide(name, record)}
            title='Ẩn kiện'
            isButton
            // isButtonClassName="bg-red !text-white"
          />
        </div>
      ),
      fixed: isWidthSM ? null : 'right',
    },
  ]

  const ComponentToPrint = React.forwardRef<{}, {}>((props, ref: any) => {
    return (
      <div
        ref={ref}
        className='flex w-full flex-col items-center justify-center'
      >
        {/* <svg className="w-full m-auto" id="barcode"></svg>
         */}
        <Barcode value={dataPrint?.OrderTransactionCode || 'barcode'} />
        <div className='text-[18px]'>
          Username: <span className='font-bold'>{dataPrint?.UserName}</span>
        </div>
      </div>
    )
  })

  const handlePrintFunc = (callback: any) => {
    // JsBarcode("#barcode", dataPrint?.OrderTransactionCode, {
    //   displayValue: false,
    //   width: 5,
    // });
    callback()
  }

  useEffect(() => {
    if (dataPrint) {
      handlePrintFunc(handlePrint)
      setDataPrint(null)
    }
  }, [dataPrint?.UID])

  return (
    <div className='mt-4 '>
      <div className='hidden'>
        <ComponentToPrint ref={componentRef} />
      </div>
      <div className='grid gap-4 sm:grid-cols-4'>
        <div className='flex w-fit items-center rounded-[6px] bg-white px-4 !text-sec shadow-md sm:col-span-2'>
          <div className='mr-2 font-bold uppercase'>
            {data?.[0]?.UserName || 'Chưa xác định'} |{' '}
            {data?.[0]?.Phone || 'Chưa xác định'}
          </div>
          <span className='text-lg font-bold text-red'>{`(${data?.length})`}</span>
        </div>
        <div className='flex flex-col gap-2 xs:flex-row xs:items-center sm:col-span-2 sm:justify-end'>
          <ActionButton
            onClick={() => onHide(name, [])}
            title='Ẩn tất cả'
            icon='fas fa-eye-slash'
            isButton
            isButtonClassName='bg-red !text-white'
          />
          <ActionButton
            icon='fas fa-pencil'
            title='Cập nhật tất cả'
            onClick={handleSubmit((dataSubmit) => {
              onPress(dataSubmit[name])
            })}
            isButton
            isButtonClassName='bg-blue !text-white'
          />
        </div>
      </div>

      <DataTable
        {...{
          data,
          scroll: isWidthSM ? { x: true } : { x: 600 },
          columns: type === 'china' ? columns : columnsVN,
        }}
      />
      <Divider />
    </div>
  )
}
