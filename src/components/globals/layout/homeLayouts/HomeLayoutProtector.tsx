// import Cookie from "js-cookie";
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React from 'react'
import { config } from '~/configs'

export const HomeLayoutProtector: React.FC<{}> = ({ children }) => {
  const session = Cookies.get(config.tokenName)
  const router = useRouter()

  if (session) {
    router.push('/user/')
  }
  return <>{children}</>
}
