import { FC } from 'react'
import styles from './product.module.scss'
import { CardProduct } from '../cardProduct'

type ProductListProps = {
  products: TResponseOnebound[]
}

export const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <div>
      <div className={styles['order-list']}>
        {products.map((el) => {
          return (
            <div
              className={styles['product-wrap']}
              key={`IRapidProductItem-${el.num_iid}`}
            >
              <CardProduct item={el} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
