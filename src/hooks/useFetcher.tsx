import React from 'react'
import { toast } from 'react-toastify'
import { useDeepEffect } from '.'

type TProps<T> = {
  fetcher: () => Promise<TResponse<T>>
  middleware?: () => void
  dependencies: any[]
  setData?: (data: T) => void
}

export const useFetcher = <T extends object = object>({
  fetcher,
  dependencies,
  middleware,
  setData,
}: TProps<T>) => {
  const [loading, setLoading] = React.useState(false)
  const [response, setResponse] = React.useState<T>()

  useDeepEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const res = await fetcher()
        setResponse(res?.Data)
        middleware && middleware()
        setData && setData(res?.Data)
      } catch (error) {
        toast.error((error as any)?.response?.data?.ResultMessage)
      } finally {
        setLoading(false)
      }
    })()
  }, dependencies)
  return { loading, response }
}
