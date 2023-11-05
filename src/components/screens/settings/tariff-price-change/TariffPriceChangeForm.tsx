import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { priceChange } from '~/api'
import { Button, FormCard, FormInputNumber, Modal, toast } from '~/components'
import { TForm } from '~/types/table'
import { _format } from '~/utils'

const TariffPriceChangeForm: FC<TForm<TTariffPriceChange>> = ({
  onCancel,
  defaultValues,
  visible,
}) => {
  const { handleSubmit, reset, control } = useForm<TTariffPriceChange>({
    defaultValues,
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  // get item by id
  const { isFetching, isError, error, data } = useQuery(
    ['priceChangeId', defaultValues?.Id],
    () => priceChange.getByID(defaultValues?.Id).then((res) => res.Data),
    {
      enabled: !!defaultValues?.Id,
      refetchOnWindowFocus: false,
      onSuccess: (data) => reset(data),
      onError: toast.error,
    },
  )

  // Update item
  const queryClient = useQueryClient()
  const mutationUpdate = useMutation(priceChange.update, {
    // refresh item + table data after updating successfully
    onSuccess: async (_, variables) => {
      toast.success('Cập nhật thành công')
      queryClient.invalidateQueries('priceChangeData')
      queryClient.setQueryData(['priceChangeId', defaultValues?.Id], variables)
      onCancel()
    },
  })

  const _onPress = (data: TTariffPriceChange) => {
    mutationUpdate.mutate({ ...data })
  }

  return (
    <Modal visible={visible} style={{ top: 50 }}>
      <FormCard loading={isFetching || mutationUpdate?.isLoading}>
        <FormCard.Header onCancel={onCancel}>
          <div className='w-full'>
            <p>Cấu hình vận chuyển TQ - VN</p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className='grid gap-3 xs:grid-cols-4'>
            <div className='col-span-1'>
              <FormInputNumber
                control={control}
                name='PriceFromCNY'
                label='Giá tệ từ'
                placeholder='Giá tệ từ'
                rules={{
                  required: 'This is required field',
                  validate: (val: number) =>
                    _format.isNumber(val.toString()) ||
                    'Không đúng định dạng số',
                }}
              />
            </div>
            <div className='col-span-1'>
              <FormInputNumber
                control={control}
                name='PriceToCNY'
                label='Giá tệ đến'
                placeholder='Giá tệ đến'
                rules={{
                  required: 'This is required field',
                  validate: (val: number) =>
                    _format.isNumber(val.toString()) ||
                    'Không đúng định dạng số',
                }}
              />
            </div>
            <div className='col-span-1'>
              <FormInputNumber
                control={control}
                name='Vip0'
                label='Vip 0'
                placeholder='Vip 0'
                rules={{
                  required: 'This is required field',
                  validate: (val: number) =>
                    _format.isNumber(val.toString()) ||
                    'Không đúng định dạng số',
                }}
              />
            </div>
            <div className='col-span-1'>
              <FormInputNumber
                control={control}
                name='Vip1'
                label='Vip 1'
                placeholder='Vip 1'
                rules={{
                  required: 'This is required field',
                  validate: (val: number) =>
                    _format.isNumber(val.toString()) ||
                    'Không đúng định dạng số',
                }}
              />
            </div>
            <div className='col-span-1'>
              <FormInputNumber
                control={control}
                name='Vip2'
                label='Vip 2'
                placeholder='Vip 2'
                rules={{
                  required: 'This is required field',
                  validate: (val: number) =>
                    _format.isNumber(val.toString()) ||
                    'Không đúng định dạng số',
                }}
              />
            </div>
            <div className='col-span-1'>
              <FormInputNumber
                control={control}
                name='Vip3'
                label='Vip 3'
                placeholder='Vip 3'
                rules={{
                  required: 'This is required field',
                  validate: (val: number) =>
                    _format.isNumber(val.toString()) ||
                    'Không đúng định dạng số',
                }}
              />
            </div>
            <div className='col-span-1'>
              <FormInputNumber
                control={control}
                name='Vip4'
                label='Vip 4'
                placeholder='Vip 4'
                rules={{
                  required: 'This is required field',
                  validate: (val: number) =>
                    _format.isNumber(val.toString()) ||
                    'Không đúng định dạng số',
                }}
              />
            </div>
            <div className='col-span-1'>
              <FormInputNumber
                control={control}
                name='Vip5'
                label='Vip 5'
                placeholder='Vip 5'
                rules={{
                  required: 'This is required field',
                  validate: (val: number) =>
                    _format.isNumber(val.toString()) ||
                    'Không đúng định dạng số',
                }}
              />
            </div>
            <div className='col-span-1'>
              <FormInputNumber
                control={control}
                name='Vip6'
                label='Vip 6'
                placeholder='Vip 6'
                rules={{
                  required: 'This is required field',
                  validate: (val: number) =>
                    _format.isNumber(val.toString()) ||
                    'Không đúng định dạng số',
                }}
              />
            </div>
            <div className='col-span-1'>
              <FormInputNumber
                control={control}
                name='Vip7'
                label='Vip 7'
                placeholder='Vip 7'
                rules={{
                  required: 'This is required field',
                  validate: (val: number) =>
                    _format.isNumber(val.toString()) ||
                    'Không đúng định dạng số',
                }}
              />
            </div>
            <div className='col-span-1'>
              <FormInputNumber
                control={control}
                name='Vip8'
                label='Vip 8'
                placeholder='Vip 8'
                rules={{
                  required: 'This is required field',
                  validate: (val: number) =>
                    _format.isNumber(val.toString()) ||
                    'Không đúng định dạng số',
                }}
              />
            </div>
          </div>
        </FormCard.Body>
        <FormCard.Footer>
          <Button
            title='Cập nhật'
            btnClass='!bg-main mr-2'
            onClick={handleSubmit(_onPress)}
          />
          <Button title='Hủy' btnClass='!bg-red' onClick={onCancel} />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  )
}

export const TariffPriceChangeFormMemo = React.memo(TariffPriceChangeForm)
