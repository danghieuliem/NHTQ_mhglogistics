import Tippy from '@tippyjs/react'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { EPermission, TControllerList, permissionsConstList } from '~/configs'
import { RootState, selectApiRoles, useAppSelector } from '~/store'
import { AuthToolTip } from './AuthToolTip'

type TProps = {
  permissionsRequired: EPermission[]
  controller: TControllerList
  mode?: 'every' | 'some'
}

export const AuthContainer: FC<TProps> = ({
  children,
  permissionsRequired,
  controller,
  mode = 'every',
}) => {
  const [isRender, setIsRender] = useState<boolean>(false)
  const apiRoles = useAppSelector(selectApiRoles)
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo,
  )

  const UserGroupId = userCurrentInfo?.UserGroupId
  const isAdmin = UserGroupId && UserGroupId === 1
  useEffect(() => {
    if (isAdmin) {
      setIsRender(true)
      return
    }
    if (!apiRoles) return
    const _permissions = apiRoles[controller]
    if (!_permissions || _permissions.length === 0) return
    if (mode === 'every') {
      const _every = permissionsRequired.every((permissionsRequiredItem) =>
        _permissions.includes(permissionsRequiredItem),
      )
      setIsRender(_every)
    }
    if (mode === 'some') {
      const _some = permissionsRequired.every((permissionsRequiredItem) =>
        _permissions.includes(permissionsRequiredItem),
      )
      setIsRender(_some)
    }
  }, [apiRoles])

  if (!isAdmin) return <>{isRender && children}</>

  const permissionList = permissionsRequired
    .map((permission) => {
      const permissionCont = permissionsConstList.find(
        (item) => item.Id === permission,
      )
      if (permissionCont) return permissionCont.Name
    })
    .join(' ')

  const title = (
    <Tippy
      trigger='click'
      placement='left'
      interactive
      content={<AuthToolTip {...{ controller, permissionsRequired }} />}
      arrow={true}
      theme='translucent'
      animation='scale'
    >
      <div className='w-[max-content] cursor-pointer text-center'>{`${controller}: ${permissionList}`}</div>
    </Tippy>
  )

  return (
    // <Tippy
    // 	arrow
    // 	interactive
    // 	placement="bottom"
    // 	content={title}
    // 	theme="light-border"
    // >
    <span>{children}</span>
    // </Tippy>
  )
}
