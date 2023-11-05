import { Tooltip } from 'antd'
import clsx from 'clsx'
import { FC } from 'react'

type TProps = {
  icon: string
  title: string
  onClick?: () => void
  iconContainerClassName?: string
  btnGreen?: boolean
  btnRed?: boolean
  btnYellow?: boolean
  btnViolet?: boolean
  btnBlue?: boolean
  disabled?: boolean
  isButton?: boolean
  isButtonClassName?: string
}

const btnStyleGreen = 'text-[#1f8f2b]'
const btnStyleRed = 'text-[#f02b02] '
const btnStyleYellow = 'text-[#edb90e]  '
const btnStyleViolet = 'text-[#7410b3]'
const btnStyleBlue = 'text-[#119ff5]'

export const ActionButton: FC<TProps> = ({
  icon,
  iconContainerClassName,
  title,
  onClick,
  btnGreen,
  btnRed,
  btnYellow,
  btnViolet,
  btnBlue,
  disabled,
  isButton,
  isButtonClassName,
  ...props
}) => {
  return isButton === true ? (
    <div
      {...props}
      className={clsx(
        'my-[2px] flex w-fit !cursor-pointer items-center justify-between rounded-[4px] py-[5px] px-[8px] text-[#061d49] shadow-md transition-all duration-300 hover:bg-main hover:!text-[#fff] hover:shadow-none',
        isButtonClassName,
      )}
      style={{
        opacity: disabled ? '0.3' : '1',
        pointerEvents: disabled ? 'none' : 'all',
      }}
      onClick={onClick}
    >
      <i className={clsx(icon, 'mr-1 text-[16px]')}></i>
      <span>{title}</span>
    </div>
  ) : (
    <Tooltip title={disabled ? '' : title}>
      <div
        {...props}
        className='group inline-block w-fit p-1'
        style={{
          opacity: disabled ? '0.3' : '1',
          pointerEvents: disabled ? 'none' : 'all',
        }}
      >
        <div className='cursor-pointer' onClick={onClick}>
          <div
            className={clsx(
              ' mr-1 h-8 rounded-md p-2 pt-[6px] text-center text-sec transition duration-300',
              iconContainerClassName,
              btnGreen && btnStyleGreen,
              btnRed && btnStyleRed,
              btnYellow && btnStyleYellow,
              btnViolet && btnStyleViolet,
              btnBlue && btnStyleBlue,
            )}
          >
            <i
              className={clsx(icon, ' h-4 text-[16px] transition duration-300')}
            ></i>
          </div>
        </div>
      </div>
    </Tooltip>
  )
}
