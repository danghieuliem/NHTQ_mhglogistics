import React from 'react'
import Lottie from 'react-lottie'
import * as notFound from '~/assets/json/404.json'

export const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: notFound,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <div className={'h-full w-full p-[20%]'}>
      <Lottie options={defaultOptions} width={'100%'} height={'100%'} />
    </div>
  )
}
