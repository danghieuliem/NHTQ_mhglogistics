import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { authenticate, setToken, user as userAPI } from '~/api'
import { Button, FormSelect } from '~/components'
import { showToast } from '~/components/toast'
import { config } from '~/configs'
import { setRouter, updateUser, useAppDispatch } from '~/store'
import { _format } from '~/utils'

const aLink =
  'cursor-pointer text-main hover:text-sec transition-all duration-300'

export const TrialForm = ({ handleOpen }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { handleSubmit, control, reset, resetField } = useForm<{
    Key: string
    ID: number
  }>({
    mode: 'onBlur',
    defaultValues: {
      Key: 'medi4',
      ID: null,
    },
  })

  useEffect(() => {
    reset({
      Key: 'medi4',
      ID: 0,
    })
  }, [])

  const [loading, setLoading] = useState(false)

  const _onPress = (data: { Key: string; ID: number }) => {
    setLoading(true)
    authenticate
      .loginDemon(data)
      .then((res) => {
        const token = res.Data.token
        Cookie.set(config.tokenName, token)
        setToken(token)
        const user: TUser = JSON.parse(
          _format.getJWTDecode(token)[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata'
          ],
        )
        userAPI
          .getByID(user?.UserId)
          .then((res) => {
            const newData: any = res?.Data
            dispatch(
              updateUser({
                ...newData,
                IsConfirmOTP: false,
                Roles: [],
                LastName: '',
                FirstName: '',
                Token: token,
              }),
            )
            setLoading(false)
            router.push('/user/')
            dispatch(setRouter(user.UserGroupId))
          })
          .catch(() => console.log('error to fetching user by id!'))
      })
      .catch(() => {
        showToast({
          title: '',
          message: 'Tên đăng nhập hoặc mật khẩu không chính xác',
          type: 'error',
        })
        setLoading(false)
      })
  }

  return (
    <div className='authContainer h-64'>
      <form onSubmit={handleSubmit(_onPress)}>
        <div className='col-span-2'>
          <FormSelect
            name='ID'
            control={control}
            label='Vui lòng chọn phân quyền'
            placeholder='Nhập tài khoản'
            rules={{
              required: 'Bạn chưa điền thông tin!',
            }}
            data={[
              {
                name: 'Nhân viên Admin',
                id: 1,
              },
              {
                name: 'Nhân viên quản lý',
                id: 107,
              },
              {
                name: 'Nhân viên đặt hàng',
                id: 39,
              },
              {
                name: 'Nhân viên kho VN',
                id: 43,
              },
              {
                name: 'Nhân viên kho TQ',
                id: 42,
              },
              {
                name: 'Nhân viên kế toán',
                id: 41,
              },
              {
                name: 'Nhân viên bán hàng',
                id: 40,
              },
            ]}
            select={{
              label: 'name',
              value: 'id',
            }}
          />
        </div>

        <div className='col-span-2'>
          <Button
            loading={loading}
            title='Đăng nhập'
            btnClass='w-full'
            htmlType='submit'
          />
        </div>
      </form>
      <div className='flex justify-between py-4'>
        <span className={aLink} onClick={() => handleOpen('register')}>
          Đăng ký
        </span>
        <span className={aLink} onClick={() => handleOpen('forgetPass')}>
          Quên mật khẩu?
        </span>
      </div>
    </div>
  )
}
