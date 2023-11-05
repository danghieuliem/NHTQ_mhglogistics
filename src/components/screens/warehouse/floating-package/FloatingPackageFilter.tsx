import React from 'react'
import { FilterInput } from '~/components'

const codeProps = {
  id: 'code',
  name: 'code',
  placeholder: 'Mã vận đơn',
}

type TProps = {
  handleFilter: (newFilter) => void
}

export const FloatingPackageFilter: React.FC<TProps> = ({ handleFilter }) => {
  return (
    <div className='max-w-[200px]'>
      <FilterInput
        {...codeProps}
        inputClassName='barcode'
        handleSubmit={(val) =>
          handleFilter({ PageIndex: 1, SearchContent: val })
        }
        allowClear={false}
      />
    </div>
  )
}
