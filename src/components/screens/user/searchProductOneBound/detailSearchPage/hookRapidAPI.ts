import axios, { AxiosRequestConfig } from 'axios'
import { useRouter } from 'next/router'
import { useState, useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'
import { ShopName } from '~/configs'

const options = (id: string) => {
  return {
    method: 'GET',
    url: 'https://otapi-1688.p.rapidapi.com/BatchGetItemFullInfo',
    params: {
      language: 'vi',
      itemId: id,
    },
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'otapi-1688.p.rapidapi.com',
    },
  }
}
const optionsTaobao = (id: string) => {
  return {
    method: 'GET',
    url: 'https://taobao-tmall1.p.rapidapi.com/BatchGetItemFullInfo',
    params: {
      language: 'vi',
      itemId: id,
    },
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'taobao-tmall1.p.rapidapi.com',
    },
  }
}

export const useHookRapidAPI = () => {
  const router = useRouter()
  const query = router.query
  const id = query.id as string | undefined
  const ecsite = query.ecsite as ShopName
  const [data, setData] = useState<IDetailRapidProductItem | null>(null)
  const [previewImg, setPreviewImg] = useState<string>('')

  const showDetail = async () => {
    try {
      const response = await axios.request(options(id) as AxiosRequestConfig)
      //  response.data.Result.Item
      const siteName = '1688'
      const shopId = response.data.Result.Vendor.FeaturedValues?.find(
        (e) => e.Name === 'userId',
      )?.Value

      setData({
        ...response.data.Result.Item,
        ShopId: shopId,
        Site: siteName,
      })
      console.log(response.data.Result.Item)
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại')
    }
  }
  const showDetailTaobao = async () => {
    try {
      const response = await axios.request(
        optionsTaobao(id) as AxiosRequestConfig,
      )
      const siteName = response.data.Result.Vendor.ProviderType.toUpperCase()
      const shopId =
        siteName.toLowerCase() +
        '_' +
        response.data.Result.Vendor.FeaturedValues.find(
          (e) => e.Name === 'shopId',
        )?.Value

      setData({
        ...response.data.Result.Item,
        ShopId: shopId,
        Site: siteName,
      })
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại')
    }
  }

  useEffect(() => {
    if (!id) return
    if (ecsite === ShopName.Shop1688) {
      showDetail()
    } else {
      showDetailTaobao()
    }
  }, [id, ecsite])

  const handleChangePreview = (newImg: string) => {
    setPreviewImg(newImg)
  }

  const layoutLeftData: {
    Videos: { Url: string; PreviewUrl: string }[]
    Pictures: string[]
  } = useMemo(() => {
    return {
      Videos: data?.Videos as { Url: string; PreviewUrl: string }[],
      Pictures: data?.Pictures?.map((p) => p.Url),
    }
  }, [data])

  return { layoutLeftData, data, previewImg, handleChangePreview, ecsite }
}
