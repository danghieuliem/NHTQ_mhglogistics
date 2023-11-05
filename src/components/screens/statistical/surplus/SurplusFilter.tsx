import React from 'react'
import { FilterSelect } from '~/components'
import { typeOfUserData } from '~/configs/appConfigs'
import { _format } from '~/utils'

type TProps = {
  handleFilter: (typeOfUser: number) => void
  totalWallet: number
}

export const SurplusFilter: React.FC<TProps> = ({
  handleFilter,
  totalWallet,
}) => {
  return (
    <div className='flex flex-col justify-between gap-2 sm:flex-row sm:items-center'>
      <div className='xs:w-[300px]'>
        <FilterSelect
          data={typeOfUserData}
          isClearable
          placeholder='Chọn loại user'
          label='Loại user'
          handleSearch={(val: number) => {
            handleFilter(val)
          }}
        />
      </div>
      <div className='py-4 text-lg'>
        <span className='text-base'>Tổng số dư:</span>
        <span className='font-bold text-main'>
          {' '}
          {_format.getVND(totalWallet)}
        </span>
      </div>
    </div>
  )
}
