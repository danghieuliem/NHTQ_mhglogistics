import clsx from 'clsx'
import { isNumber } from 'lodash'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { payHelp } from '~/api'
import { FormInput, FormInputNumber, FormTextarea } from '~/components'
import { IconButton } from '~/components/globals/button/IconButton'
import { useDeepEffect } from '~/hooks'
import { RootState } from '~/store'

export const CreateRequestPaymentForm = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo,
  )

  const [loading, setLoading] = useState(false)

  const { control, handleSubmit, watch, setValue } =
    useForm<TCreateRequestPaymentOrder>({
      mode: 'onBlur',
      defaultValues: {
        UserName: userCurrentInfo.UserName,
        PayHelpDetails: [
          {
            desc2: '',
            desc1: null,
          },
        ],
      },
    })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'PayHelpDetails',
  })

  const handleBill = (type: 'add' | 'remove', index: number = -1) => {
    if (type === 'add') {
      append({
        desc2: '',
        desc1: null,
      })
    } else {
      if (fields.length > 1) {
        remove(index)
      } else {
        toast.warning('Phải có ít nhất 1 hoá đơn')
      }
    }
  }

  // thực hiện tính tổng tiền
  // ===== BEGIN =====
  const [totalPrice, setTotalPrice] = useState<number>(null)

  useDeepEffect(() => {
    const sumTotalPrice = watch('PayHelpDetails').reduce((prev, cur) => {
      // prev = null và price = null hoặc prev = number và price = null
      if (
        (!isNumber(prev) && !isNumber(cur.desc1)) ||
        (isNumber(prev) && !isNumber(cur.desc1))
      ) {
        return prev
      }
      // prev = null và price = number
      else if (!isNumber(prev) && isNumber(cur.desc1)) {
        return cur.desc1
      }
      // prev = number và price = number
      else {
        return prev + cur.desc1
      }
    }, null as number)

    if (sumTotalPrice !== totalPrice) {
      setTotalPrice(sumTotalPrice)
    }

    // trường hợp = null và 0
    if (sumTotalPrice === null || sumTotalPrice === 0) {
      setValue('Currency', sumTotalPrice)
      setValue('TotalPrice', sumTotalPrice)
      setValue('TotalPriceVND', sumTotalPrice)
    }
  }, [watch('PayHelpDetails').map((item) => item.desc1)])
  // ===== END =====

  useEffect(() => {
    ;(async () => {
      // kiểm tra khác 0 và null
      if (totalPrice) {
        try {
          const currency = await (
            await payHelp.getExchangeRate(totalPrice)
          ).Data

          setValue('TotalPrice', totalPrice)
          setValue('TotalPriceVND', totalPrice * currency)
          setValue('Currency', currency)
        } catch (error) {
          toast.error((error as any)?.response?.data?.ResultMessage)
        }
      }
    })()
  }, [totalPrice])

  // add item
  const queryClient = useQueryClient()
  const mutationAdd = useMutation((Data: any) => payHelp.create({ ...Data }), {
    // refresh item + table data after adding successfully
    onSuccess: async () => {
      mutationAdd.reset()
      toast.success('Gửi yêu cầu thanh toán hộ thành công')
      queryClient.invalidateQueries({ queryKey: 'menuData' })
      Router.push('/user/request-list')
      setLoading(false)
    },
    onError: (error) => {
      toast.error((error as any)?.response?.data?.ResultMessage)
    },
  })

  const _onPress = (data: TCreateRequestPaymentOrder) => {
    setLoading(true)
    mutationAdd.mutate(data)
  }

  return (
    <div
      className='grid grid-cols-2 gap-4'
      style={{ pointerEvents: loading ? 'none' : 'all' }}
    >
      <div className='tableBox col-span-2 md:col-span-1'>
        <div className='col-span-2 mb-4 flex flex-col items-end gap-2 border-b border-[#cdd6cd] pb-4 sm:flex-row'>
          <div className='w-full'>
            <FormInput
              control={control}
              name='UserName'
              label='Username'
              placeholder=''
              rules={{ required: 'This field is required' }}
              disabled
            />
          </div>
          <div className='flex w-full items-center justify-end'>
            <IconButton
              onClick={() => handleBill('add')}
              btnClass=''
              icon=''
              title='Thêm'
              showLoading
              toolip=''
              green
            />
          </div>
        </div>
        <div className='col-span-2'>
          <div className='max-h-[30vh] overflow-y-auto pr-2'>
            {fields.map((item, index) => (
              <div
                key={item?.id}
                className={clsx(
                  'flex flex-col items-end gap-2 sm:flex-row sm:items-center',
                  index !== 0 && 'mt-4',
                )}
              >
                <div className='flex w-full flex-1 items-center gap-3'>
                  <span className='text-xl'>{index + 1}</span>
                  <div className='flex w-full flex-1 flex-col'>
                    <FormInputNumber
                      control={control}
                      name={`PayHelpDetails.${index}.desc1` as const}
                      placeholder='Giá tiền (¥)'
                      label=''
                      prefix='¥ '
                      hideError
                      rules={{ required: 'This field is required' }}
                    />
                    <FormInput
                      control={control}
                      name={`PayHelpDetails.${index}.desc2` as const}
                      placeholder='Nội dung'
                      allowClear
                    />
                  </div>
                  <IconButton
                    onClick={() => handleBill('remove', index)}
                    btnClass=''
                    icon=''
                    title='Xoá'
                    showLoading
                    toolip=''
                    red
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='tableBox relative col-span-2 grid grid-cols-2 gap-4 md:col-span-1'>
        <div className='col-span-full md:col-span-1'>
          <FormInputNumber
            control={control}
            name='Currency'
            label='Tỉ Giá'
            placeholder=''
            required={false}
            disabled
          />
          <FormInputNumber
            control={control}
            name='TotalPrice'
            label='Tổng tiền Tệ (¥)'
            prefix='¥ '
            placeholder=''
            disabled
            required={false}
          />
          <FormInputNumber
            control={control}
            name='TotalPriceVND'
            label='Tổng tiền (VNĐ)'
            placeholder=''
            suffix=' VNĐ'
            disabled
            required={false}
          />
        </div>
        <div className='col-span-full md:col-span-1'>
          <FormTextarea
            control={control}
            name='Note'
            label='Ghi chú'
            placeholder=''
            required={false}
          />
        </div>
        <div className='bottom-[10px] right-[10px] md:absolute'>
          <IconButton
            onClick={handleSubmit(_onPress)}
            btnClass='mt-4 !bg-blue !text-white'
            icon={loading ? 'fas fa-sync fa-spin' : 'fas fa-check-circle'}
            title='Tạo'
            showLoading
            toolip=''
          />
        </div>
      </div>
    </div>
  )
}
