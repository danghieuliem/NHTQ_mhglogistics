import React from 'react'
import Lottie from 'react-lottie'
import * as notFound from '~/assets/json/mvd-notfound.json'

export const MvdNotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: notFound,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <div className='m-auto flex h-[100vh] w-[40vw] flex-col items-center justify-center'>
      <Lottie options={defaultOptions} width={'100%'} height={'400px'} />
      <h1 className='w-full text-center text-lg font-bold text-red'>
        Mã vận đơn không tồn tại!
      </h1>
    </div>
  )
}
