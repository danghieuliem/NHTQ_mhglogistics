import { Modal } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import styles from './index.module.css'

export const PopupNoti = () => {
  // const notiShow = useRef(false);
  const dataGlobal: any = useSelector((state: RootState) => state.dataGlobal)
  const showNoti = JSON.parse(localStorage.getItem('showNoti'))

  const [openModal, setOpenModal] = useState(() => {
    if (showNoti) return showNoti

    if (showNoti === undefined || showNoti === null) {
      return !!dataGlobal?.NotiPopupTitle
    }
  })

  useEffect(() => {
    if (showNoti) {
      setOpenModal(showNoti)
      return
    }

    if (showNoti === undefined || showNoti === null) {
      setOpenModal(!!dataGlobal?.NotiPopupTitle)
    }
  }, [dataGlobal?.NotiPopupTitle])

  return (
    <Modal
      visible={openModal}
      closeIcon={false}
      closable={false}
      footer={false}
      className={styles.homePopupNoti}
    >
      <div className={styles.popupNoti}>
        <div className={styles.head}>
          <h1>{dataGlobal?.CompanyLongName}</h1>
        </div>
        <div className={styles.content}>
          <h3>{dataGlobal?.NotiPopupTitle}</h3>
          <div
            dangerouslySetInnerHTML={{ __html: dataGlobal?.NotiPopup }}
          ></div>
        </div>
        <div className={styles.foot}>
          <button
            className={`${styles.btn} ${styles.btn1}`}
            onClick={() => {
              setOpenModal(!openModal)
              localStorage.setItem('showNoti', JSON.stringify(false))
            }}
          >
            Đóng và không hiện lại
          </button>
          <button
            className={`${styles.btn} ${styles.btn2}`}
            onClick={() => setOpenModal(!openModal)}
          >
            Đóng
          </button>
        </div>
        <div className={styles.contact}>
          <a href={`mailto:${dataGlobal?.NotiPopupEmail}`}>
            {dataGlobal?.NotiPopupEmail || dataGlobal?.EmailContact}
          </a>
          <span className='hidden text-white sm:block'>||</span>
          <a href={`tel:${dataGlobal?.Hotline}`}>{dataGlobal?.Hotline}</a>
        </div>
      </div>
    </Modal>
  )
}
