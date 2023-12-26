import { _format } from '~/utils'
import styles from './_index.module.scss'
import { isEmpty } from 'lodash'
import { useMemo } from 'react'

export const RenderPriceOrigin = ({ item }: { item: TItemDetail }) => {
  const listProps = item?.skus?.sku

  if (isEmpty(listProps)) {
    /// not yet check
    return <>{_format.getYuan(+item?.price)}</>
  }

  const formatData = useMemo(() => {
    const pricePromo = { min: +listProps[0].price, max: +listProps[0].price }
    const priceOrigin = {
      min: +listProps[0].orginal_price,
      max: +listProps[0].orginal_price,
    }

    return listProps.reduce(
      (pre, cur) => {
        return {
          pricePromo: {
            min:
              +pre.pricePromo.min < +cur.price
                ? +pre.pricePromo.min
                : +cur.price,
            max:
              +pre.pricePromo.max > +cur.price
                ? +pre.pricePromo.max
                : +cur.price,
          },
          priceOrigin: {
            min:
              +pre.priceOrigin.min < +cur.orginal_price
                ? +pre.priceOrigin.min
                : +cur.orginal_price,
            max:
              +pre.priceOrigin.max > +cur.orginal_price
                ? +pre.priceOrigin.max
                : +cur.orginal_price,
          },
        }
      },
      {
        pricePromo,
        priceOrigin,
      },
    )
  }, [listProps])

  return (
    <span>
      {!isEmpty(listProps[0].price) ? (
        <>
          {_format.getYuan(formatData.pricePromo.min)} ~{' '}
          <span className={styles['rmb']}></span>
          {_format.getYuan(formatData.pricePromo.max)}
        </>
      ) : (
        <>
          {_format.getYuan(formatData.priceOrigin.min)} ~{' '}
          <span className={styles['rmb']}></span>
          {_format.getYuan(formatData.priceOrigin.max)}
        </>
      )}
    </span>
  )
}
