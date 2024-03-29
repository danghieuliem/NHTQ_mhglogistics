import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import styles from './ChatBox.module.scss'

export const FooterChatBox = ({ handleUserMessage }) => {
  const [message, setMessage] = useState('')
  const textareaRef = useRef(null)
  const messageIsEmpty = message.trim().length === 0

  const handleMessage = (e) => {
    setMessage((preState) => e.target.value)
  }
  const handleEnterMessage = (e) => {
    if (e.charCode !== 13) return
    handleSubmitMessage(e)
  }
  const handleSubmitMessage = (e: any) => {
    e.preventDefault()
    if (messageIsEmpty) return
    handleUserMessage(message)
    setMessage('')
  }

  useEffect(() => {
    function FitToContent() {
      const maxHeight = 100
      let textareaDom = textareaRef.current
      if (!textareaDom) return
      textareaDom.style.height = 'auto'
      let adjustedHeight = textareaDom.clientHeight
      if (!maxHeight || maxHeight > adjustedHeight) {
        adjustedHeight = Math.max(textareaDom.scrollHeight, adjustedHeight)
        if (maxHeight) adjustedHeight = Math.min(maxHeight, adjustedHeight)
        if (adjustedHeight > textareaDom.clientHeight)
          textareaDom.style.height = adjustedHeight + 'px'
      }
    }

    textareaRef.current.addEventListener('keydown', FitToContent)
    return () => {
      textareaRef.current?.removeEventListener('keydown', FitToContent)
    }
  }, [])

  return (
    <div className={`bg-chat flex items-center py-[10px] px-[5px] text-white`}>
      {/* <div className={'basis-[40px] flex justify-center'}>
				<button className={''}>
					<i className="fas fa-paperclip text-xs"></i>
				</button>
			</div> */}
      <form onSubmit={handleSubmitMessage} className='flex grow'>
        <input
          className={clsx(
            'h-auto grow resize-none bg-[#fff] py-[7px] pl-[10px] text-sm text-[#333] outline-none',
            styles.scrollbar,
          )}
          type='text'
          ref={textareaRef}
          value={message ?? ''}
          onChange={handleMessage}
          onKeyPress={handleEnterMessage}
        />
        <button type='submit' className='basis-[40px]'>
          <i className='fas fa-paper-plane text-xs '></i>
        </button>
      </form>
    </div>
  )
}
