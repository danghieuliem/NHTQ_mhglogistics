import { useState, useEffect } from 'react'
import { translateAPI } from '~/api/onebound'

export const TranslateToVN = ({ text }: { text: string }) => {
  const [vnName, setVNName] = useState<string>('')

  useEffect(() => {
    translateAPI.toVietnamese(text).then((res) => {
      setVNName(res)
    })
  }, [text])
  return <div>{vnName}</div>
}
