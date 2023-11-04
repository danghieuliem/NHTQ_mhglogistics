import clsx from 'clsx'
import React from 'react'

type TProps = {
  label: string
  required?: boolean
  className?: string
}

const index: React.FC<TProps> = ({ label, required = true, className }) => {
  return (
    <label className={clsx('text-gray-700 mb-1 block text-sm', className)}>
      {label} {required && <span className='text-red'>*</span>}
    </label>
  )
}

export default index
