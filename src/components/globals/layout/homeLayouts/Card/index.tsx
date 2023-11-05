import React from 'react'
import { Grid } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import { useRouter } from 'next/router'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'
import { HomeBreadcrumb } from '~/components'
import { _format } from '~/utils'
import styles from './index.module.css'

type TProps = {
  data: _TPageType_Field_Page[]
  code: any
  name: string
  direction: 'vertical' | 'horizontal'
}

const NewsItemSwiper = ({ item, name }) => {
  const router = useRouter()

  return (
    <div className={styles.NewsItemBox}>
      <a
        onClick={() => {
          localStorage.setItem('PageTypeId', item?.PageTypeId)
          router.push(`/bai-viet/${item?.Code}`)
        }}
      >
        <div className={styles.newsTop}>
          <div className={styles.NewsItemImg}>
            <div
              className={styles.img}
              style={{
                background: item?.IMG
                  ? `url(${
                      item?.IMG?.includes(' ')
                        ? item?.IMG.replaceAll(' ', '%20')
                        : item.IMG
                    })`
                  : 'url(/default/pro-empty.jpg)',
              }}
            ></div>
          </div>
          <span>
            <h6>{name}</h6>
          </span>
        </div>
        <div className={styles.datetime}>
          <span>{_format.getShortVNDate(item?.Created)}</span>
          <span className={styles.dateTimeDot}></span>
          <span>{item?.CreatedBy}</span>
        </div>
        <p>{item?.Summary}</p>
      </a>
    </div>
  )
}

const NewsItem = ({ item, name }) => {
  const router = useRouter()

  return (
    <div
      className={styles.NewsItemBoxVertical}
      onClick={() => {
        router.push(`/chuyen-muc/detail/?code=${item?.Code}`)
      }}
    >
      <a>
        <div
          className={styles.imgVertical}
          style={{
            background: item?.IMG
              ? `url(${
                  item?.IMG?.includes(' ')
                    ? item?.IMG.replaceAll(' ', '%20')
                    : item.IMG
                })`
              : 'url(/default/pro-empty.jpg)',
          }}
        ></div>
        <div className={styles.infoVertical}>
          <HomeBreadcrumb currentRoute={item} name={name} />

          <div className={styles.inforWrapperVertical}>
            <span className={styles.datetimeVertical}>
              <span>{_format.getShortVNDate(item?.Created)}</span>
              <span className={styles.dateTimeDotVertical}></span>
              <span>{item?.CreatedBy}</span>
            </span>
            <span className={styles.titleVertical}>{item?.Title}</span>
          </div>
          <p className={styles.summaryVertical}>{item?.Summary}</p>
        </div>
      </a>
    </div>
  )
}

export const HomeCard: React.FC<TProps> = ({ data, name, direction }) => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>'
    },
  }

  return (
    <>
      {direction === 'vertical' ? (
        <>
          {data
            ?.filter((item) => item.Active === true)
            ?.map(
              (item) =>
                item?.Active === true && (
                  <React.Fragment key={item?.Code}>
                    <NewsItem item={item} name={name} />
                  </React.Fragment>
                ),
            )}
        </>
      ) : (
        <Swiper
          modules={[Grid, Pagination]}
          pagination={pagination}
          className={`mySwiper homeCard`}
          grid={{
            // rows: data?.length > 4 ? 2 : 1,
            rows: 1,
          }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            520: {
              slidesPerView: 1,
            },
            740: {
              slidesPerView: 3,
            },
          }}
        >
          {data
            ?.filter((item) => item.Active === true)
            ?.map(
              (item) =>
                item?.Active === true && (
                  <SwiperSlide key={item?.Code}>
                    <NewsItemSwiper item={item} name={name} />
                  </SwiperSlide>
                ),
            )}
        </Swiper>
      )}
    </>
  )
}
