import { Avatar as AvatarAntd, Card, Divider, Image, Popover } from 'antd'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import Link from 'next/link'
import React, { useState } from 'react'
import { default as AvatarName } from 'react-avatar'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { configuration, getAllNewNotify } from '~/api'
import { config, getLevelId } from '~/configs'
import {
  RootState,
  selectConnection,
  selectFirstPageDashboard,
  useAppSelector,
} from '~/store'
import { _format } from '~/utils'
import Notification from './box/Notification'
import styles from './index.module.css'
import { useRouter } from 'next/router'

type TProps = {
  hover: boolean
  handleHover: (bool: boolean) => void
  userPage?: boolean
}

const Bars = ({ hover, onClick }) => {
  return (
    <div className='flex items-center'>
      <div
        className={clsx(
          styles.wrapper,
          styles.openMenu,
          styles.svg,
          hover && styles.active,
        )}
        onClick={onClick}
      >
        {/* <img src="/icon/menu-bars.png" /> */}
        <svg className={clsx(styles.menu__svg)} viewBox='0 0 100 100'>
          <path d='m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20'></path>
          <path
            d={!hover ? 'm 50,50 h 20' : 'm 30,50 h 40'}
            className='path-2'
          ></path>
          <path d='m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20'></path>
        </svg>
      </div>
    </div>
  )
}

const NotificationBell = ({ userPage, userCurrentInfo }) => {
  const { data } = useQuery(
    ['new-notification'],
    () =>
      getAllNewNotify
        .getAll({
          OfEmployee: userPage ? false : true,
        })
        .then((res) => {
          if (res?.Data > 100) {
            // setTotalNoti(res?.Data);
            // isLoadRef.current = true;
            return res
          } else {
            // setTotalNoti(res?.Data);
            // isLoadRef.current = false;
            return res
          }
        }),
    {
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage)
      },
      // enabled: isLoadRef.current,
      retry: false,
      staleTime: 5000,
      keepPreviousData: true,
    },
  )

  const [visible, setVisible] = useState(false)

  const handleClickChange = (visible) => {
    setVisible(visible)
  }

  return (
    <>
      <Popover
        trigger={'click'}
        visible={visible}
        onVisibleChange={handleClickChange}
        placement='bottomRight'
        content={
          <Card
            headStyle={{ padding: '0px 10px' }}
            bodyStyle={{ padding: '10px' }}
            extra={
              <div className={styles.totalNotiButton}>
                <div className='text-md font-semibold text-sec'>Thông báo!</div>
                <div onClick={() => setVisible(false)}>
                  <Link
                    href={`${
                      userPage === true ? '/user' : '/manager'
                    }/notification`}
                  >
                    <a>Xem tất cả</a>
                  </Link>
                </div>
              </div>
            }
          >
            <div className='flex flex-col items-center'>
              <div
                className={clsx(
                  'lg:w-[320px]',
                  'border-1 h-[400px] overflow-hidden border-solid border-main',
                )}
              >
                <Notification userPage={userPage} UID={userCurrentInfo?.Id} />
              </div>
            </div>
          </Card>
        }
      >
        <button className='relative mr-2'>
          <div className={clsx(styles.item, 'col-span-1 flex cursor-pointer')}>
            <div className={clsx(styles.block, styles.actionInfo, '!flex')}>
              <div
                className={`text-[20px] text-black ${
                  data?.Data > 0 && styles.bellIcon
                }`}
              >
                <i className='fal fa-bell'></i>
              </div>
              {data?.Data > 0 && (
                <div
                  className={`absolute top-[50%] left-[50%] flex translate-y-[-90%] items-center rounded-[8px] bg-red px-[6px] text-[10px]`}
                >
                  <span className='flex items-center text-[#fff]'>
                    {data?.Data > 100 ? '100+' : data?.Data}
                  </span>
                </div>
              )}
            </div>
          </div>
        </button>
      </Popover>

      <Divider
        type='vertical'
        className={clsx('h-3 bg-main', data?.Data > 100 ? '!ml-6' : 'ml-auto')}
      />
    </>
  )
}

const NotificationBellMemo = React.memo(NotificationBell)

