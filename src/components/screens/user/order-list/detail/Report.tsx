import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { complain } from '~/api'
import {
  Button,
  FormInputNumber,
  FormTextarea,
  FormUploadMultiple,
} from '~/components'
import { RootState } from '~/store'

type TPropsTable = {
  Id?: number
  UID: number
  ImageOrigin?: string
  TitleOrigin?: string
  UPriceBuy?: number
  UPriceBuyVN?: number
  ComplainText?: string
  IMG?: string[] | string
  Amount?: number
}

type TProps = {
  defaultValue: any
}

const ReportContent = ({ defaultValue }: TProps) => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo,
  )

  const { handleSubmit, control } = useForm<TPropsTable>({
    mode: 'onBlur',
    defaultValues: {
      ...defaultValue,
      recieveNumber: 0,
    },
  })

  // useEffect(() => {
  //   resetField("Amount")
  // }, [defaultValue?.Id]);

  const queryClient = useQueryClient()

  const mutationAdd = useMutation((data: TPropsTable) => complain.create(data))

  const _onPress = async (data: TPropsTable) => {
    const id = toast.loading('Đang xử lý ...')

    const newData = defaultValue.OrderType
      ? {
          MainOrderId: data?.Id,
          UID: userCurrentInfo?.Id,
          // TitleOrigin: data?.TitleOrigin,
          ComplainText: data?.ComplainText,
          IMG: JSON.stringify(data?.IMG),
          Amount: data?.Amount,
        }
      : {
          TransportationOrderId: data?.Id,
          UID: userCurrentInfo?.Id,
          // TitleOrigin: data?.TitleOrigin,
          ComplainText: data?.ComplainText,
          IMG: JSON.stringify(data?.IMG),
          Amount: data?.Amount,
        }

    await mutationAdd
      .mutateAsync(newData)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: 'orderList' })
        queryClient.invalidateQueries({ queryKey: 'userDepositList' })

        toast.update(id, {
          render: 'Tạo khiếu nại thành công',
          type: 'success',
          autoClose: 500,
          isLoading: false,
        })
      })
      .catch((error) => {
        toast.update(id, {
          render: (error as any)?.response?.data?.ResultMessage,
          type: 'error',
          autoClose: 1000,
          isLoading: false,
        })
      })
  }

  return (
    <React.Fragment>
      <div className='p-4'>
        <div className='grid grid-cols-1 gap-2'>
          {/* <div className="col-span-1">
            <FormInput
              control={control}
              name="Id"
              disabled
              label="Mã sản phẩm"
              placeholder=""
              required={false}
            />
          </div> */}
          <h1 className='text-lg font-bold'>
            Tạo khiếu nại đơn hàng #{defaultValue?.Id}
          </h1>
          <div className='col-span-1'>
            <FormInputNumber
              control={control}
              name='Amount'
              label='Số tiền y/c bồi thường (VNĐ)'
              suffix=' VNĐ'
              placeholder=''
              rules={{ required: 'Vui lòng nhập số tiền bồi thường' }}
            />
          </div>
          <div className='col-span-1'>
            <FormTextarea
              control={control}
              name='ComplainText'
              label='Nội dung'
              placeholder=''
              rules={{ required: 'Vui lòng nhập nội dung khiếu nại' }}
            />
          </div>
          <div className='col-span-1 w-[710px]'>
            <FormUploadMultiple
              control={control}
              name='IMG'
              label='Hình ảnh'
              rules={{ required: 'Vui lòng thêm ảnh khiếu nại' }}
            />
            <p className='italic text-red'>
              Lưu ý: Up tối đa 6 ảnh, định dạng .jpg hoặc .png
            </p>
          </div>
        </div>
        <div className='mt-4 text-right'>
          <Button
            title='Tạo khiếu nại'
            onClick={handleSubmit(_onPress)}
            // icon={loading ? "fas fa-sync fa-spin" : "fas fa-check-circle"}
            // btnIconClass="!mr-2"
            // showLoading
            // toolip=""
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export const ReportContentMemo = React.memo(ReportContent)
