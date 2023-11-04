import { ErrorMessage } from '@hookform/error-message'
import { Radio } from 'antd'
import clsx from 'clsx'
import React from 'react'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form'
import { TFieldSelect } from '~/types/field'

type TProps<TFieldValues, TFieldDatas> = {
  data: TFieldDatas[]
  radio?: {
    [P in keyof TFieldSelect<TFieldDatas>]: TFieldSelect<TFieldDatas>[P]
  }
  required?: boolean
  name: Path<TFieldValues>
  label?: string
  rules?: RegisterOptions
  control: Control<TFieldValues, object>
  radioClassName?: string
}

export const FormRadio = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldDatas extends object = object,
>({
  control,
  data,
  name,
  label,
  radioClassName,
  required = true,
  rules,
  radio = { label: 'name', value: 'id' },
}: TProps<TFieldValues, TFieldDatas>) => {
  const { label: l, value: v } = radio

  return (
    <div className='w-full'>
      {label && (
        <label
          className='py-[2px] text-[12px] font-bold uppercase'
          htmlFor={name}
        >
          {label} {required === true && <span className='text-red'>*</span>}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, formState: { errors } }) => (
          <React.Fragment>
            <Radio.Group
              {...field}
              className={clsx(radioClassName, '!flex h-10 items-center')}
            >
              {data.map((dt) => (
                <Radio key={dt?.[v as string]} value={dt?.[v as string]}>
                  {dt?.[l as string]}
                </Radio>
              ))}
            </Radio.Group>
            <ErrorMessage
              errors={errors}
              name={name as any}
              render={({ message }) => (
                <p className='mt-1 text-xs font-medium text-warning'>
                  {message}
                </p>
              )}
            />
          </React.Fragment>
        )}
      />
    </div>
  )
}
