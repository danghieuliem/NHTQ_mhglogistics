import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { smallPackage } from '~/api'
import { Loading } from '~/components'
import { MvdNotFound } from '~/components/screens/status'
import { TrackingDetail } from '~/components/screens/user/tracking'

const Box = ({ children, isResult }) => {
  return (
    <div
      className={clsx(
        'relative flex h-screen w-screen items-center overflow-y-scroll p-8',
        isResult && 'bg-sec',
      )}
    >
      <div className='relative m-auto w-[700px] xl:w-[1200px]'>{children}</div>
    </div>
  )
}

const Index = () => {
  const [trackingData, setTrackingData] = useState(null)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const code = router?.query?.TransactionCode || null

  const handleGetCode = async (TransactionCode: string) => {
    setLoading(true)

    smallPackage
      .getByTransactionCode({ TransactionCode })
      .then((res) => {
        setLoading(false)
        setTrackingData(res?.Data)
      })
      .catch((error) => {
        setLoading(false)
        setTrackingData(null)
      })
  }

  useEffect(() => {
    if (code) {
      handleGetCode(code.toString())
    }
  }, [router?.query])

  if (loading) {
    return <Box children={<Loading />} isResult={false} />
  }

  if (!trackingData) {
    return <Box children={<MvdNotFound />} isResult={false} />
  }
  return (
    <Box children={<TrackingDetail data={trackingData} />} isResult={true} />
  )
}

export default Index
