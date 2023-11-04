import { Modal } from 'antd'
import Link from 'next/link'

export const DetailProductModal = ({ openModal, setOpenModal }) => {
  return (
    <Modal
      centered
      visible={openModal}
      onOk={() => setOpenModal(false)}
      onCancel={() => setOpenModal(false)}
      footer={false}
    >
      <div className='p-[30px]'>
        <div className='mb-[30px]'>
          <p className='text-[18px] font-medium text-green'>
            Hàng đã được thêm vào giỏ. Bạn có muốn đi đến giỏ hàng
          </p>
        </div>
        <div className='flex justify-end gap-4'>
          <button
            type='button'
            className='rounded px-8 py-2 text-[16px] text-[#000]'
            style={{
              border: '1px solid #dedede',
            }}
            onClick={() => setOpenModal(false)}
          >
            Ở lại
          </button>
          <Link href='/user/cart/'>
            <a
              target='_blank'
              onClick={() => {
                setOpenModal(false)
              }}
              className='hover:bg-mainDark rounded bg-main px-8 py-2 text-[16px] text-white'
            >
              Đồng ý
            </a>
          </Link>
        </div>
      </div>
    </Modal>
  )
}
