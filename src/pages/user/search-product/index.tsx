import { Spin } from 'antd'
import axios, { AxiosRequestConfig } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Waypoint } from 'react-waypoint'
import { UserLayout, toast } from '~/components'
import {
  ProductList,
  SearchInput,
} from '~/components/screens/user/searchProduct'
import { TNextPageWithLayout } from '~/types/layout'
import { ShopName } from '~/configs'
import { configuration } from '~/api'

const options1688 = (
  framePosition: number,
  title: string,
  minPrice: string | null,
  maxPrice: string | null,
) => {
  return {
    url: 'https://otapi-1688.p.rapidapi.com/BatchSearchItemsFrame',
    method: 'GET',
    params: {
      language: 'vi',
      framePosition: `0`,
      frameSize: `${(framePosition + 1) * 50}`,
      OrderBy: 'Popularity:Desc',
      MinVolume: '50',
      ItemTitle: title,
      MinPrice: minPrice,
      MaxPrice: maxPrice,
    },
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'otapi-1688.p.rapidapi.com',
    },
  }
}
const optionsTaobao = (
  framePosition: number,
  title: string,
  minPrice: string | null,
  maxPrice: string | null,
) => {
  return {
    method: 'GET',
    url: 'https://taobao-tmall1.p.rapidapi.com/BatchSearchItemsFrame',
    params: {
      language: 'vi',
      framePosition: `0`,
      frameSize: `${(framePosition + 1) * 50}`,
      OrderBy: 'Popularity:Desc',
      MinVolume: '50',
      ItemTitle: title,
      MinPrice: minPrice,
      MaxPrice: maxPrice,
    },
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'taobao-tmall1.p.rapidapi.com',
    },
  }
}

const Index: TNextPageWithLayout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  //homeConfig
  const configData: any = queryClient.getQueryData(['homeConfig'])
  const { searchcontent, ecsite, minPrice, maxPrice } = router.query

  const [productList, setProductList] = useState<IRapidProductItem[]>([])
  const [pageIndex, setPageIndex] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { data: currencyConfig } = useQuery({
    queryKey: ['get-currency'],
    queryFn: () => configuration.getCurrency(),
  })

  const onSearch1688 = async (
    pageIndex: number,
    title: string,
    minPrice: string | null,
    maxPrice: string | null,
  ) => {
    try {
      setIsLoading(true)
      const response = await axios.request(
        options1688(pageIndex, title, minPrice, maxPrice) as AxiosRequestConfig,
      )
      setProductList(response.data.Result.Items.Items?.Content || [])
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  const onSearchTaobao = async (
    pageIndex: number,
    title: string,
    minPrice: string | null,
    maxPrice: string | null,
  ) => {
    try {
      setIsLoading(true)

      const response = await axios.request(
        optionsTaobao(
          pageIndex,
          title,
          minPrice,
          maxPrice,
        ) as AxiosRequestConfig,
      )

      setProductList(response.data.Result.Items.Items?.Content || [])
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  const fet = useMutation((objParams: any) => {
    const { pageIndex, title, minPrice, maxPrice, ecsite } = objParams
    if (ecsite === ShopName.Shop1688) {
      return axios.request(
        options1688(pageIndex, title, minPrice, maxPrice) as AxiosRequestConfig,
      )
    } else {
      return axios.request(
        optionsTaobao(
          pageIndex,
          title,
          minPrice,
          maxPrice,
        ) as AxiosRequestConfig,
      )
    }
  })

  const listProductRef = useRef(null)

  useEffect(() => {
    if (!router.isReady) return
    if (!currencyConfig?.Data) return

    if (!!searchcontent?.length) {
      setPageIndex(0)

      let query: Promise<any> = null
      if (ecsite === ShopName.Shop1688) {
        query = onSearch1688(
          0,
          searchcontent as string,
          minPrice as string,
          maxPrice as string,
        )
      } else {
        query = onSearchTaobao(
          0,
          searchcontent as string,
          minPrice as string,
          maxPrice as string,
        )
      }

      query.then(() => {
        listProductRef.current.scrollIntoView()
      })
    }
  }, [router.isReady, searchcontent, ecsite, minPrice, maxPrice])

  const handleFetchMore = () => {
    fet.mutateAsync(
      {
        pageIndex: pageIndex + 1,
        title: searchcontent,
        minPrice: minPrice,
        maxPrice: maxPrice,
        ecsite,
      },
      {
        onSuccess: (res) => {
          setProductList(res.data.Result.Items.Items.Content || [])
          setPageIndex((pageIndex) => pageIndex + 1)
        },
        onError: (err) => {
          toast.error(err)
        },
      },
    )
  }

  return (
    <Spin
      spinning={isLoading}
      size='large'
      indicator={<div className='spin spin-search-product'></div>}
    >
      <div className='mx-auto my-[24px] h-full w-full max-w-[1390px]'>
        <div className='titlePageUser'>Tìm kiếm sản phẩm</div>
        <div>
          <div className=''>
            <SearchInput />
          </div>
        </div>
        {/* Hidden on UI */}
        <div
          className='relative bottom-20 -z-50 bg-red'
          ref={listProductRef}
        ></div>

        {productList.length ? (
          <div>
            <ProductList
              rapidProducts={productList}
              currency={currencyConfig?.Data || 0}
            />
            <Waypoint onEnter={handleFetchMore}>
              <div className='flex w-full items-center justify-center p-12'>
                <Spin size='large' indicator={<div className='spin'></div>} />
              </div>
            </Waypoint>
          </div>
        ) : (
          <div className='mt-6 flex items-center justify-center'>
            Không tìm thấy dữ liệu
          </div>
        )}
      </div>
    </Spin>
  )
}

Index.displayName = 'Tìm kiếm sản phẩm'
Index.Layout = UserLayout

export default Index
