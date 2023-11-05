import { Divider, InputNumber } from 'antd'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { DetailModal } from '../detailModal'
import { baseCatalogueArr } from './data'
import styles from './search.module.scss'
import { searchProduct } from '~/api'
import { ShopName } from '~/configs'

const ECarr = [
  {
    id: '1',
    name: 'Taobao',
    img: '/catalogueImages/newtaobao.png',
  },
  {
    id: '2',
    name: '1688',
    img: '/catalogueImages/1688.svg',
  },

  {
    id: '3',
    name: 'Tmal',
    img: '/catalogueImages/newtmall.png',
  },
]

type SearchForm = {
  cars: ShopName
  firstName: string
  minPrice: any
  maxPrice: any
}

const getUrlFromSearchText = async (string: string) => {
  try {
    const shortTmalTaobao = 'm.tb.cn'
    const short1688 = 'qr.1688.com'
    const url = new URL(string)
    if ([short1688, shortTmalTaobao].includes(url.host.toString())) throw null
    return url
  } catch {
    const paragraph = string
    const regex = /((https?|wireless1688):\/\/[^\s]+)/g
    const urlFromText: string[] | null = paragraph.match(regex)

    if (!urlFromText?.[0]) return null

    return searchProduct
      .get({ url: urlFromText[0] })
      .then((res) => {
        let urlFromText: string[] | null = res.toString().match(regex)
        if (!urlFromText.length) return null

        //handle for 1688
        urlFromText[0] = urlFromText[0]
          .replace('wireless1688', 'https')
          .replace('/offer?id=', '/offer/')

        return new URL(urlFromText[0])
      })
      .catch(() => null)
  }
}

