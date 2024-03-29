import { _format } from '~/utils'

type TProps = {
  isSender?: boolean
  content: string
  time?: Date
  userName: string
}

export const SendMessage = ({ content, time, userName }: TProps) => {
  return (
    <div className='ml-8 flex justify-end'>
      <div>
        <div className='mr-2 mt-[4px] text-right text-[10px] text-[#333]'>
          {userName}
        </div>
        <div className='justify-end rounded-b-3xl rounded-l-3xl bg-blueLight p-[12px] text-sm'>
          {content}
        </div>
        <span className='mr-2 mt-[4px] text-[10px] text-[#333]'>
          {_format.getVNDate(time)}
        </span>
      </div>
    </div>
  )
}
