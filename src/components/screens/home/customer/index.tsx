import { useState } from 'react'
import { useQuery } from 'react-query'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { customerTalk } from '~/api'
import styles from './index.module.css'

const SwiperCus = () => {
  const [newData, setNewData] = useState([])

  useQuery(['customer-talk'], () => customerTalk.getList(), {
    onSuccess: (res) => {
      setNewData(res?.Data?.Items)
    },
    refetchOnWindowFocus: false,
  })

  return (
    <Swiper
      autoplay
      speed={500}
      slidesPerView={1}
      spaceBetween={90}
      navigation={true}
      modules={[Navigation]}
      className='mySwiper'
    >
      {newData?.map((item, index) => (
        <SwiperSlide key={`${index}`}>
          <div className={styles.boxSlider}>
            <div>
              <div className={styles.boxSliderContent}>
                <img src='/icon/quote.png' alt='' />
                <p className={styles.mainDes}>{item?.Description}</p>
              </div>
              <div className={styles.boxSliderImg}>
                <img src={item?.IMG} alt='' />
                <div>
                  <h3 className={styles.secondTitle}>{item?.Name}</h3>
                  <p>Khách hàng thân thiết</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export const Customer = () => {
  return (
    <div className={styles.customerWrapper}>
      <div className='container'>
        <div className={styles.top}>
          <h4 className='small_title'>Khách hàng</h4>
          <h1 className='title'>
            <span style={{ color: '#F5851E' }}>Khách hàng </span> nói về chúng
            tôi
          </h1>
        </div>
      </div>
      <div className='container'>
        <div className={styles.bottom}>
          <div className={`customerSwiper ${styles.bottomSwiper}`}>
            <SwiperCus />
          </div>
          <div className={styles.bottomImg}>
            <img src='/default/customer_slide.jpg' alt='' />
          </div>
        </div>
      </div>
    </div>
  )
}
