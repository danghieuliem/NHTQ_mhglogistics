import { Input } from 'antd'
import clsx from 'clsx'
import React, { FC, useCallback, useRef } from 'react'
import { _format } from '~/utils'

type TProps = {
  name: string
  value?: string
  id: string
  handleSubmit?: (val: string) => void
  handleSearch?: (val: string) => void
  placeholder: string
  type?: 'text' | 'number'
  inputClassName?: string
  defaultValue?: string | number
  prefix?: React.ReactNode
  allowClear?: boolean
  label?: string
  disabled?: boolean
}

export const FilterInput: FC<TProps> = ({
  id,
  placeholder,
  name,
  handleSubmit,
  handleSearch,
  type,
  value,
  inputClassName,
  defaultValue,
  prefix,
  allowClear = true,
  label,
  disabled = false,
}) => {
  const input = useRef('')
  const handleInput = useCallback((val: string) => (input.current = val), [])
  return (
    <div className=''>
      <div
        className={clsx(
          'py-[2px] text-[12px] font-bold text-label',
          prefix && 'left-12',
        )}
      >
        {label}
      </div>
      <Input
        className={clsx(
          '!rounded-0 h-10 w-full border border-[#0000003a] pl-2',
          !handleSearch ? 'pr-12' : 'pr-4',
          inputClassName,
        )}
        disabled={disabled}
        type={type}
        value={value}
        defaultValue={defaultValue}
        prefix={prefix}
        suffix={
          !handleSearch &&
          handleSubmit && (
            <div
              onClick={() => handleSubmit(input.current)}
              className='absolute right-0 top-0 flex h-10 cursor-pointer items-center justify-center px-3'
            >
              <span className='border-l border-[#d9d9d9] pl-[10px] leading-9'>
                <i className='fal fa-search text-base'></i>
              </span>
            </div>
          )
        }
        id={id}
        name={name}
        onChange={(e) => {
          handleSearch
            ? handleSearch(e.target.value)
            : handleInput(e.target.value)
        }}
        onKeyPress={(e) => {
          handleSubmit && e.code === 'Enter' && handleSubmit(input.current)
        }}
        allowClear={allowClear}
        placeholder={placeholder}
      />
    </div>
  )
}
