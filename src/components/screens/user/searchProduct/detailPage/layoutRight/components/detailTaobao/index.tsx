import { Divider } from 'antd'
import { FC, useEffect, useMemo, useState } from 'react'
import { _format } from '~/utils'
import styles from '../common/_index.module.scss'
import { DetailProductModal } from '../common/modal'
import { StepPrice } from '../common/stepPrice'
import { useViewDetailProduct } from '../hooks/useViewDetailProduct'
import { CustomInputNumber } from '../common/customInputNumber'
import { useMutation, useQuery } from 'react-query'
import { configuration, orderShopTemp } from '~/api'
import { toast } from 'react-toastify'
import { Attributes } from './components/attributes'
import { isEmpty } from 'lodash'

type TProps = {
  item: IDetailRapidProductItem
  onChangePreview: (img: string) => void
}

export const DetailTaobao: FC<TProps> = ({ item, onChangePreview }) => {
  const {
    listAttributes,
    selectedItem,
    openModal,
    totalPrice,
    imageSelectItem,
    HandleSelectedAttribute,
    setOpenModal,
    getAttributeWithPidAndVid,
    getPriceOfItem,
    getPromoPriceOfItem,
  } = useViewDetailProduct(item)

  const { data: configData } = useQuery({
    queryKey: ['get-currency'],
    queryFn: () => configuration.getCurrency(),
  })

  const [totalSelect, setTotalSelect] = useState<number>(0)

  useEffect(() => {
    setTotalSelect(0)
  }, [selectedItem])

  const mutationAddToCart = useMutation(orderShopTemp.addToCart)

  const rootProduct = useMemo(
    () => ({
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
    }),
    [item],
  )

  const onSubmit = () => {
    if (totalSelect < item.FirstLotQuantity) {
      toast.error(`Chưa đạt số lượng tối thiểu là ${item.FirstLotQuantity}`)
      return
    }

    const data = {
      ...rootProduct,
      image_model: imageSelectItem || rootProduct.image_model,
      image_origin: imageSelectItem || rootProduct.image_origin,
      quantity: totalSelect,
      price_origin:
        getPromoPriceOfItem(selectedItem)?.OriginalPrice ||
        getPriceOfItem(selectedItem).OriginalPrice,
      property: selectedItem.Configurators.map((config) => {
        const foundAttr = getAttributeWithPidAndVid(config)
        return foundAttr
          ? `${foundAttr.OriginalPropertyName}-${foundAttr.OriginalValue}`
          : 'property not found'
      }).toString(),
      property_translated: selectedItem.Configurators.map((config) => {
        const foundAttr = getAttributeWithPidAndVid(config)
        return foundAttr
          ? `${foundAttr.OriginalPropertyName}-${foundAttr.OriginalValue}`
          : 'Không có thuộc tính'
      }).toString(),
    }

    mutationAddToCart.mutate(data, {
      onSuccess: (res) => {
        setOpenModal(true)
        toast.success('Thêm vào giỏ hàng thành công')
      },
      onError: (err) => {
        toast.error('Có lỗi xảy ra vui lòng thử lại')
      },
    })
  }

  return (
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
        listAttributes={listAttributes}
        onChangePreview={onChangePreview}
        handleSelectAttribute={HandleSelectedAttribute}
      />
      <div className={styles['prop-section']}>
        <div className={styles['prop-contain']}>
          <div className={styles['prop-content']}>
            <div className={styles['sku-item-wrapper']}>
              <div className={styles['sku-item-name']}></div>
              <div className={styles['sku-item-left']}>
                <div className={styles['sku-item-price']}>
                  {selectedItem &&
                  !isEmpty(getPromoPriceOfItem(selectedItem)) ? (
                    <>
                      <p className={styles['sku-item-price-origin']}>
                        {getPriceOfItem(selectedItem)?.OriginalPrice} 元
                      </p>
                      &nbsp;/&nbsp;
                      <p className={styles['sku-item-price-promo']}>
                        {getPromoPriceOfItem(selectedItem)?.OriginalPrice} 元
                      </p>
                    </>
                  ) : (
                    <p>{getPriceOfItem(selectedItem)?.OriginalPrice} 元</p>
                  )}
                </div>
                <div className={styles['sku-sale-num']}>
                  {selectedItem?.Quantity || 0} có sẵn
                </div>

                <div className={styles['sku-item-picker-inline']}>
                  <CustomInputNumber
                    data={selectedItem}
                    total={totalSelect}
                    setTotal={(val) => setTotalSelect(val)}
                  />
                  <div className={styles['sku-number-picker-message']}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!!totalSelect && (
        <>
          <div className={styles['order-preview-total-price']}>
            <div className='flex items-center gap-2'>
              <div className={styles['order-preview-header']}>Số lượng: </div>
              <div className='text-xl font-semibold text-main'>
                {totalSelect}
              </div>
            </div>
            <div className='flex flex-col gap-2 md:flex-row md:items-center'>
              <div className={styles['order-preview-header']}>Tổng tiền: </div>
              <div className='flex items-center justify-center'>
                <div className={styles['order-preview-price']}>
                  <span className={styles['rmb']}>¥</span>{' '}
                  {_format.getYuan(+totalPrice * totalSelect, '')}
                </div>
                <span className='mx-2'>/</span>
                <div className={'text-[18px] font-semibold text-[#333]'}>
                  {_format.getVND(
                    +totalPrice * totalSelect * (configData?.Data || 0),
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
              disabled={mutationAddToCart.isLoading}
              onClick={onSubmit}
              className={styles['add-on-button']}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
          <DetailProductModal
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </>
      )}
    </div>
  )
}
