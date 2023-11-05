import styles from './index.module.css'

export const HomeInfoContact = ({ data }) => {
  return (
    <div className={styles.InfoContact}>
      <div className='container'>
        <div className={styles.head}>
          <h1>Thông tin liên hệ</h1>
          <p>Nhập hàng kinh doanh dễ dàng chỉ với một vài thao tác đơn giản</p>
        </div>
        <div className={styles.bottom}>
          <div className={styles.box}>
            <div className={styles.boxIcon}>
              <img src='/icon/clock.png' alt='' />
            </div>
            <div className={styles.boxContent}>
              <h3>Giờ hoạt động</h3>
              <span>{data?.TimeWork}</span>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.boxIcon}>
              <img src='/icon/phone.png' alt='' />
            </div>
            <div className={styles.boxContent}>
              <h3>Hotline</h3>
              <span>{data?.Hotline}</span>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.boxIcon}>
              <img src='/icon/email.png' alt='' />
            </div>
            <div className={styles.boxContent}>
              <h3>Email</h3>
              <span>{data?.EmailContact}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
