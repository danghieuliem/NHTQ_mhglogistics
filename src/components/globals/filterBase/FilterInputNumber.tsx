import clsx from 'clsx'
import React, { FC, useCallback, useRef } from 'react'
import NumberFormat from 'react-number-format'

type TProps = {
  name: string
  id: string
  handleSubmit?: (val: number) => void
  handleSearch?: (val: number) => void
  placeholder: string
  inputClassName?: string
  allowNegative?: boolean
  format?: string
  thousandSeparator?: boolean
  prefix?: string
  suffix?: string
  decimalSeparator?: string
  label?: string
}

export const FilterInputNumber: FC<TProps> = ({
  id,
  placeholder,
  name,
  handleSubmit,
  handleSearch,
  inputClassName,
  allowNegative = false,
  format,
  prefix,
  suffix,
  thousandSeparator = true,
  decimalSeparator = '.',
  label,
}) => {
  const input = useRef<null | number>(null)
  const handleInput = (val: number) => (input.current = val)

  return (
    <div className='relative w-full'>
      <div className='py-[2px] text-[10px] font-bold text-label'>{label}</div>
      <NumberFormat
        className={clsx(
          'h-10 w-full !rounded-[6px] border border-[#d9d9d9] pl-2',
          inputClassName,
        )}
        id={id}
        allowNegative={allowNegative}
        format={format}
        prefix={prefix}
        suffix={suffix}
        thousandSeparator={thousandSeparator}
        decimalSeparator={decimalSeparator}
        name={name}
        onValueChange={({ floatValue }) =>
          handleSearch ? handleSearch(floatValue) : handleInput(floatValue)
        }
        onKeyPress={(e) => {
          handleSubmit && e.code === 'Enter' && handleSubmit(input.current)
        }}
        placeholder={placeholder}
      />
      {!handleSearch && (
        <div
          onClick={() => handleSubmit(input.current)}
          className='absolute right-0 top-0 flex w-10 cursor-pointer items-center justify-center px-3'
        >
          <span className='leading-10'>
            <i className='fal fa-search text-base'></i>
          </span>
        </div>
      )}
    </div>
  )
}
