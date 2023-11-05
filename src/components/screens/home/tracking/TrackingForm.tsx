import { Modal } from 'antd'
import { FC, Fragment } from 'react'
import { TForm } from '~/types/table'
import { TrackingDetail } from '../../user/tracking'

const button = `px-[12px] py-[8px] rounded-[4px] bg-[#f37021] text-[#fff] hover:bg-[#c7ae8d] hover:text-[#333] transition-all`

type TProps = TForm<any> & {
  data: any
}

export const TrackingForm: FC<TProps> = ({ visible, data, onCancel }) => {
  return (
    <Modal
      visible={visible}
      width={'80vw'}
      closable={false}
      footer={false}
      className='!max-w-full'
      title='Tracking mã vận đơn'
    >
      <div className='p-0 lg:p-4'>
        {/* <h1 className="titlePageUser !mb-0 !text-center">Tracking mã vận đơn</h1> */}

        <TrackingDetail data={data} />
        <div className='mt-2 text-right'>
          <button className={button} onClick={() => onCancel()}>
            Đóng
          </button>
        </div>
      </div>
    </Modal>
  )
}
