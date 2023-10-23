import { Badge, Divider, InputNumber, Modal } from "antd";
import clsx from "clsx";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { configuration, orderShopTemp } from "~/api";
import { toast } from "~/components/toast";
import { _format } from "~/utils";
import styles from "../common/_index.module.scss";
import { cloneDeep } from "lodash";
import { StepPrice } from "../common/stepPrice";
import { DetailProductModal } from "../common/modal";
import { useViewDetailProduct } from "../hooks/useViewDetailProduct";

type TConfiguartor = {
  Pid: string;
  Vid: string;
};
type LayoutRightProps = {
  item: IDetailRapidProductItem;
  onChangePreview: (img: string) => void;
};

export const totalQuantityArray = (data: any[], vlKey: keyof any) => {
  let sum = 0;
  if (!data.length) return 0;
  for (let i = 0; i < data.length; i++) {
    sum = sum + Number(data[i][vlKey]);
  }
  return sum;
};
type TGroupAttributes = {
  KeyPid: string;
  Children: TAttribute[];
};
export const Detail1688: FC<LayoutRightProps> = ({ item, onChangePreview }) => {
  const { data: configData } = useQuery({
    queryKey: ["get-currency"],
    queryFn: () => configuration.getCurrency(),
  });

  const { getImageOfItem } = useViewDetailProduct(item);

  const groupAttriButes: TGroupAttributes[] = useMemo(() => {
    const isConfigAttributes = item.Attributes.filter(
      (el) => el.IsConfigurator
    );
    const result = isConfigAttributes.reduce((prev, curr) => {
      const isFound = prev.find((pr) => pr?.KeyPid == curr.Pid);
      if (!isFound) {
        const newPrev = prev.concat([
          {
            KeyPid: curr.Pid,
            Children: [{ ...curr }],
          },
        ]);
        return newPrev;
      } else {
        return prev.map((vl) => {
          if (vl.KeyPid == curr.Pid) {
            return {
              ...vl,
              Children: vl.Children.concat([{ ...curr }]),
            };
          } else return vl;
        });
      }
    }, []);
    result.sort((a: any, b: any) => {
      if (!!b.Children.some((x) => !!x?.ImageUrl)) {
        return 1;
      } else if (!!a.Children.some((x) => !!x?.ImageUrl)) {
        return -1;
      } else return 0;
    });
    return result;
  }, [item]);

  //----------STATE----------//
  const [attributeSelected, setAttributeSelected] =
    useState<TConfiguartor>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  //-------EFFECT-------//
  useEffect(() => {
    if (!groupAttriButes.length) return;
    setAttributeSelected({
      Pid: groupAttriButes[0].Children[0].Pid,
      Vid: groupAttriButes[0].Children[0].Vid,
    });
  }, [groupAttriButes]);

  //-------HANDLE-------//
  const handleSelectAttribute = useCallback((newVl: TConfiguartor) => {
    setAttributeSelected(newVl);
  }, []);

  //---------MUTATION-----------//
  const mutationPost = useMutation(orderShopTemp.addToCart);
  const mutationPostList = useMutation(
    (datalist: any[]) => {
      // Oh sh*t !! please update later
      const queueCallAPI = async (items) => {
        for (let item in items) {
          await orderShopTemp.addToCart(items[item]);
        }
      };
      return queueCallAPI(cloneDeep(datalist));
    },
    {
      onSuccess: (newOrder) => {},
      onError: (error: any) => {},
    }
  );

  const { control, watch, handleSubmit } = useForm<any>({
    defaultValues: {
      list: item.ConfiguredItems.length
        ? item.ConfiguredItems.map((vl) => {
            return {
              ...vl,
              Price: !!item?.Promotions?.length
                ? item.Promotions[item.Promotions.length - 1].ConfiguredItems
                    .length
                  ? item.Promotions[
                      item.Promotions.length - 1
                    ].ConfiguredItems.find((pro) => pro.Id === vl.Id).Price
                  : item.Promotions[item.Promotions.length - 1].Price
                : vl.Price,
              number: 0,
            };
          })
        : [
            {
              Id: `${new Date().getTime()}`,
              Configurators: [
                {
                  Pid: "12",
                  Vid: "12",
                },
              ],
              Price: item.Price,
              Quantity: item.MasterQuantity,
              QuantityRanges: item.QuantityRanges,
              SalesCount: 0,
              number: 0,
            },
          ],
      rootProduct: {
        brand: "",
        category_id: 1,
        category_name: "Đang cập nhật",
        comment: "",
        data_value: "",
        error: 0,
        image_model: item.MainPictureUrl,
        image_origin: item.MainPictureUrl,
        is_translate: false,
        item_id: item.Id.slice(4),
        link_origin: item.TaobaoItemUrl,
        location_sale: "",
        maxTimes: 0, //count số lượng thuộc tính khách chọn => tracking số lần gửi để hiển thị thông báo thành công
        outer_id: "",
        price_origin: item.Price.OriginalPrice, // dùng bên list vì giá sẽ có giá riêng theo từng property
        price_promotion: 0,
        price_table: item?.QuantityRanges
          ? item?.QuantityRanges.map((el, idx) => ({
              begin: `${el.MinQuantity}`,
              end: item.QuantityRanges[idx + 1]
                ? `${item.QuantityRanges[idx + 1].MinQuantity - 1}`
                : "99999",
              price: `${el.Price.OriginalPrice}`,
            }))
          : // : [{ begin: item.FirstLotQuantity, end: 99999, price: item.Price.OriginalPrice }],
            [],
        pricestep: item?.QuantityRanges
          ? item?.QuantityRanges.map(
              (el, idx) =>
                `${el.MinQuantity}-${
                  item.QuantityRanges[idx + 1]
                    ? `${item.QuantityRanges[idx + 1].MinQuantity - 1}`
                    : "99999"
                }:${el.Price.OriginalPrice}`
            ).join("|") + "|"
          : // : `${item.FirstLotQuantity}-99999:${item.Price.OriginalPrice}|`,
            ``,
        require_min: 1,
        selectedProps: "N/A",
        selectedSKU_ID: "N/A",
        shop_id: item.ShopId,
        shop_name: item.VendorName,
        stock: 9999,
        title_origin: item.OriginalTitle,
        title_translated: item.Title,
        tool: "Addon",
        version: "1.7",
        wangwang: item.VendorName,
        weight: 0,
        Site: item.Site,
      },
    },
  });

  const { list } = watch();

  const onSubmit = (data: any) => {
    const { list, rootProduct } = data;

    const totalQuantity = totalQuantityArray(list, "number");
    if (totalQuantity < item.FirstLotQuantity) {
      toast.error(`Chưa đạt số lượng tối thiểu là ${item.FirstLotQuantity}`);
      return;
    }

    const filterList = list.filter((el) => el.number != "0");
    const fmList = filterList.map((vl) => {
      return {
        ...rootProduct,
        image_model: getImageOfItem(vl) || item.MainPictureUrl,
        image_origin: getImageOfItem(vl) || item.MainPictureUrl,
        quantity: vl.number,
        price_origin: vl.Price.OriginalPrice,
        property: vl.Configurators.map((cf) => {
          const foundAttr = item.Attributes.find(
            (attr) => attr.Pid == cf.Pid && attr.Vid == cf.Vid
          );
          return foundAttr
            ? `${foundAttr.OriginalPropertyName}-${foundAttr.OriginalValue}`
            : "";
        }).toString(),
        property_translated: vl.Configurators.map((cf) => {
          const foundAttr = item.Attributes.find(
            (attr) => attr.Pid == cf.Pid && attr.Vid == cf.Vid
          );
          return foundAttr
            ? `${foundAttr.OriginalPropertyName}-${foundAttr.OriginalValue}`
            : "SP không có thuộc tính";
        }).toString(),
      };
    });

    // return;
    const firstElement = fmList.shift();
    mutationPost.mutate(firstElement, {
      onSuccess: () => {
        mutationPostList.mutate(fmList, {
          onError: () => {
            toast.error("Có lỗi xảy ra vui lòng thử lại");
          },
          onSuccess: () => {
            setOpenModal(true);
            toast.success("Thêm vào giỏ hàng thành công");
          },
        });
      },
      onError: () => {
        toast.error("Có lỗi xảy ra vui lòng thử lại");
      },
    });
  };

  const renderGoodPrice = (configItem: TConfigItem) => {
    if (!configItem?.QuantityRanges?.length) {
      return configItem.Price.OriginalPrice.toFixed(2);
    }
    const totalQuantity = totalQuantityArray(list, "number");
    let firstPrice = configItem.QuantityRanges[0].Price.OriginalPrice;
    for (let i = 0; i < configItem.QuantityRanges.length; i++) {
      if (totalQuantity >= configItem.QuantityRanges[i].MinQuantity) {
        firstPrice = configItem.QuantityRanges[i].Price.OriginalPrice;
      }
    }
    return firstPrice.toFixed(2);
  };

  const handleShow = (configurators: TConfiguartor[]) => {
    if (!!configurators && !!attributeSelected) {
      const isBelongThisAttribute = configurators?.some(
        (vl) => vl.Vid == attributeSelected.Vid
      );
      return isBelongThisAttribute;
    } else return false;
  };

  const handleCounting = (attr: TAttribute) => {
    const filterList = list.filter((el) =>
      el.Configurators.some((x) => x.Pid == attr.Pid && x.Vid == attr.Vid)
    );
    const totalQuantity = totalQuantityArray(filterList, "number");
    return totalQuantity || 0;
  };

  const renderName = (configurators: TConfiguartor[]) => {
    // groupAttriButes
    const ress = !!groupAttriButes[groupAttriButes.length - 1]?.Children.length
      ? groupAttriButes[groupAttriButes.length - 1].Children.find((vl) =>
          configurators.some((x) => x.Vid == vl.Vid)
        )
      : ({} as TAttribute);

    // const res = item.Attributes.find((vl) => configurators[configurators.length - 1].Vid == vl.Vid)
    return ress?.Value || "";
  };

  const renderTotalPrice = () => {
    const filterList = list
      .filter((el) => el.number != "0")
      .reduce((prev, curr) => {
        const goodPrice = renderGoodPrice(curr);
        prev = curr.number * (+goodPrice || 0) + prev;
        return prev;
      }, 0);
    return filterList;
  };

  return (
    <div className={styles["layout-right"]}>
      <div className={styles["title-contain"]}>
        <a
          href={item.TaobaoItemUrl}
          target="_blank"
          className={styles["title"]}
        >
          {item.Title}
        </a>
      </div>
      <div className={styles["price-contain"]}>
        <div className={styles["price-content"]}>
          <div className={styles["price-header"]}>
            <span className={styles["price-name"]}>Giá tiền</span>
            <span className={styles["price-num"]}>Lô hàng</span>
          </div>
          <StepPrice item={item} />
        </div>
      </div>

      <Divider />

      {!!groupAttriButes.length ? (
        <div className={styles["attributes-contain"]}>
          <div
            className={styles["attributes-content"]}
            key={`fmAttributes-hehe`}
          >
            <div className={styles["attributes-header"]}>
              <span className={styles["attributes-name"]}>
                {groupAttriButes[0].Children[0].PropertyName}
              </span>
            </div>
            <div className={styles["attributes-wrapper"]}>
              {groupAttriButes[0].Children?.length
                ? groupAttriButes[0].Children.map(
                    (vl: TAttribute, index: number) => {
                      const counting = handleCounting(vl);
                      return (
                        <div
                          className={clsx(styles["attributes-item"])}
                          key={`item-0-${index}`}
                        >
                          <Badge count={counting}>
                            <div
                              className={clsx(
                                styles["attributes-item-inner"],
                                vl.Vid == attributeSelected?.Vid &&
                                  styles["attributes-item-inner-active"]
                              )}
                              onClick={() => {
                                handleSelectAttribute({
                                  Pid: vl.Pid,
                                  Vid: vl.Vid,
                                });
                                onChangePreview(vl?.ImageUrl || "");
                              }}
                            >
                              <div
                                style={{
                                  background: `url(${vl.MiniImageUrl}) center center / contain no-repeat`,
                                  width: "36px",
                                  height: "36px",
                                  // marginRight: '2px'
                                }}
                              ></div>
                              <div>{vl.Value}</div>
                            </div>
                          </Badge>
                        </div>
                      );
                    }
                  )
                : null}
            </div>
          </div>
        </div>
      ) : null}
      <div className={styles["prop-section"]}>
        <div className={clsx(styles["prop-header"], "")}>
          <div>
            {groupAttriButes.length > 1
              ? groupAttriButes[1].Children[0].PropertyName
              : "Số lượng mua"}
          </div>
        </div>
        <div className={styles["prop-contain"]}>
          {list.length
            ? list.map((el: any, index: number) => {
                const isShow = handleShow(el.Configurators);
                return (
                  <div
                    className={styles["prop-content"]}
                    key={`config-item-${el.Id}`}
                    style={{
                      display: !!attributeSelected
                        ? isShow
                          ? "flex"
                          : "none"
                        : "flex",
                    }}
                  >
                    <div className={styles["sku-item-wrapper"]}>
                      <div className={styles["sku-item-name"]}>
                        {renderName(el.Configurators)}
                      </div>
                      <div className={styles["sku-item-left"]}>
                        <div className={styles["sku-item-price"]}>
                          {renderGoodPrice(el)}元{" "}
                          <span className="hidden">{index}</span>
                        </div>
                        <div className={styles["sku-sale-num"]}>
                          {el.Quantity} có sẵn
                        </div>
                        <div className={styles["sku-item-picker-inline"]}>
                          <Controller
                            control={control}
                            name={`list.${index}.number`}
                            render={({ field }) => (
                              <div>
                                <span className={styles["next-input"]}>
                                  <InputNumber
                                    {...field}
                                    addonBefore={
                                      <div
                                        className={
                                          styles[
                                            "next-input-group-addon next-after"
                                          ]
                                        }
                                        style={{
                                          margin: "0 -11px",
                                        }}
                                      >
                                        <button
                                          disabled={!el.Quantity}
                                          type="button"
                                          className={styles["next-btn"]}
                                          onClick={() => {
                                            if (!!field.value) {
                                              field.onChange(field.value - 1);
                                            }
                                          }}
                                          style={{
                                            width: "32px",
                                            height: "28px",
                                          }}
                                        >
                                          <i className="fal fa-minus"></i>
                                        </button>
                                      </div>
                                    }
                                    addonAfter={
                                      <div
                                        className={
                                          styles[
                                            "next-input-group-addon next-after"
                                          ]
                                        }
                                        style={{
                                          margin: "0 -11px",
                                        }}
                                      >
                                        <button
                                          disabled={!el.Quantity}
                                          type="button"
                                          className={styles["next-btn"]}
                                          onClick={() => {
                                            field.onChange(field.value + 1);
                                          }}
                                          style={{
                                            width: "32px",
                                            height: "28px",
                                          }}
                                        >
                                          <i className="fal fa-plus"></i>
                                        </button>
                                      </div>
                                    }
                                    disabled={!el.Quantity}
                                    min={0}
                                    max={el.Quantity || 0}
                                    style={{ textAlign: "center" }}
                                    controls={false}
                                    size="small"
                                  />
                                </span>
                              </div>
                            )}
                          />

                          <div
                            className={styles["sku-number-picker-message"]}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>

      {!!totalQuantityArray(list, "number") ? (
        <div className={styles["order-preview-total-price"]}>
          <div className="flex gap-2 items-center">
            <div className={styles["order-preview-header"]}>Số lượng: </div>
            <div className="font-semibold text-main text-xl">
              {totalQuantityArray(list, "number")}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <div className={styles["order-preview-header"]}>Tổng tiền: </div>
            <div className="flex justify-center items-center">
              <div className={styles["order-preview-price"]}>
                <span className={styles["rmb"]}>¥</span>{" "}
                {_format.getYuan(renderTotalPrice(), "")}
              </div>
              <span className="mx-2">/</span>
              <div className={"text-[#333] font-semibold text-[18px]"}>
                {_format.getVND(
                  renderTotalPrice() * (configData?.Data || 0),
                  " đ"
                )}
              </div>
            </div>
          </div>
          <div className={styles["order-preview-price"]}></div>
        </div>
      ) : null}
      <div className={styles["order-button-wrapper"]}>
        <button
          type="button"
          disabled={mutationPostList.isLoading}
          onClick={handleSubmit(onSubmit)}
          className={styles["add-on-button"]}
        >
          Thêm vào giỏ hàng
        </button>
      </div>
      <DetailProductModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};
