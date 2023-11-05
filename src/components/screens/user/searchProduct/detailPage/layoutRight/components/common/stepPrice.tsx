import styles from './_index.module.scss'
import { RenderPriceOrigin } from './renderPriceOrigin'

export const StepPrice = ({ item }) => {
  return (
    <div className={styles['step-price-wrapper']}>
      {item?.QuantityRanges?.length ? (
        item.QuantityRanges.map((vl, idx) => {
          return (
            <div
              className={styles['step-price-item']}
              style={{
                width: `calc(100%/${item?.QuantityRanges.length})`,
              }}
              key={`step-price-${idx}`}
            >
              <div className={styles['price-box']}>
                <span className={styles['rmb']}>¥</span>
                <span className={styles['price']}>
                  {vl.Price.OriginalPrice.toFixed(2)}
                </span>
              </div>
              <div className={styles['unit-box']}>
                <span>
                  {item.QuantityRanges[idx + 1]
                    ? `${vl.MinQuantity}~${
                        item.QuantityRanges[idx + 1].MinQuantity - 1
                      }`
                    : `≥${vl.MinQuantity}`}
                </span>
              </div>
            </div>
          )
        })
      ) : (
        <div
          className={styles['step-price-item']}
          style={{
            width: `100%`,
          }}
        >
          <div className={styles['price-box']}>
            <span className={styles['rmb']}>¥</span>
            <span className={styles['price']}>
              {<RenderPriceOrigin item={item} />}
            </span>
          </div>
          <div className={styles['unit-box']}>
            <span>{`≥${item?.FirstLotQuantity}`}</span>
          </div>
        </div>
      )}
    </div>
  )
}
