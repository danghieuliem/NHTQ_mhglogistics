import clsx from 'clsx'
import { default as React, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { TControl } from '~/types/field'
import styles from './ChatBox.module.scss'
import { FooterChatBox, HeaderChat } from './index'

type TProps = TControl & {
  onOpenChat: () => void
  loading: boolean
  name: string
  addResponseMessage?: () => void
  data: TMessage[]
  addUserMessage?: (message) => void
  fetchNextPage?: () => void
  hasNextPage: boolean
  isFetchingNextPage?: boolean
}

export const ChatBox: React.FC<TProps> = ({
  onOpenChat,
  name,
  addUserMessage,
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  children,
}) => {
  const boxRef = useRef(null)

  const { ref: loadMoreRef, inView, entry } = useInView({ threshold: 0 })

  const handleUserMessage = (message) => {
    addUserMessage && addUserMessage(message)
    setTypeScroll('full')
  }

  const [typeScroll, setTypeScroll] = useState<'full' | 'small'>('full')

  useEffect(() => {
    if (!inView) return
    if (!hasNextPage) return
    fetchNextPage()
    setTypeScroll('small')
  }, [inView])

  useEffect(() => {
    if (!boxRef) return
    if (typeScroll === 'full')
      boxRef.current.scrollTop = boxRef.current.scrollHeight
    if (typeScroll === 'small') boxRef.current.scrollTop = '200'
  }, [data])

  return (
    <>
      <div className='absolute z-50 flex h-[440px] w-[300px] flex-col rounded-md border border-y-main text-white shadow-xl'>
        <HeaderChat {...{ onOpenChat, name }} />
        <div
          className={clsx(
            styles.scrollbar,
            'w-full flex-1 overflow-auto border-t-[0.5px] border-t-[#f8dfd5] bg-white p-2',
          )}
          ref={boxRef}
          id='scrollableDiv'
        >
          {!hasNextPage && data?.length >= 20 && (
            <p className='h-[30px'>Hết tin nhắn</p>
          )}
          {isFetchingNextPage && <p>loading..</p>}
          <div ref={loadMoreRef} />
          {children}
        </div>
        <FooterChatBox handleUserMessage={handleUserMessage} />
      </div>
    </>
  )
}
