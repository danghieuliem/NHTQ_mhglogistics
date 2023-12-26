import axios, { AxiosRequestConfig } from 'axios'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { configuration } from '~/api'
import { defaultSearchOneboundParams, _taobaoAPI } from '~/api/onebound'
import { ShopName } from '~/configs'
import { TItem } from '../cardProduct'

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

export const useHookRapidAPI = () => {
  const router = useRouter()
  //homeConfig
  const { searchcontent, ecsite, minPrice, maxPrice } = router.query

  const [productList, setProductList] = useState<TItem[]>([])
  const [pageIndex, setPageIndex] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

  return {
    isLoading,
    listProductRef,
    productList,
    handleFetchMore,
  }
}
