import { FC } from "react";
import Link from "next/link";
import styles from "./cardstyle.module.scss";
import { useRouter } from "next/router";
import clsx from "clsx";
import { _format } from "~/utils";

type CardProductProps = {
  item: IRapidProductItem;
  currency: number;
};
export const CardProduct: FC<CardProductProps> = ({ item, currency }) => {
  const router = useRouter();
  const { ecsite } = router.query;

  return (
    <div className={clsx(styles["card-wrap"], "")}>
      <div className={styles["image-container"]} style={{}}>
        <div>
          <Link
            href={{
              pathname: "/user/search-product/detail",
              query: { id: item.Id, ecsite },
            }}
            passHref
          >
            <a target="_blank">
              <img
                className={styles["image"]}
                src={item.MainPictureUrl}
                alt="product-img"
              />
            </a>
          </Link>
        </div>
      </div>
      <div className={styles["element-title-oneline"]}>
        <Link
          href={{
            pathname: "/user/search-product/detail",
            query: { id: item.Id, ecsite },
          }}
          passHref
        >
          <a target="_blank">
            <div className={styles["title"]}>{item.Title}</div>
          </a>
        </Link>
      </div>
      <div className={styles["element-price"]}>
        <div>
          <div className={styles["show-price"]}>
            <div className={styles["rmb"]}>¥</div>
            <div className={styles["price"]}>
              {_format.getYuan(
                !!item?.PromotionPrice
                  ? item.PromotionPrice?.OriginalPrice
                  : item.Price?.OriginalPrice,
                ""
              )}
            </div>
          </div>
          <div className={styles["show-price"]}>
            <div className={"text-sm text-[#333] font-medium"}>
              {_format.getVND(
                (!!item?.PromotionPrice
                  ? item.PromotionPrice?.OriginalPrice
                  : item.Price?.OriginalPrice) * currency,
                " đ"
              )}
            </div>
          </div>
        </div>

        <div className={styles["sale"]}>
          Đã bán:{" "}
          {Number(
            item.FeaturedValues?.find((x) => x.Name == "TotalSales")?.Value
          ) <= 500000
            ? item.FeaturedValues?.find(
                (x) => x.Name == "TotalSales"
              )?.Value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : "+500,000"}
        </div>
      </div>

      <div className={styles["wrap-element-hover"]}>
        <div className={styles["card-element-hover"]}>
          <div>
            <Link
              href={{
                pathname: "/user/search-product/detail",
                query: { id: item.Id, ecsite },
              }}
              passHref
            >
              <a target="_blank" className={styles["tag"]}>
                Xem chi tiết
              </a>
            </Link>
          </div>
          {!!item.QuantityRanges?.length ? (
            <div className={styles["deal-container"]}>
              {item.QuantityRanges?.map((vl, idx) => {
                return (
                  <div
                    className={clsx(styles["deal"])}
                    style={{
                      width: `calc(100%/${item.QuantityRanges?.length})`,
                      paddingBottom: "6px",
                      paddingTop: "6px",
                      paddingLeft: "6px",
                      paddingRight: "6px",
                      borderRight: item.QuantityRanges?.[idx + 1]
                        ? "1px solid #e7e7e7"
                        : "unset",
                    }}
                    key={`QuantityRanges-${vl.Price.OriginalPrice}${idx}`}
                  >
                    <div className={styles["deal-item"]}>
                      <div className={styles["deal-container-price"]}>
                        <div className={styles["rmb"]}>¥</div>
                        <div className={styles["deal-price"]}>
                          {vl.Price.OriginalPrice}
                        </div>
                      </div>
                      <div className={styles["deal-num"]}>
                        {item.QuantityRanges?.[idx + 1]
                          ? `${vl.MinQuantity}~${item.QuantityRanges?.[idx + 1]
                              .MinQuantity}`
                          : `≥${vl.MinQuantity}`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
