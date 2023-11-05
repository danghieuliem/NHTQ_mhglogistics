import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '~/store'

export const AdminLayout = ({ children }) => {
  const dispatch = useAppDispatch()

  return <>{children}</>
}

export const CheckAdminLayout = ({ children }) => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo,
  )
  const userGroupId = userCurrentInfo?.UserGroupId
  if (!userGroupId || userGroupId === 2) return <>{children}</>
  return <AdminLayout>{children}</AdminLayout>
}
