import { Tooltip } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React from 'react'
import { Button } from '~/components'

type TProps = {
  name: string
  defaultValue: string
  onClick: (val: string) => Promise<any>
}

export const DepositStatisticNote: React.FC<TProps> = ({
  name,
  defaultValue,
  onClick,
}) => {
  const value = React.useRef(null)

  return (
    <div className='flex flex-col items-center'>
      <Tooltip placement='topRight' title={'Enter để cập nhật'}>
        <TextArea
          className='block min-h-[60px] rounded-md border border-[transparent] bg-[#f8f6f6] p-2 text-xs text-black outline-0 focus-visible:border-orange'
          id={name}
          rows={2}
          name={name}
          defaultValue={defaultValue}
          onChange={(e) => (value.current = e.target.value)}
          placeholder='Nhập ghi chú...'
          onPressEnter={() => onClick(value.current)}
        />
      </Tooltip>
      {/* <Button showLoading title="Cập nhật" onClick={() => onClick(value.current)} btnClass="mt-2 !bg-orange h-8 w-[60%]" /> */}
    </div>
  )
}
