import clsx from 'clsx'
import styles from './index.module.css'

export const HomeServices = ({ data }) => {
  return (
    <div className={clsx(styles.servicesWrap)}>
      <div className='container'>
        <h4 className='small_title'>Giải pháp toàn cầu</h4>
        <h1>
          Bạn có nhu cầu <br /> chúng tôi có{' '}
          <span style={{ color: '#f5851e', textTransform: 'uppercase' }}>
            dịch vụ
          </span>
        </h1>

        <div className={styles.innerContent}>
          {data?.map((item, index) => (
            <div className={styles.box} key={`${item?.Code}-${index}`}>
              <div className={styles.logo}>
                <img src={item?.IMG} alt='' />
              </div>
              <h3 className='secondTitle my-[16px] !min-h-[48px]'>
                {item?.Name}
              </h3>
              <p className='mainDes'>{item?.Description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
