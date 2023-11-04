import clsx from 'clsx'
import { useRouter } from 'next/router'
import React, { ReactElement, useCallback, useState } from 'react'
// import OneSignal from "react-onesignal";
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { TlayoutWithChild } from '~/types/layout'
import { _func } from '~/utils'
import { ButtonBackTop } from '../../button/ButtonBackTop'
import AuthLayoutProtector from '../authLayouts/AuthlayoutProtector'
import { MenuHorizontal } from '../userLayout/menuHorizontal'
import Header from './Header'
import Sidebar from './Sidebar'
import styles from './index.module.css'
import Footer from './Footer'

type TProps = {
  breadcrumb?: string
  userPage?: boolean
}

export const Layout: TlayoutWithChild & React.FC<TProps> = ({
  children,
  userPage,
  breadcrumb,
}) => {
  const router = useRouter()
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo,
  )

  const [hover, setHover] = useState(window.innerWidth > 1200)
  const handleHover = useCallback((bool: boolean) => setHover(bool), [])

  const [tabbar, setTabbar] = useState(false)

  const userGroupId = userCurrentInfo?.UserGroupId
  if (userGroupId !== 1) {
    _func.handleCheckAccessPage(userGroupId, router)
  }
  return (
    <AuthLayoutProtector>
      <Header
        {...{
          tabbar,
          hover,
          handleHover,
          userPage,
        }}
      />
      <main
        className={clsx(
          'app-content',
          userPage ? styles.userAppContent : styles.managerAppContent,
        )}
      >
        {window.innerWidth >= 1280 && userPage ? (
          <MenuHorizontal />
        ) : (
          <Sidebar {...{ hover, tabbar, userPage, handleHover }} />
        )}

        <div className={clsx('app-main-content height-content app-main')}>
          <div
            className={clsx(
              'app-main-inner',
              !userPage && styles.managerAppMainInner,
            )}
          >
            {breadcrumb && (
              <div className={clsx(styles.breadcrumb)}>{breadcrumb}</div>
            )}

            {children}
          </div>
          <ButtonBackTop />
          {userPage === true && window.innerWidth >= 1280 && (
            <Footer hover={false} userPage />
          )}
        </div>
      </main>
    </AuthLayoutProtector>
  )
}

Layout.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
