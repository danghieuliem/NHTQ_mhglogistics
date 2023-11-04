import React from 'react'

interface TProps {
  color: string
  statusName: string
}

const TagStatus = ({ color, statusName }: TProps) => {
  return (
    <div className='flex w-fit items-center justify-center gap-1'>
      <span
        style={{
          background: color,
          width: '6px',
          height: '6px',
          borderRadius: '100%',
        }}
      ></span>
      <span
        style={{
          color: color,
          fontSize: '12px',
          fontWeight: 'bold',
        }}
      >
        {statusName}
      </span>
    </div>
  )
}

export default React.memo(TagStatus)
