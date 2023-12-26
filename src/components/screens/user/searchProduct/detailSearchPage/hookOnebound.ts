import { isUndefined } from 'lodash'
import { NextRouter, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import {
  _1688API,
  _taobaoAPI,
  defaultSearchOneboundParams,
} from '~/api/onebound'
import { ShopName } from '~/configs'

export const useHookOnebound = () => {
  const router = useRouter()
  const query = router.query
  const id = query.id as string | undefined
  const ecsite = query.ecsite as ShopName

  const [data, setData] = useState<IDetailRapidProductItem>()
  const [previewImg, setPreviewImg] = useState<string>('')

  const { mutateAsync } = useMutation((router: NextRouter) => {
    const query = router.query
    const id = query.id as string | undefined
    const curEcsite = query.ecsite as ShopName
    if (!router.isReady) return Promise.resolve([])

    if (isUndefined(id) || isUndefined(curEcsite)) return Promise.resolve([])

    let promise: Promise<unknown> = null

    const param = {
      key: defaultSearchOneboundParams.key,
      num_iid: +id,
      is_promotion: 1,
      lang: defaultSearchOneboundParams.ang,
      secret: defaultSearchOneboundParams.secret,
    }

    switch (curEcsite) {
      case ShopName.Shop1688:
        promise = _1688API.getItem(param)
        break
      case ShopName.TaoBao:
        promise = _taobaoAPI.getItem(param)
        break
      default:
        promise = _taobaoAPI.getItem(param)
        break
    }

    return promise
  })

  useEffect(() => {
    mutateAsync(router, {
      onSuccess(data) {
        // console.log(data)
      },
    })
  }, [id, ecsite])

  const handleChangePreview = (newImg: string) => {
    setPreviewImg(newImg)
  }

  return { data, previewImg, handleChangePreview, ecsite }
}
