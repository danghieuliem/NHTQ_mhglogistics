import { Avatar, Popover } from 'antd'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { userAvatar } from '~/api'
import { ActionButton, FormUpload } from '~/components'
import { updateUser } from '~/store'
import { _format } from '~/utils'

const templates = [
  {
    id: 1,
    label: 'Giới tính: ',
    key: 'Gender',
    isFormatNumber: false,
    value: null,
  },
  {
    id: 2,
    label: 'Số điện thoại: ',
    key: 'Phone',
    isFormatNumber: false,
    value: null,
  },
  {
    id: 3,
    key: 'Email',
    isFormatNumber: false,
    label: 'Email: ',
    value: null,
  },
  {
    id: 4,
    label: 'Địa chỉ: ',
    key: 'Address',
    isFormatNumber: false,
    value: null,
  },
  {
    id: 5,
    label: 'Tổng tiền đã thanh toán: ',
    value: null,
    key: 'TransactionMoney',
    isFormatNumber: true,
  },
]

export const InfoUserContact: React.FC<any> = ({ data }) => {
  const [info, setInfo] = useState(templates)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!data) return

    const newTemplates = [...templates]
    for (let i in newTemplates) {
      const item = newTemplates[i]
      switch (item.key) {
        case 'Gender':
          item.value = data[item.key] === 0 ? 'Nữ' : 'Nam'
          break
        case 'TransactionMoney':
          item.value = _format.getVND(data[item.key])
          break
        default:
          item.value = data[item.key]
      }
    }
    setInfo(newTemplates)
  }, [data])

  const { control, getValues, watch } = useForm<any>({
    mode: 'onBlur',
  })

  function handleUpdateAvatar(url: any) {
    const newData = {
      ...url,
      userId: data?.Id,
    }

    userAvatar
      .update(newData)
      .then((res) => {
        toast.success('Cập nhật avatar thành công!')
        dispatch(updateUser({ ...data, AvatarIMG: url.AvatarIMG }))
      })
      .catch((error) => {
        toast.error((error as any)?.response?.data?.ResultMessage)
      })
  }

  function _onPress() {
    handleUpdateAvatar({ AvatarIMG: getValues('OGFacebookIMG') })
  }

  return (
    <>
      {window.innerWidth > 640 && (
        <div className='grid grid-cols-12 gap-4'>
          <div className='tableBox flex items-center justify-center sm:col-span-4 sm:flex-col md:col-span-3'>
            <div className='relative'>
              <Avatar
                size={{ sm: 90, md: 120, lg: 150, xl: 150, xxl: 150 }}
                src={
                  data?.AvatarIMG ? data.AvatarIMG : '/default/pro-empty.jpg'
                }
              />
              <Popover
                trigger={'click'}
                placement='right'
                content={
                  <div className='text-center'>
                    <FormUpload
                      control={control}
                      name='OGFacebookIMG'
                      required={false}
                    />
                    <button
                      className={clsx(
                        'mt-2 rounded-[4px] bg-main py-1 px-2 text-white',
                        watch().OGFacebookIMG === undefined && 'opacity-50',
                      )}
                      onClick={() => _onPress()}
                      disabled={watch().OGFacebookIMG === undefined}
                    >
                      Cập nhật
                    </button>
                  </div>
                }
              >
                <span className='upload-avatar'>
                  <i className='fas fa-camera'></i>
                </span>
              </Popover>
            </div>
            <div className='mt-3 text-center'>
              <p className='font-md font-bold uppercase text-sec'>
                {data?.UserName}
              </p>
              <p className='font-[12px] text-[#6A6A6A]'>
                {data?.UserGroupName}
              </p>
            </div>
          </div>

          <div className='tableBox flex flex-col justify-evenly sm:col-span-8 sm:pl-[20px] md:col-span-9 md:pl-[60px]'>
            {info?.map((item) => (
              <div
                className='flex grid-cols-12 justify-between gap-4 sm:grid'
                key={item.id}
              >
                <div className='col-span-3 font-bold'>{item.label}</div>
                <div
                  className={clsx(
                    'col-span-9 text-right text-label md:text-left',
                    item.key === 'TransactionMoney' && 'font-bold !text-red',
                  )}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {window.innerWidth <= 640 && (
        <div className='flex flex-wrap justify-end gap-2'>
          <div className=''>
            <Popover
              trigger={'click'}
              placement='bottom'
              content={
                <div className='text-center'>
                  <FormUpload
                    control={control}
                    name='OGFacebookIMG'
                    required={false}
                  />
                  <button
                    className={clsx(
                      'mt-2 rounded-[4px] bg-main py-1 px-2 text-white',
                      watch().OGFacebookIMG === undefined && 'opacity-50',
                    )}
                    onClick={() => _onPress()}
                    disabled={watch().OGFacebookIMG === undefined}
                  >
                    Cập nhật
                  </button>
                </div>
              }
            >
              <ActionButton
                icon=''
                isButton
                title='Cập nhật ảnh đại diện'
                isButtonClassName='bg-sec !text-white'
              />
            </Popover>
          </div>
          <div className=''>
            <Popover
              trigger={'click'}
              placement='bottom'
              content={
                <div className='flex flex-col justify-evenly'>
                  {info?.map((item) => (
                    <div
                      className='flex grid-cols-12 justify-between gap-4 sm:grid'
                      key={item.id}
                    >
                      <div className='w-1/4 font-bold'>{item.label}</div>
                      <div
                        className={clsx(
                          'w-3/4 text-right text-label',
                          item.key === 'TransactionMoney' &&
                            'font-bold !text-red',
                        )}
                      >
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              }
            >
              <ActionButton
                icon=''
                isButton
                title='Thông tin của bạn'
                isButtonClassName='bg-main !text-white'
              />
            </Popover>
          </div>
        </div>
      )}
    </>
  )
}
