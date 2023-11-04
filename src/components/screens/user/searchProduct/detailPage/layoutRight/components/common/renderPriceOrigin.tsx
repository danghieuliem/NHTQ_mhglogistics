import { _format } from '~/utils'
import styles from './_index.module.scss'

export const RenderPriceOrigin = ({ item }) => {
  if (!item?.ConfiguredItems?.length) {
    /// not yet check
    return <>{_format.getYuan(item?.Price.OriginalPrice)}</>
  }
  if (!!item?.Promotions?.length) {
    const minPrice = item.Promotions[
      item.Promotions.length - 1
    ].ConfiguredItems.reduce((prev, cur) => {
      if (cur.Price.OriginalPrice < prev.Price.OriginalPrice) return cur
      return prev
    })
    const maxPrice = item.Promotions[
      item.Promotions.length - 1
    ].ConfiguredItems.reduce((prev, cur) => {
      if (cur.Price.OriginalPrice > prev.Price.OriginalPrice) return cur
      return prev
    })

    return (
      <span>
        {_format.getYuan(minPrice.Price.OriginalPrice)} ~{' '}
        <span className={styles['rmb']}></span>
        {_format.getYuan(maxPrice.Price.OriginalPrice)}
      </span>
    )
  } else {
    const minPrice = item.ConfiguredItems.reduce((prev, cur) => {
      if (!cur.Quantity) return prev
      if (cur.Price.OriginalPrice < prev.Price.OriginalPrice) return cur
      return prev
    })
    const maxPrice = item.ConfiguredItems.reduce((prev, cur) => {
      if (!cur.Quantity) return prev
      if (cur.Price.OriginalPrice > prev.Price.OriginalPrice) return cur
      return prev
    })
    return (
      <span>
        {_format.getYuan(minPrice.Price.OriginalPrice)} ~{' '}
        <span className={styles['rmb']}></span>
        {_format.getYuan(maxPrice.Price.OriginalPrice)}
      </span>
    )
  }
}
