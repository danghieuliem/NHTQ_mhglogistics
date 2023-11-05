import { useMediaQuery } from 'react-responsive'

export const useScreen = () => {
  const isWidthLG = useMediaQuery({ query: `(max-width: ${992}px)` })
  const isWidthMD = useMediaQuery({ query: `(max-width: ${768}px)` })
  const isWidthSM = useMediaQuery({ query: `(max-width: ${576}px)` })

  return {
    isWidthLG,
    isWidthMD,
    isWidthSM,
  }
}
