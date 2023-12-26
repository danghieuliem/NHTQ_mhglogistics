import { Divider, Spin } from 'antd'
import { FC, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { _format } from '~/utils'
import styles from '../common/_index.module.scss'
import { StepPrice } from '../common/stepPrice'
import { DetailProductModal } from '../common/modal'
import {
  TSubAttribute,
  useViewDetail1688Product,
} from '../hooks/useViewDetail1688Product'
import { Attributes } from './components/attriButes'
import { SubAttributes } from './components/subAttributes'
import { useMutation, useQuery } from 'react-query'
import { configuration, orderShopTemp } from '~/api'
import { cloneDeep } from 'lodash'
import { toast } from 'react-toastify'

type LayoutRightProps = {
  item: IDetailRapidProductItem
  onChangePreview: (img: string) => void
}

export const Detail1688: FC<LayoutRightProps> = ({ item, onChangePreview }) => {
  const { data: configData } = useQuery({
    queryKey: ['get-currency'],
    queryFn: () => configuration.getCurrency(),
  })

  const {
    curDataSelected,
    selectedMainAtt,
    sumPriceCurrentSelect,
    mapMainAttWithSubAttribute,
    totalSelectedAll,
    openModal,
    setOpenModal,
    isLoading,
    setIsLoading,
    handleSelectMainAttribute,
    setTotalSelectedSubAttribute,
    getAttributeWithPidAndVid,
    getImageOfItem,
    getPromoPriceOfItem,
    getPriceOfItem,
  } = useViewDetail1688Product(item)

  const mutationPost = useMutation(orderShopTemp.addToCart)

  const mutationPostList = useMutation(
    (datalist: any[]) => {
      // Oh sh*t !! please update later
      const queueCallAPI = async (items) => {
        for (let item in items) {
          // !! Don't remove await here (BE is wrong total price if don't have await)
          await orderShopTemp.addToCart(items[item])
        }
      }
      return queueCallAPI(cloneDeep(datalist))
    },
    {
      onSuccess: (newOrder) => {},
      onError: (error: any) => {},
    },
  )

  const rootProduct = useMemo(() => {
    return {
      brand: '',
      category_id: 1,
      category_name: 'Đang cập nhật',
      comment: '',
      data_value: '',
      error: 0,
      image_model: item.MainPictureUrl,
      image_origin: item.MainPictureUrl,
      is_translate: false,
      item_id: item.Id.slice(4),
      link_origin: item.TaobaoItemUrl,
      location_sale: '',
      maxTimes: 0, //count số lượng thuộc tính khách chọn => tracking số lần gửi để hiển thị thông báo thành công
      outer_id: '',
      price_origin: item.Price.OriginalPrice, // dùng bên list vì giá sẽ có giá riêng theo từng property
      price_promotion: 0,
      price_table: item?.QuantityRanges
        ? item?.QuantityRanges.map((el, idx) => ({
            begin: `${el.MinQuantity}`,
            end: item.QuantityRanges[idx + 1]
              ? `${item.QuantityRanges[idx + 1].MinQuantity - 1}`
              : '99999',
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
                  : '99999'
              }:${el.Price.OriginalPrice}`,
          ).join('|') + '|'
        : // : `${item.FirstLotQuantity}-99999:${item.Price.OriginalPrice}|`,
          ``,
      require_min: 1,
      selectedProps: 'N/A',
      selectedSKU_ID: 'N/A',
      shop_id: item.ShopId,
      shop_name: item.VendorName,
      stock: 9999,
      title_origin: item.OriginalTitle,
      title_translated: item.Title,
      tool: 'Addon',
      version: '1.7',
      wangwang: item.VendorName,
      weight: 0,
      Site: item.Site,
    }
  }, [item])

  const onSubmit = () => {
    if (totalSelectedAll < item.FirstLotQuantity) {
      setIsLoading(false)
      toast.error(`Chưa đạt số lượng tối thiểu là ${item.FirstLotQuantity}`)
      return
    }

    const mainHaveSelected = Object.values(mapMainAttWithSubAttribute).filter(
      (el) => {
        return el.sumTotalSubAtt > 0
      },
    )

    const configItemsSelected: TSubAttribute[] = []
    mainHaveSelected.forEach((main) => {
      configItemsSelected.push(
        ...main.subAttributes.filter((sub) => {
          return sub.totalSelected > 0
        }),
      )
    })

    const fmList = configItemsSelected.map((vl) => {
      const { price, totalSelected, configItem, ...attribute } = vl
      return {
        ...rootProduct,
        image_model: getImageOfItem(configItem) || item.MainPictureUrl,
        image_origin: getImageOfItem(configItem) || item.MainPictureUrl,
        quantity: totalSelected,
        price_origin:
          getPromoPriceOfItem(configItem)?.OriginalPrice ||
          getPriceOfItem(configItem).OriginalPrice,
        property: configItem.Configurators.map((cf) => {
          const foundAttr = getAttributeWithPidAndVid(cf)

          return foundAttr
            ? `${foundAttr.OriginalPropertyName}-${foundAttr.OriginalValue}`
            : ''
        }).toString(),
        property_translated: configItem.Configurators.map((cf) => {
          const foundAttr = getAttributeWithPidAndVid(cf)

          return foundAttr
            ? `${foundAttr.OriginalPropertyName}-${foundAttr.OriginalValue}`
            : 'SP không có thuộc tính'
        }).toString(),
      }
    })
    // console.log({ fmList })

    // return
    const firstElement = fmList.shift()
    mutationPost.mutate(firstElement, {
      onSuccess: () => {
        mutationPostList.mutate(fmList, {
          onError: () => {
            setIsLoading(false)
            toast.error('Có lỗi xảy ra vui lòng thử lại')
          },
          onSuccess: () => {
            setOpenModal(true)
            setIsLoading(false)
            toast.success('Thêm vào giỏ hàng thành công')
          },
        })
      },
      onError: () => {
        setIsLoading(false)
        toast.error('Có lỗi xảy ra vui lòng thử lại')
      },
    })
  }

  return (
    <Spin spinning={isLoading}>
      <div className={styles['layout-right']}>
        <div className={styles['title-contain']}>
          <a
            href={item.TaobaoItemUrl}
            target='_blank'
            className={styles['title']}
          >
            {item.Title}
          </a>
        </div>
        <div className={styles['price-contain']}>
          <div className={styles['price-content']}>
            <div className={styles['price-header']}>
              <span className={styles['price-name']}>Giá tiền</span>
              <span className={styles['price-num']}>Lô hàng</span>
            </div>
            <StepPrice item={item} />
          </div>
        </div>

        <Divider />

        <Attributes
          attriButes={Object.values(mapMainAttWithSubAttribute)}
          attributeSelected={selectedMainAtt}
          handleSelectAttribute={handleSelectMainAttribute}
          onChangePreview={onChangePreview}
        />

        <Divider />

        <SubAttributes
          attributes={curDataSelected}
          setTotalSelected={setTotalSelectedSubAttribute}
        />

        <Divider />

        {totalSelectedAll > 0 ? (
          <>
            <div className={styles['order-preview-total-price']}>
              <div className='flex items-center gap-2'>
                <div className={styles['order-preview-header']}>Số lượng: </div>
                <div className='text-xl font-semibold text-main'>
                  {totalSelectedAll}
                </div>
              </div>
              <div className='flex flex-col gap-2 md:flex-row md:items-center'>
                <div className={styles['order-preview-header']}>
                  Tổng tiền:{' '}
                </div>
                <div className='flex items-center justify-center'>
                  <div className={styles['order-preview-price']}>
                    <span className={styles['rmb']}>¥</span>{' '}
                    {_format.getYuan(sumPriceCurrentSelect, '')}
                  </div>
                  <span className='mx-2'>/</span>
                  <div className={'text-[18px] font-semibold text-[#333]'}>
                    {_format.getVND(
                      sumPriceCurrentSelect * (configData?.Data || 0),
                      ' đ',
                    )}
                  </div>
                </div>
              </div>
              <div className={styles['order-preview-price']}></div>
            </div>
            <div className={styles['order-button-wrapper']}>
              <button
                type='button'
                disabled={mutationPostList.isLoading}
                onClick={
                  !isLoading
                    ? () => {
                        setIsLoading(true)
                        onSubmit()
                      }
                    : null
                }
                className={styles['add-on-button']}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
        <DetailProductModal openModal={openModal} setOpenModal={setOpenModal} />
      </div>
    </Spin>
  )
}
