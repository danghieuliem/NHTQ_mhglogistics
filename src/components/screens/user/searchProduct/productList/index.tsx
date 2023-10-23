import { FC } from "react";
import styles from "./product.module.scss";
import { CardProduct } from "../cardProduct";

type ProductListProps = {
  rapidProducts: IRapidProductItem[];
  currency: number;
};

export const ProductList: FC<ProductListProps> = ({
  rapidProducts,
  currency,
}) => {
  return (
    <div>
      <div className={styles["order-list"]}>
        {rapidProducts.map((el, idx) => {
          return (
            <div
              className={styles["product-wrap"]}
              key={`IRapidProductItem-${el.Id}`}
            >
              <CardProduct item={el} currency={currency} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
