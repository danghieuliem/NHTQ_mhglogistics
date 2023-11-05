import clsx from 'clsx'

export const BankCard = ({ item, setSelectedBank, selectedBank }) => {
  return (
    <div
      key={item?.Id}
      className={clsx(
        'col-span-1 cursor-pointer rounded-[4px] py-2 transition-all duration-300',
        item?.Id === selectedBank?.Id && 'bg-sec text-white shadow-xl',
      )}
      onClick={() => {
        setSelectedBank(item)
      }}
      style={{
        border:
          item?.Id === selectedBank?.Id
            ? '1px solid transparent'
            : '1px solid #ececec',
      }}
    >
      <span className='relative flex items-center justify-evenly'>
        <span className='block w-[30%] overflow-hidden rounded-[2px] bg-white py-3'>
          <img src={item?.IMG ?? '/default/pro-empty.jpg'} alt='' />
        </span>
        <span className='flex flex-col'>
          <span className='font-semiboldl mb-1 border-b-2 pb-1'>
            {item?.BankName}
          </span>
          <span className='flex flex-1 flex-col text-[12px]'>
            Stk: {item?.BankNumber}
          </span>
        </span>
      </span>
    </div>
  )
}