export const SearchInput: FC = () => {
  const router = useRouter()
  const { ecsite, searchcontent, minPrice, maxPrice } = router.query
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [modalId, setModalId] = useState<string>('')
  const [modalSiteEC, setModalSiteEC] = useState<ShopName>(ShopName.TaoBao)
  const [classCatoloItem, setClassCatoloItem] = useState('catolo-item')

  const {
    register,
    control,
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { isDirty },
  } = useForm<SearchForm>({
    defaultValues: {
      cars: ShopName.TaoBao,
      firstName: '',
      minPrice: null,
      maxPrice: null,
    },
  })
  useEffect(() => {
    if (!router.isReady) return
    reset({
      cars: (ecsite as ShopName) || ShopName.TaoBao,
      firstName: (searchcontent as string) || '',
      minPrice: (minPrice as string) || '',
      maxPrice: (maxPrice as string) || '',
    })
  }, [router.isReady])
  const { cars, minPrice: watchMinPrice } = watch()

  const handleClickCatalogue = (param: { title: string; value: string }) => {
    reset({
      cars: cars,
      firstName: param.title,
    })
    setClassCatoloItem('catolo-item-no-hover')
    router
      .replace({
        pathname: 'search-product',
        query: {
          ecsite: cars,
          searchcontent: param.value,
        },
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onSubmit = async (data: SearchForm) => {
    const { cars, firstName, minPrice, maxPrice } = data

    fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=vi&tl=zh-CN&dt=t&q=${firstName}`,
    )
      .then((res) => res.json())
      .then((data) => {
        return getUrlFromSearchText(firstName).then((url) => {
          if (url) {
            let itemId = ''
            const hostname = url.hostname

            if (hostname.includes('1688')) {
              const businessId = url.searchParams.get('businessId')
              itemId = 'abb-' + (businessId || url.pathname.slice(7, 19))
              setModalSiteEC(ShopName.Shop1688)
            } else if (hostname.includes('tmall')) {
              itemId = url.searchParams.get('id')
              setModalSiteEC(ShopName.Tmall)
            } else {
              itemId = url.searchParams.get('id')
              setModalSiteEC(ShopName.TaoBao)
            }
            setOpenModal(true)
            setModalId(itemId)
          } else {
            router.replace({
              pathname: 'search-product',
              query: {
                ecsite: cars,
                searchcontent: data[0][0][0].toString(),
                minPrice: minPrice,
                maxPrice: maxPrice,
              },
            })
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const handleMouseOver = () => {
    setClassCatoloItem('catolo-item')
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=' flex flex-col items-end gap-2 sm:flex-row'>
          <div className='w-full sm:flex-1'>
            {/* <div className="hidden xl:block text-[18px] font-bold text-white mr-[50px]">Tìm kiếm sản phẩm</div> */}
            {/* <div className="w-full max-w-[390px] md:max-w-[590px] lg:max-w-[890px] flex items-center"> */}
            <div className='flex w-full items-center'>
              <div className={styles['element-search']}>
                <div className={styles['select-search']}>
                  <Select
                    isMulti={false}
                    classNamePrefix='select'
                    menuPosition='fixed'
                    value={ECarr.find((x) => x.id == cars)}
                    onChange={(value: any) => {
                      setValue('cars', value.id, { shouldDirty: true })
                    }}
                    options={ECarr}
                    getOptionValue={(x) => x.id}
                    getOptionLabel={(x) => x.name}
                    formatOptionLabel={(x) => (
                      <div>
                        <img
                          src={x.img}
                          style={{ objectFit: 'cover' }}
                          alt='formatOptionLabel'
                          width={'60%'}
                          height={'auto'}
                        />
                      </div>
                    )}
                    components={{ IndicatorSeparator: null }}
                    styles={{
                      control: (provided: any, state: any) => ({
                        ...provided,
                        height: '100%',
                        border: 'none',
                        outline: 'none',
                        boxShadow: 'none',
                      }),
                      option: (provided: any, state: any) => ({
                        ...provided,
                        backgroundColor: 'transparent !important',
                        cursor: 'pointer',
                        // borderBottom: '1px solid #ff4000'
                      }),
                    }}
                  />
                </div>
                <div className='flex grow items-center'>
                  <div className={styles['input-search']}>
                    <input
                      className={styles['input']}
                      placeholder='Nhập từ khóa hoặc link sản phẩm trên Tabao/ Tmall/ 1688'
                      {...register('firstName')}
                    />
                  </div>
                  {/* <label htmlFor="html">
                    <input
                      disabled={!isDirty}
                      type="submit"
                      style={{
                        display: 'none'
                      }}
                      id="html"
                      name="fav_language"
                      value="HTML"
                    />
                    <button className={styles['input-btn']}>
                      <i className="fas fa-search" />
                    </button>
                  </label> */}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="py-[5px] text-[18px]  mb-[18px]">
					Kết quả tìm kiếm: <span className="font-bold">"{searchcontent}"</span>
				</div> */}
          <div className={styles['range-price-wrap']}>
            {/* <div className={styles['range-price-input']}> */}
            {/* <p>Giá thấp nhất</p> */}
            <div className={styles['min-price']}>
              <Controller
                control={control}
                name='minPrice'
                render={({ field }) => (
                  <InputNumber
                    addonBefore='￥'
                    {...field}
                    min={0}
                    // style={{ width: '180px', fontSize: '14px' }}
                    controls={false}
                    size='large'
                    placeholder='Giá thấp nhất'
                  />
                )}
              />
            </div>
            {/* </div>
            <div className={styles['range-price-input']}> */}
            {/* <p>Giá cao nhất</p> */}
            <div className={styles['max-price']}>
              <Controller
                control={control}
                name='maxPrice'
                render={({ field }) => (
                  <InputNumber
                    addonBefore='￥'
                    {...field}
                    min={watchMinPrice || 0}
                    // style={{ width: '180px' }}
                    controls={false}
                    size='large'
                    placeholder='Giá cao nhất'
                  />
                )}
              />
            </div>
            {/* </div> */}

            <button className={styles['range-price-btn']}>Tìm kiếm</button>
          </div>
        </div>

        <Divider className='!my-3' />
        <div className={styles['catolo-wrap']}>
          {baseCatalogueArr.map((el, index) => {
            return (
              <div
                key={`${index}-catolo-item`}
                className={clsx(styles[`${classCatoloItem}`], 'group')}
                onMouseOver={handleMouseOver}
              >
                <div className={styles['catolo-item-title']}>
                  <img
                    className='h-[30px]'
                    src={el.Img || '/catalogueImages/no-pictures.png'}
                    alt='catalogue-image'
                  />
                  <p className='text-[12px] font-bold text-orange'>
                    {el.Title}
                  </p>
                </div>
                <div className={styles['sub-menu']}>
                  <ul role='list' className={styles['sub-menu-ul']}>
                    {el.Children.map((vl: any, idx: number) => {
                      return (
                        <li
                          className={clsx(
                            'flex cursor-pointer justify-between p-2 hover:bg-[#e5e5e5]',
                            styles['catolo-last-child-group'],
                          )}
                          onClick={() => {
                            if (!vl?.Children?.length) {
                              handleClickCatalogue({
                                title: vl.Title,
                                value: vl.Value,
                              })
                            }
                          }}
                          key={`catalogueItem-${vl.Title}${idx}`}
                        >
                          <p className='text-sm'>{vl.Title}</p>
                          {!!vl?.Children?.length ? (
                            <i className='fas fa-caret-right'></i>
                          ) : null}
                          {!!vl?.Children?.length ? (
                            <div
                              className={clsx(
                                styles['catolo-last-child-group-item'],
                              )}
                            >
                              <ul role='list'>
                                {vl.Children.map(
                                  (another: any, aidx: number) => {
                                    return (
                                      <li
                                        className={clsx('flex')}
                                        onClick={() => {
                                          if (!another?.Children?.length) {
                                            handleClickCatalogue({
                                              title: another.Title,
                                              value: another.Value,
                                            })
                                          }
                                        }}
                                        key={`catalogueItem-${another.Title}${idx}-${aidx}`}
                                      >
                                        <p className='text-sm'>
                                          {another.Title}
                                        </p>
                                      </li>
                                    )
                                  },
                                )}
                              </ul>
                            </div>
                          ) : null}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </form>
      <Divider />
      <DetailModal
        id={modalId}
        isVisible={openModal}
        ecsite={modalSiteEC}
        onClose={() => setOpenModal(false)}
      />
    </>
  )
}
