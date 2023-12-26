import { FC, useEffect } from 'react'
import Link from 'next/link'
import styles from './cardstyle.module.scss'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { _format } from '~/utils'
import { useQuery } from 'react-query'
import { configuration } from '~/api'
import { isNumber, isUndefined } from 'lodash'

type CardProductProps = {
  item: TResponseOnebound
}
export const CardProduct: FC<CardProductProps> = ({ item }) => {
  const router = useRouter()
  const { ecsite } = router.query

  const { data: currencyConfig } = useQuery({
    queryKey: ['get-currency'],
    queryFn: () => configuration.getCurrency(),
  })

  const getPrice = () => {
    if (isNumber(item?.promotion_price)) return +item?.promotion_price

    return +(!!item?.promotion_price
      ? item.promotion_price
      : item.orginal_price)
  }

  const getTotalSales = () => {
    return +item.sales || 0
  }

  return (
    <div className={clsx(styles['card-wrap'], '')}>
      <div className={styles['image-container']} style={{}}>
        <div>
          <Link
            href={{
              pathname: '/user/search-product/detail',
              query: { id: item.num_iid, ecsite },
            }}
            passHref
          >
            <a target='_blank'>
              <img
                className={styles['image']}
                src={item.pic_url}
                alt='product-img'
              />
            </a>
          </Link>
        </div>
      </div>
      <div className={styles['element-title-oneline']}>
        <Link
          href={{
            pathname: '/user/search-product/detail',
            query: { id: item.num_iid, ecsite },
          }}
          passHref
        >
          <a target='_blank'>
            <div className={styles['title']}>{item.titleVN || item.title}</div>
          </a>
        </Link>
      </div>
      <div className={styles['element-price']}>
        <div>
          <div className={styles['show-price']}>
            <div className={styles['rmb']}>¥</div>
            <div className={styles['price']}>
              {_format.getYuan(getPrice(), '')}
            </div>
          </div>
          <div className={styles['show-price']}>
            <div className={'text-sm font-medium text-[#333]'}>
              {_format.getVND(getPrice() * (currencyConfig?.Data || 0), ' đ')}
            </div>
          </div>
        </div>

        <div className={styles['sale']}>
          Đã bán:{' '}
          {Number(getTotalSales()) <= 500000
            ? (getTotalSales() + '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : '+500,000'}
        </div>
      </div>

      <div className={styles['wrap-element-hover']}>
        <div className={styles['card-element-hover']}>
          <div>
            <Link
              href={{
                pathname: '/user/search-product/detail',
                query: { id: item.num_iid, ecsite },
              }}
              passHref
            >
              <a target='_blank' className={styles['tag']}>
                Xem chi tiết
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
