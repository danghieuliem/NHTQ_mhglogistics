import * as empty from '~/assets/json/empty.json'

import Lottie from 'react-lottie'

export const Empty = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: empty,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <div className={'h-full w-full p-[20%]'}>
      <Lottie options={defaultOptions} width={'200px'} />
    </div>
  )
}
