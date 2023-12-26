import { NextRouter, useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import {
  defaultSearchOneboundParams,
  _taobaoAPI,
  _1688API,
  translateAPI,
} from '~/api/onebound'
import { ShopName } from '~/configs'
import { isUndefined } from 'lodash'

export const useHookOnebound = () => {
  const router = useRouter()
  const { searchcontent, ecsite } = router.query

  const [productList, setProductList] = useState<TResponseOnebound[]>([])
  const [pageIndex, setPageIndex] = useState<number>(1)

  const [filter, setFilter] = useState({
    ...defaultSearchOneboundParams,
    page: pageIndex,
    page_size: 40, // it don't work for me now
    q: '',
  })

  const listProductRef = useRef(null)

  const fetchData = useMutation(
    ({
      router,
      searchcontent,
      ecsite,
      page = 1,
    }: {
      router: NextRouter
      searchcontent: string | string[]
      ecsite: string | string[]
      page?: number
    }): Promise<TResponseOnebound[]> => {
      if (!router.isReady) return Promise.resolve([])

      if (isUndefined(searchcontent) || isUndefined(ecsite))
        return Promise.resolve([])

      let promise: Promise<{
        items: TResponseOnebound[]
        totals: number
      }> = null

      const query = {
        ...filter,
        page,
        q: `${searchcontent}`,
      }

      switch (ecsite) {
        case ShopName.Shop1688:
          promise = _1688API.getList(query)
          break
        case ShopName.TaoBao:
          promise = _taobaoAPI.getList(query)
          break
        default:
          promise = _taobaoAPI.getList(query)
          break
      }

      return promise.then((res) => {
        const formatList: Promise<TResponseOnebound>[] = res?.items?.map(
          async (i): Promise<TResponseOnebound> => {
            const data: TResponseOnebound = {
              ...i,
              titleVN: await translateAPI.toVietnamese(i.title),
            }
            return data
          },
        )

        return Promise.all(formatList || [])
      }) as any
    },
  )

  useEffect(() => {
    setPageIndex(1)
    setProductList([])
    setFilter({
      ...defaultSearchOneboundParams,
      page: 1,
      page_size: 40, // it don't work for me now
      q: '',
    })
    fetchData.mutateAsync(
      {
        ecsite: ecsite,
        router,
        searchcontent: searchcontent,
      },
      {
        onError: (err) => {
          console.log(err)
        },
        onSuccess: (res) => {
          setProductList(res)
          listProductRef.current.scrollIntoView()
        },
      },
    )
  }, [searchcontent, ecsite])

  const handleFetchMore = () => {
    fetchData.mutateAsync(
      {
        ecsite: ecsite,
        router,
        searchcontent: searchcontent,
        page: pageIndex + 1,
      },
      {
        onError: (err) => {
          console.log(err)
        },
        onSuccess: (res) => {
          setProductList([...productList, ...res])
          setPageIndex(pageIndex + 1)
        },
      },
    )
  }

  return {
    isLoading: fetchData.isLoading,
    listProductRef,
    productList,
    handleFetchMore,
  }
}
