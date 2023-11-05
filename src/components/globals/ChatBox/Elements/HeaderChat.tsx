export const HeaderChat = ({ onOpenChat, name }) => {
  return (
    <div
      className={`bg-chat flex grid-cols-3 items-center justify-between rounded-t-md p-2 hover:cursor-pointer`}
      onClick={() => onOpenChat()}
    >
      <span className='col-span-2 mr-2 flex items-center py-1.5 font-semibold uppercase !leading-[initial] text-white'>
        {name}
      </span>
    </div>
  )
}
