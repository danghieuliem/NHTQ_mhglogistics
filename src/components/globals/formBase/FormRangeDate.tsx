import React from 'react'
import { TimePicker } from 'antd'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import moment from 'moment'
import clsx from 'clsx'
import _ from 'lodash'

const styles = { height: 40 }

type TProps<TFieldValues> = {
  defaultValue?: [string, string]
  required?: boolean
  name: Path<TFieldValues>
  label: string
  placeholder?: [string, string]
  rules?: RegisterOptions
  control: Control<TFieldValues, object>
  format?: string
}

export const FormRangeDate = <TFieldValues extends FieldValues = FieldValues>({
  control,
  label,
  name,
  placeholder = ['Từ ngày', 'Đến ngày'],
  defaultValue,
  required = true,
  rules,
  format = 'HH:mm',
}: TProps<TFieldValues>) => {
  return (
    <React.Fragment>
      <label
        className='py-[2px] text-[12px] font-bold uppercase'
        htmlFor={name}
      >
        {label} {required === true && <span className='text-red'>*</span>}
      </label>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { value, onChange, ...newField },
          fieldState: { error },
          formState: { errors },
        }) => (
          <div key={defaultValue?.toString()}>
            <TimePicker.RangePicker
              format={format}
              style={styles}
              placeholder={placeholder}
              onChange={(dates) =>
                dates
                  ? onChange(
                      dates
                        .map((date) => moment(date).format(format))
                        .join('-'),
                    )
                  : onChange(undefined)
              }
              {...newField}
              className={clsx({ '!border-warning': !_.isEmpty(error) })}
            />
            <ErrorMessage
              errors={errors}
              name={name as any}
              render={({ message }) => (
                <p className='mt-1 text-xs font-medium text-warning'>
                  {message}
                </p>
              )}
            />
          </div>
        )}
      />
    </React.Fragment>
  )
}
