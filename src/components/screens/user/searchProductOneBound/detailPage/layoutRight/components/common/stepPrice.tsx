import styles from './_index.module.scss'
import { RenderPriceOrigin } from './renderPriceOrigin'

export const StepPrice = ({ item }: { item: TItemDetail }) => {
  return (
    <div className={styles['step-price-wrapper']}>
      {item?.priceRange?.length ? (
        item.priceRange.map((vl, idx) => {
          return (
            <div
              className={styles['step-price-item']}
              style={{
                width: `calc(100%/${item?.priceRange.length})`,
              }}
              key={`step-price-${idx}`}
            >
              <div className={styles['price-box']}>
                <span className={styles['rmb']}>¥</span>
                <span className={styles['price']}>{vl[1]}</span>
              </div>
              <div className={styles['unit-box']}>
                <span>
                  {item.priceRange[idx + 1]
                    ? `${vl[0]}~${+item.priceRange[idx + 1][0] - 1}`
                    : `≥${vl[0]}`}
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
            <span>{`≥${item?.min_num || 1}`}</span>
          </div>
        </div>
      )}
    </div>
  )
}
