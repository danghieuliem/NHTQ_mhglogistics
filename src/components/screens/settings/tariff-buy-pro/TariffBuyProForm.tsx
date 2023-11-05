import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { feeBuyPro } from '~/api/fee-buy-pro'
import { Button, FormCard, FormInputNumber, Modal, toast } from '~/components'
import { useDeepEffect } from '~/hooks'
import { TForm } from '~/types/table'
import { _format } from '~/utils'

export const TariffBuyProForm: FC<TForm<TTariffBuyPro>> = ({
  onCancel,
  defaultValues,
  visible,
}) => {
  const { handleSubmit, reset, control } = useForm<TTariffBuyPro>({
    defaultValues,
    mode: 'onBlur',
  })

  useDeepEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  // get item by id
  const { isFetching, isError, error, data } = useQuery(
    ['feeBuyProId', defaultValues?.Id],
    () => feeBuyPro.getByID(defaultValues?.Id).then((res) => res.Data),
    {
      enabled: !!defaultValues?.Id,
      refetchOnWindowFocus: false,
      onSuccess: (data) => reset(data),
      onError: toast.error,
    },
  )

  // Update item
  const queryClient = useQueryClient()

  const mutationUpdate = useMutation(feeBuyPro.update, {
    // refresh item + table data after updating successfully
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries('feeBuyProData')
      queryClient.setQueryData(['feeBuyProId', defaultValues?.Id], variables)
      onCancel()
    },
  })
  const _onPress = (data: TTariffBuyPro) => {
    mutationUpdate.mutate({ ...data })
  }

  return (
    <Modal onCancel={onCancel} visible={visible}>
      <FormCard loading={isFetching || mutationUpdate?.isLoading}>
        <FormCard.Header onCancel={onCancel}>
          <div className='w-full'>
            <p className='text-sm md:text-base'>
              CẤU HÌNH DỊCH VỤ MUA HÀNG {defaultValues?.Id}
            </p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className='grid grid-cols-1 gap-3'>
            <div className='col-span-1'>
              <FormInputNumber
                control={control}
                name='PriceFrom'
                label='Giá từ'
                placeholder='Giá từ'
                suffix=' VNĐ'
                rules={{
                  required: 'Không bỏ trống giá từ',
                  validate: (val: number) =>
                    _format.isNumber(val.toString()) ||
                    'Không đúng định dạng số',
                }}
              />
            </div>
            <div className='col-span-1'>
              <FormInputNumber
                control={control}
                name='PriceTo'
                label='Giá đến'
                placeholder='Giá đến'
                suffix=' VNĐ'
                rules={{
                  required: 'Không bỏ trống giá đến',
                  validate: (val: number) =>
                    _format.isNumber(val.toString()) ||
                    'Không đúng định dạng số',
                }}
              />
            </div>
            <div className='col-span-1'>
              <FormInputNumber
                control={control}
                name='FeePercent'
                label='Phí dịch vụ (%)'
                suffix='%'
                placeholder='Phí dịch vụ'
                rules={{
                  required: 'Không bỏ trống phí dịch vụ',
                  validate: (val: number) =>
                    _format.isNumber(val.toString()) ||
                    'Không đúng định dạng số',
                }}
              />
            </div>
            {/* <div className="col-span-1">
							<FormInputNumber
								control={control}
								name="FeeMoney"
								label="Phí (¥)"
								placeholder="Phí (¥)"
								prefix="¥ "
								rules={{
									required: 'Không bỏ trống phí',
									validate: (val: number) =>
										_format.isNumber(val.toString()) ||
										'Không đúng định dạng số'
								}}
							/>
						</div> */}
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
