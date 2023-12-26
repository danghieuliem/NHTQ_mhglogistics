import { Divider } from 'antd'
import { FC, useEffect, useMemo, useState } from 'react'
import { _format } from '~/utils'
import styles from '../common/_index.module.scss'
import { DetailProductModal } from '../common/modal'
import { StepPrice } from '../common/stepPrice'
import { useViewDetailProduct } from '../hooks/useViewDetailTaobaoProduct'
import { CustomInputNumber } from '../common/customInputNumber'
import { useMutation, useQuery } from 'react-query'
import { configuration, orderShopTemp } from '~/api'
import { toast } from 'react-toastify'
import { Attributes } from './components/attributes'
import { isEmpty, isUndefined } from 'lodash'

type TProps = {
  item: TItemDetail
  onChangePreview: (img: string) => void
}

export const DetailTaobao: FC<TProps> = ({ item, onChangePreview }) => {
  const {
    selectedSku,
    handleSelected,
    openModal,
    setOpenModal,
    props_list,
    mapKeyPropertyValueSku,
    listPropType,
    props_img,
  } = useViewDetailProduct(item)

  const { data: configData } = useQuery({
    queryKey: ['get-currency'],
    queryFn: () => configuration.getCurrency(),
  })

  const [totalSelect, setTotalSelect] = useState<number>(0)

  useEffect(() => {
    setTotalSelect(0)
  }, [selectedSku])

  const mutationAddToCart = useMutation(orderShopTemp.addToCart)

  const rootProduct = useMemo(
    () => ({
      brand: '',
      category_id: 1,
      category_name: 'Đang cập nhật',
      comment: '',
      data_value: '',
      error: 0,
      image_model: item.pic_url,
      image_origin: item.pic_url,
      is_translate: false,
      item_id: item.num_iid,
      link_origin: item.detail_url,
      location_sale: '',
      maxTimes: 0, //count số lượng thuộc tính khách chọn => tracking số lần gửi để hiển thị thông báo thành công
      outer_id: '',
      price_origin: item.orginal_price, // dùng bên list vì giá sẽ có giá riêng theo từng property
      price_promotion: 0,
      price_table: !isUndefined(item?.priceRange)
        ? item?.priceRange?.map((el, idx) => ({
            begin: `${el[0]}`,
            end: item.priceRange[idx + 1]
              ? `${+item.priceRange[idx + 1][0] - 1}`
              : '99999',
            price: `${el[1]}`,
          }))
        : [],
      pricestep: !isUndefined(item?.priceRange)
        ? item?.priceRange
            .map(
              (el, idx) =>
                `${el[0]}-${
                  item.priceRange[idx + 1]
                    ? `${+item.priceRange[idx + 1][0] - 1}`
                    : '99999'
                }:${+el[1]}`,
            )
            .join('|') + '|'
        : ``,
      require_min: 1,
      selectedProps: 'N/A',
      selectedSKU_ID: 'N/A',
      shop_id: item.shop_id,
      shop_name: item.seller_info.title,
      stock: 9999,
      title_origin: item.title,
      title_translated: item.title,
      tool: 'Addon',
      version: '1.7',
      wangwang: item.seller_info.title,
      weight: 0,
      Site: 'taobao',
    }),
    [item],
  )

  const onSubmit = () => {
    if (totalSelect < +item.min_num) {
      toast.error(`Chưa đạt số lượng tối thiểu là ${item.min_num}`)
      return
    }

    const data = {
      ...rootProduct,
      image_model: selectedSku.image || rootProduct.image_model,
      image_origin: selectedSku.image || rootProduct.image_origin,
      quantity: totalSelect,
      price_origin: selectedSku.price || selectedSku?.orginal_price,
      property: selectedSku.properties_name
        ?.split(';')
        .map((property) => {
          const [_, __, Pname, Vname] = property.split(':')
          return !isEmpty(property) ? `${Pname}-${Vname}` : ''
        })
        .toString(),
      property_translated: selectedSku.properties_name
        ?.split(';')
        .map((property) => {
          const [_, __, Pname, Vname] = property.split(':')
          return !isEmpty(property) ? `${Pname}-${Vname}` : ''
        })
        .toString(),
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
        <a href={item.detail_url} target='_blank' className={styles['title']}>
          {item.title}
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
        props_img={props_img}
        mapKeyPropertyValueSku={mapKeyPropertyValueSku}
        selectedSku={selectedSku}
        listPropType={listPropType}
        onChangePreview={onChangePreview}
        handleSelectProp={handleSelected}
      />
      <div className={styles['prop-section']}>
        <div className={styles['prop-contain']}>
          <div className={styles['prop-content']}>
            <div className={styles['sku-item-wrapper']}>
              <div className={styles['sku-item-name']}></div>
              <div className={styles['sku-item-left']}>
                <div className={styles['sku-item-price']}>
                  <p>{selectedSku?.price || selectedSku?.orginal_price} 元</p>
                </div>
                <div className={styles['sku-sale-num']}>
                  {selectedSku?.quantity || 0} có sẵn
                </div>

                <div className={styles['sku-item-picker-inline']}>
                  <CustomInputNumber
                    data={selectedSku}
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
                  {_format.getYuan(
                    +(selectedSku.price || selectedSku.orginal_price) *
                      totalSelect,
                    '',
                  )}
                </div>
                <span className='mx-2'>/</span>
                <div className={'text-[18px] font-semibold text-[#333]'}>
                  {_format.getVND(
                    +(selectedSku.price || selectedSku.orginal_price) *
                      totalSelect *
                      (configData?.Data || 0),
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
