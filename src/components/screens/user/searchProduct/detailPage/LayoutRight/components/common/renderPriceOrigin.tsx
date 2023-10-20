import styles from './_index.module.scss'

export const renderPriceOrigin = ({ item }) => {
  if (!item?.ConfiguredItems?.length) {
    /// not yet check
    return item?.Price.OriginalPrice.toFixed(2)
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
        {minPrice.Price.OriginalPrice.toFixed(2)} ~{' '}
        <span className={styles['rmb']}>¥</span>
        {maxPrice.Price.OriginalPrice.toFixed(2)}
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
        {minPrice.Price.OriginalPrice.toFixed(2)} ~{' '}
        <span className={styles['rmb']}>¥</span>
        {maxPrice.Price.OriginalPrice.toFixed(2)}
      </span>
    )
  }
}
