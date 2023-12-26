import { Divider, Spin } from 'antd'
import { FC, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { _format } from '~/utils'
import styles from '../common/_index.module.scss'
import { StepPrice } from '../common/stepPrice'
import { DetailProductModal } from '../common/modal'
import { useViewDetail1688Product } from '../hooks/useViewDetail1688Product'
import { Attributes } from './components/attriButes'
import { SubAttributes } from './components/subAttributes'
import { useMutation, useQuery } from 'react-query'
import { configuration, orderShopTemp } from '~/api'
import { cloneDeep, isEmpty, isUndefined } from 'lodash'
import { toast } from 'react-toastify'
import { TranslateToVN } from '../common/transplateToVN'

type LayoutRightProps = {
  item: TItemDetail
  onChangePreview: (img: string) => void
}

export const Detail1688: FC<LayoutRightProps> = ({ item, onChangePreview }) => {
  const { data: configData } = useQuery({
    queryKey: ['get-currency'],
    queryFn: () => configuration.getCurrency(),
  })

  const {
    props_img,
    mainProps,
    subProps,
    openModal,
    selectedMainProp,
    handleSelectedMainProp,
    setOpenModal,
    isLoading,
    setIsLoading,
    totalSelectedAll,
    mapKeyPropertyValueSku,
    mapKeyPropertyWithTotalSelected,
    sumPriceCurrentSelect,
    mapSelectedForMain,
    handelChangeTotalSelectedProduct,
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
      shop_name: item.seller_info?.title,
      stock: 9999,
      title_origin: item.title,
      title_translated: item.title,
      tool: 'Addon',
      version: '1.7',
      wangwang: item.seller_info?.title,
      weight: 0,
      Site: '1688',
    }
  }, [item])

  const onSubmit = () => {
    if (totalSelectedAll < +item.min_num) {
      setIsLoading(false)
      toast.error(`Chưa đạt số lượng tối thiểu là ${item.min_num}`)
      return
    }

    const mainHaveSelected = Object.keys(
      mapKeyPropertyWithTotalSelected,
    ).filter((el) => {
      return mapKeyPropertyWithTotalSelected[el] > 0
    })

    const configItemsSelected: TSku[] = []
    mainHaveSelected.forEach((key) => {
      configItemsSelected.push({ ...mapKeyPropertyValueSku[key] })
    })

    const fmList = configItemsSelected.map((vl) => {
      const { orginal_price, price, properties, image, properties_name } = vl
      return {
        ...rootProduct,
        image_model: image || props_img[vl.properties.split(';')[0]],
        image_origin: image || props_img[vl.properties.split(';')[0]],
        quantity: mapKeyPropertyWithTotalSelected[properties],
        price_origin: orginal_price || price,
        property: properties_name
          ?.split(';')
          .map((property) => {
            const [_, __, Pname, Vname] = property.split(':')
            return !isEmpty(property) ? `${Pname}-${Vname}` : ''
          })
          .toString(),
        property_translated: properties_name
          ?.split(';')
          .map((property) => {
            const [_, __, Pname, Vname] = property.split(':')
            return !isEmpty(property) ? `${Pname}-${Vname}` : ''
          })
          .toString(),
      }
    })

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
          <a href={item.detail_url} target='_blank' className={styles['title']}>
            <TranslateToVN text={item.title} />
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
          propList={mainProps}
          propSelected={selectedMainProp}
          handleSelectProp={handleSelectedMainProp}
          onChangePreview={onChangePreview}
          mapKeyPropertyWithTotalSelected={mapKeyPropertyWithTotalSelected}
          mapSelectedForMain={mapSelectedForMain}
        />

        <Divider />

        <SubAttributes
          propList={subProps}
          setTotalSelected={handelChangeTotalSelectedProduct}
          mapKeyPropertyValueSku={mapKeyPropertyValueSku}
          mapKeyPropertyWithTotalSelected={mapKeyPropertyWithTotalSelected}
          selectedMainProp={selectedMainProp}
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