const LeftInfoComponents = ({ userPage, userCurrentInfo }) => {
  const firstPage = useAppSelector(selectFirstPageDashboard)
  const connection = useAppSelector(selectConnection)
  const router = useRouter()
  // const dispatch = useDispatch();

  return (
    <>
      {/* button direct */}
      <li className={clsx(styles.block, 'col-span-1 !mr-2 font-bold')}>
        {userPage === true && userCurrentInfo?.UserGroupId !== 2 && (
          <Link href={firstPage}>
            <a className={clsx(styles.btnSwitchManager)}>
              {window.innerWidth >= 520 ? (
                <span className=''>MANAGER</span>
              ) : (
                <i className='fas fa-user-shield'></i>
              )}
            </a>
          </Link>
        )}
        {userPage !== true && (
          <Link href='/user'>
            <a className={clsx(styles.btnSwitchManager)}>
              {window.innerWidth >= 520 ? (
                <span className=''>USER</span>
              ) : (
                <i className='fas fa-user'></i>
              )}
            </a>
          </Link>
        )}
      </li>

      {/* VIP */}
      {userPage && (
        <li
          className={clsx(
            styles.block,
            'mr-2 !hidden items-center text-[12px] md:!flex',
          )}
        >
          <span className={styles.VIP}>
            {getLevelId[userCurrentInfo?.LevelId]?.Name}
          </span>
        </li>
      )}

      {/* Thông báo */}
      <NotificationBellMemo
        userPage={userPage}
        userCurrentInfo={userCurrentInfo}
      />

      {/* thông tin người dùng */}
      <Popover
        trigger={'click'}
        placement='bottomRight'
        content={
          <div className={styles.profileWrapper}>
            <Link href='/user/info-users'>
              <a className={clsx(styles.profileLink, styles.btnAccount)}>
                <i className='fas fa-user-cog'></i>
                <span>Tài khoản</span>
              </a>
            </Link>
            <Link href='/'>
              <a
                className={clsx(styles.profileLink, styles.btnLogout)}
                onClick={async () => {
                  Cookies.remove(config.tokenName)
                  connection &&
                    (await connection.invoke(
                      'leave',
                      userCurrentInfo.Id.toString(),
                      userCurrentInfo.UserGroupId.toString(),
                    ))

                  router.push('/authen/login/')
                }}
              >
                <i className='fas fa-sign-out-alt'></i>
                <span>Đăng xuất</span>
              </a>
            </Link>
          </div>
        }
      >
        <div className={clsx(styles.block, styles.profile)}>
          <div className={styles.img}>
            {userCurrentInfo?.AvatarIMG ? (
              <AvatarAntd src={userCurrentInfo?.AvatarIMG} />
            ) : (
              <AvatarName
                name={userCurrentInfo?.UserName}
                round={true}
                size={'40px'}
                textSizeRatio={2}
              />
            )}
          </div>
          <div className={clsx(styles.userInfoWrapper, '!hidden xs:!flex')}>
            <span className='items-end text-[14px] font-semibold text-main'>
              {userCurrentInfo?.UserName}
            </span>
            <span className='items-end text-[12px] font-semibold text-sec'>
              {userCurrentInfo?.UserGroupName}
            </span>
          </div>
        </div>
      </Popover>
    </>
  )
}

const NonRenderingChangeHover = React.memo(LeftInfoComponents)

const Header: React.FC<TProps> = ({ hover, handleHover, userPage }) => {
  const { data: configData } = useQuery({
    queryKey: ['get-currency'],
    queryFn: () => configuration.getCurrency(),
  })

  const dataGlobal: TConfig = useSelector(
    (state: RootState) => state.dataGlobal,
  )
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo,
  )

  return (
    <header className={clsx(styles.header, !userPage && 'shadow-md')}>
      <div
        className={clsx(
          userPage ? styles.innerHeaderUser : styles.innerHeaderManager,
        )}
      >
        <div className='flex h-full gap-[10px]'>
          {window.innerWidth <= 1280 && userPage && (
            <Bars {...{ hover, onClick: () => handleHover(!hover) }} />
          )}

          {!userPage && (
            <Bars {...{ hover, onClick: () => handleHover(!hover) }} />
          )}

          <div className={`hidden md:block`}>
            <div className={clsx(styles.img, 'h-full')}>
              <Link href='/'>
                <a className={clsx(styles.logo, 'flex h-full items-center')}>
                  <Image
                    src={dataGlobal?.LogoIMG}
                    width={'100%'}
                    height={'100%'}
                    alt='logo'
                    style={{ filter: 'unset' }}
                    preview={false}
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* Tỉ giá + ví dư */}
        <div
          className={clsx(
            styles.wrapper,
            '!hidden flex-1 !justify-end lg:!flex lg:justify-center',
          )}
        >
          <div className={`col-span-1 items-center xl:!flex ${styles.item}`}>
            <div
              className={`items-center rounded-md px-2 xl:flex ${styles.block}`}
            >
              <span className='!mr-1 text-[12px] font-normal text-black'>
                Tỉ giá:
              </span>
              <span className='flex items-center !text-xs !font-bold !text-main xl:!text-[12px]'>
                1¥ = {_format.getVND(configData?.Data)}
              </span>
            </div>
          </div>
          {userPage && (
            <div
              className={clsx(styles.item, 'col-span-1  items-center xl:!flex')}
            >
              <div
                className={clsx(
                  styles.block,
                  'items-center rounded-md px-2 xl:flex',
                )}
              >
                <span className='!mr-1 text-[12px] font-normal text-black'>
                  Số dư:
                </span>
                <span className='flex items-center text-xs font-bold text-main xl:text-[12px]'>
                  {userCurrentInfo?.Wallet !== 0
                    ? _format.getVND(userCurrentInfo?.Wallet)
                    : '0 VNĐ'}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className={clsx(styles.wrapper)}>
          <NonRenderingChangeHover
            userCurrentInfo={userCurrentInfo}
            userPage={userPage}
          />
        </div>
      </div>
    </header>
  )
}

export default React.memo(Header)
