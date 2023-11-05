import styles from './index.module.css'

// Import Swiper styles
import { Collapse } from 'antd'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
const { Panel } = Collapse

const UlContent = ({ data }) => {
  return (
    <ul className={styles.ul}>
      {data?.map((item) => <Content item={item} key={item.Id} />)}
    </ul>
  )
}

const Content = ({ item }) => {
  return (
    <li className={styles.contentWrapper}>
      <div className={styles.head}>
        <h3 className={styles.h3}>{item?.Name}</h3>
      </div>
      <div className={styles.content}>
        <p>{item?.Description}</p>
      </div>
    </li>
  )
}

export const HomeBenefit = ({ data }) => {
  return (
    <div className={styles.benefitWrap}>
      <div className='container'>
        <div className={styles.innerBenefit}>
          <div className={styles.top}>
            <h4 className='small_title'>giải pháp toàn cầu</h4>
            <h1>
              <span style={{ color: '#f5851e' }}>Quyền lợi</span> khách hàng
            </h1>
            <p className='mainDes'>
              Nhập Hàng Siêu Tốc là giải pháp nhập hàng tối ưu cho quý khách.
              Chúng tôi mang lại cho khách hàng nguồn hàng phong phú với mức giá
              cực rẻ.
            </p>
          </div>
          <div className={styles.bottom}>
            <img src='/default/benefit_img.jpg' alt='' />
            <UlContent data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}
