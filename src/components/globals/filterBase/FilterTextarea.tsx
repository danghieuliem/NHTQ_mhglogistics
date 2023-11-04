import React, { FC } from 'react'

type TProps = {
  placeholder: string
  onChangeText: (val: string) => void
}

export const FilterTextarea: FC<TProps> = ({ onChangeText, placeholder }) => {
  return (
    <div className='relative'>
      <textarea
        className='h-20 w-full rounded-3xl border border-[#b4b2b23a] p-4 text-xs outline-none'
        onChange={(e) => onChangeText(e.target.value)}
      />
      <div className='absolute -top-3 left-4 z-10 bg-white p-1 text-xs'>
        {placeholder}
      </div>
    </div>
  )
}
