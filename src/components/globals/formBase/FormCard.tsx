import { Spin } from 'antd'
import React, { FC } from 'react'
import { useDisableRefetchOnFocus } from '~/hooks'

type TSubComponents = {
  Header: FC<{
    onCancel?: () => void
  }>
  Body: FC<{}>
  Footer: FC<{}>
}

export const FormCard: FC<{ loading?: boolean }> & TSubComponents = ({
  children,
  loading = false,
}) => {
  useDisableRefetchOnFocus()

  return (
    <Spin tip='Loading...' spinning={loading} style={{ maxHeight: 'unset' }}>
      <div className=''>{children}</div>
    </Spin>
  )
}

const Header: TSubComponents['Header'] = ({ children, onCancel }) => (
  <div className='flex items-center justify-between p-4 text-center text-lg font-bold uppercase text-[#ed5b00]'>
    <div>{children}</div>

    {onCancel && (
      <div onClick={onCancel}>
        <span className='cursor-pointer'>
          <i className='fas fa-times text-[26px] text-[#adadad] hover:text-[#ff0000c2]'></i>
        </span>
      </div>
    )}
  </div>
)

FormCard.Header = Header
Header.displayName = 'header'

const Body: TSubComponents['Body'] = ({ children }) => (
  <div className='p-4'>{children}</div>
)
FormCard.Body = Body
Body.displayName = 'body'

const Footer: TSubComponents['Footer'] = ({ children }) => (
  <div className='flex items-center justify-center p-4'>{children}</div>
)
FormCard.Footer = Footer
Footer.displayName = 'footer'
