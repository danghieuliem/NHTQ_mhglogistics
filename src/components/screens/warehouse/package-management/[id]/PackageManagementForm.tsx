import { isEmpty } from 'lodash'
import router from 'next/router'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { bigPackage } from '~/api'
import { FormInput, FormInputNumber, FormSelect } from '~/components'
import { IconButton } from '~/components/globals/button/IconButton'
import { toast } from '~/components/toast'
import { EBigPackge, bigPackageStatus } from '~/configs'
import { useDeepEffect } from '~/hooks'

type TProps = {
  data: TPackage
  loading: boolean
  refetch: () => void
}

export const PackageManagementForm: React.FC<TProps> = ({
  data,
  loading,
  refetch,
}) => {
  const { handleSubmit, reset, control } = useForm<TPackage>({
    mode: 'onBlur',
  })

  useDeepEffect(() => reset(data), [data])

  const mutationUpdate = useMutation(bigPackage.update, {
    onSuccess: () => toast.success('Cập nhật bao hàng thành công'),
    onError: toast.error,
  })

  const _onPress = async (data: TPackage) => {
    try {
      await mutationUpdate.mutateAsync(data).finally(() => {
        refetch()
      })
      router.back()
    } catch (error) {}
  }

  const dataForStatus = useMemo(() => {
    let status = [...bigPackageStatus.slice(1)]

    if (data?.Status === EBigPackge.DaHuy) {
      status = status.slice(0, 2)
    } else if (data?.Status !== EBigPackge.MoiTao) {
      status = status.slice(data?.Status)
    }

    return status
  }, [data])

  return (
    <div className='grid gap-4 xs:grid-cols-2'>
      <div className='col-span-full'>
        <FormInput
          control={control}
          name='Code'
          label='Mã bao hàng'
          placeholder=''
          rules={{ required: 'Không bỏ trống mã bao hàng' }}
        />
      </div>
      <div className='col-span-1'>
        <FormInputNumber
          control={control}
          name='Weight'
          label='Cân nặng (kg)'
          placeholder=''
          suffix=' kg'
          rules={{ required: 'Không bỏ trống cân nặng' }}
        />
      </div>
      <div className='col-span-1'>
        <FormInputNumber
          control={control}
          name='Volume'
          label='Khối (m3)'
          placeholder=''
          suffix=' m3'
          rules={{ required: 'Không bỏ trống khối' }}
        />
      </div>
      <div className='col-span-full'>
        <FormSelect
          control={control}
          data={dataForStatus}
          defaultValue={
            isEmpty(data?.Status) &&
            bigPackageStatus.find((x) => x.id === data?.Status)
          }
          name='Status'
          label='Trạng thái'
          placeholder=''
          rules={{ required: 'Không bỏ trống trạng thái' }}
        />
      </div>
      <div className='col-span-full flex border-t border-main pt-4'>
        <IconButton
          disabled={data?.Status === EBigPackge.TrongKhoVN}
          icon='fas fa-pencil'
          title='Cập nhật'
          onClick={handleSubmit(_onPress)}
          showLoading
          btnClass='!mr-2'
          toolip=''
        />
      </div>
    </div>
  )
}
