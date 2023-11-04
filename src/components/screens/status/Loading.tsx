import React from 'react'
import Lottie from 'react-lottie'
import * as loading from '~/assets/json/loading.json'

export const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return <Lottie options={defaultOptions} height={'auto'} width={80} />
}
