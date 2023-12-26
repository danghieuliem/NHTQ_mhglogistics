import { FC } from 'react'
import styles from './product.module.scss'
import { CardProduct, TItem } from '../cardProduct'

type ProductListProps = {
  rapidProducts: TItem[]
}

export const ProductList: FC<ProductListProps> = ({ rapidProducts }) => {
  return (
    <div>
      <div className={styles['order-list']}>
        {rapidProducts.map((el, idx) => {
          return (
            <div
              className={styles['product-wrap']}
              key={`IRapidProductItem-${el.Id}`}
            >
              <CardProduct item={el} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
