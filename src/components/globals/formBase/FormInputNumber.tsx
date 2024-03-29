import { ErrorMessage } from '@hookform/error-message'
import clsx from 'clsx'
import _ from 'lodash'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form'
import NumberFormat from 'react-number-format'

type TProps<TFieldValues> = {
  required?: boolean
  name: Path<TFieldValues>
  label?: string
  placeholder: string
  rules?: RegisterOptions
  control: Control<TFieldValues, object>
  inputClassName?: string
  allowNegative?: boolean
  disabledOnChange?: boolean
  format?: string
  hideError?: boolean
  inputContainerClassName?: string
  thousandSeparator?: boolean
  prefix?: string
  suffix?: string
  disabled?: boolean
  decimalSeparator?: string
  callback?: (val?: number) => void
  onEnter?: () => void
  decimalScale?: number
  defaultValue?: number
}

export const FormInputNumber = <
  TFieldValues extends FieldValues = FieldValues,
>({
  control,
  name,
  placeholder,
  inputClassName,
  label,
  required = true,
  rules,
  allowNegative = false,
  format,
  hideError = false,
  inputContainerClassName,
  prefix,
  suffix,
  thousandSeparator = true,
  disabledOnChange = false,
  disabled = false,
  decimalSeparator = '.',
  callback,
  onEnter,
  decimalScale,
  defaultValue,
}: TProps<TFieldValues>) => {
  return (
    <div className={`${inputContainerClassName} relative w-full`}>
      {label && (
        <label className='py-[2px] text-[12px] font-bold' htmlFor={name}>
          {label}: {required === true && <span className='text-red'>*</span>}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { onChange, ref, ...newField },
          fieldState: { error },
          formState: { errors },
        }) => (
          <div className='w-full'>
            <NumberFormat
              disabled={disabled}
              prefix={prefix}
              suffix={suffix}
              allowLeadingZeros={true}
              decimalSeparator={decimalSeparator}
              thousandSeparator={thousandSeparator}
              allowNegative={allowNegative}
              format={format}
              placeholder={placeholder}
              defaultValue={defaultValue}
              getInputRef={ref}
              onKeyPress={(e) => {
                if (e.code === 'Enter') {
                  onEnter?.()
                }
              }}
              onValueChange={(value) => {
                onChange(value.floatValue)
                callback?.(value.floatValue)
              }}
              {...newField}
              className={clsx(
                'h-10 w-full !rounded-[4px] border border-[#dedede]  px-[11px] py-[4px] text-[rgba(0,0,0,.85)] placeholder-[#c6c6c6] outline-0 transition duration-300 hover:border-orange focus:border-orange focus:shadow-input',
                inputClassName,
                disabled &&
                  'cursor-not-allowed border-[#dedede] bg-[#f5f5f5] hover:border-[#d9d9d9]',
                !_.isEmpty(error) && '!border-warning',
              )}
              decimalScale={decimalScale}
            />
            {!hideError && (
              <ErrorMessage
                errors={errors}
                name={name as any}
                render={({ message }) => (
                  <p className='mt-1 text-xs font-medium text-warning'>
                    {message}
                  </p>
                )}
              />
            )}
          </div>
        )}
      />
    </div>
  )
}
